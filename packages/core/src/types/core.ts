/**
 * @file Core types combining all concerns
 * @description Main interfaces that combine geometry, visual effects, and interactions
 */

import type { GeometryConfig } from './geometry';
import type { VisualConfig } from './visual-effects';

// Re-export important types
export type { GeometryConfig, Position } from './geometry';
export type { VisualConfig, BlendMode, ChannelSelector } from './visual-effects';

export type GlassPreset = 'dock' | 'pill' | 'bubble' | 'free';

export interface GlassConfig extends GeometryConfig, VisualConfig {
  // Complete glass effect configuration
}