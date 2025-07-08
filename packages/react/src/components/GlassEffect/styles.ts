/**
 * @file Estilos para el componente GlassEffect.
 * @author MKS
 */

import styles from './glass-styles.module.scss';

export const glassEffectStyles = {
  container: styles.container,
  effect: styles.effect,
  content: styles.content,
  draggable: styles.draggable,
  filter: styles.filter,
  navWrap: styles.navWrap,
  nav: styles.nav,
  displacementDebug: styles.displacementDebug,
  displacementImageLabel: styles.displacementImageLabel,
} as const;

export const glassPresets = {
  dock: {
    width: 336,
    height: 96,
    radius: 16,
    frost: 0.05,
    displace: 0.2,
    scale: -180,
    border: 0.07,
    alpha: 0.93,
    lightness: 50,
    blur: 11,
    x: 'R' as const,
    y: 'B' as const,
    blend: 'difference' as const,
    r: 0,
    g: 10,
    b: 20,
  },
  
  pill: {
    width: 200,
    height: 80,
    radius: 40,
    frost: 0,
    displace: 0,
    scale: -180,
    border: 0.07,
    alpha: 0.93,
    lightness: 50,
    blur: 11,
    x: 'R' as const,
    y: 'B' as const,
    blend: 'difference' as const,
    r: 0,
    g: 10,
    b: 20,
  },
  
  bubble: {
    width: 140,
    height: 140,
    radius: 70,
    frost: 0,
    displace: 0,
    scale: -180,
    border: 0.07,
    alpha: 0.93,
    lightness: 50,
    blur: 11,
    x: 'R' as const,
    y: 'B' as const,
    blend: 'difference' as const,
    r: 0,
    g: 10,
    b: 20,
  },
  
  free: {
    width: 140,
    height: 280,
    radius: 80,
    frost: 0,
    displace: 0,
    scale: -300,
    border: 0.15,
    alpha: 0.74,
    lightness: 60,
    blur: 10,
    x: 'R' as const,
    y: 'B' as const,
    blend: 'difference' as const,
    r: 0,
    g: 10,
    b: 20,
  },
} as const;