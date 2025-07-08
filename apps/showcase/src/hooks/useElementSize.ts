/**
 * @file Hook for automatic element size detection
 * @description Uses ResizeObserver to track element dimensions dynamically
 */

import { useEffect, useRef, useState, useCallback } from 'react';

export interface ElementSize {
  width: number;
  height: number;
}

export interface UseElementSizeOptions {
  /** Debounce delay in milliseconds to avoid excessive updates */
  debounceMs?: number;
  /** Initial size before measurement */
  initialSize?: ElementSize;
}

/**
 * Hook that tracks the size of a DOM element using ResizeObserver
 * 
 * @param options - Configuration options for the hook
 * @returns Object containing the ref to attach and the current size
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, size } = useElementSize();
 *   
 *   return (
 *     <div ref={ref}>
 *       Size: {size.width} x {size.height}
 *     </div>
 *   );
 * }
 * ```
 */
export function useElementSize(options: UseElementSizeOptions = {}) {
  const { 
    debounceMs = 16, // ~60fps
    initialSize = { width: 0, height: 0 } 
  } = options;
  
  const ref = useRef<HTMLElement>(null);
  const [size, setSize] = useState<ElementSize>(initialSize);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const updateSize = useCallback((entries: ResizeObserverEntry[]) => {
    if (!entries[0]) return;

    const { width, height } = entries[0].contentRect;
    
    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce the size update
    debounceRef.current = setTimeout(() => {
      setSize(prevSize => {
        // Only update if size actually changed
        if (prevSize.width !== width || prevSize.height !== height) {
          return { width, height };
        }
        return prevSize;
      });
    }, debounceMs) as NodeJS.Timeout;
  }, [debounceMs]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Create ResizeObserver
    const resizeObserver = new ResizeObserver(updateSize);
    
    // Start observing
    resizeObserver.observe(element);

    // Initial measurement
    const rect = element.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [updateSize]);

  return { ref, size };
}

/**
 * Alternative hook that provides a callback when size changes
 * Useful when you need to react to size changes without re-rendering
 */
export function useElementSizeCallback(
  onSizeChange: (size: ElementSize) => void,
  options: UseElementSizeOptions = {}
) {
  const { 
    debounceMs = 16,
    initialSize = { width: 0, height: 0 } 
  } = options;
  
  const ref = useRef<HTMLElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastSizeRef = useRef<ElementSize>(initialSize);

  const updateSize = useCallback((entries: ResizeObserverEntry[]) => {
    if (!entries[0]) return;

    const { width, height } = entries[0].contentRect;
    
    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce the callback
    debounceRef.current = setTimeout(() => {
      const currentSize = { width, height };
      const lastSize = lastSizeRef.current;
      
      // Only call callback if size actually changed
      if (lastSize.width !== width || lastSize.height !== height) {
        lastSizeRef.current = currentSize;
        onSizeChange(currentSize);
      }
    }, debounceMs) as NodeJS.Timeout;
  }, [onSizeChange, debounceMs]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Create ResizeObserver
    const resizeObserver = new ResizeObserver(updateSize);
    
    // Start observing
    resizeObserver.observe(element);

    // Initial measurement
    const rect = element.getBoundingClientRect();
    const initialMeasurement = { width: rect.width, height: rect.height };
    lastSizeRef.current = initialMeasurement;
    onSizeChange(initialMeasurement);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [updateSize, onSizeChange]);

  return ref;
}