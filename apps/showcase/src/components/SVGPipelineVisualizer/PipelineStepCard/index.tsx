import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Zap, Sparkles } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { PipelineStepCardProps } from './types';
import styles from './styles.module.scss';

const IOTable: React.FC<{ title: string; data: Record<string, any> }> = ({ title, data }) => (
  <div className={styles.ioTable}>
    <h5 className={title === 'INPUT' ? styles.inputTitle : styles.outputTitle}>{title}</h5>
    <div className={styles.ioContent}>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className={styles.ioRow}>
          <span className={styles.ioKey}>{key}</span>
          <span className={styles.ioValue}>{String(value)}</span>
        </div>
      ))}
    </div>
  </div>
);

export const PipelineStepCard: React.FC<PipelineStepCardProps> = ({ 
  node, 
  isActive, 
  isCompleted, 
  isExpanded, 
  pipelineData, 
  customConfig, 
  onClick 
}) => {
  const Icon = node.icon;
  const [showCode, setShowCode] = useState(false);

  const { input, output } = pipelineData ? node.getIOData(pipelineData, customConfig) : { input: {}, output: {} };

  const getLanguage = (snippet: string) => {
    if (snippet.trim().startsWith('<')) return 'svg';
    if (snippet.trim().startsWith('.')) return 'css';
    return 'typescript';
  };

  return (
    <motion.div
      className={`${styles.pipelineNode} ${
        isActive ? styles.active : isCompleted ? styles.completed : ''
      }`}
      onClick={() => onClick()}
      layout
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <motion.div className={`${styles.nodeIcon} ${node.color}`} layout>
            <Icon />
          </motion.div>
          <div>
            <h4>{node.label}</h4>
            <p>{node.description}</p>
          </div>
        </div>
        <motion.button className={styles.codeToggle} onClick={(e) => { e.stopPropagation(); setShowCode(!showCode); }} whileTap={{ scale: 0.9 }}>
          <Code size={16} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className={styles.content}
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'circOut' }}
          >
            <div className={styles.ioContainer}>
              <IOTable title="INPUT" data={input} />
              <IOTable title="OUTPUT" data={output} />
            </div>

            {node.id === 'svg-construction' && pipelineData && (
              <div className={styles.visualPreview}>
                <h5>Visual Output</h5>
                <div className={styles.svgContainer} dangerouslySetInnerHTML={{ __html: pipelineData.svgContent }} />
              </div>
            )}

            <AnimatePresence>
              {showCode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={styles.codeContainer}
                >
                  <SyntaxHighlighter language={getLanguage(node.codeSnippet)} style={vscDarkPlus} customStyle={{ margin: 0, borderRadius: '4px' }}>
                    {node.codeSnippet}
                  </SyntaxHighlighter>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.statusIcons}>
        {isActive && <motion.div layoutId="active-pip-glow" className={styles.glow}><Zap size={14} /></motion.div>}
        {isCompleted && <Sparkles size={14} />}
      </div>
    </motion.div>
  );
};

export default PipelineStepCard;
export type { PipelineNodeData, PipelineStepCardProps } from './types';