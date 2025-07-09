import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { NavCard, type NavCardProps } from '../NavCard';
import styles from './styles.module.css';

export interface NavigationGridProps {
  items: NavCardProps[];
  title?: string;
  subtitle?: string;
  className?: string;
  staggerDelay?: number;
  maxColumns?: number;
  showCategories?: boolean;
}

const categoryLabels = {
  documentation: 'Documentation',
  resources: 'Resources',
  tools: 'Tools',
  community: 'Community',
};

export const NavigationGrid: React.FC<NavigationGridProps> = ({
  items,
  title,
  subtitle,
  className,
  staggerDelay = 0.1,
  maxColumns = 3,
  showCategories = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Group items by category
  const groupedItems = React.useMemo(() => {
    const groups: Record<string, NavCardProps[]> = {};
    items.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    
    // Sort each group by priority
    Object.keys(groups).forEach(category => {
      groups[category].sort((a, b) => {
        const priorityOrder = { primary: 0, secondary: 1, tertiary: 2 };
        const aPriority = priorityOrder[a.priority || 'secondary'];
        const bPriority = priorityOrder[b.priority || 'secondary'];
        return aPriority - bPriority;
      });
    });
    
    return groups;
  }, [items]);

  // Get filtered items
  const filteredItems = React.useMemo(() => {
    if (!selectedCategory) return items;
    return items.filter(item => item.category === selectedCategory);
  }, [items, selectedCategory]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: staggerDelay,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * staggerDelay,
        duration: 0.6,
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    })
  };

  const categoryButtonVariants = {
    inactive: {
      scale: 1,
      opacity: 0.7,
      backgroundColor: 'rgba(179, 146, 240, 0.1)',
      color: 'rgba(248, 249, 250, 0.7)',
    },
    active: {
      scale: 1.05,
      opacity: 1,
      backgroundColor: 'rgba(179, 146, 240, 0.2)',
      color: '#f8f9fa',
    },
    hover: {
      scale: 1.02,
      opacity: 1,
      backgroundColor: 'rgba(179, 146, 240, 0.15)',
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.section 
      ref={ref}
      className={`${styles.navigationSection} ${className || ''}`}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Header */}
      {(title || subtitle) && (
        <motion.div className={styles.header}>
          {title && (
            <motion.h2 
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p 
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Category Filters */}
      {showCategories && Object.keys(groupedItems).length > 1 && (
        <motion.div 
          className={styles.categoryFilters}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button
            className={styles.categoryButton}
            variants={categoryButtonVariants}
            animate={selectedCategory === null ? "active" : "inactive"}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </motion.button>
          {Object.keys(groupedItems).map((category, index) => (
            <motion.button
              key={category}
              className={styles.categoryButton}
              variants={categoryButtonVariants}
              animate={selectedCategory === category ? "active" : "inactive"}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              transition={{ delay: index * 0.05 }}
            >
              {categoryLabels[category as keyof typeof categoryLabels]}
              <span className={styles.categoryCount}>
                {groupedItems[category].length}
              </span>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Grid */}
      <motion.div 
        className={styles.grid}
        style={{ 
          maxWidth: `${maxColumns * 320}px`,
        }}
        layout
      >
        {filteredItems.map((item, index) => (
          <motion.div
            key={`${item.title}-${index}`}
            variants={itemVariants}
            custom={index}
            layout
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <NavCard {...item} />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <motion.div 
          className={styles.emptyState}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.emptyIcon}>🔍</div>
          <h3>No items found</h3>
          <p>Try selecting a different category or check back later.</p>
        </motion.div>
      )}
    </motion.section>
  );
};