import { addons } from 'storybook/manager-api';
import { liquidGlassProfessionalTheme } from './theme';

addons.setConfig({
  theme: liquidGlassProfessionalTheme,
  
  // Additional professional configuration
  panelPosition: 'bottom',
  enableShortcuts: true,
  showToolbar: true,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
});