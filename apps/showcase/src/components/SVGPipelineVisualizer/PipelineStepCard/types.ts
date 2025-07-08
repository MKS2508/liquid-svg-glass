
import type { GeometryConfig, VisualConfig } from '@liquid-svg-glass/core';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

// Agrupa todos los datos generados dinámicamente durante la ejecución del pipeline.
export interface LivePipelineData {
  dataUri: string;
  svgContent: string;
  calculatedGeometry: any; // Will be typed properly later
  filterAttributes: any; // Will be typed properly later
}

// Define la estructura para los datos de Entrada/Salida de cada nodo.
export interface NodeIOData {
  input: Record<string, any>;
  output: Record<string, any>;
}

// Representa los datos estáticos que definen un paso en el pipeline.
export interface PipelineNodeData {
  id: string;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  color: string;
  description: string;
  // El fragmento de código relevante para este paso (puede ser TS, SVG, CSS).
  codeSnippet: string;
  // Función para extraer los datos de I/O específicos de este nodo.
  getIOData: (pipelineData: LivePipelineData, customConfig: GeometryConfig & VisualConfig) => NodeIOData;
}

// Define todas las props que el componente PipelineStepCard recibirá.
export interface PipelineStepCardProps {
  node: PipelineNodeData;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  isExpanded: boolean;
  isAnimating: boolean;
  pipelineData?: LivePipelineData;
  customConfig: GeometryConfig & VisualConfig;
  onClick: () => void;
}
