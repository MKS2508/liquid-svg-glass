import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.scss';
import npmIcon from '../../assets/npm.svg';
import yarnIcon from '../../assets/yarn-logo.png';
import pnpmIcon from '../../assets/pnpmlogo.svg';
import bunIcon from '../../assets/logobun.svg';

type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

interface PackageManagerOption {
  name: PackageManager;
  icon: string;
  command: string;
  color: string;
  gradient: string;
  description: string;
}

const packageManagers: PackageManagerOption[] = [
    {
        name: 'bun',
        icon: bunIcon,
        command: 'bun add @liquid-svg-glass/core @liquid-svg-glass/react',
        color: '#FBF0DF',
        gradient: 'linear-gradient(135deg, #FBF0DF 0%, #F0E68C 100%)',
        description: 'The fastest package manager'
    },
    {
    name: 'yarn',
    icon: yarnIcon,
    command: 'yarn add @liquid-svg-glass/core @liquid-svg-glass/react',
    color: '#2C8EBB',
    gradient: 'linear-gradient(135deg, #2C8EBB 0%, #4ECDC4 100%)',
    description: 'Fast, reliable, and secure'
  },
  {
    name: 'pnpm',
    icon: pnpmIcon,
    command: 'pnpm add @liquid-svg-glass/core @liquid-svg-glass/react',
    color: '#F69220',
    gradient: 'linear-gradient(135deg, #F69220 0%, #FFB347 100%)',
    description: 'Efficient and fast'
  },
  {
        name: 'npm',
        icon: npmIcon,
        command: 'npm i @liquid-svg-glass/core @liquid-svg-glass/react',
        color: '#CB3837',
        gradient: 'linear-gradient(135deg, #CB3837 0%, #FF6B6B 100%)',
        description: 'The original package manager'
    }
];

// Custom hook for clipboard functionality
const useClipboard = () => {
  const [copied, setCopied] = useState(false);
  
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, []);
  
  return { copied, copy };
};

// SVG Icons for copy button
const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M8 2V8H2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3 }}
    />
    <motion.path
      d="M16 2V8H22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    />
    <motion.path
      d="M8 22V16H2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    />
    <motion.path
      d="M22 16V22H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    />
  </svg>
);

export const PackageManagerSelector: React.FC = () => {
  const [selected, setSelected] = useState<PackageManager>('npm');
  const { copied, copy } = useClipboard();
  const selectedManager = packageManagers.find(pm => pm.name === selected)!;

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div className={styles.header}>
        <motion.h3 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Quick Install
        </motion.h3>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Choose your preferred package manager
        </motion.p>
      </motion.div>
      
      <motion.div 
        className={styles.tabs}
        style={{
          background: `${selectedManager.gradient}15`,
          borderColor: `${selectedManager.color}40`,
        }}
        layout
      >
        {packageManagers.map((pm, index) => (
          <motion.button
            key={pm.name}
            className={`${styles.tab} ${selected === pm.name ? styles.active : ''}`}
            onClick={() => setSelected(pm.name)}
            style={{
              '--tab-color': pm.color,
              '--tab-gradient': pm.gradient,
            } as React.CSSProperties}
            layoutId={selected === pm.name ? "activeTab" : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: 0.1 * index,
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            whileHover={{


              boxShadow: `0 8px 25px ${pm.color}40`
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className={styles.icon}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img src={pm.icon} alt={`${pm.name} icon`} className={styles.iconImg} />
            </motion.span>
            <div className={styles.tabContent}>
              <span className={styles.name}>{pm.name.toLocaleUpperCase()}</span>
            </div>
            
            {selected === pm.name && (
              <motion.div
                className={styles.activeIndicator}
                layoutId="activeIndicator"
                initial={{ scale: 0 }}
                animate={{ scale: 0.1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      <div 
        className={styles.commandContainer}
        style={{
          '--selected-gradient': selectedManager.gradient,
          '--selected-color': selectedManager.color,
        } as React.CSSProperties}
      >
        <div className={styles.commandHeader}>
          <span className={styles.commandLabel}>v0.0.1</span>
          <motion.button
            className={styles.copyButton}
            onClick={() => copy(selectedManager.command)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: `color-mix(in srgb, var(--selected-color) 20%, transparent)`,
              borderColor: 'var(--selected-color)',
            }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className={styles.copyIcon}
                >
                  <CheckIcon />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -180 }}
                  transition={{ duration: 0.3 }}
                  className={styles.copyIcon}
                >
                  <CopyIcon />
                </motion.div>
              )}
            </AnimatePresence>
            <span className={styles.copyText}>
              {copied ? 'Copied!' : 'Copy'}
            </span>
          </motion.button>
        </div>
        
        <div className={styles.commandCode}>
          <div className={styles.commandText}>
            <AnimatePresence mode="wait">
              <motion.span
                key={`manager-${selected}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ 
                  type: "spring",
                  stiffness: 280,
                  damping: 20,
                  mass: 0.8
                }}
                className={styles.commandManager}
              >
                {selected}
              </motion.span>
            </AnimatePresence>
            <span style={{margin: ".5ch"}}> </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={`action-${selected}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  type: "spring",
                  stiffness: 280,
                  damping: 20,
                  mass: 0.8,
                  delay: 0.08
                }}
                className={styles.commandAction}
              >
                {selected === 'npm' ? 'i' : 'add'}
              </motion.span>
            </AnimatePresence>
              <span style={{margin: ".5ch"}}> </span>
              <motion.span
              className={styles.packageName}
              layout
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 30,
                mass: 1.2
              }}
            >
              {' @liquid-svg-glass/core @liquid-svg-glass/react'}
            </motion.span>
          </div>
        </div>
      </div>

      {copied && (
        <motion.div
          className={styles.successToast}
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.3 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <CheckIcon />
          <span>Command copied to clipboard!</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PackageManagerSelector;