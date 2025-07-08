import React, { useMemo } from 'react';
import type { GlassConfig } from '@liquid-svg-glass/core';
import type { GeometryConfig } from '@liquid-svg-glass/core';
import type { VisualConfig } from '@liquid-svg-glass/core';
import type { GlassEffectProps } from '../../types/GlassEffectProps';
import { glassEffectStyles, glassPresets } from './styles';
import { GlassLogger } from '@liquid-svg-glass/core';
import { generateDisplacementMap } from '@liquid-svg-glass/core';
import DraggableItem from '../DraggableItem';

/**
 * `GlassEffect` es un componente React que simula un efecto de "cristal líquido" en tiempo real.
 * Utiliza una combinación de `backdrop-filter` de CSS y filtros SVG complejos para lograr
 * refracción, aberración cromática y distorsión progresiva, creando una experiencia visual inmersiva.
 *
 * Este componente es altamente configurable y puede funcionar de forma estática, arrastrable,
 * o con un tamaño que se ajusta automáticamente al contenido.
 *
 * @component
 * @param {GlassEffectProps} props - Las propiedades para configurar el efecto de cristal líquido.
 * @returns {JSX.Element} Un elemento div que contiene el efecto de cristal líquido y su contenido.
 *
 * @example
 * // Uso básico con un preset predefinido
 * <GlassEffect preset="dock">
 *   <p>Contenido dentro del cristal</p>
 * </GlassEffect>
 *
 * @example
 * // Componente arrastrable con configuración personalizada
 * <GlassEffect draggable preset="free" width={300} height={150} blur={10} r={60} g={70} b={50}>
 *   <h3>Arrastra esto!</h3>
 * </GlassEffect>
 *
 * @example
 * // Con auto-ajuste de tamaño al contenido
 * <GlassEffect autoSize>
 *   <button>Este botón ajusta el tamaño del cristal</button>
 * </GlassEffect>
 */
const GlassEffect: React.FC<GlassEffectProps> = ({
  preset = 'dock',
  config: customConfig,
  children,
  draggable = true,
  initialPosition,
  className,
  onMove,
  onDragStart,
  onDragEnd,
  debug = false,
  // Individual props for granular control
  width,
  height,
  radius,
  frost,
  blur,
  displace,
  scale,
  border,
  alpha,
  lightness,
  x,
  y,
  blend,
  r,
  g,
  b,
}) => {
  const logger = useMemo(() => GlassLogger.createGlassLogger(debug), [debug]);
  
  // Merge preset, custom config, and individual props
  const currentConfig: GlassConfig = useMemo(() => {
    const baseConfig = preset ? glassPresets[preset] : glassPresets.dock; // Fallback to dock if no preset
    
    return {
      ...baseConfig,
      ...customConfig,
      ...(width !== undefined && { width }),
      ...(height !== undefined && { height }),
      ...(radius !== undefined && { radius }),
      ...(frost !== undefined && { frost }),
      ...(blur !== undefined && { blur }),
      ...(displace !== undefined && { displace }),
      ...(scale !== undefined && { scale }),
      ...(border !== undefined && { border }),
      ...(alpha !== undefined && { alpha }),
      ...(lightness !== undefined && { lightness }),
      ...(x !== undefined && { x }),
      ...(y !== undefined && { y }),
      ...(blend !== undefined && { blend }),
      ...(r !== undefined && { r }),
      ...(g !== undefined && { g }),
      ...(b !== undefined && { b }),
    };
  }, [preset, customConfig, width, height, radius, frost, blur, displace, scale, border, alpha, lightness, x, y, blend, r, g, b]);

  // Generate displacement map using SVG engine
  const { displacementDataUri, svgFilterAttributes } = useMemo(() => {
    const geometry: GeometryConfig = {
      width: currentConfig.width,
      height: currentConfig.height,
      radius: currentConfig.radius,
      border: currentConfig.border
    };

    const visual: VisualConfig = {
      frost: currentConfig.frost,
      displace: currentConfig.displace,
      scale: currentConfig.scale,
      alpha: currentConfig.alpha,
      lightness: currentConfig.lightness,
      blur: currentConfig.blur,
      x: currentConfig.x,
      y: currentConfig.y,
      blend: currentConfig.blend,
      r: currentConfig.r,
      g: currentConfig.g,
      b: currentConfig.b
    };

    // Log configuration application
    logger.logConfigApplication({
      preset,
      customProps: Object.keys(customConfig || {}),
      mergedConfig: currentConfig as unknown as Record<string, unknown>
    });

    // Use SVG engine to generate displacement map
    const result = generateDisplacementMap(geometry, visual);

    // Log SVG construction
    logger.logSVGConstruction({
      width: geometry.width,
      height: geometry.height,
      radius: geometry.radius,
      border: geometry.border,
      calculatedBorder: result.calculatedGeometry.calculatedBorder,
      blend: visual.blend,
      lightness: visual.lightness,
      alpha: visual.alpha,
      blur: visual.blur
    });

    // Log SVG encoding
    logger.logSVGDataURI(result.dataUri, result.svgContent);

    // Log filter attributes
    logger.logFilterOperation('displacement-map', result.filterAttributes as unknown as Record<string, unknown>);

    return {
      displacementDataUri: result.dataUri,
      svgFilterAttributes: result.filterAttributes
    };
  }, [currentConfig, preset, customConfig, logger]);

  // CSS variables for the component (scoped to this instance)
  const cssVariables = useMemo(() => ({
    '--width': currentConfig.width,
    '--height': currentConfig.height,
    '--radius': currentConfig.radius,
    '--frost': currentConfig.frost,
    '--output-blur': currentConfig.displace,
  } as React.CSSProperties), [currentConfig]);

  // Log detailed configuration summary
  useMemo(() => {
    logger.logGlassEffectSummary(currentConfig as unknown as Record<string, unknown>);
  }, [logger]);

  // Style for non-draggable glass effect
  const glassStyle = useMemo(() => ({
    ...cssVariables,
    height: `calc(var(--height) * 1px)`,
    width: `calc(var(--width) * 1px)`,
    borderRadius: `calc(var(--radius) * 1px)`,
    ...((!draggable && initialPosition) && {
      position: 'fixed' as const,
      zIndex: 1000,
      transform: `translate(${initialPosition.x}px, ${initialPosition.y}px)`
    })
  }), [cssVariables, currentConfig, draggable, initialPosition]);

  // Render content 
  const renderContent = () => (
    <div className={glassEffectStyles.navWrap}>
      <nav className={glassEffectStyles.nav}>
        {children}
      </nav>
    </div>
  );

  // If draggable, wrap with DraggableItem
  if (draggable) {
    return (
      <DraggableItem
        draggable={draggable}
        initialPosition={initialPosition}
        onMove={onMove}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className={className}
        debug={debug}
      >
        <div
          className={`${glassEffectStyles.container} ${glassEffectStyles.effect}`}
          data-preset={preset}
          data-debug={debug}
          style={glassStyle}
        >
          {renderContent()}
          <svg className={glassEffectStyles.filter} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="filter" colorInterpolationFilters="sRGB">
                <feImage
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  result="map"
                  href={displacementDataUri}
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="map"
                  id="redchannel"
                  xChannelSelector={svgFilterAttributes.red.xChannelSelector}
                  yChannelSelector={svgFilterAttributes.red.yChannelSelector}
                  scale={svgFilterAttributes.red.scale}
                  result="dispRed"
                />
                <feColorMatrix
                  in="dispRed"
                  type="matrix"
                  values="1 0 0 0 0
                          0 0 0 0 0
                          0 0 0 0 0
                          0 0 0 1 0"
                  result="red"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="map"
                  id="greenchannel"
                  xChannelSelector={svgFilterAttributes.green.xChannelSelector}
                  yChannelSelector={svgFilterAttributes.green.yChannelSelector}
                  scale={svgFilterAttributes.green.scale}
                  result="dispGreen"
                />
                <feColorMatrix
                  in="dispGreen"
                  type="matrix"
                  values="0 0 0 0 0
                          0 1 0 0 0
                          0 0 0 0 0
                          0 0 0 1 0"
                  result="green"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="map"
                  id="bluechannel"
                  xChannelSelector={svgFilterAttributes.blue.xChannelSelector}
                  yChannelSelector={svgFilterAttributes.blue.yChannelSelector}
                  scale={svgFilterAttributes.blue.scale}
                  result="dispBlue"
                />
                <feColorMatrix
                  in="dispBlue"
                  type="matrix"
                  values="0 0 0 0 0
                          0 0 0 0 0
                          0 0 1 0 0
                          0 0 0 1 0"
                  result="blue"
                />
                <feBlend in="red" in2="green" mode="screen" result="rg" />
                <feBlend in="rg" in2="blue" mode="screen" result="output" />
                <feGaussianBlur 
                  in="output" 
                  stdDeviation={svgFilterAttributes.gaussianBlur.stdDeviation}
                />
              </filter>
            </defs>
          </svg>
          {debug && (
            <div className={glassEffectStyles.displacementDebug}>
              <div className={glassEffectStyles.displacementImageLabel}>
                <span>displacement image</span>
                <svg viewBox="0 0 97 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M74.568 0.553803C74.0753 0.881909 73.6295 1.4678 73.3713 2.12401C73.1367 2.70991 72.3858 4.67856 71.6584 6.50658C70.9544 8.35803 69.4526 11.8031 68.3498 14.1936C66.1441 19.0214 65.839 20.2167 66.543 21.576C67.4581 23.3337 69.4527 23.9196 71.3064 22.9821C72.4797 22.3728 74.8965 19.5839 76.9615 16.4435C78.8387 13.5843 78.8387 13.6077 78.1113 18.3418C77.3369 23.4275 76.4687 26.2866 74.5915 30.0364C73.254 32.7316 71.8461 34.6299 69.218 37.3485C65.9563 40.6999 62.2254 42.9732 57.4385 44.4965C53.8718 45.6449 52.3935 45.8324 47.2546 45.8324C43.3594 45.8324 42.1158 45.7386 39.9805 45.2933C32.2604 43.7466 25.3382 40.9577 19.4015 36.9735C15.0839 34.0909 12.5028 31.7004 9.80427 27.9975C6.80073 23.9196 4.36038 17.2403 3.72682 11.475C3.37485 8.1471 3.1402 7.32683 2.43624 7.13934C0.770217 6.71749 0.183578 7.77211 0.0193217 11.5219C-0.26226 18.5996 2.55356 27.1304 7.17619 33.1066C13.8403 41.7545 25.432 48.4103 38.901 51.2696C41.6465 51.8555 42.2566 51.9023 47.4893 51.9023C52.3935 51.9023 53.426 51.832 55.5144 51.3867C62.2723 49.9337 68.5375 46.6292 72.949 42.1998C76.0464 39.1296 78.1113 36.2939 79.8946 32.7081C82.1942 28.0912 83.5317 23.3103 84.2591 17.17C84.3999 15.8576 84.6111 14.7795 84.7284 14.7795C84.8223 14.7795 85.4559 15.1311 86.1364 15.5763C88.037 16.7716 90.3835 17.8965 93.5748 19.0918C96.813 20.3339 97.3996 20.287 96.4141 18.9512C94.9123 16.9122 90.055 11.5219 87.1219 8.63926C84.0949 5.66288 83.8368 5.33477 83.5552 4.1864C83.3909 3.48332 83.0155 2.68649 82.6401 2.31151C82.0065 1.6553 80.4109 1.04595 79.9885 1.30375C79.8712 1.37406 79.2845 1.11626 78.6744 0.717845C77.2431 -0.172727 75.7413 -0.243024 74.568 0.553803Z" fill="currentColor"></path>
                </svg>
              </div>
            </div>
          )}
        </div>
      </DraggableItem>
    );
  }

  // Non-draggable version - standalone glass effect
  return (
    <div
      className={`${glassEffectStyles.container} ${glassEffectStyles.effect} ${className || ''}`}
      data-preset={preset}
      data-debug={debug}
      style={glassStyle}
    >
      {renderContent()}
      <svg className={glassEffectStyles.filter} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="filter" colorInterpolationFilters="sRGB">
            <feImage
              x="0"
              y="0"
              width="100%"
              height="100%"
              result="map"
              href={displacementDataUri}
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              id="redchannel"
              xChannelSelector={svgFilterAttributes.red.xChannelSelector}
              yChannelSelector={svgFilterAttributes.red.yChannelSelector}
              scale={svgFilterAttributes.red.scale}
              result="dispRed"
            />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              id="greenchannel"
              xChannelSelector={svgFilterAttributes.green.xChannelSelector}
              yChannelSelector={svgFilterAttributes.green.yChannelSelector}
              scale={svgFilterAttributes.green.scale}
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              id="bluechannel"
              xChannelSelector={svgFilterAttributes.blue.xChannelSelector}
              yChannelSelector={svgFilterAttributes.blue.yChannelSelector}
              scale={svgFilterAttributes.blue.scale}
              result="dispBlue"
            />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur 
              in="output" 
              stdDeviation={svgFilterAttributes.gaussianBlur.stdDeviation}
            />
          </filter>
        </defs>
      </svg>
      {debug && (
        <div className={glassEffectStyles.displacementDebug}>
          <div className={glassEffectStyles.displacementImageLabel}>
            <span>displacement image</span>
            <svg viewBox="0 0 97 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M74.568 0.553803C74.0753 0.881909 73.6295 1.4678 73.3713 2.12401C73.1367 2.70991 72.3858 4.67856 71.6584 6.50658C70.9544 8.35803 69.4526 11.8031 68.3498 14.1936C66.1441 19.0214 65.839 20.2167 66.543 21.576C67.4581 23.3337 69.4527 23.9196 71.3064 22.9821C72.4797 22.3728 74.8965 19.5839 76.9615 16.4435C78.8387 13.5843 78.8387 13.6077 78.1113 18.3418C77.3369 23.4275 76.4687 26.2866 74.5915 30.0364C73.254 32.7316 71.8461 34.6299 69.218 37.3485C65.9563 40.6999 62.2254 42.9732 57.4385 44.4965C53.8718 45.6449 52.3935 45.8324 47.2546 45.8324C43.3594 45.8324 42.1158 45.7386 39.9805 45.2933C32.2604 43.7466 25.3382 40.9577 19.4015 36.9735C15.0839 34.0909 12.5028 31.7004 9.80427 27.9975C6.80073 23.9196 4.36038 17.2403 3.72682 11.475C3.37485 8.1471 3.1402 7.32683 2.43624 7.13934C0.770217 6.71749 0.183578 7.77211 0.0193217 11.5219C-0.26226 18.5996 2.55356 27.1304 7.17619 33.1066C13.8403 41.7545 25.432 48.4103 38.901 51.2696C41.6465 51.8555 42.2566 51.9023 47.4893 51.9023C52.3935 51.9023 53.426 51.832 55.5144 51.3867C62.2723 49.9337 68.5375 46.6292 72.949 42.1998C76.0464 39.1296 78.1113 36.2939 79.8946 32.7081C82.1942 28.0912 83.5317 23.3103 84.2591 17.17C84.3999 15.8576 84.6111 14.7795 84.7284 14.7795C84.8223 14.7795 85.4559 15.1311 86.1364 15.5763C88.037 16.7716 90.3835 17.8965 93.5748 19.0918C96.813 20.3339 97.3996 20.287 96.4141 18.9512C94.9123 16.9122 90.055 11.5219 87.1219 8.63926C84.0949 5.66288 83.8368 5.33477 83.5552 4.1864C83.3909 3.48332 83.0155 2.68649 82.6401 2.31151C82.0065 1.6553 80.4109 1.04595 79.9885 1.30375C79.8712 1.37406 79.2845 1.11626 78.6744 0.717845C77.2431 -0.172727 75.7413 -0.243024 74.568 0.553803Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlassEffect;