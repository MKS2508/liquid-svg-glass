import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassEffect } from '@liquid-svg-glass/react';
import { InlineControlPanel } from '../../components/InlineControlPanel';
import type { GlassEffectConfig } from '../../components/InlineControlPanel/types';
import { SharedBackground } from '../../components/SharedBackground';
import DynamicBackgroundGlassShowcase from '../../components/DynamicBackgroundGlassShowcase';
import { WavyBackground } from '../../components/ui/wavy-background';
import { BackgroundSelector } from './BackgroundSelector';
import './styles.css';

const DEFAULT_LEFT: GlassEffectConfig = {
  preset: 'dock',
  width: 336,
  height: 96,
  radius: 16,
  border: 0.07,
  frost: 0.05,
  blur: 11,
  blurBackground: 10,  // Phase 1: High backdrop blur
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
  // Phase 1 Features - ALL ENABLED
  enableBackdropExtension: true,
  enablePerformanceOpts: true,
  enableFlickeringFix: true,
};

const DEFAULT_RIGHT: GlassEffectConfig = {
  preset: 'dock',  // Same preset as Config A
  width: 336,      // Same dimensions
  height: 96,
  radius: 16,
  border: 0.07,    // Same border
  frost: 0.05,     // Same frost
  blur: 11,        // Same SVG blur
  blurBackground: 0,  // Phase 1 DISABLED: NO backdrop blur
  displace: 0.2,   // Same displace
  scale: -180,     // Same scale
  alpha: 0.93,     // Same alpha
  lightness: 50,   // Same lightness
  r: 0,            // Same chromatic
  g: 10,
  b: 20,
  x: 'R',          // Same channel selectors
  y: 'B',
  blend: 'difference',  // Same blend mode
  // Phase 1 Features - ALL DISABLED
  enableBackdropExtension: false,
  enablePerformanceOpts: false,
  enableFlickeringFix: false,
};

export function DebugPage() {
  const [leftConfig, setLeftConfig] = useState<GlassEffectConfig>(DEFAULT_LEFT);
  const [rightConfig, setRightConfig] = useState<GlassEffectConfig>(DEFAULT_RIGHT);
  const [leftDebug, setLeftDebug] = useState(false);
  const [rightDebug, setRightDebug] = useState(false);
  const [backgroundType, setBackgroundType] = useState('cyberpunk');

  const handleLeftConfigChange = (updates: Partial<GlassEffectConfig>) => {
    setLeftConfig((prev) => ({ ...prev, ...updates }));
  };

  const handleRightConfigChange = (updates: Partial<GlassEffectConfig>) => {
    setRightConfig((prev) => ({ ...prev, ...updates }));
  };

  const handleLeftReset = () => {
    setLeftConfig(DEFAULT_LEFT);
    setLeftDebug(false);
  };

  const handleRightReset = () => {
    setRightConfig(DEFAULT_RIGHT);
    setRightDebug(false);
  };

  return (
    <SharedBackground>
      <div className="debug-page">
        <nav className="debug-nav">
          <Link to="/" className="back-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Landing
          </Link>
          <h1 className="debug-title">Debug Mode - Side-by-Side Comparison</h1>
        </nav>

        <BackgroundSelector
          selected={backgroundType}
          onChange={setBackgroundType}
        />

        <div className="four-column-grid">
          {/* COLUMN 1: Controls Left */}
          <div className="controls-column">
            <InlineControlPanel
              config={leftConfig}
              debug={leftDebug}
              onChange={handleLeftConfigChange}
              onReset={handleLeftReset}
              onDebugToggle={() => setLeftDebug(!leftDebug)}
            />
          </div>

          {/* COLUMN 2: Glass Left */}
          <div className="glass-column left-glass">
            <div className="column-header">
              <h2>Config A - Phase 1 ENABLED (Backdrop Blur: 10px)</h2>
            </div>

            {backgroundType === 'wavy' ? (
              <WavyBackground
                colors={['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee']}
                waveWidth={50}
                backgroundFill="rgba(15, 23, 42, 0.95)"
                blur={10}
                speed="fast"
                waveOpacity={0.5}
                className="glass-wavy-container"
                containerClassName="glass-wavy-wrapper"
              >
                <GlassEffect
                  draggable
                  preset={leftConfig.preset}
                  width={leftConfig.width}
                  height={leftConfig.height}
                  radius={leftConfig.radius}
                  border={leftConfig.border}
                  frost={leftConfig.frost}
                  blur={leftConfig.blur}
                  blurBackground={leftConfig.blurBackground}
                  displace={leftConfig.displace}
                  scale={leftConfig.scale}
                  alpha={leftConfig.alpha}
                  lightness={leftConfig.lightness}
                  r={leftConfig.r}
                  g={leftConfig.g}
                  b={leftConfig.b}
                  x={leftConfig.x}
                  y={leftConfig.y}
                  blend={leftConfig.blend}
                  debug={leftDebug}
                  enableBackdropExtension={leftConfig.enableBackdropExtension}
                  enablePerformanceOpts={leftConfig.enablePerformanceOpts}
                  enableFlickeringFix={leftConfig.enableFlickeringFix}
                />
              </WavyBackground>
            ) : (
              <div className="glass-wrapper">
                <DynamicBackgroundGlassShowcase
                  backgroundType={backgroundType}
                  showDecorations={true}
                >
                  <GlassEffect
                    draggable
                    preset={leftConfig.preset}
                    width={leftConfig.width}
                    height={leftConfig.height}
                    radius={leftConfig.radius}
                    border={leftConfig.border}
                    frost={leftConfig.frost}
                    blur={leftConfig.blur}
                    blurBackground={leftConfig.blurBackground}
                    displace={leftConfig.displace}
                    scale={leftConfig.scale}
                    alpha={leftConfig.alpha}
                    lightness={leftConfig.lightness}
                    r={leftConfig.r}
                    g={leftConfig.g}
                    b={leftConfig.b}
                    x={leftConfig.x}
                    y={leftConfig.y}
                    blend={leftConfig.blend}
                    debug={leftDebug}
                    enableBackdropExtension={leftConfig.enableBackdropExtension}
                    enablePerformanceOpts={leftConfig.enablePerformanceOpts}
                    enableFlickeringFix={leftConfig.enableFlickeringFix}
                  />
                </DynamicBackgroundGlassShowcase>
              </div>
            )}
          </div>

          {/* COLUMN 3: Glass Right */}
          <div className="glass-column right-glass">
            <div className="column-header">
              <h2>Config B - Phase 1 DISABLED (Backdrop Blur: 0px)</h2>
            </div>

            {backgroundType === 'wavy' ? (
              <WavyBackground
                colors={['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee']}
                waveWidth={50}
                backgroundFill="rgba(15, 23, 42, 0.95)"
                blur={10}
                speed="fast"
                waveOpacity={0.5}
                className="glass-wavy-container"
                containerClassName="glass-wavy-wrapper"
              >
                <GlassEffect
                  draggable
                  preset={rightConfig.preset}
                  width={rightConfig.width}
                  height={rightConfig.height}
                  radius={rightConfig.radius}
                  border={rightConfig.border}
                  frost={rightConfig.frost}
                  blur={rightConfig.blur}
                  blurBackground={rightConfig.blurBackground}
                  displace={rightConfig.displace}
                  scale={rightConfig.scale}
                  alpha={rightConfig.alpha}
                  lightness={rightConfig.lightness}
                  r={rightConfig.r}
                  g={rightConfig.g}
                  b={rightConfig.b}
                  x={rightConfig.x}
                  y={rightConfig.y}
                  blend={rightConfig.blend}
                  debug={rightDebug}
                  enableBackdropExtension={rightConfig.enableBackdropExtension}
                  enablePerformanceOpts={rightConfig.enablePerformanceOpts}
                  enableFlickeringFix={rightConfig.enableFlickeringFix}
                />
              </WavyBackground>
            ) : (
              <div className="glass-wrapper">
                <DynamicBackgroundGlassShowcase
                  backgroundType={backgroundType}
                  showDecorations={true}
                >
                  <GlassEffect
                    draggable
                    preset={rightConfig.preset}
                    width={rightConfig.width}
                    height={rightConfig.height}
                    radius={rightConfig.radius}
                    border={rightConfig.border}
                    frost={rightConfig.frost}
                    blur={rightConfig.blur}
                    blurBackground={rightConfig.blurBackground}
                    displace={rightConfig.displace}
                    scale={rightConfig.scale}
                    alpha={rightConfig.alpha}
                    lightness={rightConfig.lightness}
                    r={rightConfig.r}
                    g={rightConfig.g}
                    b={rightConfig.b}
                    x={rightConfig.x}
                    y={rightConfig.y}
                    blend={rightConfig.blend}
                    debug={rightDebug}
                    enableBackdropExtension={rightConfig.enableBackdropExtension}
                    enablePerformanceOpts={rightConfig.enablePerformanceOpts}
                    enableFlickeringFix={rightConfig.enableFlickeringFix}
                  />
                </DynamicBackgroundGlassShowcase>
              </div>
            )}
          </div>

          {/* COLUMN 4: Controls Right */}
          <div className="controls-column">
            <InlineControlPanel
              config={rightConfig}
              debug={rightDebug}
              onChange={handleRightConfigChange}
              onReset={handleRightReset}
              onDebugToggle={() => setRightDebug(!rightDebug)}
            />
          </div>
        </div>
      </div>
    </SharedBackground>
  );
}

export default DebugPage;
