import React, { useRef, useEffect } from 'react';
import { ChromaticWaveformEditor } from './ChromaticWaveformEditor';
import styles from './ChromaticControls.module.scss';

interface VisualDisplacementControlProps {
  r: number;
  g: number;
  b: number;
  onChange: (channel: 'r' | 'g' | 'b', value: number) => void;
}

export function VisualDisplacementControl({ r, g, b, onChange }: VisualDisplacementControlProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawDisplacementPreview = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(102, 126, 234, 0.15)');
    gradient.addColorStop(0.5, 'rgba(118, 75, 162, 0.15)');
    gradient.addColorStop(1, 'rgba(102, 126, 234, 0.15)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw displacement map visualization
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw RGB channels as displaced text with chromatic aberration
    const text = 'DISPLACEMENT';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Red channel
    ctx.fillStyle = `rgba(239, 68, 68, 0.6)`;
    ctx.fillText(text, centerX + r * 0.5, centerY);

    // Green channel
    ctx.fillStyle = `rgba(16, 185, 129, 0.6)`;
    ctx.fillText(text, centerX + g * 0.5, centerY);

    // Blue channel
    ctx.fillStyle = `rgba(59, 130, 246, 0.6)`;
    ctx.fillText(text, centerX + b * 0.5, centerY);

    // Draw displacement indicators
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;

    // Red indicator
    ctx.beginPath();
    ctx.moveTo(centerX + r * 0.5, height - 15);
    ctx.lineTo(centerX + r * 0.5, height - 5);
    ctx.stroke();

    // Green indicator
    ctx.beginPath();
    ctx.moveTo(centerX + g * 0.5, height - 15);
    ctx.lineTo(centerX + g * 0.5, height - 5);
    ctx.stroke();

    // Blue indicator
    ctx.beginPath();
    ctx.moveTo(centerX + b * 0.5, height - 15);
    ctx.lineTo(centerX + b * 0.5, height - 5);
    ctx.stroke();

    // Draw center reference
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw labels
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'left';

    ctx.fillStyle = '#ef4444';
    ctx.fillText(`R: ${r}`, 10, 15);

    ctx.fillStyle = '#10b981';
    ctx.fillText(`G: ${g}`, 10, 30);

    ctx.fillStyle = '#3b82f6';
    ctx.fillText(`B: ${b}`, 10, 45);
  };

  useEffect(() => {
    drawDisplacementPreview();
  }, [r, g, b]);

  return (
    <div className={styles.visualDisplacement}>
      <canvas
        ref={canvasRef}
        width={300}
        height={140}
        className={styles.displacementPreview}
      />

      <div className={styles.displacementControls}>
        <ChromaticWaveformEditor
          r={r}
          g={g}
          b={b}
          onChange={onChange}
          compact={true}
        />
      </div>
    </div>
  );
}
