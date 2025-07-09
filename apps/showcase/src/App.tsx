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
    href: "?path=/story/components-interactive-glasseffect--default",
    icon: <StorybookIcon />,
    title: "Storybook Docs",
    description: "Interactive component documentation and examples",
    category: "documentation",
    priority: "primary",
    status: "updated",
  },
  {
    href: "?path=/story/comenzar-guía-de-inicio-rápido--docs",
    icon: <RocketIcon />,
    title: "Getting Started",
    description: "Quick start guide and installation instructions",
    category: "documentation",
    priority: "primary",
  },
  {
    href: "?path=/story/documentación-glasseffect-guía-completa--docs",
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
    href: "?path=/story/components-interactive-glasseffect--playground",
    icon: <PlayIcon />,
    title: "Interactive Playground",
    description: "Test all parameters and experiment with effects",
    category: "tools",
    priority: "secondary",
  },
];

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

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
        <GlassEffect draggable></GlassEffect>

            <ScrollProgress />
            <FloatingParticles />

            
            <nav 
                ref={breadcrumbsRef} 
                className="breadcrumbs" 
                aria-label="Navegación de ubicación"
                role="navigation"
            >
                <ol role="list">
                    <li>
                        <a 
                            href="/" 
                            aria-label="Ir al inicio"
                            title="Página principal"
                        >
                            Home
                        </a>
                    </li>
                    <li aria-current="page">
                        <span aria-label="Página actual">SVG Liquid Glass</span>
                    </li>
                </ol>
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