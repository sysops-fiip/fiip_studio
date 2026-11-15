'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TeamCardProps {
  name: string;
  role: string;
  specialty?: string;
  image: string;
  fallbackInitials?: string;
  bio?: string;
  delay?: number;
}

export function TeamCard({
  name,
  role,
  specialty,
  image,
  fallbackInitials,
  bio,
  delay = 0,
}: TeamCardProps) {
  const [imgError, setImgError] = useState(false);
  const initials = fallbackInitials || name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="rounded-2xl overflow-hidden border border-white/[0.08] bg-dark-900/90 hover:border-primary-400/40 transition-all duration-300 group flex flex-col h-full shadow-cinema-card"
    >
      {/* Image Container / Fallback Avatar */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-dark-800 via-dark-900 to-black flex items-center justify-center">
        {!imgError ? (
          <img
            src={image}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full relative p-6">
            <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-primary-500/20 to-primary-300/10 border border-primary-400/30 flex items-center justify-center shadow-glow-sm mb-3">
              <span className="text-xl font-bold font-mono text-primary-300 tracking-wider">{initials}</span>
            </div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-primary-300/80 bg-primary-500/10 border border-primary-500/20 px-2.5 py-0.5 rounded-full">
              Post Finishing Suite
            </span>
          </div>
        )}
        
        {/* Subtle gradient vignette at bottom of photo */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{name}</h3>
            {specialty && (
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-gray-300 border border-white/10 shrink-0">
                {specialty}
              </span>
            )}
          </div>
          <p className="text-primary-400 text-xs sm:text-sm font-medium mb-3">{role}</p>
          {bio && <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">{bio}</p>}
        </div>
      </div>
    </motion.div>
  );
}
