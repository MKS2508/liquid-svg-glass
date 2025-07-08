/**
 * @file Props for GlassEffect component
 * @description React-specific props for the GlassEffect component
 */

import type { ReactNode } from 'react';
import type { GlassConfig, GlassPreset, Position, BlendMode, ChannelSelector } from '@liquid-svg-glass/core';
import type { DragCallbacks } from './interaction';

export interface GlassEffectProps extends DragCallbacks {
  /** Preset predefinido */
  preset?: GlassPreset;
  /** Configuración personalizada (sobrescribe preset) */
  config?: Partial<GlassConfig>;
  /** Contenido interno del efecto glass */
  children?: ReactNode;
  /** Habilitar dragging */
  draggable?: boolean;
  /** Posición inicial */
  initialPosition?: Position;
  /** Clases CSS adicionales */
  className?: string;
  /** Modo de debug */
  debug?: boolean;
  /** Ajustar automáticamente al tamaño del contenido hijo */
  autoSize?: boolean;
  
  // Individual geometry props
  width?: number;
  height?: number;
  radius?: number;
  border?: number;
  
  // Individual visual effect props
  frost?: number;
  blur?: number;
  displace?: number;
  scale?: number;
  alpha?: number;
  lightness?: number;
  
  // Individual channel props
  x?: ChannelSelector;
  y?: ChannelSelector;
  blend?: BlendMode;
  
  // Individual chromatic aberration props
  r?: number;
  g?: number;
  b?: number;
}