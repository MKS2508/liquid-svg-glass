/**
 * @file Tipos relacionados con la geometría y las propiedades de la forma.
 * @description Define interfaces para dimensiones, posicionamiento y propiedades de la forma de los elementos.
 */

/**
 * Define las dimensiones de un elemento.
 */
export interface Dimensions {
  /** Ancho del elemento en píxeles. */
  width: number;
  /** Alto del elemento en píxeles. */
  height: number;
}

/**
 * Define la posición de un elemento en un espacio 2D.
 */
export interface Position {
  /** Coordenada X (horizontal) en píxeles. */
  x: number;
  /** Coordenada Y (vertical) en píxeles. */
  y: number;
}

/**
 * Define las propiedades de la forma de un elemento.
 */
export interface ShapeProperties {
  /**
   * Radio de las esquinas para bordes redondeados en píxeles.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius | MDN border-radius}
   */
  radius: number;
  /**
   * Grosor del "cristal" como porcentaje de la dimensión mínima (ancho o alto).
   * Utilizado para calcular las zonas de distorsión progresiva.
   * @see {@link https://github.com/your-username/react-liquid-glass/blob/main/definitive.md#%EF%B8%8F-la-ciencia-detr%C3%A1s-del-efecto | Zonas de Distorsión Progresiva en `definitive.md`}
   */
  border: number;
}

/**
 * Configuración combinada de geometría para el efecto de cristal.
 * @see {@link https://github.com/your-username/react-liquid-glass/blob/main/definitive.md#%EF%B8%8F-explicaci%C3%B3n-de-par%C3%A1metros-de-configuraci%C3%B3n | Parámetros de Geometría en `definitive.md`}
 */
export interface GeometryConfig extends Dimensions, ShapeProperties {
  // Las propiedades se heredan de Dimensions y ShapeProperties.
}

/**
 * Valores de geometría calculados internamente para el procesamiento del efecto.
 * @see {@link calculateBorderDimensions}
 */
export interface CalculatedGeometry extends GeometryConfig {
  /** El grosor del borde calculado en píxeles, basado en la propiedad `border`. */
  calculatedBorder: number;
  /** La dimensión mínima (ancho o alto) del elemento. */
  minDimension: number;
}