'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export const motionEase = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  as?: 'div' | 'section' | 'footer' | 'h1' | 'h2' | 'h3' | 'p';
}

export function Reveal({ children, className, delay = 0, y = 16, duration = 0.55, once = true, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    const StaticElement = as;
    return <StaticElement className={className}>{children}</StaticElement>;
  }
  const Element = motion[as];
  return (
    <Element className={className} initial={reduced ? false : { opacity: 0, y: Math.max(-16, Math.min(16, y)) }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once, margin: '-60px' }}
      transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: motionEase }}>
      {children}
    </Element>
  );
}
