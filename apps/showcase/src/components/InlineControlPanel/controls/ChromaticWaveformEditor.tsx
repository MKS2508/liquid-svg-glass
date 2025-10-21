import React, { useRef, useEffect, useState } from 'react';
import styles from './ChromaticControls.module.scss';

interface ChromaticWaveformEditorProps {
  r: number;
  g: number;
  b: number;
  onChange: (channel: 'r' | 'g' | 'b', value: number) => void;
  compact?: boolean;
}

export function ChromaticWaveformEditor({ r, g, b, onChange, compact = false }: ChromaticWaveformEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedChannel, setSelectedChannel] = useState<'r' | 'g' | 'b'>('r');
  const [dragging, setDragging] = useState(false);

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    const padding = 40;

    ctx.clearRect(0, 0, width, height);

    // Draw axes and grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = -50; i <= 50; i += 10) {
      const y = centerY - (i / 50) * (height / 2 - 20);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();

      // Y-axis labels
      if (i !== 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '9px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(i.toString(), padding - 5, y + 3);
      }
    }

    // Center axis (thicker)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, centerY);
    ctx.lineTo(width - 20, centerY);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, 20);
    ctx.lineTo(padding, height - 20);
    ctx.stroke();

    // Draw waveforms for each channel
    const channels = [
      { key: 'r' as const, value: r, color: '#ef4444', label: 'R' },
      { key: 'g' as const, value: g, color: '#10b981', label: 'G' },
      { key: 'b' as const, value: b, color: '#3b82f6', label: 'B' }
    ];

    channels.forEach(({ key, value, color, label }) => {
      const isSelected = key === selectedChannel;
      const y = centerY - (value / 50) * (height / 2 - 20);

      // Draw horizontal line at value
      ctx.strokeStyle = isSelected ? color : color + '80';
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.setLineDash(isSelected ? [] : [5, 5]);

      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();

      ctx.setLineDash([]);

      // Draw value point
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(padding + (width - padding - 20) / 2, y, isSelected ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw label and value
      ctx.fillStyle = isSelected ? color : color + 'cc';
      ctx.font = isSelected ? 'bold 11px monospace' : '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`${label}: ${value}`, width - 50, 25 + channels.findIndex(ch => ch.key === key) * 15);
    });

    // Draw axis labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Channel Offset', width / 2, height - 5);
  };

  useEffect(() => {
    drawWaveform();
  }, [r, g, b, selectedChannel]);

  const getValueFromY = (y: number): number => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const centerY = canvas.height / 2;
    const normalizedY = (centerY - y) / (canvas.height / 2 - 20);
    return Math.round(normalizedY * 50);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const value = getValueFromY(y);

    setDragging(true);
    onChange(selectedChannel, Math.max(-50, Math.min(50, value)));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const value = getValueFromY(y);

    onChange(selectedChannel, Math.max(-50, Math.min(50, value)));
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleChannelSelect = (channel: 'r' | 'g' | 'b') => {
    setSelectedChannel(channel);
  };

  const handleInputChange = (channel: 'r' | 'g' | 'b', value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      onChange(channel, Math.max(-50, Math.min(50, numValue)));
    }
  };

  return (
    <div className={styles.waveformEditor}>
      {!compact && (
        <div className={styles.channelSelector}>
          <button
            className={selectedChannel === 'r' ? styles.active : ''}
            onClick={() => handleChannelSelect('r')}
            style={{ borderColor: '#ef4444', color: selectedChannel === 'r' ? '#ef4444' : '#cbd5e1' }}
          >
            Red Channel
          </button>
          <button
            className={selectedChannel === 'g' ? styles.active : ''}
            onClick={() => handleChannelSelect('g')}
            style={{ borderColor: '#10b981', color: selectedChannel === 'g' ? '#10b981' : '#cbd5e1' }}
          >
            Green Channel
          </button>
          <button
            className={selectedChannel === 'b' ? styles.active : ''}
            onClick={() => handleChannelSelect('b')}
            style={{ borderColor: '#3b82f6', color: selectedChannel === 'b' ? '#3b82f6' : '#cbd5e1' }}
          >
            Blue Channel
          </button>
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={300}
        height={compact ? 120 : 180}
        className={styles.waveformCanvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {!compact && (
        <div className={styles.fineControls}>
          <div className={styles.fineControl}>
            <label style={{ color: '#ef4444' }}>R</label>
            <input
              type="number"
              min="-50"
              max="50"
              value={r}
              onChange={(e) => handleInputChange('r', e.target.value)}
              style={{ borderColor: selectedChannel === 'r' ? '#ef4444' : 'rgba(179, 146, 240, 0.2)' }}
            />
          </div>
          <div className={styles.fineControl}>
            <label style={{ color: '#10b981' }}>G</label>
            <input
              type="number"
              min="-50"
              max="50"
              value={g}
              onChange={(e) => handleInputChange('g', e.target.value)}
              style={{ borderColor: selectedChannel === 'g' ? '#10b981' : 'rgba(179, 146, 240, 0.2)' }}
            />
          </div>
          <div className={styles.fineControl}>
            <label style={{ color: '#3b82f6' }}>B</label>
            <input
              type="number"
              min="-50"
              max="50"
              value={b}
              onChange={(e) => handleInputChange('b', e.target.value)}
              style={{ borderColor: selectedChannel === 'b' ? '#3b82f6' : 'rgba(179, 146, 240, 0.2)' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
