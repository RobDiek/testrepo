import React from 'react';
import { motion } from 'framer-motion';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = true,
}) => {
  return (
    <motion.div
      className={`glass-panel p-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hoverEffect ? { scale: 1.02, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default GlassmorphicCard;
