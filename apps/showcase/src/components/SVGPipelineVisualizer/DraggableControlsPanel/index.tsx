import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GripVertical, Minimize2, Maximize2, Palette, Settings, Cpu, Eye, Code, Copy, Download, CheckCircle } from 'lucide-react';
import { DraggableItem, glassPresets } from '@liquid-svg-glass/react';
import DynamicBackgroundGlassShowcase from '../../DynamicBackgroundGlassShowcase';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { GeometryConfig, VisualConfig } from '@liquid-svg-glass/core';
import styles from './styles.module.scss';

interface DraggableControlsPanelProps {
  selectedPreset: keyof typeof glassPresets;
  customConfig: typeof glassPresets[keyof typeof glassPresets];
  pipelineData: {
    metrics: {
      processingTime: string;
      svgSize: number;
    };
    svgContent: string;
    dataUri: string;
  };
  performanceWarnings: Array<{
    type: string;
    message: string;
    severity: 'warning' | 'error';
  }>;
  onPresetChange: (preset: keyof typeof glassPresets) => void;
  onParameterChange: (key: string, value: number | string) => void;
  onExportSVG: () => void;
  onCopySVG: () => void;
  copiedSvg: boolean;
  backgroundType: BackgroundType;
  previewMode: PreviewMode;
  onBackgroundTypeChange: (type: BackgroundType) => void;
  onPreviewModeChange: (mode: PreviewMode) => void;
}

type TabType = 'presets' | 'parameters' | 'preview' | 'performance';
type PreviewMode = 'code' | 'live';
type BackgroundType = 'dark' | 'code' | 'minimal';

const STORAGE_KEY = 'svgPipelineControlsPosition';
const DEFAULT_POSITION = { x: window.innerWidth - 420, y: window.innerHeight - 500 };

const DraggableControlsPanel: React.FC<DraggableControlsPanelProps> = ({
  selectedPreset,
  customConfig,
  pipelineData,
  performanceWarnings,
  onPresetChange,
  onParameterChange,
  onExportSVG,
  onCopySVG,
  copiedSvg,
  backgroundType,
  previewMode,
  onBackgroundTypeChange,
  onPreviewModeChange,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('presets');
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_POSITION;
      }
    }
    return DEFAULT_POSITION;
  });

  const handleDragEnd = useCallback((x: number, y: number) => {
    const newPosition = { x, y };
    setPosition(newPosition);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosition));
  }, []);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);

  return (
    <DraggableItem
      draggable={true}
      bounds="body"
      type="x,y"
      initialPosition={position}
      onDragEnd={handleDragEnd}
      className={styles.draggableWrapper}
    >
      <div className={`${styles.controlsPanel} ${isMinimized ? styles.minimized : ''}`}>
        {/* Header/Handle */}
        <div className={styles.panelHeader}>
          <div className={styles.dragHandle}>
            <GripVertical size={16} />
          </div>
          <h3>Controls</h3>
          <div className={styles.headerActions}>
            <button onClick={toggleMinimize} className={styles.headerBtn}>
              {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.panelContent}
            >
              {/* Tab Navigation */}
              <div className={styles.tabNav}>
                <button
                  onClick={() => setActiveTab('presets')}
                  className={`${styles.tabBtn} ${activeTab === 'presets' ? styles.active : ''}`}
                >
                  <Palette size={14} />
                  Presets
                </button>
                <button
                  onClick={() => setActiveTab('parameters')}
                  className={`${styles.tabBtn} ${activeTab === 'parameters' ? styles.active : ''}`}
                >
                  <Settings size={14} />
                  Parameters
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`${styles.tabBtn} ${activeTab === 'preview' ? styles.active : ''}`}
                >
                  <Eye size={14} />
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab('performance')}
                  className={`${styles.tabBtn} ${activeTab === 'performance' ? styles.active : ''}`}
                >
                  <Cpu size={14} />
                  Performance
                </button>
              </div>

              {/* Tab Content */}
              <div className={styles.tabContent}>
                {/* Presets Tab */}
                {activeTab === 'presets' && (
                  <div className={styles.tabPanel}>
                    <div className={styles.presetGrid}>
                      {Object.keys(glassPresets).map((preset) => (
                        <button
                          key={preset}
                          onClick={() => onPresetChange(preset as keyof typeof glassPresets)}
                          className={`${styles.presetButton} ${selectedPreset === preset ? styles.active : ''}`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Parameters Tab */}
                {activeTab === 'parameters' && (
                  <div className={styles.tabPanel}>
                    <div className={styles.parameterSection}>
                      <h4>Geometry</h4>
                      <div className={styles.sliderControl}>
                        <label>Width: {customConfig.width}px</label>
                        <input
                          type="range"
                          min="100"
                          max="500"
                          value={customConfig.width}
                          onChange={(e) => onParameterChange('width', parseInt(e.target.value))}
                        />
                      </div>
                      <div className={styles.sliderControl}>
                        <label>Height: {customConfig.height}px</label>
                        <input
                          type="range"
                          min="50"
                          max="300"
                          value={customConfig.height}
                          onChange={(e) => onParameterChange('height', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    
                    <div className={styles.parameterSection}>
                      <h4>Chromatic Aberration</h4>
                      <div className={styles.sliderControl}>
                        <label className={styles.redLabel}>R: +{customConfig.r}</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={customConfig.r}
                          onChange={(e) => onParameterChange('r', parseInt(e.target.value))}
                          className={styles.redSlider}
                        />
                      </div>
                      <div className={styles.sliderControl}>
                        <label className={styles.greenLabel}>G: +{customConfig.g}</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={customConfig.g}
                          onChange={(e) => onParameterChange('g', parseInt(e.target.value))}
                          className={styles.greenSlider}
                        />
                      </div>
                      <div className={styles.sliderControl}>
                        <label className={styles.blueLabel}>B: +{customConfig.b}</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={customConfig.b}
                          onChange={(e) => onParameterChange('b', parseInt(e.target.value))}
                          className={styles.blueSlider}
                        />
                      </div>
                    </div>

                    <div className={styles.parameterSection}>
                      <h4>Effects</h4>
                      <div className={styles.sliderControl}>
                        <label>Scale: {customConfig.scale}</label>
                        <input
                          type="range"
                          min="-300"
                          max="300"
                          value={customConfig.scale}
                          onChange={(e) => onParameterChange('scale', parseInt(e.target.value))}
                        />
                      </div>
                      <div className={styles.sliderControl}>
                        <label>Blur: {customConfig.blur}</label>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={customConfig.blur}
                          onChange={(e) => onParameterChange('blur', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Preview Controls Tab */}
                {activeTab === 'preview' && (
                  <div className={styles.tabPanel}>
                    {/* Preview Mode Toggle */}
                    <div className={styles.previewToggle}>
                      <button
                        onClick={() => onPreviewModeChange('live')}
                        className={`${styles.toggleBtn} ${previewMode === 'live' ? styles.active : ''}`}
                      >
                        <Eye size={14} />
                        Live Preview
                      </button>
                      <button
                        onClick={() => onPreviewModeChange('code')}
                        className={`${styles.toggleBtn} ${previewMode === 'code' ? styles.active : ''}`}
                      >
                        <Code size={14} />
                        SVG Code
                      </button>
                    </div>

                    {/* Background Type Selector */}
                    <div className={styles.backgroundSelector}>
                      <h4>Background Theme</h4>
                      <div className={styles.backgroundOptions}>
                        <button
                          onClick={() => onBackgroundTypeChange('dark')}
                          className={`${styles.bgOption} ${backgroundType === 'dark' ? styles.active : ''}`}
                        >
                          Dark
                        </button>
                        <button
                          onClick={() => onBackgroundTypeChange('code')}
                          className={`${styles.bgOption} ${backgroundType === 'code' ? styles.active : ''}`}
                        >
                          Code
                        </button>
                        <button
                          onClick={() => onBackgroundTypeChange('minimal')}
                          className={`${styles.bgOption} ${backgroundType === 'minimal' ? styles.active : ''}`}
                        >
                          Minimal
                        </button>
                      </div>
                    </div>


                    {/* Quick Actions */}
                    <div className={styles.quickActions}>
                      <button onClick={onCopySVG} className={styles.actionBtn}>
                        {copiedSvg ? <CheckCircle size={14} /> : <Copy size={14} />}
                        {copiedSvg ? 'Copied!' : 'Copy SVG'}
                      </button>
                      <button onClick={onExportSVG} className={styles.actionBtn}>
                        <Download size={14} />
                        Export SVG
                      </button>
                    </div>
                  </div>
                )}

                {/* Performance Tab */}
                {activeTab === 'performance' && (
                  <div className={styles.tabPanel}>
                    <div className={styles.metricsGrid}>
                      <div className={styles.metricItem}>
                        <span className={styles.metricLabel}>Processing</span>
                        <span className={styles.metricValue}>{pipelineData.metrics.processingTime}ms</span>
                      </div>
                      <div className={styles.metricItem}>
                        <span className={styles.metricLabel}>SVG Size</span>
                        <span className={styles.metricValue}>
                          {(pipelineData.metrics.svgSize / 1024).toFixed(1)}KB
                        </span>
                      </div>
                    </div>
                    
                    {performanceWarnings.length > 0 && (
                      <div className={styles.warningsSection}>
                        <h4>Warnings</h4>
                        {performanceWarnings.map((warning, index) => (
                          <div
                            key={index}
                            className={`${styles.warningItem} ${
                              warning.severity === 'error' ? styles.error : styles.warning
                            }`}
                          >
                            {warning.message}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DraggableItem>
  );
};

export default DraggableControlsPanel;