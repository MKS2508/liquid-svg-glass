import { BeautyLog } from './beauty-log.js'
import gsap from 'https://cdn.skypack.dev/gsap@3.13.0'
import Draggable from 'https://cdn.skypack.dev/gsap@3.13.0/Draggable'
gsap.registerPlugin(Draggable)

const config = {
  width: 336,
  height: 96,
  radius: 16,
  border: 0.07,
  lightness: 50,
  displace: 0.2,
  blend: 'difference',
  x: 'R',
  y: 'B',
  alpha: 0.93,
  blur: 11,
  r: 0,
  g: 10,
  b: 20,
  scale: -180,
  backgroundPreset: 'gradient-dark', // Default background preset
}

const backgroundPresets = [
  'gradient-dark',
  'gradient-light',
  'abstract-pattern',
  'original-grid',
];
let currentBackgroundIndex = 0;

const buildDisplacementImage = () => {
  BeautyLog.info('Starting SVG construction.', 'LIQUID GLASS');
  try {
    const border = Math.min(config.width, config.height) * (config.border * 0.5);
    BeautyLog.info(`Calculated border: ${border}`, 'LIQUID GLASS');

    const kids = `
      <svg class="displacement-image" viewBox="0 0 ${config.width} ${config.height}" xmlns="http://www.w3.org/2000/svg">
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
        <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="black"></rect>
        <!-- red linear -->
        <rect x="0" y="0" width="${config.width}" height="${config.height}" rx="${config.radius}" fill="url(#red)" />
        <!-- blue linear -->
        <rect x="0" y="0" width="${config.width}" height="${config.height}" rx="${config.radius}" fill="url(#blue)" style="mix-blend-mode: ${config.blend}" />
        <!-- block out distortion -->
        <rect x="${border}" y="${Math.min(config.width, config.height) * (config.border * 0.5)}" width="${config.width - border * 2}" height="${config.height - border * 2}" rx="${config.radius}" fill="hsl(0 0% ${config.lightness}% / ${config.alpha})" style="filter:blur(${config.blur}px)" />
      </svg>
    `;

    const debugPen = document.createElement('div');
    debugPen.innerHTML = kids;

    const svgEl = debugPen.querySelector('.displacement-image');
    if (!svgEl) {
      BeautyLog.error('SVG element .displacement-image not found in generated HTML.', 'LIQUID GLASS');
      return;
    }
    BeautyLog.info('SVG element found and ready for serialization.', 'LIQUID GLASS');

    const serialized = new XMLSerializer().serializeToString(svgEl);
    const encoded = encodeURIComponent(serialized);
    const dataUri = `data:image/svg+xml,${encoded}`;
    BeautyLog.info(`Generated data URI: ${dataUri.substring(0, 100)}...`, 'LIQUID GLASS');

    gsap.set('feImage', {
      attr: {
        href: dataUri,
      },
    });
    BeautyLog.info('feImage href attribute set.', 'LIQUID GLASS');

    gsap.set('feDisplacementMap', {
      attr: {
        xChannelSelector: config.x,
        yChannelSelector: config.y,
      },
    });
    BeautyLog.info(`feDisplacementMap X-channel selector set to ${config.x} and Y-channel selector set to ${config.y}.`, 'LIQUID GLASS');
    BeautyLog.success('buildDisplacementImage: SVG construction completed successfully.', 'LIQUID GLASS');
  } catch (e) {
    BeautyLog.error(`buildDisplacementImage: An error occurred: ${e.message}`, 'LIQUID GLASS');
  }
};

const update = () => {
  BeautyLog.info('Applying effect configurations.', 'LIQUID GLASS');
  buildDisplacementImage();
  const descriptions = {
    width: 'Ancho del efecto en píxeles',
    height: 'Alto del efecto en píxeles',
    radius: 'Radio de borde del efecto en píxeles',
    border: 'Grosor del borde como porcentaje (0-1)',
    lightness: 'Luminosidad del color de fondo (0-100)',
    displace: 'Intensidad del desenfoque de salida (desplazamiento)',
    blend: 'Modo de mezcla para el mapa de desplazamiento SVG',
    x: 'Canal de color para el desplazamiento horizontal (R, G, B)',
    y: 'Canal de color para el desplazamiento vertical (R, G, B)',
    alpha: 'Opacidad del fondo (0-1)',
    blur: 'Desenfoque de entrada en píxeles',
    r: 'Ajuste de escala para el canal rojo (aberración cromática)',
    g: 'Ajuste de escala para el canal verde (aberración cromática)',
    b: 'Ajuste de escala para el canal azul (aberración cromática)',
    scale: 'Escala base del desplazamiento (intensidad general)',
    backgroundPreset: 'Preset de fondo actual',
  };
  const customPropertyStyles = {
    width: {
      key: { background: 'rgba(0,0,0,0.25)', color: '#d2e4ff', fontWeight: '500', padding: '5px 14px', borderRadius: '6px', borderLeft: '4px solid #00e0ff', fontFamily: "'Fira Code', 'Consolas', monospace", textShadow: '0 0 2px rgba(0, 255, 255, 0.2)' },
      value: { background: 'rgba(0,0,0,0.25)', color: '#d2e4ff', fontWeight: '500', padding: '5px 14px', borderRadius: '6px', borderLeft: '4px solid #00e0ff', fontFamily: "'Fira Code', 'Consolas', monospace", textShadow: '0 0 2px rgba(0, 255, 255, 0.2)' },
      description: { background: 'rgba(0,0,0,0.25)', color: '#d2e4ff', fontStyle: 'normal', fontSize: '1.05em', padding: '5px 14px', borderRadius: '6px', marginLeft: '12px', borderLeft: '4px solid #00e0ff', fontWeight: '500', fontFamily: "'Fira Code', 'Consolas', monospace", textShadow: '0 0 2px rgba(0, 255, 255, 0.2)' }
    }
  };
  BeautyLog.logObject(config, '✨ LIQUID GLASS EFFECT CONFIGURATION ✨', '', descriptions, customPropertyStyles);
  
  // Apply background preset
  document.body.dataset.backgroundPreset = config.backgroundPreset;
  BeautyLog.info(`Background preset set to: ${config.backgroundPreset}`, 'LIQUID GLASS');

  gsap.set(document.documentElement, {
    '--width': config.width,
    '--height': config.height,
    '--radius': config.radius,
    '--frost': config.frost,
    '--output-blur': config.displace,
  });
  BeautyLog.info(`CSS variables set: --width=${config.width}, --height=${config.height}, --radius=${config.radius}, --frost=${config.frost}, --output-blur=${config.displace}`, 'LIQUID GLASS');

  gsap.set('feDisplacementMap', {
    attr: {
      scale: config.scale,
    },
  });
  BeautyLog.info(`feDisplacementMap scale set to ${config.scale}.`, 'LIQUID GLASS');

  gsap.set('#redchannel', {
    attr: {
      scale: config.scale + config.r,
    },
  });
  BeautyLog.info(`redchannel scale set to ${config.scale + config.r}.`, 'LIQUID GLASS');

  gsap.set('#greenchannel', {
    attr: {
      scale: config.scale + config.g,
    },
  });
  BeautyLog.info(`greenchannel scale set to ${config.scale + config.g}.`, 'LIQUID GLASS');

  gsap.set('#bluechannel', {
    attr: {
      scale: config.scale + config.b,
    },
  });
  BeautyLog.info(`bluechannel scale set to ${config.scale + config.b}.`, 'LIQUID GLASS');

  gsap.set('feGaussianBlur', {
    attr: {
      stdDeviation: config.displace,
    },
  });
  BeautyLog.info(`feGaussianBlur stdDeviation set to ${config.displace}.`, 'LIQUID GLASS');
  BeautyLog.success('Effect configurations applied successfully.', 'LIQUID GLASS');
};

const cycleBackground = () => {
  currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundPresets.length;
  config.backgroundPreset = backgroundPresets[currentBackgroundIndex];
  document.body.dataset.backgroundPreset = config.backgroundPreset;
  BeautyLog.info(`Cycling background to: ${config.backgroundPreset}`, 'LIQUID GLASS');
};

document.addEventListener('DOMContentLoaded', () => {
  BeautyLog.info('DOM fully loaded and parsed.', 'LIQUID GLASS');
  update()
  Draggable.create('.effect', {
    type: 'x,y',
    onDragStart: () => BeautyLog.info('Drag started', 'LIQUID GLASS'),
    onDrag: () => BeautyLog.info('Dragging', 'LIQUID GLASS'),
    onDragEnd: () => BeautyLog.info('Drag ended', 'LIQUID GLASS'),
  });
  BeautyLog.success('Draggable: Initialized for .effect', 'LIQUID GLASS');
  gsap.set('.effect', { opacity: 1 });
  BeautyLog.success('Effect element opacity set to 1.', 'LIQUID GLASS');

  // Initialize background
  document.body.dataset.backgroundPreset = config.backgroundPreset;

  // Add event listener for background toggle button
  const backgroundToggleButton = document.getElementById('backgroundToggle');
  if (backgroundToggleButton) {
    backgroundToggleButton.addEventListener('click', cycleBackground);
    BeautyLog.info('Background toggle button event listener added.', 'LIQUID GLASS');
  } else {
    BeautyLog.warn('Background toggle button not found.', 'LIQUID GLASS');
  }
});
