import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { TextPlugin } from 'gsap/TextPlugin';
import githubIcon from './assets/github_good.png';
import storybookIcon from './assets/storybook-icon.svg';
import npmIcon from './assets/npm.svg';
import yarnIcon from './assets/yarn-logo.png';
import pnpmIcon from './assets/pnpmlogo.svg';
import { GlassEffect } from '@liquid-svg-glass/react';
import SVGPipelineVisualizer from './components/SVGPipelineVisualizer';
import PackageManagerSelector from './components/PackageManagerSelector';
import { CodeBlock } from './components/SyntaxHighlighter';
import DynamicBackgroundGlassShowcase from './components/DynamicBackgroundGlassShowcase';
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
        textDecoration: 'none',
        textAlign: 'center' as const,
        backdropFilter: 'blur(10px)',
        minHeight: '120px',
        position: 'relative' as const,
        overflow: 'hidden' as const,
    };

    const content = (
        <>
            <motion.div 
                style={{ fontSize: '2rem', marginBottom: '0.5rem' }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <img src={icon} alt={`${title} icon`} style={{ width: '2rem', height: '2rem' }} loading="lazy" />
            </motion.div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.25rem', margin: 0 }}>{title}</h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0 }}>{description}</p>
        </>
    );

    if (href) {
        return (
            <motion.a
                href={href}
                target={href.startsWith('http') ? '_blank' : '_self'}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={baseStyle}
                whileHover={{ 
                    y: -8, 
                    backgroundColor: `${color}20`,
                    borderColor: `${color}60`,
                    boxShadow: `0 20px 40px ${color}30`
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
                        borderRadius: '0.75rem',
                    }}
                    whileHover={{ left: '100%' }}
                    transition={{ duration: 0.6 }}
                />
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            onClick={onClick}
            style={baseStyle}
            whileHover={{ 
                y: -8, 
                backgroundColor: `${color}20`,
                borderColor: `${color}60`,
                boxShadow: `0 20px 40px ${color}30`
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
                    borderRadius: '0.75rem',
                }}
                whileHover={{ left: '100%' }}
                transition={{ duration: 0.6 }}
            />
            {content}
        </motion.button>
    );
};

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

// Typing Animation Component
const TypingCodeBlock = ({ code, language = "tsx" }: { code: string; language?: string }) => {
    const codeRef = useRef<HTMLDivElement>(null);
    const [displayedCode, setDisplayedCode] = useState('');
    
    useEffect(() => {
        if (!codeRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Start typing animation
                    gsap.to({}, {
                        duration: 2,
                        ease: "none",
                        onUpdate: function() {
                            const progress = this.progress();
                            const currentLength = Math.floor(progress * code.length);
                            setDisplayedCode(code.slice(0, currentLength));
                        }
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        
        observer.observe(codeRef.current);
        
        return () => observer.disconnect();
    }, [code]);
    
    return (
        <div className="typing-code-container">
            <div className="code-header">
                <div className="code-title">
                    <span className="code-icon">📝</span>
                    <span>{language}</span>
                </div>
                <div className="window-controls">
                    <span className="control red"></span>
                    <span className="control yellow"></span>
                    <span className="control green"></span>
                </div>
            </div>
            <div ref={codeRef} className="code-content">
                <pre><code>{displayedCode}<span className="cursor">|</span></code></pre>
            </div>
        </div>
    );
};

function App() {
    const [showVisualizer, setShowVisualizer] = useState(false);
    
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
            <div ref={demoRef} className="glass-demo-container">
                <GlassEffect preset="dock" draggable width={240} height={100} initialPosition={{ x: 100, y: 100 }}>
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
                        🎨 BETA PREVIEW 🎨
                        <br />
                        <small style={{ fontSize: '0.8rem', opacity: 0.8 }}>Drag me!</small>
                    </div>
                </GlassEffect>
            </div>

            <ScrollProgress />
            <FloatingParticles />
            <nav ref={breadcrumbsRef} className="breadcrumbs" aria-label="Breadcrumb">
                <ol>
                    <li><a href="/">Home</a></li>
                    <li aria-current="page">SVG Liquid Glass</li>
                </ol>
            </nav>
            <header ref={heroRef} className="app-header">
                <h1 ref={titleRef}>SVG Liquid Glass</h1>
                <p ref={descriptionRef}>Crea efectos de cristal líquido realistas con mapas de desplazamiento SVG y aberración cromática. Biblioteca de componentes React moderna, fácil de usar y personalizable.</p>
            </header>

            <motion.section 
                className="content-section" 
                aria-labelledby="installation-section"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 id="installation-section" className="visually-hidden">Installation</h2>
                <PackageManagerSelector />

                <motion.div 
                    style={{
                        maxWidth: '600px',
                        width: '100%'
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
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
                    />
                </motion.div>
            </motion.section>

            <section ref={showcaseRef} className="feature-showcase-section" aria-labelledby="feature-showcase-section">
                <h2 id="feature-showcase-section">Explore Different Presets</h2>
                <p className="section-description">
                    Discover the versatility of SVG Liquid Glass with our curated preset collection. 
                    Each preset offers unique visual styles and use cases.
                </p>
                
                <div className="showcase-grid">
                    <div className="showcase-card">
                        <div className="showcase-header">
                            <h3>Code Environment</h3>
                            <span className="preset-badge">minimal</span>
                        </div>
                        <div className="showcase-container">
                            <DynamicBackgroundGlassShowcase
                                backgroundType="dark"
                                contentType="code"
                                uiElementStyle="minimal"
                                showDecorations={true}
                            >
                                <GlassEffect preset="pill" width={180} height={60}>
                                    <div className="showcase-content">
                                        <span className="showcase-icon">💻</span>
                                        <span className="showcase-text">Dark Theme</span>
                                    </div>
                                </GlassEffect>
                            </DynamicBackgroundGlassShowcase>
                        </div>
                        <div className="showcase-footer">
                            <p>Perfect for development tools, code editors, and technical interfaces</p>
                        </div>
                    </div>

                    <div className="showcase-card">
                        <div className="showcase-header">
                            <h3>Clean Documentation</h3>
                            <span className="preset-badge">outline</span>
                        </div>
                        <div className="showcase-container">
                            <DynamicBackgroundGlassShowcase
                                backgroundType="light"
                                contentType="docs"
                                uiElementStyle="outline"
                                showDecorations={true}
                            >
                                <GlassEffect preset="bubble" width={180} height={60}>
                                    <div className="showcase-content">
                                        <span className="showcase-icon">📚</span>
                                        <span className="showcase-text">Light Theme</span>
                                    </div>
                                </GlassEffect>
                            </DynamicBackgroundGlassShowcase>
                        </div>
                        <div className="showcase-footer">
                            <p>Ideal for documentation, blogs, and content-focused applications</p>
                        </div>
                    </div>

                    <div className="showcase-card">
                        <div className="showcase-header">
                            <h3>Cyberpunk Dashboard</h3>
                            <span className="preset-badge">glass</span>
                        </div>
                        <div className="showcase-container">
                            <DynamicBackgroundGlassShowcase
                                backgroundType="cyberpunk"
                                contentType="dashboard"
                                uiElementStyle="glass"
                                showDecorations={true}
                            >
                                <GlassEffect preset="dock" width={180} height={60}>
                                    <div className="showcase-content">
                                        <span className="showcase-icon">🎮</span>
                                        <span className="showcase-text">Cyberpunk</span>
                                    </div>
                                </GlassEffect>
                            </DynamicBackgroundGlassShowcase>
                        </div>
                        <div className="showcase-footer">
                            <p>Great for gaming interfaces, dashboards, and futuristic designs</p>
                        </div>
                    </div>
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