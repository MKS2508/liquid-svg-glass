import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings, Eye, Code, Download, ArrowLeft, Menu, X, Database, Maximize, FileImage, Filter, Paintbrush, Copy, CheckCircle, Zap } from 'lucide-react';
import { generateDisplacementMap, type GeometryConfig, type VisualConfig } from '@liquid-svg-glass/core';
import { glassPresets } from '@liquid-svg-glass/react';
import DynamicBackgroundGlassShowcase from '../DynamicBackgroundGlassShowcase';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './visualizer-styles.module.scss';
import PipelineStepCard, { type PipelineNodeData } from './PipelineStepCard';
import DraggableControlsPanel from './DraggableControlsPanel';

// Datos estáticos para los nodos del pipeline, ahora enriquecidos
const coreSVGPipelineNodes: PipelineNodeData[] = [
  {
    id: 'input-config',
    label: 'Input Configuration',
    icon: Database,
    color: styles.gradientCyan,
    description: 'User-defined parameters that control the effect.',
    codeSnippet: `// User-defined configuration
const config = {
  width: 336, height: 96, 
  scale: -180, border: 0.07,
  r: 0, g: 10, b: 20, ...
};`,
    getIOData: (_pipelineData: any, customConfig: any) => ({
      input: { 'User Controls': 'Sliders & Presets' },
      output: {
        'Geometry': `${customConfig.width}x${customConfig.height}`,
        'Displacement': `scale: ${customConfig.scale}`,
        'Aberration': `r:${customConfig.r}, g:${customConfig.g}, b:${customConfig.b}`,
      },
    }),
  },
  {
    id: 'border-calc',
    label: 'Border Calculation',
    icon: Maximize,
    color: styles.gradientIndigo,
    description: 'Converts percentage border to absolute pixel value.',
    codeSnippet: `// calculateBorderDimensions()
const minDimension = Math.min(width, height);
const calculatedBorder = minDimension * (border * 0.5);`,
    getIOData: (pipelineData: any) => ({
      input: {
        width: pipelineData.calculatedGeometry.width,
        height: pipelineData.calculatedGeometry.height,
        border: pipelineData.calculatedGeometry.border,
      },
      output: {
        'calculatedBorder': `${pipelineData.calculatedGeometry.calculatedBorder.toFixed(2)}px`,
      },
    }),
  },
  {
    id: 'svg-construction',
    label: 'SVG Displacement Map',
    icon: Code,
    color: styles.gradientGreen,
    description: 'Builds the SVG string for the displacement map.',
    codeSnippet: `// buildDisplacementSVG()
<svg viewBox="0 0 \${width} \${height}">
  <defs>...</defs>
  <rect fill="black" ... />
  <rect fill="url(#red)" ... />
  <rect fill="url(#blue)" ... />
  <rect fill="hsl(...) / \${alpha})" ... />
</svg>`,
    getIOData: (pipelineData: any) => ({
      input: {
        'Geometry': `${pipelineData.calculatedGeometry.width}x${pipelineData.calculatedGeometry.height}`,
        'Border': `${pipelineData.calculatedGeometry.calculatedBorder.toFixed(2)}px`,
      },
      output: {
        'SVG String': `${pipelineData.svgContent.substring(0, 50)}...`,
        'Length': `${pipelineData.svgContent.length} chars`,
      },
    }),
  },
  {
    id: 'data-uri',
    label: 'Data URI Encoding',
    icon: FileImage,
    color: styles.gradientYellow,
    description: 'Encodes the SVG string into a browser-readable format.',
    codeSnippet: `// encodeDataURI()
const encoded = encodeURIComponent(svgContent);
return \`data:image/svg+xml,\${encoded}\`;`,
    getIOData: (pipelineData: any) => ({
      input: { 'SVG String Length': `${pipelineData.svgContent.length} chars` },
      output: {
        'Data URI': `${pipelineData.dataUri.substring(0, 50)}...`,
        'Length': `${pipelineData.dataUri.length} chars`,
      },
    }),
  },
  {
    id: 'filter-attributes',
    label: 'Filter Attributes',
    icon: Settings,
    color: styles.gradientPurple,
    description: 'Calculates displacement scales for chromatic aberration.',
    codeSnippet: `// generateFilterAttributes()
return {
  red:   { scale: scale + r },
  green: { scale: scale + g },
  blue:  { scale: scale + b },
  ... 
};`,
    getIOData: (pipelineData: any, customConfig: any) => ({
      input: {
        scale: customConfig.scale,
        r: customConfig.r,
        g: customConfig.g,
        b: customConfig.b,
      },
      output: {
        'Red Scale': pipelineData.filterAttributes.red.scale,
        'Green Scale': pipelineData.filterAttributes.green.scale,
        'Blue Scale': pipelineData.filterAttributes.blue.scale,
      },
    }),
  },
  {
    id: 'svg-filter-chain',
    label: 'SVG Filter Pipeline',
    icon: Filter,
    color: styles.gradientRed,
    description: 'The declarative SVG filter chain applied to the content.',
    codeSnippet: `<filter id="glass-filter">
  <feImage href={\`\${dataUri}\`} ... />
  <feDisplacementMap scale={\`\${scaleR}\`} ... />
  <feColorMatrix ... />
  <feBlend ... />
  <feGaussianBlur ... />
</filter>`,
    getIOData: (_pipelineData: any) => ({
      input: {
        'Data URI': `href`,
        'Scales': `r, g, b`,
      },
      output: { 'Filter Primitive': '<filter> Element' },
    }),
  },
  {
    id: 'backdrop-filter',
    label: 'Backdrop Filter Apply',
    icon: Paintbrush,
    color: styles.gradientIndigo,
    description: 'CSS applies the SVG filter to background content.',
    codeSnippet: `// CSS Rule
.glass-element {
  backdrop-filter: url(#glass-filter);
}`,
    getIOData: (_pipelineData?: any, _customConfig?: any) => ({
      input: { 'SVG Filter': '#glass-filter' },
      output: { 'CSS Property': 'backdrop-filter' },
    }),
  },
  {
    id: 'visual-result',
    label: 'Visual Result',
    icon: Eye,
    color: styles.gradientEmerald,
    description: 'The final composited effect with all transformations.',
    codeSnippet: `// Final Render
// The browser composites the styled element
// with the filtered background content.`,
    getIOData: (_pipelineData?: any, _customConfig?: any) => ({
      input: { 'Filtered Pixels': 'From backdrop-filter' },
      output: { 'Final Image': 'Displayed on screen' },
    }),
  },
];

interface SVGPipelineVisualizerProps {
  onBack?: () => void;
}

const SVGPipelineVisualizer: React.FC<SVGPipelineVisualizerProps> = ({ onBack }) => {
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof glassPresets>('dock');
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);
  const [completedNodes, setCompletedNodes] = useState<Set<number>>(new Set());
  const [showCode, setShowCode] = useState(false);
  const [customConfig, setCustomConfig] = useState<typeof glassPresets[keyof typeof glassPresets]>(glassPresets.dock);
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [autoExpandedNodeId, setAutoExpandedNodeId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [copiedSvg, setCopiedSvg] = useState(false);
  const [backgroundType, setBackgroundType] = useState<'dark' | 'code' | 'minimal'>('dark');
  const [previewMode, setPreviewMode] = useState<'code' | 'live'>('live');
  
  // Refs for auto-scroll functionality
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Performance analysis and timing
  const pipelineData = useMemo(() => {
    const startTime = performance.now();
    
    const geometry: GeometryConfig = { width: customConfig.width, height: customConfig.height, radius: customConfig.radius, border: customConfig.border };
    const visual: VisualConfig = { frost: customConfig.frost, blur: customConfig.blur, displace: customConfig.displace, scale: customConfig.scale, alpha: customConfig.alpha, lightness: customConfig.lightness, x: customConfig.x, y: customConfig.y, blend: customConfig.blend, r: customConfig.r, g: customConfig.g, b: customConfig.b };
    
    const result = generateDisplacementMap(geometry, visual);
    
    const endTime = performance.now();
    const processingTime = endTime - startTime;
    
    return {
      ...result,
      metrics: {
        processingTime: processingTime.toFixed(2),
        svgSize: result.svgContent.length,
        dataUriSize: result.dataUri.length
      }
    };
  }, [customConfig]);

  // Performance warnings analysis
  const performanceWarnings = useMemo(() => {
    const warnings: Array<{type: string, message: string, severity: 'warning' | 'error'}> = [];
    
    // Scale value warnings
    const maxScale = Math.max(
      Math.abs(customConfig.scale + customConfig.r),
      Math.abs(customConfig.scale + customConfig.g),
      Math.abs(customConfig.scale + customConfig.b)
    );
    
    if (maxScale > 300) {
      warnings.push({
        type: 'scale',
        message: `High displacement scale (${maxScale}) may cause severe performance issues`,
        severity: 'error'
      });
    } else if (maxScale > 200) {
      warnings.push({
        type: 'scale',
        message: `Displacement scale (${maxScale}) may impact performance on mobile devices`,
        severity: 'warning'
      });
    }
    
    // SVG size warnings
    if (pipelineData.metrics.svgSize > 50000) {
      warnings.push({
        type: 'size',
        message: `Large SVG displacement map (${(pipelineData.metrics.svgSize / 1024).toFixed(1)}KB)`,
        severity: 'warning'
      });
    }
    
    // Processing time warnings
    if (parseFloat(pipelineData.metrics.processingTime) > 5) {
      warnings.push({
        type: 'timing',
        message: `Slow processing time (${pipelineData.metrics.processingTime}ms)`,
        severity: 'warning'
      });
    }
    
    // Element size warnings
    const totalPixels = customConfig.width * customConfig.height;
    if (totalPixels > 200000) {
      warnings.push({
        type: 'resolution',
        message: `High resolution (${customConfig.width}×${customConfig.height}) may impact rendering performance`,
        severity: 'warning'
      });
    }
    
    return warnings;
  }, [customConfig, pipelineData.metrics]);

  const handlePresetChange = useCallback((preset: keyof typeof glassPresets) => {
    console.log('Preset change triggered:', preset);
    setSelectedPreset(preset);
    setCustomConfig(glassPresets[preset]);
  }, []);

  const handleParameterChange = useCallback((key: string, value: number | string) => {
    setCustomConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const startTechnicalAnimation = useCallback(() => {
    setIsAnimating(true);
    setActiveNodeIndex(0);
    setCompletedNodes(new Set());
    let currentIndex = 0;
    const baseDelay = 2000 / animationSpeed;
    const animateNext = () => {
      if (currentIndex < coreSVGPipelineNodes.length) {
        setActiveNodeIndex(currentIndex);
        if (currentIndex > 0) {
          setCompletedNodes(prev => new Set([...prev, currentIndex - 1]));
        }
        currentIndex++;
        setTimeout(animateNext, baseDelay);
      } else {
        setCompletedNodes(prev => new Set([...prev, coreSVGPipelineNodes.length - 1]));
        setActiveNodeIndex(null);
        setIsAnimating(false);
      }
    };
    animateNext();
  }, [animationSpeed]);

  const resetAnimation = useCallback(() => {
    setIsAnimating(false);
    setActiveNodeIndex(null);
    setCompletedNodes(new Set());
  }, []);

  const exportSVG = useCallback(() => {
    const blob = new Blob([pipelineData.svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `liquid-glass-displacement-map-${selectedPreset}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }, [pipelineData.svgContent, selectedPreset]);

  const copySVG = useCallback(() => {
    navigator.clipboard.writeText(pipelineData.svgContent).then(() => {
      setCopiedSvg(true);
      setTimeout(() => setCopiedSvg(false), 2000);
    });
  }, [pipelineData.svgContent]);

  const handleNodeClick = useCallback((nodeId: string) => {
    setExpandedNodeId(prev => prev === nodeId ? null : nodeId);
  }, []);

  // Auto-expand active node and scroll to it
  useEffect(() => {
    if (activeNodeIndex !== null) {
      const activeNode = coreSVGPipelineNodes[activeNodeIndex];
      if (activeNode) {
        setAutoExpandedNodeId(activeNode.id);
        
        // Auto-scroll to active node with fallbacks
        const scrollToActiveStep = () => {
          const activeStepElement = stepRefs.current[activeNode.id];
          if (activeStepElement) {
            try {
              // Try modern scrollIntoView first
              activeStepElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
              });
            } catch (error) {
              // Fallback for older browsers
              const rect = activeStepElement.getBoundingClientRect();
              const absoluteElementTop = rect.top + window.pageYOffset;
              const middle = absoluteElementTop - (window.innerHeight / 2);
              window.scrollTo({ top: middle, behavior: 'smooth' });
            }
          }
        };
        
        // Delay scroll to allow for expansion animation
        setTimeout(scrollToActiveStep, 100);
      }
    } else {
      setAutoExpandedNodeId(null);
    }
  }, [activeNodeIndex]);

  // Clear auto-expanded state when animation ends
  useEffect(() => {
    if (!isAnimating) {
      setAutoExpandedNodeId(null);
    }
  }, [isAnimating]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerFlex}>
            <div className={styles.headerTitle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                {onBack && (
                  <button onClick={onBack} className={`${styles.button} ${styles.secondary}`}>
                    <ArrowLeft />
                  </button>
                )}
                <div>
                  <h1 className={styles.title}>SVG Pipeline Visualizer</h1>
                  <p className={styles.subtitle}>Real-time displacement mapping & chromatic aberration</p>
                  <div className={styles.badges}>
                    <span>Displacement Mapping</span>
                    <span className={styles.hiddenSm}>Chromatic Aberration</span>
                    <span className={styles.hiddenMd}>Real-time Processing</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={styles.mobileMenuBtn}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
            
            <div className={styles.desktopControls}>
              <button 
                onClick={startTechnicalAnimation} 
                disabled={isAnimating} 
                className={`${styles.button} ${styles.primary}`}
              >
                {isAnimating ? <Pause /> : <Play />}
                <span className={styles.hiddenSm}>{isAnimating ? 'Processing...' : 'Start Pipeline'}</span>
              </button>
              <button onClick={resetAnimation} className={`${styles.button} ${styles.secondary}`}>
                <RotateCcw />
                <span className={styles.hiddenSm}>Reset</span>
              </button>
              <button onClick={exportSVG} className={`${styles.button} ${styles.success}`}>
                <Download />
                <span className={styles.hiddenSm}>Export</span>
              </button>
            </div>
          </div>
          
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }} 
                className={styles.mobileMenu}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <button 
                      onClick={startTechnicalAnimation} 
                      disabled={isAnimating} 
                      className={`${styles.button} ${styles.primary}`} 
                      style={{ flex: 1 }}
                    >
                      {isAnimating ? <Pause /> : <Play />}
                      {isAnimating ? 'Processing...' : 'Start Pipeline'}
                    </button>
                    <button onClick={resetAnimation} className={`${styles.button} ${styles.secondary}`}>
                      <RotateCcw />
                    </button>
                    <button onClick={exportSVG} className={`${styles.button} ${styles.success}`}>
                      <Download />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.splitLayout}>
          {/* Left Side - Pipeline */}
          <div className={styles.pipelineSection} ref={timelineRef}>
            <div className={styles.pipelineContainer}>
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 var(--space-4) 0', textAlign: 'center' }}>
                SVG Processing Pipeline
              </h2>
              <div className={styles.legend} style={{ justifyContent: 'center' }}>
                <div className={styles.legendItem}>
                  <div className={`${styles.statusDot} ${styles.processing}`}></div>
                  <span>Processing</span>
                </div>
                <div className={styles.legendItem}>
                  <div className={`${styles.statusDot} ${styles.completed}`}></div>
                  <span>Completed</span>
                </div>
                <div className={styles.legendItem}>
                  <div className={`${styles.statusDot} ${styles.pending}`}></div>
                  <span>Pending</span>
                </div>
              </div>
            </div>
            
            <div className={styles.pipelineZigzag}>
              {coreSVGPipelineNodes.map((node, index) => {
                const Icon = node.icon;
                const isActive = activeNodeIndex === index;
                const isCompleted = completedNodes.has(index);
                const isExpanded = expandedNodeId === node.id;
                const isAutoExpanded = autoExpandedNodeId === node.id;
                
                let stepStatus = 'pending';
                if (isActive) stepStatus = 'processing';
                else if (isCompleted) stepStatus = 'completed';
                
                return (
                  <motion.div 
                    key={node.id} 
                    ref={(el) => { stepRefs.current[node.id] = el; }}
                    className={`${styles.pipelineStep} ${index % 2 === 0 ? styles.stepLeft : styles.stepRight}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`${styles.stepIndicator} ${styles[stepStatus]}`}>
                      <Icon />
                    </div>
                    
                    <div 
                      className={`${styles.stepCard} ${isExpanded ? styles.expanded : ''} ${isAutoExpanded ? styles.autoExpanded : ''} ${isActive ? styles.processing : ''}`}
                      onClick={() => handleNodeClick(node.id)}
                    >
                      <div className={styles.stepHeader}>
                        <div className={styles.stepTitle}>
                          <h4>{node.label}</h4>
                          <p>{node.description}</p>
                        </div>
                        <div className={styles.stepActions}>
                          <button 
                            className={styles.actionButton}
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowCode(!showCode);
                            }}
                            aria-label="Toggle code view"
                          >
                            <Code size={16} />
                          </button>
                        </div>
                      </div>
                      
                      
                      <AnimatePresence>
                        {(isExpanded || isAutoExpanded) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            style={{ overflow: 'hidden' }}
                          >
                            <PipelineStepCard
                              node={node}
                              index={index}
                              isActive={isActive}
                              isCompleted={isCompleted}
                              isExpanded={true}
                              isAnimating={false}
                              pipelineData={pipelineData}
                              customConfig={customConfig}
                              onClick={() => {}}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className={styles.previewSection}>
            <div className={styles.previewContainer}>
              {/* Preview Content */}
              <div className={styles.previewContent}>
                {previewMode === 'live' ? (
                  <div className={styles.livePreviewContainer}>
                    <DynamicBackgroundGlassShowcase 
                      backgroundType={backgroundType}
                      showDecorations={true}
                    >
                      <div className={styles.glassEffectDemo}>
                        <div className={styles.demoContent}>
                          <div className={styles.demoHeader}>
                            <Zap size={24} />
                            <div className={styles.demoText}>
                              <h3>Glass Effect Demo</h3>
                              <p>Real-time displacement mapping with chromatic aberration</p>
                            </div>
                          </div>
                          <div className={styles.demoStats}>
                            <div className={styles.statItem}>
                              <span>Scale:</span>
                              <span>{customConfig.scale}</span>
                            </div>
                            <div className={styles.statItem}>
                              <span>RGB:</span>
                              <span>{customConfig.r}/{customConfig.g}/{customConfig.b}</span>
                            </div>
                            <div className={styles.statItem}>
                              <span>Preset:</span>
                              <span>{selectedPreset}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DynamicBackgroundGlassShowcase>
                  </div>
                ) : (
                  <div className={styles.codePreviewContainer}>
                    <div className={styles.codeActions}>
                      <button onClick={copySVG} className={styles.actionBtn}>
                        {copiedSvg ? <CheckCircle size={14} /> : <Copy size={14} />}
                        {copiedSvg ? 'Copied!' : 'Copy'}
                      </button>
                      <button onClick={exportSVG} className={styles.actionBtn}>
                        <Download size={14} />
                        Export
                      </button>
                    </div>
                    <div className={styles.codeDisplay}>
                      <SyntaxHighlighter 
                        language="svg" 
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          background: 'transparent',
                          fontSize: '12px',
                          lineHeight: '1.4'
                        }}
                        showLineNumbers={true}
                        wrapLines={true}
                      >
                        {pipelineData.svgContent}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Displacement Map Preview - Only show in live mode */}
              {previewMode === 'live' && (
                <div className={styles.displacementPreview}>
                  <h5><FileImage size={16} /> Displacement Map Preview</h5>
                  <div className={styles.previewContainer}>
                    <div className={styles.previewItem}>
                      <h6>SVG Source</h6>
                      <div className={styles.svgDisplay}>
                        <img 
                          src={pipelineData.dataUri} 
                          alt="Displacement Map"
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                          onError={(e) => {
                            // Fallback to innerHTML if image fails
                            e.currentTarget.style.display = 'none';
                            const container = e.currentTarget.parentElement;
                            if (container) {
                              container.innerHTML = pipelineData.svgContent;
                            }
                          }}
                        />
                      </div>
                      <div className={styles.previewStats}>
                        <span>Size:</span>
                        <span>{(pipelineData.svgContent.length / 1024).toFixed(1)}KB</span>
                      </div>
                    </div>
                    <div className={styles.previewItem}>
                      <h6>Applied Effect</h6>
                      <div className={styles.svgDisplay} style={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        position: 'relative'
                      }}>
                        <div style={{ 
                          width: '80%', 
                          height: '60%', 
                          background: 'rgba(255,255,255,0.1)', 
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: 600,
                          backdropFilter: 'url(#glass-filter)',
                          WebkitBackdropFilter: 'url(#glass-filter)'
                        }}>
                          Glass Effect
                        </div>
                      </div>
                      <div className={styles.previewStats}>
                        <span>Filter:</span>
                        <span>Applied</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>


      {/* Quick Preset Buttons */}
      <div className={styles.quickPresets}>
        {(Object.keys(glassPresets) as Array<keyof typeof glassPresets>).map((preset) => (
          <button
            key={preset}
            onClick={() => handlePresetChange(preset)}
            className={`${styles.quickPresetBtn} ${selectedPreset === preset ? styles.active : ''}`}
            title={`${preset} preset`}
          >
            {preset.slice(0, 1).toUpperCase()}
          </button>
        ))}
      </div>


      <svg className={styles.hiddenSvg}>
        <defs>
          <filter id="glass-filter" colorInterpolationFilters="sRGB">
            <feImage href={pipelineData.dataUri} result="map"/>
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector={pipelineData.filterAttributes.red.xChannelSelector} yChannelSelector={pipelineData.filterAttributes.red.yChannelSelector} scale={pipelineData.filterAttributes.red.scale} result="dispRed" />
            <feColorMatrix in="dispRed" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector={pipelineData.filterAttributes.green.xChannelSelector} yChannelSelector={pipelineData.filterAttributes.green.yChannelSelector} scale={pipelineData.filterAttributes.green.scale} result="dispGreen" />
            <feColorMatrix in="dispGreen" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector={pipelineData.filterAttributes.blue.xChannelSelector} yChannelSelector={pipelineData.filterAttributes.blue.yChannelSelector} scale={pipelineData.filterAttributes.blue.scale} result="dispBlue" />
            <feColorMatrix in="dispBlue" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
            <feBlend in="red" in2="green" mode="screen" result="rg"/>
            <feBlend in="rg" in2="blue" mode="screen" result="output"/>
            <feGaussianBlur in="output" stdDeviation={pipelineData.filterAttributes.gaussianBlur.stdDeviation}/>
          </filter>
        </defs>
      </svg>
      
      {/* Draggable Controls Panel */}
      <DraggableControlsPanel
        selectedPreset={selectedPreset}
        customConfig={customConfig}
        pipelineData={pipelineData}
        performanceWarnings={performanceWarnings}
        onPresetChange={handlePresetChange}
        onParameterChange={handleParameterChange}
        onExportSVG={exportSVG}
        onCopySVG={copySVG}
        copiedSvg={copiedSvg}
        backgroundType={backgroundType}
        previewMode={previewMode}
        onBackgroundTypeChange={setBackgroundType}
        onPreviewModeChange={setPreviewMode}
      />
    </div>
  );
};

export default SVGPipelineVisualizer;