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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      viewport={{ once: true }}
      className="border border-neutral-800 bg-neutral-950 hover:border-neutral-600 transition-colors group flex flex-col h-full"
    >
      {/* Image Container / Fallback Avatar */}
      <div className="relative overflow-hidden aspect-[4/3] bg-neutral-900 flex items-center justify-center border-b border-neutral-900">
        {!imgError ? (
          <img
            src={image}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-102 transition-transform duration-700"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full p-6 text-center">
            <div className="w-16 h-16 border border-neutral-700 bg-neutral-900 flex items-center justify-center mb-3">
              <span className="text-xl font-mono text-white tracking-widest">{initials}</span>
            </div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
              FIIP FINISHING SUITE
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">{name}</h3>
            {specialty && (
              <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 border border-neutral-800 bg-neutral-900 text-neutral-400 shrink-0">
                {specialty}
              </span>
            )}
          </div>
          <p className="text-neutral-400 text-xs font-mono uppercase tracking-wider mb-3">{role}</p>
          {bio && (
            <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
              {bio}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
