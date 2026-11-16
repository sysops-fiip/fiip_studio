'use client';

import { Children, isValidElement, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { motionEase } from './Reveal';

export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className}>{Children.map(children, (child) => child == null ? null : <div className="h-full min-w-0 [&>.glass-panel]:h-full">{child}</div>)}</div>;
  }
  return (
    <motion.div className={className} initial={reduced ? false : 'hidden'} whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : 0.075 } } }}>
      {Children.map(children, (child) => child == null ? null : (
        <motion.div key={isValidElement(child) ? child.key : undefined} className="h-full min-w-0 [&>.glass-panel]:h-full"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.5, ease: motionEase } } }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
