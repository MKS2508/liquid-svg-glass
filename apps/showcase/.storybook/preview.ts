import type { Preview } from '@storybook/react-vite'
import '../src/index.css'
import '../src/utils/svg-filters.css'
import { liquidGlassProfessionalTheme } from './theme'
import { mdxComponents } from './mdx-components'
import { withDocsBackground } from './decorators'

const preview: Preview = {
  decorators: [withDocsBackground],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    // Docs theme configuration
    docs: {
      theme: liquidGlassProfessionalTheme,
      components: mdxComponents,
    },

    // Background options for testing components
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#251B30',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'glass',
          value: 'linear-gradient(135deg, rgba(179, 146, 240, 0.1), rgba(248, 118, 131, 0.1))',
        },
        {
          name: 'gradient-purple',
          value: 'linear-gradient(135deg, #251B30, #1a1222)',
        },
        {
          name: 'gradient-glass',
          value: 'linear-gradient(135deg, rgba(37, 27, 48, 0.9), rgba(179, 146, 240, 0.1))',
        },
      ],
      // Ensure docs also use backgrounds
      grid: false,
    },
    
    // Layout configuration for better docs experience
    layout: 'fullscreen',

    // Viewport configurations for responsive testing
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error' // Cambiado a 'error' para una mejor práctica en CI
    }
  },
};

export default preview;