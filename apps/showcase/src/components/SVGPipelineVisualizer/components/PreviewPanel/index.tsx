import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Code, Copy, Download, CheckCircle, FileImage, Zap, Monitor, Smartphone } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { usePipelineContext } from '../../context/PipelineContext';
import { useKeyboardNavigation } from '../../hooks';
import DynamicBackgroundGlassShowcase from '../../../DynamicBackgroundGlassShowcase';
import styles from './styles.module.scss';

export const PreviewPanel: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'live' | 'code' | 'displacement'>('live');
  
  const {
    state,
    pipelineData,
    exportSVG,
    copySVG,
    responsive,
    dispatch,
  } = usePipelineContext();

  const { 
    customConfig, 
    selectedPreset, 
    backgroundType, 
    copiedSvg 
  } = state;
  
  const { shouldUseMobileLayout } = responsive;

  // Keyboard navigation
  useKeyboardNavigation(previewRef, {
    enableArrowKeys: true,
    enableEnter: true,
    enableTab: true,
  });

  const handleBackgroundTypeChange = (type: 'dark' | 'code' | 'minimal') => {
    dispatch({ type: 'SET_BACKGROUND_TYPE', payload: type });
  };

  const tabs = [
    { id: 'live', label: 'Live Preview', icon: Eye },
    { id: 'code', label: 'SVG Code', icon: Code },
    { id: 'displacement', label: 'Displacement Map', icon: FileImage },
  ] as const;

  return (
    <div 
      ref={previewRef}
      className={`${styles.previewPanel} ${shouldUseMobileLayout ? styles.mobile : ''}`}
      role="region"
      aria-label="Preview panel"
    >
      {/* Header */}
      <div className={styles.previewHeader}>
        <div className={styles.headerContent}>
          <h3 className={styles.headerTitle}>Preview & Export</h3>
          
          {/* Tab Navigation */}
          <div className={styles.tabNavigation} role="tablist">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`${styles.tabButton} ${activeTab === id ? styles.active : ''}`}
                onClick={() => setActiveTab(id)}
                role="tab"
                aria-selected={activeTab === id}
                aria-controls={`panel-${id}`}
                tabIndex={activeTab === id ? 0 : -1}
              >
                <Icon size={16} />
                <span className={styles.hiddenSm}>{label}</span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className={styles.headerActions}>
            <button
              onClick={copySVG}
              className={`${styles.actionButton} ${copiedSvg ? styles.success : ''}`}
              disabled={copiedSvg}
              aria-label="Copy SVG to clipboard"
            >
              {copiedSvg ? <CheckCircle size={16} /> : <Copy size={16} />}
              <span className={styles.hiddenSm}>
                {copiedSvg ? 'Copied!' : 'Copy'}
              </span>
            </button>
            
            <button
              onClick={exportSVG}
              className={`${styles.actionButton} ${styles.primary}`}
              aria-label="Export SVG file"
            >
              <Download size={16} />
              <span className={styles.hiddenSm}>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.previewContent}>
        <AnimatePresence mode="wait">
          {activeTab === 'live' && (
            <motion.div
              key="live"
              id="panel-live"
              role="tabpanel"
              aria-labelledby="tab-live"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.livePreview}
            >
              {/* Background Type Selector */}
              <div className={styles.backgroundSelector}>
                <label className={styles.selectorLabel}>Background:</label>
                <div className={styles.selectorButtons}>
                  {[
                    { value: 'dark', label: 'Dark', icon: Monitor },
                    { value: 'code', label: 'Code', icon: Code },
                    { value: 'minimal', label: 'Minimal', icon: Smartphone },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => handleBackgroundTypeChange(value as any)}
                      className={`${styles.selectorButton} ${
                        backgroundType === value ? styles.active : ''
                      }`}
                      aria-label={`Set background to ${label}`}
                    >
                      <Icon size={14} />
                      <span className={styles.hiddenSm}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Preview Container */}
              <div className={styles.livePreviewContainer}>
                <DynamicBackgroundGlassShowcase
                  backgroundType={backgroundType}
                  showDecorations={true}
                >
                  <div className={styles.glassEffectDemo}>
                    <div className={styles.demoContent}>
                      <div className={styles.demoHeader}>
                        <Zap size={shouldUseMobileLayout ? 20 : 24} />
                        <div className={styles.demoText}>
                          <h4>Glass Effect Demo</h4>
                          <p>Real-time displacement mapping</p>
                        </div>
                      </div>
                      
                      <div className={styles.demoStats}>
                        <div className={styles.statItem}>
                          <span className={styles.statLabel}>Scale:</span>
                          <span className={styles.statValue}>{customConfig.scale}</span>
                        </div>
                        <div className={styles.statItem}>
                          <span className={styles.statLabel}>RGB:</span>
                          <span className={styles.statValue}>
                            {customConfig.r}/{customConfig.g}/{customConfig.b}
                          </span>
                        </div>
                        <div className={styles.statItem}>
                          <span className={styles.statLabel}>Preset:</span>
                          <span className={styles.statValue}>{selectedPreset}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DynamicBackgroundGlassShowcase>
              </div>
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div
              key="code"
              id="panel-code"
              role="tabpanel"
              aria-labelledby="tab-code"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.codePreview}
            >
              <div className={styles.codeContainer}>
                <div className={styles.codeHeader}>
                  <h4>Generated SVG Displacement Map</h4>
                  <div className={styles.codeStats}>
                    <span>{(pipelineData.svgContent.length / 1024).toFixed(1)}KB</span>
                    <span>•</span>
                    <span>{pipelineData.metrics.processingTime}ms</span>
                  </div>
                </div>
                
                <div className={styles.codeDisplay}>
                  <SyntaxHighlighter
                    language="svg"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      background: 'transparent',
                      fontSize: shouldUseMobileLayout ? '12px' : '14px',
                      lineHeight: '1.4',
                    }}
                    showLineNumbers={!shouldUseMobileLayout}
                    wrapLines={true}
                    wrapLongLines={true}
                  >
                    {pipelineData.svgContent}
                  </SyntaxHighlighter>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'displacement' && (
            <motion.div
              key="displacement"
              id="panel-displacement"
              role="tabpanel"
              aria-labelledby="tab-displacement"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.displacementPreview}
            >
              <div className={styles.displacementContainer}>
                <div className={styles.displacementHeader}>
                  <h4>Displacement Map Visualization</h4>
                  <p>The SVG displacement map used for the glass effect</p>
                </div>
                
                <div className={styles.displacementGrid}>
                  <div className={styles.displacementItem}>
                    <h5>SVG Source</h5>
                    <div className={styles.displacementDisplay}>
                      <img
                        src={pipelineData.dataUri}
                        alt="SVG Displacement Map"
                        className={styles.displacementImage}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const container = e.currentTarget.parentElement;
                          if (container) {
                            container.innerHTML = `<div class="${styles.displacementError}">Failed to load displacement map</div>`;
                          }
                        }}
                      />
                    </div>
                    <div className={styles.displacementStats}>
                      <span>Size: {(pipelineData.svgContent.length / 1024).toFixed(1)}KB</span>
                      <span>Format: SVG</span>
                    </div>
                  </div>
                  
                  <div className={styles.displacementItem}>
                    <h5>Applied Effect</h5>
                    <div className={styles.displacementDisplay}>
                      <div className={styles.effectPreview}>
                        <div className={styles.effectSample}>
                          Glass Effect
                        </div>
                      </div>
                    </div>
                    <div className={styles.displacementStats}>
                      <span>Filter: Applied</span>
                      <span>Mode: backdrop-filter</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};