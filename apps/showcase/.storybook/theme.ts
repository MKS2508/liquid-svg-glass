import { create } from 'storybook/theming';

/**
 * Professional Dark Theme for React Liquid Glass
 * Sophisticated design with carefully crafted color palette and typography
 */
export const liquidGlassProfessionalTheme = create({
  base: 'dark',
  
  // === BRAND IDENTITY ===
  brandTitle: 'React Liquid Glass',
  brandUrl: 'https://github.com/react-liquid-glass',
  brandTarget: '_self',
  brandImage: '../../../assets/logo.png',
  
  // === TYPOGRAPHY SYSTEM ===
  // Modern, readable fonts with excellent legibility
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", monospace',
  
  // === COLOR SYSTEM ===
  // Primary: Purple (#B392F0) - For key actions and selected states
  colorPrimary: '#B392F0',
  // Secondary: Pink/Red (#F87683) - For interactive elements and accents
  colorSecondary: '#F87683',
  
  // === APPLICATION BACKGROUND ===
  // Main app background: Deep purple-blue (#251B30)
  appBg: '#251B30',
  // Content areas: Slightly lighter for depth
  appContentBg: '#1e1527',
  // Preview area: Clean neutral for component showcase
  appPreviewBg: '#ffffff',
  // Borders: Subtle purple with transparency
  appBorderColor: 'rgba(179, 146, 240, 0.12)',
  appBorderRadius: 6,
  
  // === TEXT COLOR SYSTEM ===
  // Primary text: High contrast white with slight warmth
  textColor: '#f8f9fa',
  // Inverse text: Dark text for light backgrounds
  textInverseColor: '#251B30',
  // Muted text: Reduced opacity for secondary information
  textMutedColor: 'rgba(248, 249, 250, 0.65)',
  
  // === TOOLBAR & NAVIGATION ===
  // Toolbar text: Slightly muted for hierarchy
  barTextColor: 'rgba(248, 249, 250, 0.8)',
  // Selected items: Vibrant pink for clear selection
  barSelectedColor: '#F87683',
  // Hover states: Purple for interactive feedback
  barHoverColor: '#B392F0',
  // Toolbar background: Darker than main for depth
  barBg: '#1a1222',
  
  // === FORM CONTROLS ===
  // Input backgrounds: Subtle purple tint
  inputBg: 'rgba(179, 146, 240, 0.04)',
  // Input borders: Purple with transparency, elegant and subtle
  inputBorder: 'rgba(179, 146, 240, 0.2)',
  // Input text: High contrast for readability
  inputTextColor: '#f8f9fa',
  // Input styling: Consistent with overall design
  inputBorderRadius: 4,
  
  // === BOOLEAN CONTROLS ===
  // Toggle backgrounds: Subtle purple
  booleanBg: 'rgba(179, 146, 240, 0.08)',
  // Selected toggles: Full purple for clear state
  booleanSelectedBg: '#B392F0',
  
  // === GRID SYSTEM ===
  gridCellSize: 8,
  
  // === DOCS-SPECIFIC THEMING ===
  // Background for documentation pages
  docsBg: '#251B30',
  // Text color in documentation
  docsTextColor: '#f8f9fa',
  // Code block styling in docs
  docsCodeBg: 'rgba(179, 146, 240, 0.1)',
  docsCodeColor: '#B392F0',
  // Headings in docs
  docsHeadingColor: '#F87683',
  // Links in docs
  docsLinkColor: '#B392F0',
  // Tables in docs
  docsTableBorderColor: 'rgba(179, 146, 240, 0.2)',
  docsTableHeaderBg: 'rgba(179, 146, 240, 0.05)',
  
  // === ADDITIONAL PROFESSIONAL TOUCHES ===
  // Status colors for better UX
  addonNotesTheme: {
    backgroundColor: 'rgba(179, 146, 240, 0.05)',
    borderColor: 'rgba(179, 146, 240, 0.2)',
    textColor: '#f8f9fa',
  },
});

/**
 * Professional Light Theme for React Liquid Glass
 * Clean, accessible design optimized for daylight usage
 */
export const liquidGlassProfessionalLightTheme = create({
  base: 'light',
  
  // === BRAND IDENTITY ===
  brandTitle: 'React Liquid Glass',
  brandUrl: 'https://github.com/react-liquid-glass',
  brandTarget: '_self',
  brandImage: '../../../assets/logo.png',
  
  // === TYPOGRAPHY SYSTEM ===
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", monospace',
  
  // === COLOR SYSTEM ===
  // Primary: Purple (#B392F0) - Slightly darker for light theme contrast
  colorPrimary: '#8b5fbf',
  // Secondary: Pink/Red (#F87683) - Adjusted for light background
  colorSecondary: '#e85d70',
  
  // === APPLICATION BACKGROUND ===
  // Main app background: Pure white for maximum clarity
  appBg: '#ffffff',
  // Content areas: Very light gray for subtle depth
  appContentBg: '#fafbfc',
  // Preview area: White for component showcase
  appPreviewBg: '#ffffff',
  // Borders: Light purple with subtle presence
  appBorderColor: 'rgba(139, 95, 191, 0.15)',
  appBorderRadius: 6,
  
  // === TEXT COLOR SYSTEM ===
  // Primary text: Deep purple-blue for excellent readability
  textColor: '#251B30',
  // Inverse text: White for dark backgrounds
  textInverseColor: '#ffffff',
  // Muted text: Lighter purple-gray for secondary info
  textMutedColor: 'rgba(37, 27, 48, 0.7)',
  
  // === TOOLBAR & NAVIGATION ===
  // Toolbar text: Medium contrast for hierarchy
  barTextColor: 'rgba(37, 27, 48, 0.8)',
  // Selected items: Vibrant pink for clear selection
  barSelectedColor: '#e85d70',
  // Hover states: Purple for interactive feedback
  barHoverColor: '#8b5fbf',
  // Toolbar background: Light gray for definition
  barBg: '#f6f8fa',
  
  // === FORM CONTROLS ===
  // Input backgrounds: Pure white with subtle shadow
  inputBg: '#ffffff',
  // Input borders: Purple with good contrast
  inputBorder: 'rgba(139, 95, 191, 0.25)',
  // Input text: Dark for maximum readability
  inputTextColor: '#251B30',
  // Input styling: Clean and modern
  inputBorderRadius: 4,
  
  // === BOOLEAN CONTROLS ===
  // Toggle backgrounds: Light purple tint
  booleanBg: 'rgba(139, 95, 191, 0.08)',
  // Selected toggles: Full purple for clear state
  booleanSelectedBg: '#8b5fbf',
  
  // === GRID SYSTEM ===
  gridCellSize: 8,
  
  // === DOCS-SPECIFIC THEMING ===
  // Background for documentation pages
  docsBg: '#ffffff',
  // Text color in documentation
  docsTextColor: '#251B30',
  // Code block styling in docs
  docsCodeBg: 'rgba(139, 95, 191, 0.08)',
  docsCodeColor: '#8b5fbf',
  // Headings in docs
  docsHeadingColor: '#e85d70',
  // Links in docs
  docsLinkColor: '#8b5fbf',
  // Tables in docs
  docsTableBorderColor: 'rgba(139, 95, 191, 0.2)',
  docsTableHeaderBg: 'rgba(139, 95, 191, 0.05)',
  
  // === ADDITIONAL PROFESSIONAL TOUCHES ===
  addonNotesTheme: {
    backgroundColor: 'rgba(139, 95, 191, 0.03)',
    borderColor: 'rgba(139, 95, 191, 0.15)',
    textColor: '#251B30',
  },
});