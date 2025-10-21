import React from 'react';
import styles from '../styles.module.scss';

interface AccordionSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function AccordionSection({ title, isOpen, onToggle, children }: AccordionSectionProps) {
  return (
    <div className={styles.accordionSection}>
      <button
        className={`${styles.accordionHeader} ${isOpen ? styles.accordionHeaderOpen : ''}`}
        onClick={onToggle}
        type="button"
      >
        <h4>{title}</h4>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.accordionChevron}
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        className={`${styles.accordionContent} ${isOpen ? styles.accordionContentOpen : ''}`}
        style={{
          maxHeight: isOpen ? '2000px' : '0',
          overflow: isOpen ? 'visible' : 'hidden'
        }}
      >
        <div className={styles.accordionInner}>
          {children}
        </div>
      </div>
    </div>
  );
}
