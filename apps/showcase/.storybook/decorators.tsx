import React from 'react';
import type { StoryFn } from '@storybook/react';

/**
 * Global decorator to ensure consistent background theming
 * between Canvas and Docs modes
 */
export const withDocsBackground = (Story: StoryFn) => {
  React.useEffect(() => {
    // Ensure docs container has the right background
    const docsContainer = document.querySelector('.sbdocs');
    if (docsContainer) {
      (docsContainer as HTMLElement).style.backgroundColor = '#251B30';
    }
    
    // Also apply to the main container
    const mainContainer = document.querySelector('#storybook-docs');
    if (mainContainer) {
      (mainContainer as HTMLElement).style.backgroundColor = '#251B30';
    }
    
    // Apply to the root docs wrapper
    const docsWrapper = document.querySelector('.sbdocs-wrapper');
    if (docsWrapper) {
      (docsWrapper as HTMLElement).style.backgroundColor = '#251B30';
    }
  }, []);

  return <Story />;
};

/**
 * Decorator specifically for the GlassEffect component
 * to ensure optimal showcase environment
 */
export const withGlassEffectShowcase = (Story: StoryFn) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #251B30, #1a1222)',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Story />
    </div>
  );
};