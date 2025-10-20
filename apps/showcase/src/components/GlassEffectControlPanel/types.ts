import type { RefObject } from 'react';
import type { GlassPreset, BlendMode, ChannelSelector } from '@liquid-svg-glass/core';

export type TabType = 'presets' | 'geometry' | 'effects' | 'chromatic' | 'channels' | 'phase1';

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

export interface GlassEffectControlPanelProps {
  isOpen: boolean;
  config: GlassEffectConfig;
  debug: boolean;
  buttonRef?: RefObject<HTMLButtonElement>;
  onChange: (config: Partial<GlassEffectConfig>) => void;
  onReset: () => void;
  onDebugToggle: () => void;
  onClose: () => void;
}
