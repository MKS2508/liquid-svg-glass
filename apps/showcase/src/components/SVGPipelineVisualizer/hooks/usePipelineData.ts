import { useMemo } from 'react';
import { generateDisplacementMap, type GeometryConfig, type VisualConfig } from '@liquid-svg-glass/core';
import { glassPresets } from '@liquid-svg-glass/react';

export interface PipelineMetrics {
  processingTime: string;
  svgSize: number;
  dataUriSize: number;
}

export interface PipelineData {
  calculatedGeometry: GeometryConfig & { calculatedBorder: number };
  svgContent: string;
  dataUri: string;
  filterAttributes: {
    red: { scale: number; xChannelSelector: string; yChannelSelector: string };
    green: { scale: number; xChannelSelector: string; yChannelSelector: string };
    blue: { scale: number; xChannelSelector: string; yChannelSelector: string };
    gaussianBlur: { stdDeviation: number };
  };
  metrics: PipelineMetrics;
}

export interface PerformanceWarning {
  type: string;
  message: string;
  severity: 'warning' | 'error';
}

export const usePipelineData = (
  customConfig: GeometryConfig & VisualConfig
) => {
  const pipelineData = useMemo<PipelineData>(() => {
    const startTime = performance.now();
    
    const geometry: GeometryConfig = {
      width: customConfig.width,
      height: customConfig.height,
      radius: customConfig.radius,
      border: customConfig.border,
    };
    
    const visual: VisualConfig = {
      frost: customConfig.frost,
      blur: customConfig.blur,
      displace: customConfig.displace,
      scale: customConfig.scale,
      alpha: customConfig.alpha,
      lightness: customConfig.lightness,
      x: customConfig.x,
      y: customConfig.y,
      blend: customConfig.blend,
      r: customConfig.r,
      g: customConfig.g,
      b: customConfig.b,
    };
    
    const result = generateDisplacementMap(geometry, visual);
    const endTime = performance.now();
    
    return {
      ...result,
      metrics: {
        processingTime: (endTime - startTime).toFixed(2),
        svgSize: result.svgContent.length,
        dataUriSize: result.dataUri.length,
      },
    };
  }, [customConfig]);

  const performanceWarnings = useMemo<PerformanceWarning[]>(() => {
    const warnings: PerformanceWarning[] = [];
    
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
        severity: 'error',
      });
    } else if (maxScale > 200) {
      warnings.push({
        type: 'scale',
        message: `Displacement scale (${maxScale}) may impact performance on mobile devices`,
        severity: 'warning',
      });
    }
    
    // SVG size warnings
    if (pipelineData.metrics.svgSize > 50000) {
      warnings.push({
        type: 'size',
        message: `Large SVG displacement map (${(pipelineData.metrics.svgSize / 1024).toFixed(1)}KB)`,
        severity: 'warning',
      });
    }
    
    // Processing time warnings
    if (parseFloat(pipelineData.metrics.processingTime) > 5) {
      warnings.push({
        type: 'timing',
        message: `Slow processing time (${pipelineData.metrics.processingTime}ms)`,
        severity: 'warning',
      });
    }
    
    // Element size warnings
    const totalPixels = customConfig.width * customConfig.height;
    if (totalPixels > 200000) {
      warnings.push({
        type: 'resolution',
        message: `High resolution (${customConfig.width}×${customConfig.height}) may impact rendering performance`,
        severity: 'warning',
      });
    }
    
    return warnings;
  }, [customConfig, pipelineData.metrics]);

  return {
    pipelineData,
    performanceWarnings,
  };
};