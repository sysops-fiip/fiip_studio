'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

function ProgressLine() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });
  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX }} />;
}

export function ScrollProgress() {
  const reduced = useReducedMotion();
  return reduced ? null : <ProgressLine />;
}
