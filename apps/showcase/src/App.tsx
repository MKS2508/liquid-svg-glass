import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { GlassEffect } from '@liquid-svg-glass/react';
import SVGPipelineVisualizer from './components/SVGPipelineVisualizer';
import './App.css';

function App() {
  const [showVisualizer, setShowVisualizer] = useState(false);

  if (showVisualizer) {
    return <SVGPipelineVisualizer onBack={() => setShowVisualizer(false)} />;
  }

  return (
    <div className="app-container">
      <GlassEffect />
      <header className="app-header">
        <div className="logo-container">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>React Liquid Glass</h1>
        <p>Una aproximación al efecto de cristal líquido usando filtros SVG y mapas de desplazamiento.</p>
        <button 
          onClick={() => setShowVisualizer(true)}
          style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#646cff',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#535bf2';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#646cff';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          🔬 Open SVG Pipeline Visualizer
        </button>
      </header>
    </div>
  );
}

export default App;