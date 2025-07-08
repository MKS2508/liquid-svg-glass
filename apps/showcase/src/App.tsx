import { useState } from 'react';
import githubIcon from './assets/github_good.png';
import storybookIcon from './assets/storybook-icon.svg';
import npmIcon from './assets/npm.svg';
import yarnIcon from './assets/yarn-logo.png';
import pnpmIcon from './assets/pnpmlogo.svg';
import { GlassEffect } from '@liquid-svg-glass/react';
import SVGPipelineVisualizer from './components/SVGPipelineVisualizer';
import PackageManagerSelector from './components/PackageManagerSelector';
import { CodeBlock } from './components/SyntaxHighlighter';
import './App.css';

interface NavButtonProps {
    href?: string;
    onClick?: () => void;
    icon: string;
    title: string;
    description: string;
    color: string;
}

const NavButton = ({ href, onClick, icon, title, description, color }: NavButtonProps) => {
    const baseStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem 1rem',
        backgroundColor: 'rgba(179, 146, 240, 0.08)',
        color: 'white',
        border: `2px solid rgba(179, 146, 240, 0.2)`,
        borderRadius: '0.75rem',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        textAlign: 'center' as const,
        backdropFilter: 'blur(10px)',
        minHeight: '120px',
    };

    const hoverStyle = {
        ...baseStyle,
        backgroundColor: `${color}20`,
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 25px ${color}40`,
    };

    const [isHovered, setIsHovered] = useState(false);

    const content = (
        <>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                <img src={icon} alt={`${title} icon`} style={{ width: '2rem', height: '2rem' }} loading="lazy" />
            </div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.25rem', margin: 0 }}>{title}</h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0 }}>{description}</p>
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                target={href.startsWith('http') ? '_blank' : '_self'}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={isHovered ? hoverStyle : baseStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            onClick={onClick}
            style={isHovered ? hoverStyle : baseStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {content}
        </button>
    );
};

function App() {
    const [showVisualizer, setShowVisualizer] = useState(false);

    if (showVisualizer) {
        return <SVGPipelineVisualizer onBack={() => setShowVisualizer(false)} />;
    }

    return (
        <main className="app-container">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
                <ol>
                    <li><a href="/">Home</a></li>
                    <li aria-current="page">SVG Liquid Glass</li>
                </ol>
            </nav>
            <header className="app-header">
                <div className="glass-demo-container">
                    <GlassEffect preset="dock" draggable width={240} height={100}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            padding: '1rem'
                        }}>
                            🎨 Live Demo
                            <br />
                            <small style={{ fontSize: '0.8rem', opacity: 0.8 }}>Drag me!</small>
                        </div>
                    </GlassEffect>
                </div>
                <h1>SVG Liquid Glass</h1>
                <p>Crea efectos de cristal líquido realistas con mapas de desplazamiento SVG y aberración cromática. Biblioteca de componentes React moderna, fácil de usar y personalizable.</p>
            </header>

            <section className="content-section" aria-labelledby="installation-section">
                <h2 id="installation-section" className="visually-hidden">Installation</h2>
                <PackageManagerSelector />

                <div style={{
                    maxWidth: '600px',
                    width: '100%'
                }}>
                    <CodeBlock
                        language="tsx"
                        title="Quick Example"
                        showLineNumbers={false}
                    >
                        {`import { GlassEffect } from '@liquid-svg-glass/react';

function App() {
  return (
    <GlassEffect preset="dock" draggable>
      <nav>Your glassmorphic content</nav>
    </GlassEffect>
  );
}`}
                    </CodeBlock>
                </div>
            </section>


            <section className="faq-section" aria-labelledby="faq-section">
                <h2 id="faq-section">Preguntas Frecuentes</h2>
                <div className="faq-grid">
                    <div className="faq-item">
                        <h3>¿Qué es SVG Liquid Glass?</h3>
                        <p>Es una biblioteca de componentes React que crea efectos de cristal líquido realistas utilizando filtros SVG nativos, mapas de desplazamiento y aberración cromática.</p>
                    </div>
                    <div className="faq-item">
                        <h3>¿Afecta el rendimiento?</h3>
                        <p>No, los filtros SVG son nativos del navegador y muy eficientes. La biblioteca está optimizada para minimizar el impacto en el rendimiento.</p>
                    </div>
                    <div className="faq-item">
                        <h3>¿Es compatible con dispositivos móviles?</h3>
                        <p>Sí, funciona perfectamente en todos los dispositivos y navegadores modernos. Los efectos se adaptan automáticamente al tamaño de pantalla.</p>
                    </div>

                </div>
            </section>

            <section className="navigation-section" aria-labelledby="navigation-section">
                <h2 id="navigation-section" className="visually-hidden">Navigation</h2>
                <nav className="navigation-grid" aria-label="Documentation and resources">
                    <NavButton
                        href="https://github.com/your-username/liquid-svg-glass"
                        icon={githubIcon}
                        title="GitHub Repository"
                        description="Explore source code"
                        color="#1a1222"
                    />

                    <NavButton
                        href="?path=/story/components-interactive-glasseffect--default"
                        icon={storybookIcon}
                        title="Storybook Docs"
                        description="Component documentation"
                        color="#ff4785"
                    />

                    <NavButton
                        href="?path=/story/comenzar-guía-de-inicio-rápido--docs"
                        icon={npmIcon}
                        title="Getting Started"
                        description="Quick start guide"
                        color="#B392F0"
                    />

                    <NavButton
                        href="?path=/story/documentación-glasseffect-guía-completa--docs"
                        icon={storybookIcon}
                        title="Documentation"
                        description="Complete API reference"
                        color="#F87683"
                    />

                    <NavButton
                        onClick={() => setShowVisualizer(true)}
                        icon={pnpmIcon}
                        title="Technical Deep Dive"
                        description="SVG Pipeline Visualizer"
                        color="#B392F0"
                    />

                    <NavButton
                        href="?path=/story/components-interactive-glasseffect--playground"
                        icon={storybookIcon}
                        title="Interactive Demo"
                        description="Test all parameters"
                        color="#F87683"
                    />
                </nav>
            </section>
        </main>
    );
}

export default App;