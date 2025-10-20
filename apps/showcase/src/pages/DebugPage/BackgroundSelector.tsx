import React from 'react';
import './BackgroundSelector.css';

interface Background {
  name: string;
  label: string;
  color: string;
  description: string;
}

const backgrounds: Background[] = [
  {
    name: 'cyberpunk',
    label: 'Cyberpunk',
    color: '#667eea',
    description: 'Tech dashboard with purple gradients'
  },
  {
    name: 'dark',
    label: 'Dark',
    color: '#1a1a1a',
    description: 'Code editor with minimal black theme'
  },
  {
    name: 'light',
    label: 'Light',
    color: '#f8f9fa',
    description: 'Documentation with clean white theme'
  },
  {
    name: 'ocean',
    label: 'Ocean',
    color: '#4facfe',
    description: 'E-commerce with blue gradients'
  },
  {
    name: 'sunset',
    label: 'Sunset',
    color: '#f093fb',
    description: 'Social media with pink gradients'
  },
  {
    name: 'forest',
    label: 'Forest',
    color: '#43e97b',
    description: 'Portfolio with green gradients'
  },
  {
    name: 'cosmic',
    label: 'Cosmic',
    color: '#d299c2',
    description: 'Blog with pastel gradients'
  },
  {
    name: 'fire',
    label: 'Fire',
    color: '#ff9a9e',
    description: 'Dashboard with warm gradients'
  },
  {
    name: 'wavy',
    label: 'Wavy',
    color: '#38bdf8',
    description: 'Animated waves with simplex noise'
  }
];

interface BackgroundSelectorProps {
  selected: string;
  onChange: (background: string) => void;
}

export function BackgroundSelector({ selected, onChange }: BackgroundSelectorProps) {
  return (
    <div className="background-selector">
      <div className="selector-header">
        <h3>Background Theme</h3>
        <span className="selector-subtitle">
          Select a background to test glass effect with different visual contexts
        </span>
      </div>

      <div className="tabs-container">
        {backgrounds.map((bg) => (
          <button
            key={bg.name}
            className={`tab ${selected === bg.name ? 'active' : ''}`}
            onClick={() => onChange(bg.name)}
            title={bg.description}
          >
            <span
              className="color-dot"
              style={{ background: bg.color }}
            />
            <span className="tab-label">{bg.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default BackgroundSelector;
