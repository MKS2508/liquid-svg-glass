/**
 * @file Tipos para interacción y arrastre.
 * @description Define tipos para la configuración de arrastre con GSAP, callbacks y propiedades relacionadas con la interacción del usuario.
 */

import type { Position } from '@liquid-svg-glass/core';

/**
 * Configuración para la funcionalidad de arrastre (draggable) de un elemento.
 * @see {@link https://gsap.com/docs/v3/GSAP/Draggable/ | GSAP Draggable Docs}
 */
export interface DragConfiguration {
  /** Indica si el elemento es arrastrable. */
  draggable: boolean;
  /**
   * Define los límites dentro de los cuales el elemento puede ser arrastrado.
   * Puede ser un selector CSS, un elemento HTML o un objeto con propiedades `minX`, `maxX`, `minY`, `maxY`.
   */
  bounds?: string | HTMLElement;
  /**
   * Tipo de arrastre (por ejemplo, "x", "y", "x,y").
   * @default "x,y"
   */
  type?: string;
}

/**
 * Callbacks para los eventos de arrastre.
 * @see {@link https://gsap.com/docs/v3/GSAP/Draggable/ | GSAP Draggable Docs}
 */
export interface DragCallbacks {
  /**
   * Callback que se ejecuta mientras el elemento se está moviendo.
   * @param x - La posición X actual del elemento.
   * @param y - La posición Y actual del elemento.
   */
  onMove?: (x: number, y: number) => void;
  /**
   * Callback que se ejecuta al inicio del arrastre.
   * @param x - La posición X inicial del elemento.
   * @param y - La posición Y inicial del elemento.
   */
  onDragStart?: (x: number, y: number) => void;
  /**
   * Callback que se ejecuta al finalizar el arrastre.
   * @param x - La posición X final del elemento.
   * @param y - La posición Y final del elemento.
   */
  onDragEnd?: (x: number, y: number) => void;
}

/**
 * Propiedades combinadas para un componente arrastrable.
 */
export interface DraggableProps extends DragConfiguration, DragCallbacks {
  /** Posición inicial del elemento arrastrable. */
  initialPosition?: Position;
  /** Contenido hijo que se hará arrastrable. */
  children?: React.ReactNode;
  /** Clases CSS adicionales para el contenedor del elemento arrastrable. */
  className?: string;
  /** Habilita el modo de depuración para el componente arrastrable. */
  debug?: boolean;
}

/**
 * Representa una instancia de GSAP Draggable.
 * @see {@link https://gsap.com/docs/v3/GSAP/Draggable/ | GSAP Draggable Docs}
 */
export interface GSAPDragInstance {
  /** La posición X actual de la instancia arrastrable. */
  x: number;
  /** La posición Y actual de la instancia arrastrable. */
  y: number;
  /** Función para detener y limpiar la instancia de arrastre. */
  kill: () => void;
}