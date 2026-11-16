import type { ReactNode } from 'react';

interface GlassPanelProps {
  className?: string;
  children: ReactNode;
  /** Light glass on dark sections; dark glass on light sections. */
  tone?: 'light' | 'dark' | 'tinted';
  elevation?: 0 | 1 | 2;
}

export function GlassPanel({ children, className = '', tone = 'dark', elevation = 1 }: GlassPanelProps) {
  return <div className={`glass-panel glass-${tone} glass-elevation-${elevation} ${className}`}>{children}</div>;
}
