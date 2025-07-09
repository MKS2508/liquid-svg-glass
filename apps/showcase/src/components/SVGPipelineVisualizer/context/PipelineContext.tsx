import React, { createContext, useContext, useReducer, useCallback, useMemo, type ReactNode } from 'react';
import { glassPresets } from '@liquid-svg-glass/react';
import { type GeometryConfig, type VisualConfig } from '@liquid-svg-glass/core';
import { usePipelineData, useAnimationState } from '../hooks';
import type { PipelineData, PerformanceWarning } from '../hooks';

// Types
export type PresetType = keyof typeof glassPresets;
export type BackgroundType = 'dark' | 'code' | 'minimal';
export type PreviewMode = 'code' | 'live';

export interface PipelineState {
  selectedPreset: PresetType;
  customConfig: GeometryConfig & VisualConfig;
  backgroundType: BackgroundType;
  previewMode: PreviewMode;
  showCode: boolean;
  expandedNodeId: string | null;
  isMobileMenuOpen: boolean;
  showPreview: boolean;
  copiedSvg: boolean;
}

export type PipelineAction =
  | { type: 'SET_PRESET'; payload: PresetType }
  | { type: 'UPDATE_CONFIG'; payload: Partial<PipelineState['customConfig']> }
  | { type: 'SET_BACKGROUND_TYPE'; payload: BackgroundType }
  | { type: 'SET_PREVIEW_MODE'; payload: PreviewMode }
  | { type: 'TOGGLE_CODE' }
  | { type: 'SET_EXPANDED_NODE'; payload: string | null }
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'TOGGLE_PREVIEW' }
  | { type: 'SET_COPIED_SVG'; payload: boolean };

// Initial state
const initialState: PipelineState = {
  selectedPreset: 'dock',
  customConfig: { ...glassPresets.dock },
  backgroundType: 'dark',
  previewMode: 'live',
  showCode: false,
  expandedNodeId: null,
  isMobileMenuOpen: false,
  showPreview: true,
  copiedSvg: false,
};

// Reducer
const pipelineReducer = (state: PipelineState, action: PipelineAction): PipelineState => {
  switch (action.type) {
    case 'SET_PRESET':
      return {
        ...state,
        selectedPreset: action.payload,
        customConfig: { ...glassPresets[action.payload] },
      };
    
    case 'UPDATE_CONFIG':
      return {
        ...state,
        customConfig: { ...state.customConfig, ...action.payload },
      };
    
    case 'SET_BACKGROUND_TYPE':
      return { ...state, backgroundType: action.payload };
    
    case 'SET_PREVIEW_MODE':
      return { ...state, previewMode: action.payload };
    
    case 'TOGGLE_CODE':
      return { ...state, showCode: !state.showCode };
    
    case 'SET_EXPANDED_NODE':
      return { ...state, expandedNodeId: action.payload };
    
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };
    
    case 'TOGGLE_PREVIEW':
      return { ...state, showPreview: !state.showPreview };
    
    case 'SET_COPIED_SVG':
      return { ...state, copiedSvg: action.payload };
    
    default:
      return state;
  }
};

// Context interface
export interface PipelineContextValue {
  // State
  state: PipelineState;
  pipelineData: PipelineData;
  performanceWarnings: PerformanceWarning[];
  
  // Animation state
  isAnimating: boolean;
  activeNodeIndex: number | null;
  completedNodes: Set<number>;
  
  
  // Actions
  dispatch: React.Dispatch<PipelineAction>;
  startAnimation: () => void;
  resetAnimation: () => void;
  setAnimationSpeed: (speed: number) => void;
  
  // Convenience methods
  handlePresetChange: (preset: PresetType) => void;
  handleParameterChange: (key: string, value: number | string) => void;
  handleNodeClick: (nodeId: string) => void;
  exportSVG: () => void;
  copySVG: () => void;
}

// Context
const PipelineContext = createContext<PipelineContextValue | null>(null);

// Provider component
export interface PipelineProviderProps {
  children: ReactNode;
  totalNodes: number;
  onBack?: () => void;
}

export const PipelineProvider: React.FC<PipelineProviderProps> = ({ 
  children, 
  totalNodes,
  onBack 
}) => {
  const [state, dispatch] = useReducer(pipelineReducer, initialState);
  
  // Custom hooks
  const { pipelineData, performanceWarnings } = usePipelineData(state.customConfig);
  const {
    isAnimating,
    activeNodeIndex,
    completedNodes,
    startAnimation,
    resetAnimation,
    setAnimationSpeed,
  } = useAnimationState(totalNodes);

  // Action creators
  const handlePresetChange = useCallback((preset: PresetType) => {
    dispatch({ type: 'SET_PRESET', payload: preset });
  }, []);

  const handleParameterChange = useCallback((key: string, value: number | string) => {
    dispatch({ type: 'UPDATE_CONFIG', payload: { [key]: value } });
  }, []);

  const handleNodeClick = useCallback((nodeId: string) => {
    dispatch({ 
      type: 'SET_EXPANDED_NODE', 
      payload: state.expandedNodeId === nodeId ? null : nodeId 
    });
  }, [state.expandedNodeId]);

  const exportSVG = useCallback(() => {
    const blob = new Blob([pipelineData.svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `liquid-glass-displacement-map-${state.selectedPreset}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }, [pipelineData.svgContent, state.selectedPreset]);

  const copySVG = useCallback(() => {
    navigator.clipboard.writeText(pipelineData.svgContent).then(() => {
      dispatch({ type: 'SET_COPIED_SVG', payload: true });
      setTimeout(() => {
        dispatch({ type: 'SET_COPIED_SVG', payload: false });
      }, 2000);
    });
  }, [pipelineData.svgContent]);

  // Context value
  const contextValue = useMemo<PipelineContextValue>(() => ({
    state,
    pipelineData,
    performanceWarnings,
    isAnimating,
    activeNodeIndex,
    completedNodes,
    dispatch,
    startAnimation,
    resetAnimation,
    setAnimationSpeed,
    handlePresetChange,
    handleParameterChange,
    handleNodeClick,
    exportSVG,
    copySVG,
  }), [
    state,
    pipelineData,
    performanceWarnings,
    isAnimating,
    activeNodeIndex,
    completedNodes,
    startAnimation,
    resetAnimation,
    setAnimationSpeed,
    handlePresetChange,
    handleParameterChange,
    handleNodeClick,
    exportSVG,
    copySVG,
  ]);

  return (
    <PipelineContext.Provider value={contextValue}>
      {children}
    </PipelineContext.Provider>
  );
};

// Hook to use context
export const usePipelineContext = () => {
  const context = useContext(PipelineContext);
  if (!context) {
    throw new Error('usePipelineContext must be used within a PipelineProvider');
  }
  return context;
};