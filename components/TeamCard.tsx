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
      className="glass-effect rounded-2xl overflow-hidden border border-white/10 hover:border-primary-500/50 transition-all duration-300 group flex flex-col h-full"
    >
      {/* Image Container / Fallback Avatar */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-dark-800 via-dark-900 to-black flex items-center justify-center">
        {!imgError ? (
          <img
            src={image}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full relative p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent"></div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary-500/30 to-accent-500/30 border border-primary-500/40 flex items-center justify-center shadow-glow-sm mb-3">
              <span className="text-2xl font-bold text-white tracking-wider">{initials}</span>
            </div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-primary-400 bg-primary-500/10 border border-primary-500/20 px-2.5 py-0.5 rounded-full">
              Studio Suite
            </span>
          </div>
        )}
        
        {/* Subtle gradient vignette at bottom of photo */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3 className="text-xl font-bold text-white tracking-tight">{name}</h3>
            {specialty && (
              <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                {specialty}
              </span>
            )}
          </div>
          <p className="text-primary-400 text-sm font-medium mb-3">{role}</p>
          {bio && <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">{bio}</p>}
        </div>
      </div>
    </motion.div>
  );
}
