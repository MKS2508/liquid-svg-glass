/**
 * @file DraggableItem Component
 * @description Handles all GSAP dragging logic separated from visual effects
 */

import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import type { DraggableProps, GSAPDragInstance } from '../../types/interaction';
import { GlassLogger } from '@liquid-svg-glass/core';

// Register Draggable plugin
gsap.registerPlugin(Draggable);

const DraggableItem: React.FC<DraggableProps> = ({
  draggable = true,
  bounds,
  type = 'x,y',
  initialPosition,
  onMove,
  onDragStart,
  onDragEnd,
  children,
  className = '',
  debug = false,
}) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const draggableInstanceRef = useRef<GSAPDragInstance | null>(null);
  const logger = useMemo(() => GlassLogger.createDraggableLogger(debug), [debug]);

  // Position style for initial positioning
  const positionStyle = useMemo(() => ({
    position: 'fixed' as const,
    zIndex: 1000,
    opacity: 1,
    ...(initialPosition && {
      transform: `translate(${initialPosition.x}px, ${initialPosition.y}px)`
    }),
  }), [initialPosition]);

  useEffect(() => {
    if (!itemRef.current || !draggable) return;

    // Log GSAP setup with draggable-specific context
    logger.logGSAPSetup({
      type,
      element: itemRef.current.className || 'draggable-item',
      draggable: true,
      bounds: bounds ? (typeof bounds === 'string' ? bounds : 'element') : 'none'
    });

    // Create GSAP Draggable instance configuration
    const draggableConfig: any = {
      type,
      onDragStart: function(this: any) {
        logger.logLifecycle('drag-start', { 
          x: this.x, 
          y: this.y,
          element: itemRef.current?.className 
        });
        if (onDragStart) {
          onDragStart(this.x, this.y);
        }
      },
      onDrag: function(this: any) {
        if (onMove) {
          onMove(this.x, this.y);
        }
      },
      onDragEnd: function(this: any) {
        logger.logLifecycle('drag-end', { 
          x: this.x, 
          y: this.y,
          element: itemRef.current?.className 
        });
        if (onDragEnd) {
          onDragEnd(this.x, this.y);
        }
      },
    };

    // Only add bounds if it's provided
    if (bounds) {
      draggableConfig.bounds = bounds;
    }

    const draggableInstance = Draggable.create(itemRef.current, draggableConfig)[0];

    draggableInstanceRef.current = draggableInstance;

    // Log successful GSAP initialization
    logger.logGSAPSuccess(itemRef.current.className || 'draggable-item', {
      type,
      bounds: bounds ? (typeof bounds === 'string' ? bounds : 'element') : 'none',
      hasCallbacks: !!(onMove || onDragStart || onDragEnd),
      element: itemRef.current.className || 'draggable-item'
    });

    // Cleanup function
    return () => {
      const currentElement = itemRef.current;
      if (draggableInstance) {
        logger.logLifecycle('cleanup', { element: currentElement?.className });
        draggableInstance.kill();
        draggableInstanceRef.current = null;
      }
    };
  }, [draggable, type, bounds, onMove, onDragStart, onDragEnd, logger]);

  // Update position if initialPosition changes
  useEffect(() => {
    if (initialPosition && draggableInstanceRef.current) {
      logger.logConfigChange('position', 
        `${draggableInstanceRef.current.x},${draggableInstanceRef.current.y}`, 
        `${initialPosition.x},${initialPosition.y}`
      );
    }
  }, [initialPosition, logger]);

  return (
    <div
      ref={itemRef}
      className={`draggable-item ${className}`}
      data-draggable={draggable}
      data-debug={debug}
      style={positionStyle}
    >
      {children}
    </div>
  );
};

export default DraggableItem;