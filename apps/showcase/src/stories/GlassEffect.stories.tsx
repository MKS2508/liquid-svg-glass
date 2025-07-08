/**
 * @file Historias refactorizadas para el componente GlassEffect.tsx
 * @author MKS
 */
import type { Meta, StoryObj } from '@storybook/react';

import { GlassEffect, type GlassEffectProps, glassPresets } from '@liquid-svg-glass/react';
import DynamicBackgroundGlassShowcase, { backgroundPresets } from '../components/DynamicBackgroundGlassShowcase';

// Extended props for stories that include background controls
interface ExtendedGlassEffectProps extends Omit<GlassEffectProps, 'children'> {
  backgroundType?: string;
  showDecorations?: boolean;
  contentType?: 'dashboard' | 'social' | 'ecommerce' | 'portfolio' | 'blog' | 'code' | 'docs';
  uiElementStyle?: 'glass' | 'solid' | 'outline' | 'minimal';
  children?: React.ReactNode;
}

const meta: Meta<ExtendedGlassEffectProps> = {
  title: 'Components/Interactive/GlassEffect',
  component: GlassEffect,
  tags: ['autodocs'],
  
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# GlassEffect Component

Componente avanzado de efecto de vidrio esmerilado (Glassmorphism) con las siguientes características:
- **4 presets**: 'dock', 'pill', 'bubble', 'free'.
- **Arrastrable**: Soporte completo para drag & drop con GSAP.
- **Configuración personalizable**: Control sobre 'frost', 'blur', 'displace', y colores RGB.
- **Animaciones fluidas**: Transiciones suaves y naturales.
- **Responsive**: Adaptable a diferentes tamaños de pantalla.
        `,
      },
    },
  },
  argTypes: {
    // ===== CONFIGURACIÓN PRINCIPAL =====
    preset: { 
      control: 'select', 
      options: ['dock', 'pill', 'bubble', 'free'],
      description: 'Preset predefinido que determina la configuración inicial del efecto. Cada preset tiene valores optimizados para diferentes casos de uso.',
      table: { 
        category: '🎯 Configuración Principal',
        type: { summary: "'dock' | 'pill' | 'bubble' | 'free'" },
        defaultValue: { summary: 'dock' }
      }
    },
    draggable: { 
      control: 'boolean',
      description: 'Permite que el elemento sea arrastrable usando GSAP Draggable. Habilita interacciones táctiles y de mouse.',
      table: { 
        category: '🎯 Configuración Principal',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    children: { 
      control: 'text',
      description: 'Contenido que se renderiza dentro del contenedor del efecto de vidrio.',
      table: { 
        category: '🎯 Configuración Principal',
        type: { summary: 'React.ReactNode' }
      }
    },
    initialPosition: { 
      control: 'object',
      description: 'Posición inicial del elemento arrastrable. Objeto con propiedades x e y.',
      table: { 
        category: '🎯 Configuración Principal',
        type: { summary: '{ x: number; y: number }' },
        defaultValue: { summary: '{ x: 50, y: 50 }' }
      }
    },

    // ===== DIMENSIONES Y LAYOUT =====
    width: { 
      control: { type: 'range', min: 50, max: 500, step: 10 },
      description: 'Ancho del contenedor del efecto en píxeles. Afecta el área de aplicación del filtro SVG.',
      table: { 
        category: '📐 Dimensiones y Layout',
        type: { summary: 'number' },
        defaultValue: { summary: '300' }
      }
    },
    height: { 
      control: { type: 'range', min: 50, max: 500, step: 10 },
      description: 'Alto del contenedor del efecto en píxeles. Determina la altura del área de distorsión.',
      table: { 
        category: '📐 Dimensiones y Layout',
        type: { summary: 'number' },
        defaultValue: { summary: '200' }
      }
    },
    radius: { 
      control: { type: 'range', min: 0, max: 250, step: 5 },
      description: 'Radio de las esquinas redondeadas en píxeles. Valores altos crean formas más circulares.',
      table: { 
        category: '📐 Dimensiones y Layout',
        type: { summary: 'number' },
        defaultValue: { summary: '24' }
      }
    },

    // ===== EFECTOS VISUALES PRINCIPALES =====
    frost: { 
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Intensidad del efecto de escarcha/hielo. Controla la opacidad del backdrop-filter blur.',
      table: { 
        category: '✨ Efectos Visuales',
        type: { summary: 'number (0-1)' },
        defaultValue: { summary: '0.25' }
      }
    },
    blur: { 
      control: { type: 'range', min: 0, max: 50, step: 1 },
      description: 'Intensidad del desenfoque de fondo en píxeles. Crea el efecto de vidrio esmerilado.',
      table: { 
        category: '✨ Efectos Visuales',
        type: { summary: 'number (0-50)' },
        defaultValue: { summary: '15' }
      }
    },
    displace: { 
      control: { type: 'range', min: 0, max: 2, step: 0.1 },
      description: 'Intensidad de la distorsión de píxeles. Valores altos crean más distorsión visual.',
      table: { 
        category: '✨ Efectos Visuales',
        type: { summary: 'number (0-2)' },
        defaultValue: { summary: '0.5' }
      }
    },

    // ===== ABERRACIÓN CROMÁTICA =====
    r: { 
      control: { type: 'range', min: 0, max: 255, step: 5 },
      description: 'Valor del canal rojo para la aberración cromática. Afecta el desplazamiento del color rojo.',
      table: { 
        category: '🌈 Aberración Cromática',
        type: { summary: 'number (0-255)' },
        defaultValue: { summary: '60' }
      }
    },
    g: { 
      control: { type: 'range', min: 0, max: 255, step: 5 },
      description: 'Valor del canal verde para la aberración cromática. Controla la separación del verde.',
      table: { 
        category: '🌈 Aberración Cromática',
        type: { summary: 'number (0-255)' },
        defaultValue: { summary: '70' }
      }
    },
    b: { 
      control: { type: 'range', min: 0, max: 255, step: 5 },
      description: 'Valor del canal azul para la aberración cromática. Determina el offset del azul.',
      table: { 
        category: '🌈 Aberración Cromática',
        type: { summary: 'number (0-255)' },
        defaultValue: { summary: '50' }
      }
    },
    x: { 
      control: 'select', 
      options: ['R', 'G', 'B'],
      description: 'Canal de color usado para el desplazamiento horizontal en la distorsión.',
      table: { 
        category: '🌈 Aberración Cromática',
        type: { summary: "'R' | 'G' | 'B'" },
        defaultValue: { summary: 'R' }
      }
    },
    y: { 
      control: 'select', 
      options: ['R', 'G', 'B'],
      description: 'Canal de color usado para el desplazamiento vertical en la distorsión.',
      table: { 
        category: '🌈 Aberración Cromática',
        type: { summary: "'R' | 'G' | 'B'" },
        defaultValue: { summary: 'G' }
      }
    },

    // ===== CONTROLES AVANZADOS =====
    scale: { 
      control: { type: 'range', min: -1000, max: 1000, step: 1 },
      description: 'Factor de escala para la distorsión. Valores negativos invierten el efecto.',
      table: { 
        category: '⚙️ Controles Avanzados',
        type: { summary: 'number (-1000 to 1000)' },
        defaultValue: { summary: '60' }
      }
    },
    border: { 
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'Opacidad del borde del contenedor. 0 = sin borde, 1 = borde completamente opaco.',
      table: { 
        category: '⚙️ Controles Avanzados',
        type: { summary: 'number (0-1)' },
        defaultValue: { summary: '0.2' }
      }
    },
    alpha: { 
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'Transparencia general del elemento. Afecta la opacidad de todo el componente.',
      table: { 
        category: '⚙️ Controles Avanzados',
        type: { summary: 'number (0-1)' },
        defaultValue: { summary: '0.8' }
      }
    },
    lightness: { 
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Luminosidad del fondo del contenedor. Afecta la claridad del vidrio.',
      table: { 
        category: '⚙️ Controles Avanzados',
        type: { summary: 'number (0-100)' },
        defaultValue: { summary: '85' }
      }
    },
    blend: { 
      control: 'select', 
      options: ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'],
      description: 'Modo de mezcla CSS aplicado al elemento. Determina cómo se combina con el fondo.',
      table: { 
        category: '⚙️ Controles Avanzados',
        type: { summary: 'CSS blend-mode' },
        defaultValue: { summary: 'multiply' }
      }
    },
    debug: { 
      control: 'boolean',
      description: 'Activa el modo debug para mostrar información de desarrollo y logs detallados.',
      table: { 
        category: '⚙️ Controles Avanzados',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },

    // ===== CONTROLES DE FONDO (Solo para stories) =====
    backgroundType: { 
      control: 'select', 
      options: backgroundPresets.map(bg => bg.name),
      description: 'Tipo de fondo para demostrar el efecto. Solo disponible en Storybook para pruebas.',
      table: { 
        category: '🖼️ Fondo de Demostración',
        type: { summary: 'string' }
      }
    },
    showDecorations: { 
      control: 'boolean',
      description: 'Muestra elementos decorativos en el fondo de demostración.',
      table: { 
        category: '🖼️ Fondo de Demostración',
        type: { summary: 'boolean' }
      }
    },
    contentType: {
      control: 'select',
      options: ['dashboard', 'social', 'ecommerce', 'portfolio', 'blog', 'code', 'docs'],
      description: 'Tipo de contenido mostrado en el fondo para simular diferentes contextos de uso.',
      table: { 
        category: '🖼️ Fondo de Demostración',
        type: { summary: "'dashboard' | 'social' | 'ecommerce' | 'portfolio' | 'blog' | 'code' | 'docs'" }
      }
    },
    uiElementStyle: {
      control: 'select',
      options: ['glass', 'solid', 'outline', 'minimal'],
      description: 'Estilo de los elementos UI en el fondo de demostración.',
      table: { 
        category: '🖼️ Fondo de Demostración',
        type: { summary: "'glass' | 'solid' | 'outline' | 'minimal'" }
      }
    },
  },
  args: {
    // Background defaults
    backgroundType: 'cyberpunk',
    showDecorations: true,
    
    // Component defaults
    preset: 'pill',
    draggable: true,
    children: 'Glass Effect',
    initialPosition: { x: 0, y: 0 },
    width: 200,
    height: 120,
    radius: 20,
    frost: 0.2,
    blur: 11,
    displace: 0.4,
    r: 50,
    g: 55,
    b: 45,
    debug: false,
    scale: glassPresets.pill.scale,
    border: glassPresets.pill.border,
    alpha: glassPresets.pill.alpha,
    lightness: glassPresets.pill.lightness,
    x: glassPresets.pill.x,
    y: glassPresets.pill.y,
    blend: glassPresets.pill.blend,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component that handles background props
const GlassEffectWithBackground = ({ backgroundType, showDecorations, contentType, uiElementStyle, ...glassProps }: any) => (
  <DynamicBackgroundGlassShowcase
    backgroundType={backgroundType}
    showDecorations={showDecorations}
    contentType={contentType}
    uiElementStyle={uiElementStyle}
  >
    <GlassEffect {...glassProps} />
  </DynamicBackgroundGlassShowcase>
);

export const Default: Story = {
  render: GlassEffectWithBackground,
};

export const Comparison: Story = {
  render: ({ backgroundType, showDecorations, contentType, uiElementStyle }: any) => (
    <DynamicBackgroundGlassShowcase
      backgroundType={backgroundType || 'ocean'}
      showDecorations={showDecorations}
      contentType={contentType}
      uiElementStyle={uiElementStyle}
    >
      <GlassEffect preset="dock" draggable initialPosition={{ x: -120, y: -50 }} width={140} height={80}>Dock</GlassEffect>
      <GlassEffect preset="pill" draggable initialPosition={{ x: 120, y: -50 }} width={160} height={60}>Pill</GlassEffect>
      <GlassEffect preset="bubble" draggable initialPosition={{ x: -120, y: 50 }} width={100} height={100}>💫</GlassEffect>
      <GlassEffect preset="free" draggable initialPosition={{ x: 120, y: 50 }} width={120} height={80}>Free</GlassEffect>
    </DynamicBackgroundGlassShowcase>
  ),
  args: {
    backgroundType: 'ocean',
    showDecorations: true,
  },
  parameters: { 
    controls: { 
      include: ['backgroundType', 'showDecorations', 'contentType', 'uiElementStyle']
    } 
  }
};

export const Playground: Story = {
  render: GlassEffectWithBackground,
  args: {
    backgroundType: 'cosmic',
    showDecorations: true,
    preset: 'free',
    draggable: true,
    children: 'Playground',
    width: 200,
    height: 120,
    radius: 24,
    frost: 0.25,
    blur: 15,
    displace: 0.8,
    r: 60,
    g: 65,
    b: 55,
    debug: true,
    scale: 12,
    border: 0.08,
    alpha: 0.9,
    lightness: 95,
    x: 'R',
    y: 'B',
    blend: 'screen',
  },
  
};

export const Gallery: Story = {
  render: ({ backgroundType, showDecorations, contentType, uiElementStyle }: any) => (
    <DynamicBackgroundGlassShowcase
      backgroundType={backgroundType || 'sunset'}
      showDecorations={showDecorations}
      contentType={contentType}
      uiElementStyle={uiElementStyle}
    >
      <GlassEffect preset="dock" draggable initialPosition={{ x: -200, y: -100 }} width={120} height={160}>
        <div className="text-center p-2">
          <div className="text-2xl mb-1">🎨</div>
          <div className="text-xs font-medium">Art</div>
        </div>
      </GlassEffect>
      
      <GlassEffect preset="pill" draggable initialPosition={{ x: 0, y: -120 }} width={140} height={100}>
        <div className="text-center p-2">
          <div className="text-xl mb-1">📸</div>
          <div className="text-xs font-medium">Photo</div>
        </div>
      </GlassEffect>
      
      <GlassEffect preset="bubble" draggable initialPosition={{ x: 200, y: -80 }} width={110} height={110}>
        <div className="text-center p-2">
          <div className="text-2xl mb-1">💎</div>
          <div className="text-xs font-medium">Gems</div>
        </div>
      </GlassEffect>
      
      <GlassEffect preset="free" draggable initialPosition={{ x: -80, y: 80 }} width={180} height={80}
                   blur={8} frost={0.15} r={70} g={45} b={60}>
        <div className="text-center p-2">
          <div className="text-lg mb-1">🌟</div>
          <div className="text-xs font-medium">Featured</div>
        </div>
      </GlassEffect>
      
      <GlassEffect preset="dock" draggable initialPosition={{ x: 150, y: 100 }} width={100} height={120}>
        <div className="text-center p-2">
          <div className="text-xl mb-1">🎭</div>
          <div className="text-xs font-medium">Theater</div>
        </div>
      </GlassEffect>
    </DynamicBackgroundGlassShowcase>
  ),
  args: {
    backgroundType: 'sunset',
    showDecorations: true,
  },
  parameters: { 
    controls: { 
      include: ['backgroundType', 'showDecorations', 'contentType', 'uiElementStyle']
    },
    docs: {
      description: {
        story: 'Gallery layout showcasing multiple glass elements as cards or tiles.'
      }
    }
  },
};