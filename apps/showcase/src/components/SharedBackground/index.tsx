import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface ScrollProgressProps {
  className?: string;
}

const ScrollProgress = ({ className = 'scroll-progress-container' }: ScrollProgressProps) => {
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
    <div className={className}>
      <div ref={progressRef} className="scroll-progress-bar"></div>
    </div>
  );
};

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

interface SharedBackgroundProps {
  children: ReactNode;
  showScrollProgress?: boolean;
  showFloatingParticles?: boolean;
}

export function SharedBackground({
  children,
  showScrollProgress = true,
  showFloatingParticles = true
}: SharedBackgroundProps) {
  return (
    <>
      {showScrollProgress && <ScrollProgress />}
      {showFloatingParticles && <FloatingParticles />}
      {children}
    </>
  );
}

export default SharedBackground;
