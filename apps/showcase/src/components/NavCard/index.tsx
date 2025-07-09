import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StatusBadge, type StatusType } from '../StatusBadge';
import { ExternalLinkIcon } from '../IconSystem';
import styles from './styles.module.css';

export type CategoryType = 'documentation' | 'resources' | 'tools' | 'community';
export type PriorityType = 'primary' | 'secondary' | 'tertiary';

export interface NavCardProps {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  category: CategoryType;
  priority?: PriorityType;
  status?: StatusType;
  external?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const categoryConfig = {
  documentation: {
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    bgColor: 'rgba(59, 130, 246, 0.05)',
    borderColor: 'rgba(59, 130, 246, 0.15)',
  },
  resources: {
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #047857)',
    bgColor: 'rgba(16, 185, 129, 0.05)',
    borderColor: 'rgba(16, 185, 129, 0.15)',
  },
  tools: {
    color: '#B392F0',
    gradient: 'linear-gradient(135deg, #B392F0, #8b5cf6)',
    bgColor: 'rgba(179, 146, 240, 0.05)',
    borderColor: 'rgba(179, 146, 240, 0.15)',
  },
  community: {
    color: '#F87683',
    gradient: 'linear-gradient(135deg, #F87683, #f43f5e)',
    bgColor: 'rgba(248, 118, 131, 0.05)',
    borderColor: 'rgba(248, 118, 131, 0.15)',
  },
};

const priorityConfig = {
  primary: {
    height: '160px',
    iconSize: '2.5rem',
    titleSize: '1.125rem',
    borderWidth: '2px',
  },
  secondary: {
    height: '140px',
    iconSize: '2rem',
    titleSize: '1rem',
    borderWidth: '1.5px',
  },
  tertiary: {
    height: '120px',
    iconSize: '1.75rem',
    titleSize: '0.9rem',
    borderWidth: '1px',
  },
};

export const NavCard: React.FC<NavCardProps> = ({
  href,
  onClick,
  icon,
  title,
  description,
  category,
  priority = 'secondary',
  status,
  external = false,
  disabled = false,
  loading = false,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const categoryStyle = categoryConfig[category];
  const priorityStyle = priorityConfig[priority];

  const cardVariants = {
    initial: { 
      scale: 0.9, 
      opacity: 0, 
      y: 20,
      rotateX: 10,
    },
    animate: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      rotateX: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 35,
      }
    }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: 0.2,
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 30,
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const shimmerVariants = {
    initial: { x: '-100%', opacity: 0 },
    hover: {
      x: '100%',
      opacity: [0, 1, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const cardStyle = {
    minHeight: priorityStyle.height,
    backgroundColor: categoryStyle.bgColor,
    borderColor: categoryStyle.borderColor,
    borderWidth: priorityStyle.borderWidth,
  };

  const content = (
    <>
      {/* Status Badge */}
      {status && <StatusBadge status={status} />}
      
      {/* Glow Effect */}
      <motion.div
        className={styles.glow}
        variants={glowVariants}
        style={{
          background: `radial-gradient(circle at center, ${categoryStyle.color}20, transparent 70%)`,
        }}
      />
      
      {/* Shimmer Effect */}
      <motion.div
        className={styles.shimmer}
        variants={shimmerVariants}
        style={{
          background: `linear-gradient(90deg, transparent, ${categoryStyle.color}40, transparent)`,
        }}
      />
      
      {/* Icon Container */}
      <motion.div
        className={styles.iconContainer}
        variants={iconVariants}
        style={{
          fontSize: priorityStyle.iconSize,
          background: categoryStyle.gradient,
        }}
      >
        {loading ? (
          <motion.div
            className={styles.spinner}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          icon
        )}
      </motion.div>
      
      {/* Content */}
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <motion.h3
            className={styles.title}
            style={{ fontSize: priorityStyle.titleSize }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h3>
          {external && (
            <motion.div
              className={styles.externalIcon}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ExternalLinkIcon size={14} color={categoryStyle.color} />
            </motion.div>
          )}
        </div>
        
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {description}
        </motion.p>
      </div>
      
      {/* Category Indicator */}
      <motion.div
        className={styles.categoryIndicator}
        style={{ backgroundColor: categoryStyle.color }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      />
    </>
  );

  const CardWrapper = href ? motion.a : motion.button;
  
  return (
    <CardWrapper
      {...(href ? { 
        href, 
        target: external ? '_blank' : '_self',
        rel: external ? 'noopener noreferrer' : undefined,
      } : { onClick })}
      className={`${styles.card} ${styles[category]} ${styles[priority]} ${disabled ? styles.disabled : ''} ${className || ''}`}
      style={cardStyle}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      disabled={disabled}
    >
      {content}
    </CardWrapper>
  );
};