import React, { useState } from 'react';
import { VisualDisplacementControl } from './VisualDisplacementControl';
import { ChromaticVisualizer } from './ChromaticVisualizer';
import styles from './ChromaticControls.module.scss';

type VariantType = 'displacement' | 'visualizer';
type ChannelSelector = 'R' | 'G' | 'B';

interface UnifiedChromaticControlProps {
  r: number;
  g: number;
  b: number;
  x: ChannelSelector;
  y: ChannelSelector;
  onChange: (updates: { r?: number; g?: number; b?: number; x?: ChannelSelector; y?: ChannelSelector }) => void;
}

export function UnifiedChromaticControl({ r, g, b, x, y, onChange }: UnifiedChromaticControlProps) {
  const [activeVariant, setActiveVariant] = useState<VariantType>('displacement');

  const handleChannelChange = (channel: 'r' | 'g' | 'b', value: number) => {
    onChange({ [channel]: value });
  };

  return (
    <div>
      {/* Variant Selector */}
      <div className={styles.variantSelector}>
        <button
          className={activeVariant === 'displacement' ? styles.active : ''}
          onClick={() => setActiveVariant('displacement')}
        >
          Displacement + Waveform
        </button>
        <button
          className={activeVariant === 'visualizer' ? styles.active : ''}
          onClick={() => setActiveVariant('visualizer')}
        >
          Live Visualizer
        </button>
      </div>

      {/* Active Variant Display */}
      {activeVariant === 'displacement' && (
        <VisualDisplacementControl r={r} g={g} b={b} onChange={handleChannelChange} />
      )}

      {activeVariant === 'visualizer' && (
        <ChromaticVisualizer r={r} g={g} b={b} onChange={handleChannelChange} />
      )}

      {/* Displacement Channels */}
      <div className={styles.displacementChannelSection}>
        <h5>Displacement Channels</h5>

        <div className={styles.channelControl}>
          <label>X Channel (Horizontal)</label>
          <div className={styles.channelSelector}>
            {(['R', 'G', 'B'] as ChannelSelector[]).map((channel) => (
              <button
                key={`x-${channel}`}
                className={x === channel ? styles.active : ''}
                onClick={() => onChange({ x: channel })}
              >
                {channel}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.channelControl}>
          <label>Y Channel (Vertical)</label>
          <div className={styles.channelSelector}>
            {(['R', 'G', 'B'] as ChannelSelector[]).map((channel) => (
              <button
                key={`y-${channel}`}
                className={y === channel ? styles.active : ''}
                onClick={() => onChange({ y: channel })}
              >
                {channel}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
