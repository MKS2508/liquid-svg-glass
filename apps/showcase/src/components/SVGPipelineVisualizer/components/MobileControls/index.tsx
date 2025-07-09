import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Sliders, Palette, ChevronUp, ChevronDown, Gauge } from 'lucide-react';
import { usePipelineContext } from '../../context/PipelineContext';
import { useKeyboardNavigation } from '../../hooks';
import { glassPresets } from '@liquid-svg-glass/react';
import styles from './styles.module.scss';

export const MobileControls: React.FC = () => {
  const controlsRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'parameters' | 'performance'>('presets');
  
  const {
    state,
    performanceWarnings,
    handlePresetChange,
    handleParameterChange,
    responsive,
  } = usePipelineContext();

  const { customConfig, selectedPreset } = state;
  const { shouldUseMobileLayout } = responsive;

  // Keyboard navigation
  useKeyboardNavigation(controlsRef, {
    enableArrowKeys: true,
    enableEnter: true,
    enableEscape: true,
    enableTab: true,
  });

  // Don't render if not mobile
  if (!shouldUseMobileLayout) {
    return null;
  }

  const tabs = [
    { id: 'presets', label: 'Presets', icon: Palette },
    { id: 'parameters', label: 'Parameters', icon: Sliders },
    { id: 'performance', label: 'Performance', icon: Gauge },
  ] as const;

  const presetKeys = Object.keys(glassPresets) as Array<keyof typeof glassPresets>;

  return (
    <div 
      ref={controlsRef}
      className={`${styles.mobileControls} ${isExpanded ? styles.expanded : ''}`}
      role="region"
      aria-label="Mobile controls"
    >
      {/* Toggle Header */}
      <button
        className={styles.toggleButton}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="mobile-controls-content"
        aria-label={isExpanded ? 'Collapse controls' : 'Expand controls'}
      >
        <div className={styles.toggleContent}>
          <Settings size={16} />
          <span>Controls</span>
          <div className={styles.toggleIndicator}>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </div>
        </div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="mobile-controls-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={styles.controlsContent}
          >
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
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className={styles.tabContent}>
              <AnimatePresence mode="wait">
                {activeTab === 'presets' && (
                  <motion.div
                    key="presets"
                    id="panel-presets"
                    role="tabpanel"
                    aria-labelledby="tab-presets"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className={styles.presetsPanel}
                  >
                    <div className={styles.presetsGrid}>
                      {presetKeys.map((preset) => (
                        <button
                          key={preset}
                          onClick={() => handlePresetChange(preset)}
                          className={`${styles.presetButton} ${
                            selectedPreset === preset ? styles.active : ''
                          }`}
                          aria-label={`Select ${preset} preset`}
                        >
                          <div className={styles.presetIcon}>
                            {preset.charAt(0).toUpperCase()}
                          </div>
                          <span className={styles.presetName}>{preset}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'parameters' && (
                  <motion.div
                    key="parameters"
                    id="panel-parameters"
                    role="tabpanel"
                    aria-labelledby="tab-parameters"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className={styles.parametersPanel}
                  >
                    <div className={styles.parametersList}>
                      {/* Core Parameters */}
                      <div className={styles.parameterGroup}>
                        <h4>Geometry</h4>
                        <div className={styles.parameterRow}>
                          <label>Scale</label>
                          <div className={styles.parameterInput}>
                            <input
                              type="range"
                              min="-300"
                              max="300"
                              step="10"
                              value={customConfig.scale}
                              onChange={(e) => handleParameterChange('scale', Number(e.target.value))}
                              className={styles.slider}
                            />
                            <span className={styles.parameterValue}>{customConfig.scale}</span>
                          </div>
                        </div>
                        
                        <div className={styles.parameterRow}>
                          <label>Border</label>
                          <div className={styles.parameterInput}>
                            <input
                              type="range"
                              min="0"
                              max="0.5"
                              step="0.01"
                              value={customConfig.border}
                              onChange={(e) => handleParameterChange('border', Number(e.target.value))}
                              className={styles.slider}
                            />
                            <span className={styles.parameterValue}>{customConfig.border.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Chromatic Aberration */}
                      <div className={styles.parameterGroup}>
                        <h4>Chromatic Aberration</h4>
                        <div className={styles.parameterRow}>
                          <label>Red</label>
                          <div className={styles.parameterInput}>
                            <input
                              type="range"
                              min="-50"
                              max="50"
                              step="1"
                              value={customConfig.r}
                              onChange={(e) => handleParameterChange('r', Number(e.target.value))}
                              className={styles.slider}
                            />
                            <span className={styles.parameterValue}>{customConfig.r}</span>
                          </div>
                        </div>
                        
                        <div className={styles.parameterRow}>
                          <label>Green</label>
                          <div className={styles.parameterInput}>
                            <input
                              type="range"
                              min="-50"
                              max="50"
                              step="1"
                              value={customConfig.g}
                              onChange={(e) => handleParameterChange('g', Number(e.target.value))}
                              className={styles.slider}
                            />
                            <span className={styles.parameterValue}>{customConfig.g}</span>
                          </div>
                        </div>
                        
                        <div className={styles.parameterRow}>
                          <label>Blue</label>
                          <div className={styles.parameterInput}>
                            <input
                              type="range"
                              min="-50"
                              max="50"
                              step="1"
                              value={customConfig.b}
                              onChange={(e) => handleParameterChange('b', Number(e.target.value))}
                              className={styles.slider}
                            />
                            <span className={styles.parameterValue}>{customConfig.b}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'performance' && (
                  <motion.div
                    key="performance"
                    id="panel-performance"
                    role="tabpanel"
                    aria-labelledby="tab-performance"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className={styles.performancePanel}
                  >
                    <div className={styles.performanceWarnings}>
                      {performanceWarnings.length > 0 ? (
                        performanceWarnings.map((warning, index) => (
                          <div
                            key={index}
                            className={`${styles.warning} ${styles[warning.severity]}`}
                          >
                            <div className={styles.warningIcon}>
                              {warning.severity === 'error' ? '⚠️' : 'ℹ️'}
                            </div>
                            <div className={styles.warningMessage}>
                              {warning.message}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={styles.noWarnings}>
                          <div className={styles.successIcon}>✅</div>
                          <div>No performance issues detected</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};