import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GlassEffect } from '@liquid-svg-glass/react';
import { GlassEffectControlPanel } from '../../components/GlassEffectControlPanel';
import type { GlassEffectConfig } from '../../components/GlassEffectControlPanel/types';
import { SharedBackground } from '../../components/SharedBackground';
import DynamicBackgroundGlassShowcase from '../../components/DynamicBackgroundGlassShowcase';
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
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [backgroundType, setBackgroundType] = useState('cyberpunk');

  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);

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

        <div className="split-container">
          {/* LEFT COLUMN */}
          <div className="column left-column">
            <div className="column-header">
              <h2>Config A - Phase 1 ENABLED (Backdrop Blur: 10px)</h2>
              <button
                ref={leftButtonRef}
                onClick={() => setLeftPanelOpen(!leftPanelOpen)}
                className="control-button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                Controls
              </button>
            </div>

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

            <GlassEffectControlPanel
              isOpen={leftPanelOpen}
              config={leftConfig}
              debug={leftDebug}
              buttonRef={leftButtonRef}
              onChange={handleLeftConfigChange}
              onReset={handleLeftReset}
              onDebugToggle={() => setLeftDebug(!leftDebug)}
              onClose={() => setLeftPanelOpen(false)}
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="column right-column">
            <div className="column-header">
              <h2>Config B - Phase 1 DISABLED (Backdrop Blur: 0px)</h2>
              <button
                ref={rightButtonRef}
                onClick={() => setRightPanelOpen(!rightPanelOpen)}
                className="control-button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                Controls
              </button>
            </div>

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

            <GlassEffectControlPanel
              isOpen={rightPanelOpen}
              config={rightConfig}
              debug={rightDebug}
              buttonRef={rightButtonRef}
              onChange={handleRightConfigChange}
              onReset={handleRightReset}
              onDebugToggle={() => setRightDebug(!rightDebug)}
              onClose={() => setRightPanelOpen(false)}
            />
          </div>
        </div>
      </div>
    </SharedBackground>
  );
}

export default DebugPage;
