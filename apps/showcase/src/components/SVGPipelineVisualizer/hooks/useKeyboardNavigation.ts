import { useEffect, useCallback, useRef } from 'react';

export interface KeyboardNavigationOptions {
  enableArrowKeys?: boolean;
  enableEscape?: boolean;
  enableEnter?: boolean;
  enableTab?: boolean;
  trapFocus?: boolean;
  autoFocus?: boolean;
}

export const useKeyboardNavigation = (
  containerRef: React.RefObject<HTMLElement | HTMLDivElement | null>,
  options: KeyboardNavigationOptions = {}
) => {
  const {
    enableArrowKeys = true,
    enableEscape = true,
    enableEnter = true,
    enableTab = true,
    trapFocus = false,
    autoFocus = false,
  } = options;

  const focusableElements = useRef<HTMLElement[]>([]);
  const currentFocusIndex = useRef<number>(-1);

  // Get all focusable elements within the container
  const updateFocusableElements = useCallback(() => {
    if (!containerRef.current) return;

    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[role="button"]:not([disabled])',
    ].join(', ');

    const elements = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
    ).filter(element => {
      // Filter out elements that are not visible
      const style = window.getComputedStyle(element);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });

    focusableElements.current = elements;
  }, [containerRef]);

  // Focus management functions
  const focusFirst = useCallback(() => {
    updateFocusableElements();
    if (focusableElements.current.length > 0) {
      focusableElements.current[0].focus();
      currentFocusIndex.current = 0;
    }
  }, [updateFocusableElements]);

  const focusLast = useCallback(() => {
    updateFocusableElements();
    const lastIndex = focusableElements.current.length - 1;
    if (lastIndex >= 0) {
      focusableElements.current[lastIndex].focus();
      currentFocusIndex.current = lastIndex;
    }
  }, [updateFocusableElements]);

  const focusNext = useCallback(() => {
    updateFocusableElements();
    const nextIndex = currentFocusIndex.current + 1;
    if (nextIndex < focusableElements.current.length) {
      focusableElements.current[nextIndex].focus();
      currentFocusIndex.current = nextIndex;
    } else if (trapFocus && focusableElements.current.length > 0) {
      // Wrap to first element if trap focus is enabled
      focusableElements.current[0].focus();
      currentFocusIndex.current = 0;
    }
  }, [updateFocusableElements, trapFocus]);

  const focusPrevious = useCallback(() => {
    updateFocusableElements();
    const prevIndex = currentFocusIndex.current - 1;
    if (prevIndex >= 0) {
      focusableElements.current[prevIndex].focus();
      currentFocusIndex.current = prevIndex;
    } else if (trapFocus && focusableElements.current.length > 0) {
      // Wrap to last element if trap focus is enabled
      const lastIndex = focusableElements.current.length - 1;
      focusableElements.current[lastIndex].focus();
      currentFocusIndex.current = lastIndex;
    }
  }, [updateFocusableElements, trapFocus]);

  // Update current focus index when focus changes
  const handleFocusChange = useCallback(() => {
    const activeElement = document.activeElement as HTMLElement;
    const index = focusableElements.current.indexOf(activeElement);
    if (index !== -1) {
      currentFocusIndex.current = index;
    }
  }, []);

  // Keyboard event handler
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!containerRef.current) return;

    // Only handle keyboard events if the focus is within the container
    if (!containerRef.current.contains(document.activeElement)) return;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        if (enableArrowKeys) {
          event.preventDefault();
          focusNext();
        }
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        if (enableArrowKeys) {
          event.preventDefault();
          focusPrevious();
        }
        break;

      case 'Home':
        if (enableArrowKeys) {
          event.preventDefault();
          focusFirst();
        }
        break;

      case 'End':
        if (enableArrowKeys) {
          event.preventDefault();
          focusLast();
        }
        break;

      case 'Tab':
        if (enableTab && trapFocus) {
          event.preventDefault();
          if (event.shiftKey) {
            focusPrevious();
          } else {
            focusNext();
          }
        }
        break;

      case 'Escape':
        if (enableEscape) {
          // Allow custom escape handling
          const escapeEvent = new CustomEvent('keyboardEscape', {
            bubbles: true,
            cancelable: true,
          });
          containerRef.current?.dispatchEvent(escapeEvent);
        }
        break;

      case 'Enter':
      case ' ':
        if (enableEnter) {
          const activeElement = document.activeElement as HTMLElement;
          if (activeElement && activeElement.click) {
            event.preventDefault();
            activeElement.click();
          }
        }
        break;
    }
  }, [
    containerRef,
    enableArrowKeys,
    enableEscape,
    enableEnter,
    enableTab,
    trapFocus,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
  ]);

  // Set up event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);
    
    // Add focus event listener to track focus changes
    container.addEventListener('focusin', handleFocusChange);

    // Auto focus first element if enabled
    if (autoFocus) {
      setTimeout(focusFirst, 0);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('focusin', handleFocusChange);
    };
  }, [handleKeyDown, handleFocusChange, autoFocus, focusFirst]);

  // Update focusable elements when container changes
  useEffect(() => {
    updateFocusableElements();
  }, [updateFocusableElements]);

  return {
    focusFirst,
    focusLast,
    focusNext,
    focusPrevious,
    updateFocusableElements,
    currentFocusIndex: currentFocusIndex.current,
    focusableElementsCount: focusableElements.current.length,
  };
};