import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { TextPlugin } from 'gsap/TextPlugin';
import { GlassEffect } from '@liquid-svg-glass/react';
import SVGPipelineVisualizer from './components/SVGPipelineVisualizer';
import PackageManagerSelector from './components/PackageManagerSelector';
import { TypingCodeBlock } from './components/SyntaxHighlighter';
import DynamicBackgroundGlassShowcase from './components/DynamicBackgroundGlassShowcase';
import { NavigationGrid } from './components/NavigationGrid';
import type { NavCardProps } from './components/NavCard';
import {
  GitHubIcon,
  StorybookIcon,
  DocumentationIcon,
  RocketIcon,
  PlayIcon,
  ToolIcon,
  BookIcon
} from './components/IconSystem';
import { GlassEffectControlPanel } from './components/GlassEffectControlPanel';
import type { GlassEffectConfig } from './components/GlassEffectControlPanel/types';
import './App.css';

// Navigation items configuration
const navigationItems: NavCardProps[] = [
  {
    href: "https://github.com/your-username/liquid-svg-glass",
    icon: <GitHubIcon />,
    title: "GitHub Repository",
    description: "Explore source code, contribute and report issues",
    category: "resources",
    priority: "primary",
    status: "popular",
    external: true,
  },
  {
    href: "/storybook/?path=/story/components-interactive-glasseffect--default",
    icon: <StorybookIcon />,
    title: "Storybook Docs",
    description: "Interactive component documentation and examples",
    category: "documentation",
    priority: "primary",
    status: "updated",
  },
  {
    href: "/storybook/?path=/story/comenzar-guía-de-inicio-rápido--docs",
    icon: <RocketIcon />,
    title: "Getting Started",
    description: "Quick start guide and installation instructions",
    category: "documentation",
    priority: "primary",
  },
  {
    href: "/storybook/?path=/story/documentación-glasseffect-guía-completa--docs",
    icon: <BookIcon />,
    title: "API Reference",
    description: "Complete documentation and API reference",
    category: "documentation",
    priority: "secondary",
  },
  {
    onClick: () => {},
    icon: <ToolIcon />,
    title: "Technical Deep Dive",
    description: "SVG Pipeline Visualizer and technical insights",
    category: "tools",
    priority: "secondary",
    status: "new",
  },
  {
    href: "/storybook/?path=/story/components-interactive-glasseffect--playground",
    icon: <PlayIcon />,
    title: "Interactive Playground",
    description: "Test all parameters and experiment with effects",
    category: "tools",
    priority: "secondary",
  },
];

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const DEFAULT_CONFIG: GlassEffectConfig = {
  preset: 'dock',
  width: 336,
  height: 96,
  radius: 16,
  border: 0.07,
  frost: 0.05,
  blur: 11,
  blurBackground: 8,
  displace: 0.2,
  scale: -180,
  alpha: 0.93,
  lightness: 50,
  r: 0,
  g: 10,
  b: 20,
  x: 'R',
  y: 'B',
  blend: 'difference',
  // Phase 1 Features (enabled by default)
  enableBackdropExtension: true,
  enablePerformanceOpts: true,
  enableFlickeringFix: true,
};

// Scroll Progress Indicator
const ScrollProgress = () => {
    const progressRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (!progressRef.current) return;
        
        const updateProgress = () => {
            const scrolled = window.pageYOffset;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrolled / maxHeight, 1);
            
            if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${progress})`;
            }
        };
        
        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);
    
    return (
        <div className="scroll-progress-container">
            <div ref={progressRef} className="scroll-progress-bar"></div>
        </div>
    );
};

// Floating Particles Component
const FloatingParticles = () => {
    const particlesRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (!particlesRef.current) return;
        
        const particles = particlesRef.current.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            gsap.set(particle, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1
            });
            
            gsap.to(particle, {
                y: "-=100",
                x: `+=${Math.random() * 50 - 25}`,
                duration: Math.random() * 3 + 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.1
            });
        });
    }, []);
    
    return (
        <div ref={particlesRef} className="floating-particles">
            {Array.from({ length: 15 }, (_, i) => (
                <div key={i} className="particle">✨</div>
            ))}
        </div>
    );
};


function App() {
    const [showVisualizer, setShowVisualizer] = useState(false);
    const [controlPanelOpen, setControlPanelOpen] = useState(false);
    const [glassConfig, setGlassConfig] = useState<GlassEffectConfig>(DEFAULT_CONFIG);
    const [debugMode, setDebugMode] = useState(false);
    const controlButtonRef = useRef<HTMLButtonElement>(null);

    const handleConfigChange = (updates: Partial<GlassEffectConfig>) => {
        setGlassConfig((prev) => ({ ...prev, ...updates }));
    };

    const handleReset = () => {
        setGlassConfig(DEFAULT_CONFIG);
        setDebugMode(false);
    };

    const handleDebugToggle = () => {
        setDebugMode((prev) => !prev);
    };

    // Update navigation items with the visualizer callback
    const updatedNavigationItems = navigationItems.map(item =>
        item.title === "Technical Deep Dive"
            ? { ...item, onClick: () => setShowVisualizer(true) }
            : item
    );
    
    // Refs for animations
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const demoRef = useRef<HTMLDivElement>(null);
    const breadcrumbsRef = useRef<HTMLElement>(null);
    const showcaseRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Hero section animations
        const tl = gsap.timeline();
        
        // Animate breadcrumbs
        tl.fromTo(breadcrumbsRef.current, 
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        );
        
        // Animate demo container
        tl.fromTo(demoRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
            "-=0.3"
        );
        
        // Animate title
        tl.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.5"
        );
        
        // Animate description
        tl.fromTo(descriptionRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.3"
        );

        // Showcase section scroll animation
        gsap.fromTo(showcaseRef.current,
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: showcaseRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Animate showcase cards with stagger
        gsap.fromTo(".showcase-card",
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".showcase-grid",
                    start: "top 85%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Parallax effect for hero background
        gsap.to(".glass-demo-container", {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    if (showVisualizer) {
        return <SVGPipelineVisualizer onBack={() => setShowVisualizer(false)} />;
    }

    return (
        <main className="app-container">
            <GlassEffect
                draggable
                preset={glassConfig.preset}
                width={glassConfig.width}
                height={glassConfig.height}
                radius={glassConfig.radius}
                border={glassConfig.border}
                frost={glassConfig.frost}
                blur={glassConfig.blur}
                blurBackground={glassConfig.blurBackground}
                displace={glassConfig.displace}
                scale={glassConfig.scale}
                alpha={glassConfig.alpha}
                lightness={glassConfig.lightness}
                r={glassConfig.r}
                g={glassConfig.g}
                b={glassConfig.b}
                x={glassConfig.x}
                y={glassConfig.y}
                blend={glassConfig.blend}
                debug={debugMode}
                // Phase 1 Features
                enableBackdropExtension={glassConfig.enableBackdropExtension}
                enablePerformanceOpts={glassConfig.enablePerformanceOpts}
                enableFlickeringFix={glassConfig.enableFlickeringFix}
            />

            <ScrollProgress />
            <FloatingParticles />


            <nav
                ref={breadcrumbsRef}
                className="breadcrumbs"
                aria-label="Navegación de ubicación"
                role="navigation"
                style={{ position: 'relative' }}
            >
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://mks2508.github.io/liquid-svg-glass/"
                        },
                        {
                            "@type": "ListItem", 
                            "position": 2,
                            "name": "Liquid Glass SVG - React SVG Displacement Library",
                            "item": "https://mks2508.github.io/liquid-svg-glass/"
                        }
                    ]
                })}
                </script>
                <ol role="list" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                        <a 
                            href="/" 
                            aria-label="Ir al inicio"
                            title="Página principal"
                            itemProp="item"
                        >
                            <span itemProp="name">Home</span>
                        </a>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li aria-current="page" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                        <span aria-label="Página actual" itemProp="name">Liquid Glass SVG - React SVG Displacement Library</span>
                        <meta itemProp="position" content="2" />
                    </li>
                </ol>

                <button
                    ref={controlButtonRef}
                    onClick={() => setControlPanelOpen(!controlPanelOpen)}
                    style={{
                        position: 'absolute',
                        right: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        padding: '8px 16px',
                        background: 'rgba(179, 146, 240, 0.2)',
                        border: '1px solid rgba(179, 146, 240, 0.3)',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        fontSize: '13px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(179, 146, 240, 0.3)';
                        e.currentTarget.style.borderColor = 'rgba(179, 146, 240, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(179, 146, 240, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(179, 146, 240, 0.3)';
                    }}
                    title="Toggle GlassEffect Controls"
                    aria-label="Toggle GlassEffect Controls"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    Controls
                </button>

                <GlassEffectControlPanel
                    isOpen={controlPanelOpen}
                    config={glassConfig}
                    debug={debugMode}
                    buttonRef={controlButtonRef}
                    onChange={handleConfigChange}
                    onReset={handleReset}
                    onDebugToggle={handleDebugToggle}
                    onClose={() => setControlPanelOpen(false)}
                />
            </nav>
            
            <header 
                ref={heroRef} 
                className="app-header"
                role="banner"
                aria-labelledby="main-title"
                aria-describedby="main-description"
            >
                <h1 
                    id="main-title"
                    ref={titleRef}
                    tabIndex={0}
                    aria-label="SVG Liquid Glass - Biblioteca de efectos de cristal líquido"
                >
                    SVG Liquid Glass
                </h1>
                <p 
                    id="main-description"
                    ref={descriptionRef}
                    role="doc-subtitle"
                    aria-label="Descripción de la biblioteca"
                >
                    Crea efectos de cristal líquido realistas con mapas de desplazamiento SVG y aberración cromática. Biblioteca de componentes React moderna, fácil de usar y personalizable.
                </p>
            </header>

            <motion.section 
                id="main-content"
                className="content-section" 
                aria-labelledby="installation-section"
                role="main"
                tabIndex={-1}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 
                    id="installation-section"
                    className="visually-hidden"
                    aria-label="Sección de instalación y uso básico"
                >
                    Instalación y Uso Básico
                </h2>
                
                <div 
                    role="region"
                    aria-labelledby="package-manager-title"
                    aria-describedby="package-manager-description"
                >
                    <h3 
                        id="package-manager-title"
                        className="visually-hidden"
                    >
                        Selector de Gestor de Paquetes
                    </h3>
                    <p 
                        id="package-manager-description"
                        className="visually-hidden"
                    >
                        Selecciona tu gestor de paquetes preferido para instalar la biblioteca
                    </p>
                    <PackageManagerSelector />
                </div>

                <motion.div 
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    role="region"
                    aria-labelledby="code-example-title"
                    aria-describedby="code-example-description"
                >
                    <h3 
                        id="code-example-title"
                        className="visually-hidden"
                    >
                        Ejemplo de Código
                    </h3>
                    <p 
                        id="code-example-description"
                        className="visually-hidden"
                    >
                        Ejemplo básico de implementación del componente GlassEffect
                    </p>
                    <TypingCodeBlock
                        language="tsx"
                        code={`import { GlassEffect } from '@liquid-svg-glass/react';

function App() {
  return (
    <GlassEffect preset="dock" draggable>
      <nav>Your glassmorphic content</nav>
    </GlassEffect>
  );
}`}
                        enableTypingAnimation={true}
                        typingSpeed={2}
                        showMacOSControls={true}
                        windowTitle="React Component"
                    />
                </motion.div>
            </motion.section>

            <section 
                ref={showcaseRef} 
                className="feature-showcase-section" 
                aria-labelledby="feature-showcase-title"
                aria-describedby="feature-showcase-description"
                role="region"
            >
                <h2 
                    id="feature-showcase-title"
                    tabIndex={0}
                    aria-label="Explora diferentes presets de efectos de cristal"
                >
                    Explore Different Presets
                </h2>
                <p 
                    id="feature-showcase-description"
                    className="section-description"
                    role="doc-subtitle"
                    aria-label="Descripción de la versatilidad de los presets"
                >
                    Discover the versatility of SVG Liquid Glass with our curated preset collection. 
                    Each preset offers unique visual styles and use cases.
                </p>
                
                <div 
                    className="showcase-grid"
                    role="group"
                    aria-label="Galería de presets disponibles"
                >
                    <article 
                        className="showcase-card"
                        role="article"
                        aria-labelledby="preset-code-title"
                        aria-describedby="preset-code-description"
                        tabIndex={0}
                    >
                        <header className="showcase-header">
                            <h3 id="preset-code-title">Code Environment</h3>
                            <span 
                                className="preset-badge"
                                role="status"
                                aria-label="Preset tipo minimal"
                            >
                                minimal
                            </span>
                        </header>
                        <div 
                            className="showcase-container"
                            role="img"
                            aria-label="Demostración visual del preset para entornos de código"
                        >
                            <DynamicBackgroundGlassShowcase
                                backgroundType="dark"
                                contentType="code"
                                uiElementStyle="minimal"
                                showDecorations={true}
                            >
                                <GlassEffect preset="pill" width={180} height={60}>
                                    <div className="showcase-content">
                                        <span className="showcase-icon" aria-hidden="true">💻</span>
                                        <span className="showcase-text">Dark Theme</span>
                                    </div>
                                </GlassEffect>
                            </DynamicBackgroundGlassShowcase>
                        </div>
                        <footer className="showcase-footer">
                            <p id="preset-code-description">
                                Perfect for development tools, code editors, and technical interfaces
                            </p>
                        </footer>
                    </article>

                    <article 
                        className="showcase-card"
                        role="article"
                        aria-labelledby="preset-docs-title"
                        aria-describedby="preset-docs-description"
                        tabIndex={0}
                    >
                        <header className="showcase-header">
                            <h3 id="preset-docs-title">Clean Documentation</h3>
                            <span 
                                className="preset-badge"
                                role="status"
                                aria-label="Preset tipo outline"
                            >
                                outline
                            </span>
                        </header>
                        <div 
                            className="showcase-container"
                            role="img"
                            aria-label="Demostración visual del preset para documentación limpia"
                        >
                            <DynamicBackgroundGlassShowcase
                                backgroundType="light"
                                contentType="docs"
                                uiElementStyle="outline"
                                showDecorations={true}
                            >
                                <GlassEffect preset="bubble" width={180} height={60}>
                                    <div className="showcase-content">
                                        <span className="showcase-icon" aria-hidden="true">📚</span>
                                        <span className="showcase-text">Light Theme</span>
                                    </div>
                                </GlassEffect>
                            </DynamicBackgroundGlassShowcase>
                        </div>
                        <footer className="showcase-footer">
                            <p id="preset-docs-description">
                                Ideal for documentation, blogs, and content-focused applications
                            </p>
                        </footer>
                    </article>

                    <article 
                        className="showcase-card"
                        role="article"
                        aria-labelledby="preset-cyberpunk-title"
                        aria-describedby="preset-cyberpunk-description"
                        tabIndex={0}
                    >
                        <header className="showcase-header">
                            <h3 id="preset-cyberpunk-title">Cyberpunk Dashboard</h3>
                            <span 
                                className="preset-badge"
                                role="status"
                                aria-label="Preset tipo glass"
                            >
                                glass
                            </span>
                        </header>
                        <div 
                            className="showcase-container"
                            role="img"
                            aria-label="Demostración visual del preset cyberpunk para dashboards"
                        >
                            <DynamicBackgroundGlassShowcase
                                backgroundType="cyberpunk"
                                contentType="dashboard"
                                uiElementStyle="glass"
                                showDecorations={true}
                            >
                                <GlassEffect preset="dock" width={180} height={60}>
                                    <div className="showcase-content">
                                        <span className="showcase-icon" aria-hidden="true">🎮</span>
                                        <span className="showcase-text">Cyberpunk</span>
                                    </div>
                                </GlassEffect>
                            </DynamicBackgroundGlassShowcase>
                        </div>
                        <footer className="showcase-footer">
                            <p id="preset-cyberpunk-description">
                                Great for gaming interfaces, dashboards, and futuristic designs
                            </p>
                        </footer>
                    </article>
                </div>
            </section>


            <NavigationGrid
                items={updatedNavigationItems}
                title="Explore & Learn"
                subtitle="Comprehensive resources to help you master SVG Liquid Glass effects"
                maxColumns={3}
                showCategories={true}
                staggerDelay={0.1}
            />

            {/* SEO-Rich Content Sections */}
            <motion.section 
                className="seo-content-section"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ 
                    padding: '80px 20px', 
                    maxWidth: '1200px', 
                    margin: '0 auto',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
                    borderRadius: '20px',
                    marginBottom: '60px'
                }}
            >
                <h2 style={{ 
                    fontSize: '2.5rem', 
                    textAlign: 'center', 
                    marginBottom: '40px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    What is Liquid Glass SVG? Complete Guide to SVG Displacement Mapping
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '50px' }}>
                    <div style={{ padding: '30px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
                        <h3 style={{ color: '#667eea', marginBottom: '20px', fontSize: '1.5rem' }}>SVG Liquid Glass Effects</h3>
                        <p style={{ lineHeight: '1.6', color: '#e2e8f0', marginBottom: '15px' }}>
                            <strong>Liquid glass SVG</strong> effects use advanced SVG displacement mapping to create realistic glass distortion. 
                            Our library implements <strong>svg liquid glass</strong> technology that distorts background pixels in real-time, 
                            simulating the optical properties of liquid crystal glass.
                        </p>
                        <p style={{ lineHeight: '1.6', color: '#e2e8f0' }}>
                            Unlike traditional CSS filters, <strong>svg displacement mapping</strong> provides pixel-perfect control over 
                            how light refracts through virtual glass surfaces, creating authentic glassmorphism effects.
                        </p>
                    </div>
                    
                    <div style={{ padding: '30px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
                        <h3 style={{ color: '#764ba2', marginBottom: '20px', fontSize: '1.5rem' }}>React Liquid Glass Components</h3>
                        <p style={{ lineHeight: '1.6', color: '#e2e8f0', marginBottom: '15px' }}>
                            Our <strong>react liquid glass</strong> components make it easy to integrate liquid glass effects into any React application. 
                            The <strong>liquid glass react</strong> library provides TypeScript support, customizable presets, and GSAP animations.
                        </p>
                        <p style={{ lineHeight: '1.6', color: '#e2e8f0' }}>
                            Perfect for React 18+, Next.js, and modern JavaScript frameworks. No complex setup required - just install and start creating stunning <strong>react glass components</strong>.
                        </p>
                    </div>
                    
                    <div style={{ padding: '30px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
                        <h3 style={{ color: '#10b981', marginBottom: '20px', fontSize: '1.5rem' }}>CSS Liquid Glass & Framework Support</h3>
                        <p style={{ lineHeight: '1.6', color: '#e2e8f0', marginBottom: '15px' }}>
                            Use <strong>css liquid glass</strong> effects with any framework including <strong>astro liquid glass</strong> integration. 
                            Our core utilities work with vanilla CSS, making it perfect for any web technology stack.
                        </p>
                        <p style={{ lineHeight: '1.6', color: '#e2e8f0' }}>
                            Compatible with Astro, Svelte, Vue, and more. The <strong>liquid glass css</strong> approach uses backdrop-filter 
                            with SVG filters for maximum browser compatibility and performance.
                        </p>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '30px', color: '#f8f9fa' }}>
                        Why Choose Liquid Glass SVG for Your Projects?
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                        <div style={{ padding: '25px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '12px' }}>
                            <h4 style={{ color: '#667eea', marginBottom: '15px' }}>🚀 Performance Optimized</h4>
                            <p style={{ color: '#cbd5e0', fontSize: '0.9rem' }}>
                                Hardware-accelerated SVG filters with minimal performance impact. 
                                Perfect for high-performance web applications requiring smooth animations.
                            </p>
                        </div>
                        <div style={{ padding: '25px', background: 'rgba(118, 75, 162, 0.1)', borderRadius: '12px' }}>
                            <h4 style={{ color: '#764ba2', marginBottom: '15px' }}>🎨 Highly Customizable</h4>
                            <p style={{ color: '#cbd5e0', fontSize: '0.9rem' }}>
                                Full control over displacement parameters, chromatic aberration, blur effects, 
                                and glass transparency. Create unique effects for your brand.
                            </p>
                        </div>
                        <div style={{ padding: '25px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
                            <h4 style={{ color: '#10b981', marginBottom: '15px' }}>🔧 Developer Friendly</h4>
                            <p style={{ color: '#cbd5e0', fontSize: '0.9rem' }}>
                                TypeScript support, comprehensive documentation, Storybook examples, 
                                and easy integration with existing React codebases.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Technical Deep Dive Section */}
            <motion.section 
                className="technical-seo-section"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ 
                    padding: '60px 20px', 
                    maxWidth: '1000px', 
                    margin: '0 auto 60px',
                    textAlign: 'center'
                }}
            >
                <h2 style={{ 
                    fontSize: '2.2rem', 
                    marginBottom: '30px',
                    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    SVG Displacement Mapping: The Science Behind Liquid Glass Effects
                </h2>
                
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
                    <p style={{ lineHeight: '1.7', color: '#e2e8f0', marginBottom: '25px', fontSize: '1.1rem' }}>
                        <strong>SVG displacement mapping</strong> is a powerful graphics technique that uses color values from a displacement map 
                        to determine how much to offset each pixel. In our <strong>liquid glass svg</strong> implementation, 
                        we create dynamic displacement maps that simulate the optical properties of liquid crystal.
                    </p>
                    
                    <div style={{ background: 'rgba(102, 126, 234, 0.1)', padding: '30px', borderRadius: '15px', marginBottom: '25px' }}>
                        <h3 style={{ color: '#667eea', marginBottom: '20px' }}>How SVG Displacement Works:</h3>
                        <ul style={{ color: '#cbd5e0', lineHeight: '1.6', paddingLeft: '20px' }}>
                            <li><strong>Displacement Map Generation:</strong> Creates SVG gradients that define distortion patterns</li>
                            <li><strong>Channel Separation:</strong> RGB channels control different displacement axes and intensities</li>
                            <li><strong>Chromatic Aberration:</strong> Simulates how light separates through glass prisms</li>
                            <li><strong>Backdrop Filter Application:</strong> Uses CSS backdrop-filter to apply effects to background content</li>
                        </ul>
                    </div>
                    
                    <p style={{ lineHeight: '1.7', color: '#e2e8f0', marginBottom: '25px', fontSize: '1.1rem' }}>
                        This approach makes our <strong>react liquid glass</strong> and <strong>css liquid glass</strong> effects 
                        significantly more realistic than traditional CSS blur or opacity effects. The result is a convincing 
                        simulation of looking through actual liquid glass surfaces.
                    </p>
                </div>
            </motion.section>

            {/* Framework Integration Guide */}
            <motion.section 
                className="framework-integration-section"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ 
                    padding: '60px 20px', 
                    maxWidth: '1200px', 
                    margin: '0 auto 60px',
                    background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.05), rgba(245, 87, 108, 0.05))',
                    borderRadius: '20px'
                }}
            >
                <h2 style={{ 
                    fontSize: '2.2rem', 
                    textAlign: 'center',
                    marginBottom: '40px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Liquid Glass SVG Integration Guide for Popular Frameworks
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
                    <div style={{ padding: '30px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '15px' }}>
                        <h3 style={{ color: '#61dafb', marginBottom: '20px', fontSize: '1.4rem' }}>⚛️ React Liquid Glass</h3>
                        <p style={{ color: '#e2e8f0', lineHeight: '1.6', marginBottom: '15px' }}>
                            Perfect <strong>react liquid glass</strong> integration with hooks, TypeScript support, and component composition. 
                            Our <strong>liquid glass react</strong> components work seamlessly with React 18+ and modern build tools.
                        </p>
                        <code style={{ 
                            display: 'block', 
                            background: 'rgba(0, 0, 0, 0.3)', 
                            padding: '15px', 
                            borderRadius: '8px', 
                            fontSize: '0.9rem',
                            color: '#a0aec0',
                            overflow: 'auto'
                        }}>
                            npm install @liquid-svg-glass/react
                        </code>
                    </div>
                    
                    <div style={{ padding: '30px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '15px' }}>
                        <h3 style={{ color: '#ff6b35', marginBottom: '20px', fontSize: '1.4rem' }}>🚀 Astro Liquid Glass</h3>
                        <p style={{ color: '#e2e8f0', lineHeight: '1.6', marginBottom: '15px' }}>
                            Use <strong>astro liquid glass</strong> effects in static sites with our framework-agnostic core utilities. 
                            Perfect for <strong>css liquid glass</strong> implementations in Astro components.
                        </p>
                        <code style={{ 
                            display: 'block', 
                            background: 'rgba(0, 0, 0, 0.3)', 
                            padding: '15px', 
                            borderRadius: '8px', 
                            fontSize: '0.9rem',
                            color: '#a0aec0',
                            overflow: 'auto'
                        }}>
                            npm install @liquid-svg-glass/core
                        </code>
                    </div>
                    
                    <div style={{ padding: '30px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '15px' }}>
                        <h3 style={{ color: '#4fc08d', marginBottom: '20px', fontSize: '1.4rem' }}>💚 Vue & Vanilla CSS</h3>
                        <p style={{ color: '#e2e8f0', lineHeight: '1.6', marginBottom: '15px' }}>
                            Implement <strong>liquid glass css</strong> effects in Vue, Svelte, or vanilla JavaScript projects. 
                            Our <strong>svg liquid glass</strong> core works with any framework or no framework at all.
                        </p>
                        <code style={{ 
                            display: 'block', 
                            background: 'rgba(0, 0, 0, 0.3)', 
                            padding: '15px', 
                            borderRadius: '8px', 
                            fontSize: '0.9rem',
                            color: '#a0aec0',
                            overflow: 'auto'
                        }}>
                            backdrop-filter: url(#liquid-glass-filter);
                        </code>
                    </div>
                </div>
            </motion.section>
            
            {/* Footer with additional accessibility information */}
            <footer 
                role="contentinfo"
                aria-label="Información adicional y navegación"
                className="app-footer"
            >
                <div className="footer-content">
                    <p>
                        <span aria-label="Información de copyright">
                            © 2024 SVG Liquid Glass. 
                        </span>
                        <span aria-label="Información de código abierto">
                            Open source library for React applications.
                        </span>
                    </p>
                    <nav aria-label="Enlaces de pie de página">
                        <a 
                            href="#main-content"
                            aria-label="Volver al contenido principal"
                            className="back-to-top"
                        >
                            ↑ Back to top
                        </a>
                    </nav>
                </div>
            </footer>
        </main>
    );
}

export default App;