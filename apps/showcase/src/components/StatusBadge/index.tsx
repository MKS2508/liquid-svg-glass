import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

export type StatusType = 'new' | 'updated' | 'beta' | 'deprecated' | 'popular';

export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  new: {
    label: 'New',
    color: '#4ade80',
    bgColor: 'rgba(74, 222, 128, 0.1)',
    borderColor: 'rgba(74, 222, 128, 0.3)',
  },
  updated: {
    label: 'Updated',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  beta: {
    label: 'Beta',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  deprecated: {
    label: 'Deprecated',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  popular: {
    label: '🔥 Popular',
    color: '#B392F0',
    bgColor: 'rgba(179, 146, 240, 0.1)',
    borderColor: 'rgba(179, 146, 240, 0.3)',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = statusConfig[status];

  return (
    <motion.div
      className={`${styles.badge} ${className || ''}`}
      style={{
        color: config.color,
        backgroundColor: config.bgColor,
        borderColor: config.borderColor,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30,
        delay: 0.2 
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 20px ${config.color}40`
      }}
    >
      <motion.span
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {config.label}
      </motion.span>
    </motion.div>
  );
};