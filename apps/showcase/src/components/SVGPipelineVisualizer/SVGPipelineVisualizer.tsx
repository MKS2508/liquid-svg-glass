import React, { useEffect, useRef } from 'react';
import { glassPresets } from '@liquid-svg-glass/react';
import { PipelineProvider } from './context/PipelineContext';
import { useKeyboardNavigation } from './hooks';
import { 
  ResponsiveLayout, 
  PipelineHeader, 
  PipelineTimeline, 
  PreviewPanel, 
  MobileControls 
} from './components';
import styles from './styles.module.scss';

interface SVGPipelineVisualizerProps {
  onBack?: () => void;
}

// Quick preset buttons component
const QuickPresets: React.FC = () => {
  const presetKeys = Object.keys(glassPresets) as Array<keyof typeof glassPresets>;
  
  return (
    <div className={styles.quickPresets}>
      {presetKeys.map((preset) => (
        <button
          key={preset}
          className={styles.quickPresetBtn}
          title={`${preset} preset`}
          aria-label={`Switch to ${preset} preset`}
        >
          {preset.charAt(0).toUpperCase()}
        </button>
      ))}
    </div>
  );
};

// Main component with context provider
const SVGPipelineVisualizerContent: React.FC<SVGPipelineVisualizerProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Total number of pipeline nodes
  const totalNodes = 8;

  // Global keyboard navigation
  useKeyboardNavigation(containerRef, {
    enableEscape: true,
    enableArrowKeys: false, // Let individual components handle this
    enableTab: true,
    trapFocus: false,
  });

  // Handle global escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onBack) {
        onBack();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onBack]);

  return (
    <div 
      ref={containerRef}
      className={styles.visualizer}
      role="main"
      aria-label="SVG Pipeline Visualizer"
    >
      <ResponsiveLayout
        header={<PipelineHeader onBack={onBack} />}
        pipeline={<PipelineTimeline />}
        preview={<PreviewPanel />}
        controls={<MobileControls />}
        quickPresets={<QuickPresets />}
      />
      
      {/* Hidden SVG for filters */}
      <svg className={styles.hiddenSvg} aria-hidden="true">
        <defs>
          <filter id="glass-filter" colorInterpolationFilters="sRGB">
            {/* SVG filter content will be populated by context */}
          </filter>
        </defs>
      </svg>
    </div>
  );
};

// Main exported component with provider
const SVGPipelineVisualizer: React.FC<SVGPipelineVisualizerProps> = (props) => {
  return (
    <PipelineProvider totalNodes={8} onBack={props.onBack}>
      <SVGPipelineVisualizerContent {...props} />
    </PipelineProvider>
  );
};

export default SVGPipelineVisualizer;