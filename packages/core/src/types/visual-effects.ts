/**
 * @file Tipos para efectos visuales y filtros SVG.
 * @description Define tipos para las propiedades de los efectos de cristal, filtros SVG y otras propiedades visuales.
 */

/**
 * Modos de mezcla CSS soportados para combinar capas en filtros SVG.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/blend-mode | MDN blend-mode}
 */
export type BlendMode =
  | 'normal' | 'multiply' | 'screen' | 'overlay'
  | 'darken' | 'lighten' | 'color-dodge' | 'color-burn'
  | 'hard-light' | 'soft-light' | 'difference' | 'exclusion'
  | 'hue' | 'saturation' | 'color' | 'luminosity'
  | 'plus-darker' | 'plus-lighter';

/**
 * Selectores de canal de color utilizados en filtros SVG (`feDisplacementMap`).
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap | MDN feDisplacementMap}
 */
export type ChannelSelector = 'R' | 'G' | 'B';

/**
 * Propiedades generales de los efectos visuales del cristal.
 * @see {@link https://github.com/your-username/react-liquid-glass/blob/main/definitive.md#%EF%B8%8F-explicaci%C3%B3n-de-par%C3%A1metros-de-configuraci%C3%B3n | Parámetros de Efectos Visuales en `definitive.md`}
 */
export interface VisualEffects {
  /**
   * Opacidad del fondo del elemento, simulando el "escarchado" del cristal (0-1).
   * Un valor de 0.15 significa 15% de opacidad.
   */
  frost: number;
  /**
   * Intensidad del desenfoque gaussiano final aplicado al resultado del filtro SVG.
   * Valores típicos: 0.1-2.0.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feGaussianBlur | MDN feGaussianBlur}
   */
  displace: number;
  /**
   * Escala base para el desplazamiento de píxeles en el filtro SVG.
   * A este valor se le suman los offsets individuales de los canales RGB para la aberración cromática.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap | MDN feDisplacementMap}
   */
  scale: number;
  /**
   * Opacidad de la zona central sólida del mapa de desplazamiento (0-1).
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl | MDN hsl()}
   */
  alpha: number;
  /**
   * Brillo de la zona central del mapa de desplazamiento en porcentaje HSL (0-100).
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl | MDN hsl()}
   */
  lightness: number;
  /**
   * Desenfoque en píxeles aplicado a la zona central del mapa de desplazamiento SVG.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur | MDN blur()}
   */
  blur: number;
}

/**
 * Configuración para simular la aberración cromática.
 * @see {@link https://github.com/your-username/react-liquid-glass/blob/main/definitive.md#%EF%B8%8F-aberraci%C3%B3n-crom%C3%A1tica-simulada | Aberración Cromática Simulada en `definitive.md`}
 */
export interface ChromaticAberration {
  /** Offset de escala para el canal rojo. */
  r: number;
  /** Offset de escala para el canal verde. */
  g: number;
  /** Offset de escala para el canal azul. */
  b: number;
}

/**
 * Configuración de los canales de color y el modo de mezcla para el filtro SVG.
 * @see {@link https://github.com/your-username/react-liquid-glass/blob/main/definitive.md#%EF%B8%8F-el-pipeline-svg-completo | El Pipeline SVG Completo en `definitive.md`}
 */
export interface ChannelConfiguration {
  /** Canal de color que controla el desplazamiento horizontal (X). */
  x: ChannelSelector;
  /** Canal de color que controla el desplazamiento vertical (Y). */
  y: ChannelSelector;
  /** Modo de mezcla CSS para combinar los gradientes en el mapa de desplazamiento SVG. */
  blend: BlendMode;
}

/**
 * Atributos calculados para los elementos del filtro SVG (`feDisplacementMap`, `feGaussianBlur`).
 * Estos valores se inyectan directamente en el SVG para controlar el efecto.
 */
export interface SVGFilterAttributes {
  /** Atributos para el canal rojo. */
  red: {
    xChannelSelector: ChannelSelector;
    yChannelSelector: ChannelSelector;
    scale: number;
  };
  /** Atributos para el canal verde. */
  green: {
    xChannelSelector: ChannelSelector;
    yChannelSelector: ChannelSelector;
    scale: number;
  };
  /** Atributos para el canal azul. */
  blue: {
    xChannelSelector: ChannelSelector;
    yChannelSelector: ChannelSelector;
    scale: number;
  };
  /** Atributos para el desenfoque gaussiano final. */
  gaussianBlur: {
    stdDeviation: number;
  };
}

/**
 * Configuración visual combinada para el efecto de cristal.
 * @see {@link https://github.com/your-username/react-liquid-glass/blob/main/definitive.md#%EF%B8%8F-explicaci%C3%B3n-de-par%C3%A1metros-de-configuraci%C3%B3n | Parámetros de Configuración en `definitive.md`}
 */
export interface VisualConfig extends VisualEffects, ChromaticAberration, ChannelConfiguration {
  // Las propiedades se heredan de VisualEffects, ChromaticAberration y ChannelConfiguration.
}