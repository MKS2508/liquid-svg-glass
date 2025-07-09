import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Maximize, Code, FileImage, Settings, Filter, Paintbrush, Eye } from 'lucide-react';
import { usePipelineContext } from '../../context/PipelineContext';
import { useKeyboardNavigation } from '../../hooks';
import PipelineStepCard, { type PipelineNodeData } from '../../PipelineStepCard';
import styles from './styles.module.scss';

// Pipeline node data
const coreSVGPipelineNodes: PipelineNodeData[] = [
  {
    id: 'input-config',
    label: 'Input Configuration',
    icon: Database,
    color: 'cyan',
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
    color: 'indigo',
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
    color: 'green',
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
    color: 'yellow',
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
    color: 'purple',
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
    color: 'red',
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
    color: 'indigo',
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
    color: 'emerald',
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

export const PipelineTimeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  const {
    state,
    pipelineData,
    activeNodeIndex,
    completedNodes,
    isAnimating,
    handleNodeClick,
    responsive,
  } = usePipelineContext();

  const { expandedNodeId } = state;
  const { shouldUseMobileLayout } = responsive;

  // Keyboard navigation
  useKeyboardNavigation(timelineRef, {
    enableArrowKeys: true,
    enableEnter: true,
    enableEscape: true,
    autoFocus: false,
  });

  // Auto-scroll to active node
  useEffect(() => {
    if (activeNodeIndex !== null && isAnimating) {
      const activeNode = coreSVGPipelineNodes[activeNodeIndex];
      if (activeNode) {
        const activeStepElement = stepRefs.current[activeNode.id];
        if (activeStepElement) {
          const scrollToActiveStep = () => {
            try {
              activeStepElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest',
              });
            } catch (error) {
              // Fallback for older browsers
              const rect = activeStepElement.getBoundingClientRect();
              const absoluteElementTop = rect.top + window.pageYOffset;
              const middle = absoluteElementTop - (window.innerHeight / 2);
              window.scrollTo({ top: middle, behavior: 'smooth' });
            }
          };
          
          setTimeout(scrollToActiveStep, 100);
        }
      }
    }
  }, [activeNodeIndex, isAnimating]);

  return (
    <div 
      ref={timelineRef}
      className={`${styles.timelineContainer} ${shouldUseMobileLayout ? styles.mobile : ''}`}
      role="region"
      aria-label="SVG Processing Pipeline"
    >
      {/* Header */}
      <div className={styles.timelineHeader}>
        <h2 className={styles.timelineTitle}>SVG Processing Pipeline</h2>
        <div className={styles.legend}>
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

      {/* Pipeline Steps */}
      <div className={styles.pipelineContainer}>
        <div className={shouldUseMobileLayout ? styles.mobileSteps : styles.zigzagSteps}>
          {coreSVGPipelineNodes.map((node, index) => {
            const Icon = node.icon;
            const isActive = activeNodeIndex === index;
            const isCompleted = completedNodes.has(index);
            const isExpanded = expandedNodeId === node.id;
            
            let stepStatus = 'pending';
            if (isActive) stepStatus = 'processing';
            else if (isCompleted) stepStatus = 'completed';
            
            return (
              <motion.div
                key={node.id}
                ref={(el) => { stepRefs.current[node.id] = el; }}
                className={`${styles.pipelineStep} ${
                  shouldUseMobileLayout 
                    ? styles.mobileStep 
                    : index % 2 === 0 
                      ? styles.stepLeft 
                      : styles.stepRight
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                role="article"
                aria-label={`Pipeline step: ${node.label}`}
              >
                {/* Step Indicator */}
                <div className={`${styles.stepIndicator} ${styles[stepStatus]}`}>
                  <Icon size={shouldUseMobileLayout ? 16 : 20} />
                </div>

                {/* Step Card */}
                <div
                  className={`${styles.stepCard} ${
                    isExpanded ? styles.expanded : ''
                  } ${isActive ? styles.processing : ''}`}
                  onClick={() => handleNodeClick(node.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-controls={`step-content-${node.id}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleNodeClick(node.id);
                    }
                  }}
                >
                  {/* Step Header */}
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
                          handleNodeClick(node.id);
                        }}
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${node.label} details`}
                      >
                        <Code size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        id={`step-content-${node.id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <PipelineStepCard
                          node={node}
                          index={index}
                          isActive={isActive}
                          isCompleted={isCompleted}
                          isExpanded={true}
                          isAnimating={isAnimating}
                          pipelineData={pipelineData}
                          customConfig={state.customConfig}
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
  );
};