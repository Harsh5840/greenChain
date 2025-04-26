'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedComponentProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'none';
  once?: boolean;
}

const defaultVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }
};

export default function AnimatedComponent({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  variants,
  animation = 'fadeIn',
  once = true
}: AnimatedComponentProps) {
  // If no animation is desired
  if (animation === 'none') {
    return <div className={className}>{children}</div>;
  }

  // Use provided variants or default based on animation type
  const selectedVariants = variants || defaultVariants[animation];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={selectedVariants}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}