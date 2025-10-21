import React, { useRef, useEffect } from 'react';
import styles from './ChromaticControls.module.scss';

interface ChromaticVisualizerProps {
  r: number;
  g: number;
  b: number;
  onChange: (channel: 'r' | 'g' | 'b', value: number) => void;
}

export function ChromaticVisualizer({ r, g, b, onChange }: ChromaticVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(102, 126, 234, 0.1)');
    gradient.addColorStop(1, 'rgba(118, 75, 162, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw chromatic aberration effect
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 40;

    // Draw text with chromatic aberration effect
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Red channel
    ctx.fillStyle = `rgba(239, 68, 68, 0.7)`;
    ctx.fillText('ABC', centerX + r, centerY);

    // Green channel
    ctx.fillStyle = `rgba(16, 185, 129, 0.7)`;
    ctx.fillText('ABC', centerX + g, centerY);

    // Blue channel
    ctx.fillStyle = `rgba(59, 130, 246, 0.7)`;
    ctx.fillText('ABC', centerX + b, centerY);

    // Draw offset indicators
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(centerX + r, height - 20);
    ctx.lineTo(centerX + r, height - 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + g, height - 20);
    ctx.lineTo(centerX + g, height - 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + b, height - 20);
    ctx.lineTo(centerX + b, height - 10);
    ctx.stroke();
  };

  useEffect(() => {
    drawVisualization();
  }, [r, g, b]);

  const handleIncrement = (channel: 'r' | 'g' | 'b') => {
    const currentValue = channel === 'r' ? r : channel === 'g' ? g : b;
    onChange(channel, Math.min(50, currentValue + 1));
  };

  const handleDecrement = (channel: 'r' | 'g' | 'b') => {
    const currentValue = channel === 'r' ? r : channel === 'g' ? g : b;
    onChange(channel, Math.max(-50, currentValue - 1));
  };

  return (
    <div className={styles.chromaticVisualizer}>
      <canvas
        ref={canvasRef}
        width={300}
        height={180}
        className={styles.visualizerCanvas}
      />

      <div className={styles.visualizerControls}>
        <button
          className={styles.controlButton}
          onMouseDown={() => handleDecrement('r')}
        >
          <div className={styles.arrows}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </div>
          <div className={`${styles.value} ${styles.red}`}>{r}</div>
          <span>Red</span>
        </button>

        <button
          className={styles.controlButton}
          onMouseDown={() => handleDecrement('g')}
        >
          <div className={styles.arrows}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </div>
          <div className={`${styles.value} ${styles.green}`}>{g}</div>
          <span>Green</span>
        </button>

        <button
          className={styles.controlButton}
          onMouseDown={() => handleDecrement('b')}
        >
          <div className={styles.arrows}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </div>
          <div className={`${styles.value} ${styles.blue}`}>{b}</div>
          <span>Blue</span>
        </button>

        <button
          className={styles.controlButton}
          onMouseDown={() => handleIncrement('r')}
        >
          <div className={styles.arrows}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        <button
          className={styles.controlButton}
          onMouseDown={() => handleIncrement('g')}
        >
          <div className={styles.arrows}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        <button
          className={styles.controlButton}
          onMouseDown={() => handleIncrement('b')}
        >
          <div className={styles.arrows}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
