import React, { type ReactNode } from 'react';
import { usePipelineContext } from '../../context/PipelineContext';
import styles from './styles.module.scss';

export interface ResponsiveLayoutProps {
  header: ReactNode;
  pipeline: ReactNode;
  preview: ReactNode;
  controls: ReactNode;
  quickPresets?: ReactNode;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  header,
  pipeline,
  preview,
  controls,
  quickPresets,
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        {header}
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {isMobile ? (
          // Mobile: Stack layout
          <div className={styles.mobileLayout}>
            <section className={styles.pipelineSection}>
              {pipeline}
            </section>
            <section className={styles.previewSection}>
              {preview}
            </section>
          </div>
        ) : (
          // Desktop: Split layout
          <div className={styles.splitLayout}>
            <section className={styles.pipelineSection}>
              {pipeline}
            </section>
            <section className={styles.previewSection}>
              {preview}
            </section>
          </div>
        )}
      </main>

      {/* Controls */}
      <aside className={styles.controlsContainer}>
        {controls}
      </aside>

      {/* Quick Presets (Desktop only) */}
      {quickPresets && !isMobile && (
        <aside className={styles.quickPresetsContainer}>
          {quickPresets}
        </aside>
      )}
    </div>
  );
};