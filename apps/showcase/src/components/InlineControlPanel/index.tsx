import { useState } from 'react';
import type { TabType, InlineControlPanelProps } from './types';
import type { GlassPreset, ChannelSelector, BlendMode } from '@liquid-svg-glass/core';
import styles from './styles.module.scss';

const PRESETS: GlassPreset[] = ['dock', 'pill', 'bubble', 'free'];

const PRESET_VALUES: Record<GlassPreset, Omit<import('./types').GlassEffectConfig, 'preset'>> = {
  dock: {
    width: 336,
    height: 96,
    radius: 16,
    border: 7,
    frost: 0.05,
    blur: 11,
    blurBackground: 8,
    displace: 0.2,
    scale: -180,
    alpha: 0.93,
    lightness: 50,
    r: 0,
    g: 10,
    b: 20,
    x: 'R',
    y: 'B',
    blend: 'difference',
  },
  pill: {
    width: 200,
    height: 80,
    radius: 40,
    border: 7,
    frost: 0,
    blur: 11,
    blurBackground: 6,
    displace: 0,
    scale: -180,
    alpha: 0.93,
    lightness: 50,
    r: 0,
    g: 10,
    b: 20,
    x: 'R',
    y: 'B',
    blend: 'difference',
  },
  bubble: {
    width: 140,
    height: 140,
    radius: 70,
    border: 7,
    frost: 0,
    blur: 11,
    blurBackground: 10,
    displace: 0,
    scale: -180,
    alpha: 0.93,
    lightness: 50,
    r: 0,
    g: 10,
    b: 20,
    x: 'R',
    y: 'B',
    blend: 'difference',
  },
  free: {
    width: 140,
    height: 280,
    radius: 80,
    border: 15,
    frost: 0,
    blur: 10,
    blurBackground: 5,
    displace: 0,
    scale: -300,
    alpha: 0.74,
    lightness: 60,
    r: 0,
    g: 10,
    b: 20,
    x: 'R',
    y: 'B',
    blend: 'difference',
  },
};

const BLEND_MODES: BlendMode[] = [
  'normal', 'multiply', 'screen', 'overlay',
  'darken', 'lighten', 'color-dodge', 'color-burn',
  'hard-light', 'soft-light', 'difference', 'exclusion',
  'hue', 'saturation', 'color', 'luminosity'
];

const CHANNEL_SELECTORS: ChannelSelector[] = ['R', 'G', 'B'];

export function InlineControlPanel({
  config,
  debug,
  onChange,
  onReset,
  onDebugToggle
}: InlineControlPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('presets');

  const handlePresetChange = (preset: GlassPreset) => {
    const presetValues = PRESET_VALUES[preset];
    onChange({
      preset,
      ...presetValues,
    });
  };

  const handleNumberChange = (key: keyof typeof config, value: number) => {
    onChange({ [key]: value });
  };

  const handleChannelChange = (key: 'x' | 'y', value: ChannelSelector) => {
    onChange({ [key]: value });
  };

  const handleBlendChange = (blend: BlendMode) => {
    onChange({ blend });
  };

  return (
    <div className={styles.controlPanel}>
      {/* Header */}
      <div className={styles.panelHeader}>
        <h3>Controls</h3>
        <div className={styles.headerActions}>
          <button
            className={`${styles.headerBtn} ${debug ? styles.active : ''} ${styles.debugBtn}`}
            onClick={onDebugToggle}
            title="Toggle debug mode"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            Debug
          </button>
          <button
            className={styles.headerBtn}
            onClick={onReset}
            title="Reset to default values"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            Reset
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabNav}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'presets' ? styles.active : ''}`}
          onClick={() => setActiveTab('presets')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Presets
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'geometry' ? styles.active : ''}`}
          onClick={() => setActiveTab('geometry')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
          Geometry
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'effects' ? styles.active : ''}`}
          onClick={() => setActiveTab('effects')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
          </svg>
          Effects
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'chromatic' ? styles.active : ''}`}
          onClick={() => setActiveTab('chromatic')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          Chromatic
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'channels' ? styles.active : ''}`}
          onClick={() => setActiveTab('channels')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
          Channels
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'presets' && (
          <div className={styles.tabPanel}>
            <div className={styles.presetGrid}>
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`${styles.presetButton} ${config.preset === preset ? styles.active : ''}`}
                  onClick={() => handlePresetChange(preset)}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'geometry' && (
          <div className={styles.tabPanel}>
            <div className={styles.parameterSection}>
              <h4>Dimensions</h4>
              <div className={styles.sliderControl}>
                <div className={styles.sliderLabel}>
                  Width <span>{config.width}px</span>
                </div>
                <input
                  type="range"
                  className={styles.slider}
                  min="50"
                  max="800"
                  step="10"
                  value={config.width}
                  onChange={(e) => handleNumberChange('width', Number(e.target.value))}
                />
              </div>
              <div className={styles.sliderControl}>
                <div className={styles.sliderLabel}>
                  Height <span>{config.height}px</span>
                </div>
                <input
                  type="range"
                  className={styles.slider}
                  min="50"
                  max="800"
                  step="10"
                  value={config.height}
                  onChange={(e) => handleNumberChange('height', Number(e.target.value))}
                />
              </div>
            </div>
            <div className={styles.parameterSection}>
              <h4>Shape</h4>
              <div className={styles.sliderControl}>
                <div className={styles.sliderLabel}>
                  Radius <span>{config.radius}px</span>
                </div>
                <input
                  type="range"
                  className={styles.slider}
                  min="0"
                  max="100"
                  step="1"
                  value={config.radius}
                  onChange={(e) => handleNumberChange('radius', Number(e.target.value))}
                />
              </div>
              <div className={styles.sliderControl}>
                <div className={styles.sliderLabel}>
                  Border <span>{config.border}%</span>
                </div>
                <input
                  type="range"
                  className={styles.slider}
                  min="0"
                  max="50"
                  step="1"
                  value={config.border}
                  onChange={(e) => handleNumberChange('border', Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'effects' && (
          <div className={styles.tabPanel}>
            <div className={styles.parameterSection}>
              <h4>Visual Effects</h4>
              <div className={styles.sliderControl}>
                <div className={styles.sliderLabel}>
                  Frost <span>{config.frost.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  className={styles.slider}
                  min="0"
                  max="1"
                  step="0.01"
                  value={config.frost}
                  onChange={(e) => handleNumberChange('frost', Number(e.target.value))}
                />
              </div>
              <div className={styles.sliderControl}>
                <div className={styles.sliderLabel}>
                  Blur SVG Rect <span>{config.blur}px</span>
                </div>
                <input
                  type="range"
                  className={styles.slider}
                  min="0"
                  max="100"
                  step="1"
                  value={config.blur}
                  onChange={(e) => handleNumberChange('blur', Number(e.target.value))}
                />
              </div>
              <div className={styles.sliderControl}>
                <div className={styles.sliderLabel}>
                  Blur Background <span>{config.blurBackground}px</span>
                </div>
                <input
                  type="range"
                  className={styles.slider}
                  min="0"
                  max="30"
                  step="0.5"
                  value={config.blurBackground}
                  onChange={(e) => handleNumberChange('blurBackground', Number(e.target.value))}
                />
              </div>
              <div className={styles.sliderControl}>
                <div className={styles.sliderLabel}>
                  Displace <span>{config.displace.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  className={styles.slider}
                  min="0"
                  max="5"
                  step="0.1"
                  value={config.displace}
                  onChange={(e) => handleNumberChange('displace', Number(e.target.value))}
                />
              </div>
              <div className={styles.sliderControl}>
                <div className={styles.sliderLabel}>
                  Scale <span>{config.scale}</span>
                </div>
                <input
                  type="range"
                  className={styles.slider}
                  min="0"
                  max="100"
                  step="1"
                  value={config.scale}
                  onChange={(e) => handleNumberChange('scale', Number(e.target.value))}
                />
              </div>
              <div className={styles.sliderControl}>
                <div className={styles.sliderLabel}>
                  Alpha <span>{config.alpha.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  className={styles.slider}
                  min="0"
                  max="1"
                  step="0.01"
                  value={config.alpha}
                  onChange={(e) => handleNumberChange('alpha', Number(e.target.value))}
                />
              </div>
              <div className={styles.sliderControl}>
                <div className={styles.sliderLabel}>
                  Lightness <span>{config.lightness}%</span>
                </div>
                <input
                  type="range"
                  className={styles.slider}
                  min="0"
                  max="100"
                  step="1"
                  value={config.lightness}
                  onChange={(e) => handleNumberChange('lightness', Number(e.target.value))}
                />
              </div>
            </div>

            <div className={styles.parameterSection}>
              <h4>Performance & Advanced</h4>

              <div className={styles.toggleControl}>
                <label>
                  <input
                    type="checkbox"
                    checked={config.enableBackdropExtension ?? true}
                    onChange={(e) => onChange({ enableBackdropExtension: e.target.checked })}
                  />
                  <span>Backdrop Extension</span>
                  <span className={styles.badge}>NEW</span>
                </label>
                <p className={styles.toggleDescription}>
                  Extends element to 200% height to capture nearby elements
                </p>
              </div>

              <div className={styles.toggleControl}>
                <label>
                  <input
                    type="checkbox"
                    checked={config.enablePerformanceOpts ?? true}
                    onChange={(e) => onChange({ enablePerformanceOpts: e.target.checked })}
                  />
                  <span>Performance Optimizations</span>
                  <span className={styles.badge}>NEW</span>
                </label>
                <p className={styles.toggleDescription}>
                  GPU acceleration with will-change and CSS containment
                </p>
              </div>

              <div className={styles.toggleControl}>
                <label>
                  <input
                    type="checkbox"
                    checked={config.enableFlickeringFix ?? true}
                    onChange={(e) => onChange({ enableFlickeringFix: e.target.checked })}
                  />
                  <span>Flickering Fix</span>
                  <span className={styles.badge}>NEW</span>
                </label>
                <p className={styles.toggleDescription}>
                  Prevents color flickering on scroll edge with gradient overlay
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chromatic' && (
          <div className={styles.tabPanel}>
            <div className={styles.parameterSection}>
              <h4>RGB Channel Offsets</h4>
              <div className={styles.sliderControl}>
                <div className={`${styles.sliderLabel} ${styles.redLabel}`}>
                  Red Channel <span>{config.r}</span>
                </div>
                <input
                  type="range"
                  className={`${styles.slider} ${styles.redSlider}`}
                  min="-50"
                  max="50"
                  step="1"
                  value={config.r}
                  onChange={(e) => handleNumberChange('r', Number(e.target.value))}
                />
              </div>
              <div className={styles.sliderControl}>
                <div className={`${styles.sliderLabel} ${styles.greenLabel}`}>
                  Green Channel <span>{config.g}</span>
                </div>
                <input
                  type="range"
                  className={`${styles.slider} ${styles.greenSlider}`}
                  min="-50"
                  max="50"
                  step="1"
                  value={config.g}
                  onChange={(e) => handleNumberChange('g', Number(e.target.value))}
                />
              </div>
              <div className={styles.sliderControl}>
                <div className={`${styles.sliderLabel} ${styles.blueLabel}`}>
                  Blue Channel <span>{config.b}</span>
                </div>
                <input
                  type="range"
                  className={`${styles.slider} ${styles.blueSlider}`}
                  min="-50"
                  max="50"
                  step="1"
                  value={config.b}
                  onChange={(e) => handleNumberChange('b', Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'channels' && (
          <div className={styles.tabPanel}>
            <div className={styles.parameterSection}>
              <h4>Displacement Channels</h4>
              <div className={styles.selectControl}>
                <label>X Channel (Horizontal)</label>
                <div className={styles.channelSelector}>
                  {CHANNEL_SELECTORS.map((channel) => (
                    <button
                      key={`x-${channel}`}
                      className={config.x === channel ? styles.active : ''}
                      onClick={() => handleChannelChange('x', channel)}
                    >
                      {channel}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.selectControl}>
                <label>Y Channel (Vertical)</label>
                <div className={styles.channelSelector}>
                  {CHANNEL_SELECTORS.map((channel) => (
                    <button
                      key={`y-${channel}`}
                      className={config.y === channel ? styles.active : ''}
                      onClick={() => handleChannelChange('y', channel)}
                    >
                      {channel}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.parameterSection}>
              <h4>Blend Mode</h4>
              <div className={styles.selectControl}>
                <label>Gradient Blend</label>
                <select value={config.blend} onChange={(e) => handleBlendChange(e.target.value as BlendMode)}>
                  {BLEND_MODES.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
