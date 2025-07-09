import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
  showOnHover?: boolean;
  showOnFocus?: boolean;
  maxWidth?: number;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 500,
  disabled = false,
  showOnHover = true,
  showOnFocus = true,
  maxWidth = 250,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current?.getBoundingClientRect();
    
    const triggerCenter = {
      x: triggerRect.left + triggerRect.width / 2,
      y: triggerRect.top + triggerRect.height / 2,
    };

    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = triggerCenter.x;
        y = triggerRect.top - 10;
        break;
      case 'bottom':
        x = triggerCenter.x;
        y = triggerRect.bottom + 10;
        break;
      case 'left':
        x = triggerRect.left - 10;
        y = triggerCenter.y;
        break;
      case 'right':
        x = triggerRect.right + 10;
        y = triggerCenter.y;
        break;
    }

    // Keep tooltip within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = tooltipRect?.width || maxWidth;
    const tooltipHeight = tooltipRect?.height || 50;

    if (x + tooltipWidth / 2 > viewportWidth) {
      x = viewportWidth - tooltipWidth / 2 - 10;
    }
    if (x - tooltipWidth / 2 < 0) {
      x = tooltipWidth / 2 + 10;
    }
    if (y + tooltipHeight > viewportHeight) {
      y = viewportHeight - tooltipHeight - 10;
    }
    if (y < 0) {
      y = 10;
    }

    setTooltipPosition({ x, y });
  };

  const showTooltip = () => {
    if (disabled) return;
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      calculatePosition();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      
      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0,
      x: position === 'left' ? 10 : position === 'right' ? -10 : 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      }
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        className={styles.trigger}
        onMouseEnter={showOnHover ? showTooltip : undefined}
        onMouseLeave={showOnHover ? hideTooltip : undefined}
        onFocus={showOnFocus ? showTooltip : undefined}
        onBlur={showOnFocus ? hideTooltip : undefined}
      >
        {children}
      </div>
      
      {createPortal(
        <AnimatePresence>
          {isVisible && (
            <motion.div
              ref={tooltipRef}
              className={`${styles.tooltip} ${styles[position]} ${className || ''}`}
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y,
                maxWidth,
              }}
              variants={tooltipVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="tooltip"
              aria-hidden={!isVisible}
            >
              <div className={styles.content}>
                {content}
              </div>
              <div className={styles.arrow} />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};