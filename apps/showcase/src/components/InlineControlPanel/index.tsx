import { useState } from 'react';
import type { TabType, InlineControlPanelProps } from './types';
import type { BlendMode } from '@liquid-svg-glass/core';
import { AccordionSection } from './controls/AccordionSection';
import { UnifiedChromaticControl } from './controls/UnifiedChromaticControl';
import { PresetShapeControl } from './PresetShapeControl';
import styles from './styles.module.scss';

const BLEND_MODES: BlendMode[] = [
  'normal', 'multiply', 'screen', 'overlay',
  'darken', 'lighten', 'color-dodge', 'color-burn',
  'hard-light', 'soft-light', 'difference', 'exclusion',
  'hue', 'saturation', 'color', 'luminosity'
];

export function InlineControlPanel({
  config,
  debug,
  onChange,
  onReset,
  onDebugToggle
}: InlineControlPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('presets-shape');
  const [openAccordion, setOpenAccordion] = useState<string | null>('dimensions');

  const handleNumberChange = (key: keyof typeof config, value: number) => {
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
          className={`${styles.tabBtn} ${activeTab === 'presets-shape' ? styles.active : ''}`}
          onClick={() => setActiveTab('presets-shape')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Presets & Shape
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
          className={`${styles.tabBtn} ${activeTab === 'chromatic-displacement' ? styles.active : ''}`}
          onClick={() => setActiveTab('chromatic-displacement')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M3 12h3m12 0h3M12 3v3m0 12v3" />
            <circle cx="12" cy="12" r="10" opacity="0.3" />
          </svg>
          Chromatic
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'presets-shape' && (
          <div className={styles.tabPanel}>
            <PresetShapeControl config={config} onChange={onChange} />
          </div>
        )}

        {activeTab === 'effects' && (
          <div className={styles.tabPanel}>
            <AccordionSection
              title="Visual Effects"
              isOpen={openAccordion === 'visual-effects'}
              onToggle={() => setOpenAccordion(openAccordion === 'visual-effects' ? null : 'visual-effects')}
            >
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
            </AccordionSection>

            <AccordionSection
              title="Performance & Advanced"
              isOpen={openAccordion === 'performance-advanced'}
              onToggle={() => setOpenAccordion(openAccordion === 'performance-advanced' ? null : 'performance-advanced')}
            >
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

              <div className={styles.toggleControl}>
                <label>
                  <input
                    type="checkbox"
                    checked={config.enableChromaticAberration ?? false}
                    onChange={(e) => onChange({ enableChromaticAberration: e.target.checked })}
                  />
                  <span>Chromatic Aberration (Phase 2)</span>
                  <span className={styles.badge}>NEW-PHASE2</span>
                </label>
                <p className={styles.toggleDescription}>
                  True RGB channel separation with feColorMatrix + feOffset + feBlend
                </p>
              </div>
            </AccordionSection>
          </div>
        )}

        {activeTab === 'chromatic-displacement' && (
          <div className={styles.tabPanel}>
            <AccordionSection
              title="Chromatic Aberration & Displacement"
              isOpen={openAccordion === 'chromatic-aberration'}
              onToggle={() => setOpenAccordion(openAccordion === 'chromatic-aberration' ? null : 'chromatic-aberration')}
            >
              <UnifiedChromaticControl
                r={config.r}
                g={config.g}
                b={config.b}
                x={config.x}
                y={config.y}
                onChange={(updates) => onChange(updates)}
              />
            </AccordionSection>

            <AccordionSection
              title="Blend Mode"
              isOpen={openAccordion === 'blend-mode'}
              onToggle={() => setOpenAccordion(openAccordion === 'blend-mode' ? null : 'blend-mode')}
            >
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
            </AccordionSection>
          </div>
        )}
      </div>
    </div>
  );
}
