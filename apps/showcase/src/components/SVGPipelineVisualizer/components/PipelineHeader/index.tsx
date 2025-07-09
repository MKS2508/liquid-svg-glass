import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  ArrowLeft, 
  Menu, 
  X,
  Settings,
  Zap 
} from 'lucide-react';
import { usePipelineContext } from '../../context/PipelineContext';
import { useKeyboardNavigation } from '../../hooks';
import styles from './styles.module.scss';

export interface PipelineHeaderProps {
  onBack?: () => void;
}

export const PipelineHeader: React.FC<PipelineHeaderProps> = ({ onBack }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const {
    state,
    isAnimating,
    startAnimation,
    resetAnimation,
    exportSVG,
    responsive,
    dispatch,
  } = usePipelineContext();

  const { isMobileMenuOpen } = state;
  const { shouldUseMobileLayout } = responsive;

  // Keyboard navigation
  useKeyboardNavigation(headerRef, {
    enableArrowKeys: true,
    enableEnter: true,
    enableEscape: true,
  });

  const handleMobileMenuToggle = () => {
    dispatch({ type: 'TOGGLE_MOBILE_MENU' });
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isMobileMenuOpen) {
      dispatch({ type: 'TOGGLE_MOBILE_MENU' });
    }
  };

  return (
    <div 
      ref={headerRef}
      className={styles.headerContainer}
      onKeyDown={(e) => handleEscapeKey(e.nativeEvent)}
      role="banner"
      aria-label="Pipeline visualizer header"
    >
      <div className={styles.headerContent}>
        <div className={styles.headerFlex}>
          {/* Title and Navigation */}
          <div className={styles.titleSection}>
            <div className={styles.titleRow}>
              {onBack && (
                <button 
                  onClick={onBack} 
                  className={`${styles.button} ${styles.secondary}`}
                  aria-label="Go back"
                >
                  <ArrowLeft size={20} />
                  {!shouldUseMobileLayout && <span>Back</span>}
                </button>
              )}
              
              <div className={styles.titleContent}>
                <h1 className={styles.title}>
                  <Zap className={styles.titleIcon} size={24} />
                  SVG Pipeline Visualizer
                </h1>
                <p className={styles.subtitle}>
                  Real-time displacement mapping & chromatic aberration
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className={styles.badges}>
              <span className={styles.badge}>Displacement Mapping</span>
              <span className={`${styles.badge} ${styles.hiddenSm}`}>
                Chromatic Aberration
              </span>
              <span className={`${styles.badge} ${styles.hiddenMd}`}>
                Real-time Processing
              </span>
            </div>
          </div>

          {/* Controls */}
          {shouldUseMobileLayout ? (
            /* Mobile Menu Toggle */
            <button 
              onClick={handleMobileMenuToggle}
              className={styles.mobileMenuBtn}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          ) : (
            /* Desktop Controls */
            <div className={styles.desktopControls}>
              <button 
                onClick={startAnimation}
                disabled={isAnimating}
                className={`${styles.button} ${styles.primary}`}
                aria-label={isAnimating ? 'Animation in progress' : 'Start pipeline animation'}
              >
                {isAnimating ? (
                  <>
                    <Pause size={16} />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    <span>Start Pipeline</span>
                  </>
                )}
              </button>
              
              <button 
                onClick={resetAnimation}
                className={`${styles.button} ${styles.secondary}`}
                aria-label="Reset animation"
                disabled={isAnimating}
              >
                <RotateCcw size={16} />
                <span className={styles.hiddenSm}>Reset</span>
              </button>
              
              <button 
                onClick={exportSVG}
                className={`${styles.button} ${styles.success}`}
                aria-label="Export SVG file"
              >
                <Download size={16} />
                <span className={styles.hiddenSm}>Export</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && shouldUseMobileLayout && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={styles.mobileMenu}
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <div className={styles.mobileMenuContent}>
                <div className={styles.mobileControlsRow}>
                  <button 
                    onClick={startAnimation}
                    disabled={isAnimating}
                    className={`${styles.button} ${styles.primary} ${styles.mobileButton}`}
                    aria-label={isAnimating ? 'Animation in progress' : 'Start pipeline animation'}
                  >
                    {isAnimating ? <Pause size={16} /> : <Play size={16} />}
                    {isAnimating ? 'Processing...' : 'Start Pipeline'}
                  </button>
                  
                  <button 
                    onClick={resetAnimation}
                    className={`${styles.button} ${styles.secondary} ${styles.mobileButton}`}
                    aria-label="Reset animation"
                    disabled={isAnimating}
                  >
                    <RotateCcw size={16} />
                    Reset
                  </button>
                  
                  <button 
                    onClick={exportSVG}
                    className={`${styles.button} ${styles.success} ${styles.mobileButton}`}
                    aria-label="Export SVG file"
                  >
                    <Download size={16} />
                    Export
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};