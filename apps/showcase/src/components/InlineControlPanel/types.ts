import type { GlassPreset, BlendMode, ChannelSelector } from '@liquid-svg-glass/core';

export type TabType = 'presets' | 'geometry' | 'effects' | 'chromatic' | 'channels';

export interface GlassEffectConfig {
  preset: GlassPreset;

  width: number;
  height: number;
  radius: number;
  border: number;

  frost: number;
  blur: number;
  blurBackground: number;
  displace: number;
  scale: number;
  alpha: number;
  lightness: number;

  r: number;
  g: number;
  b: number;

  x: ChannelSelector;
  y: ChannelSelector;
  blend: BlendMode;

  // Phase 1 Features (2025)
  enableBackdropExtension?: boolean;
  enablePerformanceOpts?: boolean;
  enableFlickeringFix?: boolean;
}

export interface InlineControlPanelProps {
  config: GlassEffectConfig;
  debug: boolean;
  onChange: (config: Partial<GlassEffectConfig>) => void;
  onReset: () => void;
  onDebugToggle: () => void;
}
