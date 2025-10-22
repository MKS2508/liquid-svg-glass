import type { GlassPreset } from '@liquid-svg-glass/core';
import type { GlassEffectConfig } from './types';
import styles from './styles.module.scss';

interface PresetShapeControlProps {
  config: GlassEffectConfig;
  onChange: (updates: Partial<GlassEffectConfig>) => void;
}

const presets: Array<{ value: GlassPreset; label: string; icon: string }> = [
  { value: 'dock', label: 'Dock', icon: '▭' },
  { value: 'pill', label: 'Pill', icon: '⬭' },
  { value: 'bubble', label: 'Bubble', icon: '●' },
  { value: 'free', label: 'Free', icon: '◇' },
];

export function PresetShapeControl({ config, onChange }: PresetShapeControlProps) {
  return (
    <div className={styles.presetShapeControl}>
      {/* Preset Grid */}
      <div className={styles.presetGrid}>
        <label className={styles.label}>Preset</label>
        <div className={styles.grid}>
          {presets.map(({ value, label, icon }) => (
            <button
              key={value}
              className={`${styles.presetButton} ${config.preset === value ? styles.active : ''}`}
              onClick={() => onChange({ preset: value })}
            >
              <span className={styles.icon}>{icon}</span>
              <span className={styles.label}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Shape Controls */}
      <div className={styles.shapeControls}>
        {/* Dual Slider: Width & Height */}
        <div className={styles.control}>
          <label className={styles.label}>
            Width: <span className={styles.value}>{config.width}px</span>
          </label>
          <input
            type="range"
            min="50"
            max="800"
            step="1"
            value={config.width}
            onChange={(e) => onChange({ width: Number(e.target.value) })}
            className={styles.slider}
          />
        </div>

        <div className={styles.control}>
          <label className={styles.label}>
            Height: <span className={styles.value}>{config.height}px</span>
          </label>
          <input
            type="range"
            min="50"
            max="800"
            step="1"
            value={config.height}
            onChange={(e) => onChange({ height: Number(e.target.value) })}
            className={styles.slider}
          />
        </div>

        {/* Compact Sliders: Radius & Border */}
        <div className={styles.compactRow}>
          <div className={styles.control}>
            <label className={styles.label}>
              Radius: <span className={styles.value}>{config.radius}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={config.radius}
              onChange={(e) => onChange({ radius: Number(e.target.value) })}
              className={styles.slider}
            />
          </div>

          <div className={styles.control}>
            <label className={styles.label}>
              Border: <span className={styles.value}>{config.border.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={config.border}
              onChange={(e) => onChange({ border: Number(e.target.value) })}
              className={styles.slider}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
