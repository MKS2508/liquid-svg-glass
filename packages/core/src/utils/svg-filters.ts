/**
 * @file SVG Filter Engine for Liquid Glass Effect
 * @description Framework-agnostic pure functions for SVG filter generation and manipulation.
 * These utilities are fundamental for liquid glass effect processing.
 * 
 * @fileoverview Motor de Filtros SVG para el Efecto de Cristal Líquido.
 * Funciones puras y agnósticas al framework para la generación y manipulación de filtros SVG.
 * Estas utilidades son fundamentales para el procesamiento del efecto de cristal.
 * 
 * @version 2.0.0
 * @author Liquid Glass Team
 * @since 1.0.0
 */

import type { GeometryConfig, CalculatedGeometry } from '../types/geometry';
import type { VisualConfig, SVGFilterAttributes } from '../types/visual-effects';

//#region CÁLCULOS DE BORDE

/**
 * Calculate border dimensions based on geometry configuration.
 * Determines the size of the central "glass" zone that has minimal distortion.
 * 
 * Calcula las dimensiones del borde basándose en la configuración de geometría.
 * Esta función determina el tamaño de la zona central del "cristal" que tiene una distorsión mínima.
 * 
 * @param {GeometryConfig} geometry - Geometry configuration including width, height, and border percentage
 *                                   Configuración de geometría que incluye ancho, alto y el porcentaje de borde
 * @returns {CalculatedGeometry} Object extending `GeometryConfig` with `calculatedBorder` and `minDimension`
 *                              Objeto que extiende `GeometryConfig` con `calculatedBorder` y `minDimension`
 * 
 * @example
 * ```typescript
 * const geometry = { width: 300, height: 150, radius: 12, border: 0.1 };
 * const calculated = calculateBorderDimensions(geometry);
 * // Result: { width: 300, height: 150, radius: 12, border: 0.1, calculatedBorder: 7.5, minDimension: 150 }
 * ```
 * 
 * @operation BORDER_CALC
 * @performance O(1) - Single calculation
 * @since 1.0.0
 * @see {@link https://github.com/your-username/react-liquid-glass/blob/main/definitive.md#%EF%B8%8F-zonas-de-distorsi%C3%B3n-progresiva | Zonas de Distorsión Progresiva}
 */
export function calculateBorderDimensions(geometry: GeometryConfig): CalculatedGeometry {
  const { width, height, border } = geometry;
  const minDimension = Math.min(width, height);
  const calculatedBorder = minDimension * (border * 0.5);
  
  return {
    ...geometry,
    calculatedBorder,
    minDimension
  };
}
//#endregion

//#region GENERACIÓN DE CONTENIDO SVG

/**
 * Generate displacement map SVG content.
 * This SVG is used as `feImage` in the main filter to control pixel distortion.
 * Includes gradients for red and blue channels, and a central rectangle for minimal distortion zone.
 * 
 * Genera el contenido SVG del mapa de desplazamiento.
 * Este SVG se utiliza como `feImage` en el filtro principal para controlar la distorsión de píxeles.
 * Incluye gradientes para los canales rojo y azul, y un rectángulo central para la zona de menor distorsión.
 * 
 * @param {CalculatedGeometry} geometry - Calculated element geometry / Geometría calculada del elemento
 * @param {Pick<VisualConfig, 'lightness' | 'alpha' | 'blur' | 'blend'>} visual - Visual properties relevant to displacement map
 *                                                                               Propiedades visuales relevantes para el mapa de desplazamiento
 * @returns {string} String representing the displacement map SVG content
 *                  Cadena que representa el contenido SVG del mapa de desplazamiento
 * 
 * @example
 * ```typescript
 * const geometry = { width: 200, height: 100, radius: 8, border: 0.1, calculatedBorder: 5, minDimension: 100 };
 * const visual = { lightness: 90, alpha: 0.8, blur: 2, blend: 'screen' };
 * const svg = buildDisplacementSVG(geometry, visual);
 * // Returns: '<svg class="displacement-image" viewBox="0 0 200 100">...</svg>'
 * ```
 * 
 * @operation SVG_CONSTRUCTION
 * @performance O(1) - Template string construction
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feImage | MDN feImage}
 * @see {@link https://github.com/your-username/react-liquid-glass/blob/main/definitive.md#%EF%B8%8F-generaci%C3%B3n-del-displacement-map | Displacement Map Generation}
 */
export function buildDisplacementSVG(
  geometry: CalculatedGeometry,
  visual: Pick<VisualConfig, 'lightness' | 'alpha' | 'blur' | 'blend'>
): string {
  const { width, height, radius, calculatedBorder } = geometry;
  const { lightness, alpha, blur, blend } = visual;
  
  return `<svg class="displacement-image" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#0000"/>
      <stop offset="100%" stop-color="red"/>
    </linearGradient>
    <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0000"/>
      <stop offset="100%" stop-color="blue"/>
    </linearGradient>
  </defs>
  <!-- backdrop -->
  <rect x="0" y="0" width="${width}" height="${height}" fill="black"></rect>
  <!-- red linear -->
  <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#red)" />
  <!-- blue linear -->
  <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#blue)" style="mix-blend-mode: ${blend}" />
  <!-- block out distortion -->
  <rect x="${calculatedBorder}" y="${calculatedBorder}" width="${width - calculatedBorder * 2}" height="${height - calculatedBorder * 2}" rx="${radius}" fill="hsl(0 0% ${lightness}% / ${alpha})" style="filter:blur(${blur}px)" />
</svg>`;
}

/**
 * Encode SVG string as Data URI.
 * Allows embedding SVG directly in HTML/CSS attributes like `href` or `url()`.
 * 
 * Codifica una cadena SVG en un URI de datos (Data URI).
 * Esto permite incrustar el SVG directamente en atributos HTML/CSS como `href` o `url()`.
 * 
 * @param {string} svgContent - SVG string to encode / Cadena SVG a codificar
 * @returns {string} Resulting Data URI (e.g., `data:image/svg+xml,...`)
 *                  Data URI resultante (ej., `data:image/svg+xml,...`)
 * 
 * @example
 * ```typescript
 * const svg = '<svg><rect fill="red"/></svg>';
 * const dataUri = encodeDataURI(svg);
 * // Returns: 'data:image/svg+xml,%3Csvg%3E%3Crect%20fill%3D%22red%22%2F%3E%3C%2Fsvg%3E'
 * 
 * // Usage in CSS:
 * // background-image: url('data:image/svg+xml,%3Csvg...');
 * // or feImage href="data:image/svg+xml,%3Csvg..."
 * ```
 * 
 * @operation SVG_ENCODING
 * @performance O(n) where n is SVG content length
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs | MDN Data URIs}
 */
export function encodeDataURI(svgContent: string): string {
  const encoded = encodeURIComponent(svgContent);
  return `data:image/svg+xml,${encoded}`;
}
//#endregion

//#region ATRIBUTOS DEL FILTRO

/**
 * Generate necessary attributes for SVG filter elements (`feDisplacementMap`, `feGaussianBlur`).
 * Includes color channel configuration and scale for chromatic aberration.
 * 
 * Genera los atributos necesarios para los elementos del filtro SVG (`feDisplacementMap`, `feGaussianBlur`).
 * Incluye la configuración de los canales de color y la escala para la aberración cromática.
 * 
 * @param {VisualConfig} visual - Complete visual effect configuration / Configuración visual completa del efecto
 * @returns {SVGFilterAttributes} Object with attributes for red, green, blue channels and gaussian blur
 *                               Objeto con los atributos para los canales rojo, verde, azul y el desenfoque gaussiano
 * 
 * @example
 * ```typescript
 * const visual = {
 *   x: 'R', y: 'B', scale: 10, r: 50, g: 55, b: 45, displace: 0.4,
 *   frost: 0.15, blur: 2, alpha: 0.95, lightness: 100, blend: 'screen'
 * };
 * const attributes = generateFilterAttributes(visual);
 * // Returns: {
 * //   red: { xChannelSelector: 'R', yChannelSelector: 'B', scale: 60 },
 * //   green: { xChannelSelector: 'R', yChannelSelector: 'B', scale: 65 },
 * //   blue: { xChannelSelector: 'R', yChannelSelector: 'B', scale: 55 },
 * //   gaussianBlur: { stdDeviation: 0.4 }
 * // }
 * ```
 * 
 * @operation FILTER_OPERATION
 * @performance O(1) - Simple object construction
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap | MDN feDisplacementMap}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feGaussianBlur | MDN feGaussianBlur}
 * @see {@link https://github.com/your-username/react-liquid-glass/blob/main/definitive.md#%EF%B8%8F-el-filtro-svg-principal | Main SVG Filter}
 * @see {@link https://github.com/your-username/react-liquid-glass/blob/main/definitive.md#%EF%B8%8F-aberraci%C3%B3n-crom%C3%A1tica-simulada | Simulated Chromatic Aberration}
 */
export function generateFilterAttributes(visual: VisualConfig): SVGFilterAttributes {
  const { x, y, scale, r, g, b, displace } = visual;
  
  return {
    red: {
      xChannelSelector: x,
      yChannelSelector: y,
      scale: scale + r,
    },
    green: {
      xChannelSelector: x,
      yChannelSelector: y,
      scale: scale + g,
    },
    blue: {
      xChannelSelector: x,
      yChannelSelector: y,
      scale: scale + b,
    },
    gaussianBlur: {
      stdDeviation: displace,
    },
  };
}
//#endregion

//#region PIPELINE COMPLETO

/**
 * Execute complete pipeline to generate SVG displacement map and filter attributes.
 * Orchestrates geometry calculation, SVG construction, encoding, and attribute generation steps.
 * 
 * Ejecuta el pipeline completo para generar el mapa de desplazamiento SVG y sus atributos de filtro.
 * Esta función orquesta los pasos de cálculo de geometría, construcción del SVG, codificación y generación de atributos.
 * 
 * @param {GeometryConfig} geometry - Effect geometry configuration / Configuración de geometría del efecto
 * @param {VisualConfig} visual - Effect visual configuration / Configuración visual del efecto
 * @returns {DisplacementMapResult} Object containing SVG Data URI, content, calculated geometry, and filter attributes
 *                                 Objeto que contiene el Data URI del SVG, contenido, geometría calculada y atributos del filtro
 * 
 * @example
 * ```typescript
 * // Basic usage - Uso básico
 * const geometry = { width: 300, height: 150, radius: 12, border: 0.08 };
 * const visual = {
 *   frost: 0.15, blur: 11, displace: 0.4, scale: 10, alpha: 0.95, lightness: 100,
 *   x: 'R', y: 'B', blend: 'screen', r: 50, g: 55, b: 45
 * };
 * 
 * const result = generateDisplacementMap(geometry, visual);
 * 
 * console.log(result.dataUri);           // "data:image/svg+xml,..."
 * console.log(result.svgContent);        // "<svg class='displacement-image'>..."
 * console.log(result.calculatedGeometry.calculatedBorder); // 6
 * console.log(result.filterAttributes.red.scale);          // 60
 * 
 * // Using in React component
 * <feImage href={result.dataUri} result="map" />
 * <feDisplacementMap 
 *   in="SourceGraphic" 
 *   in2="map"
 *   scale={result.filterAttributes.red.scale}
 *   xChannelSelector={result.filterAttributes.red.xChannelSelector}
 *   yChannelSelector={result.filterAttributes.red.yChannelSelector}
 * />
 * ```
 * 
 * @operation PIPELINE_EXECUTION
 * @performance O(n) where n is SVG content length for encoding step
 * @since 1.0.0
 * @see {@link https://github.com/your-username/react-liquid-glass/blob/main/definitive.md#%EF%B8%8F-flujo-de-ejecuci%C3%B3n-completo | Complete Execution Flow}
 */
export function generateDisplacementMap(
  geometry: GeometryConfig,
  visual: VisualConfig
): {
  dataUri: string;
  svgContent: string;
  calculatedGeometry: CalculatedGeometry;
  filterAttributes: SVGFilterAttributes;
} {
  // Paso 1: Calcular geometría
  const calculatedGeometry = calculateBorderDimensions(geometry);
  
  // Paso 2: Construir contenido SVG
  const svgContent = buildDisplacementSVG(calculatedGeometry, visual);
  
  // Paso 3: Codificar como Data URI
  const dataUri = encodeDataURI(svgContent);
  
  // Paso 4: Generar atributos del filtro
  const filterAttributes = generateFilterAttributes(visual);
  
  return {
    dataUri,
    svgContent,
    calculatedGeometry,
    filterAttributes
  };
}
//#endregion

//#region EXPORTACIONES DE TIPOS

/**
 * Data used for displacement map SVG generation.
 * Datos utilizados para la generación del SVG del mapa de desplazamiento.
 * 
 * @interface SVGGenerationData
 * @since 1.0.0
 */
export interface SVGGenerationData {
  /** Element width in pixels / Ancho del elemento en píxeles */
  width: number;
  /** Element height in pixels / Alto del elemento en píxeles */
  height: number;
  /** Border radius in pixels / Radio del borde en píxeles */
  radius: number;
  /** Border thickness as percentage / Grosor del borde como porcentaje */
  border: number;
  /** Calculated border thickness in pixels / Grosor calculado del borde en píxeles */
  calculatedBorder: number;
  /** CSS blend mode for gradient combination / Modo de mezcla CSS para combinación de gradientes */
  blend: string;
  /** HSL lightness percentage (0-100) / Porcentaje de brillo HSL (0-100) */
  lightness: number;
  /** Alpha transparency (0-1) / Transparencia alfa (0-1) */
  alpha: number;
  /** Blur amount in pixels / Cantidad de desenfoque en píxeles */
  blur: number;
}

/**
 * Data related to SVG encoding as Data URI.
 * Datos relacionados con la codificación del SVG en un Data URI.
 * 
 * @interface SVGEncodingData
 * @since 1.0.0
 */
export interface SVGEncodingData {
  /** Complete Data URI string / Cadena Data URI completa */
  dataUri: string;
  /** Raw SVG content / Contenido SVG sin procesar */
  svgContent: string;
  /** Data URI string length / Longitud de la cadena Data URI */
  dataUriLength: number;
  /** SVG content string length / Longitud de la cadena de contenido SVG */
  svgContentLength: number;
}
//#endregion