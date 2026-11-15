'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface PortfolioCardProps {
  id: string;
  title: string;
  category: string;
  client?: string;
  image: string;
  videoUrl?: string;
  youtubeId?: string;
  description?: string;
  services?: string[];
  delay?: number;
}

export function PortfolioCard({
  title,
  category,
  client,
  image,
  videoUrl,
  youtubeId,
  description,
  services,
  delay = 0,
}: PortfolioCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube ID if not explicitly provided
  const resolvedYoutubeId = youtubeId || (videoUrl ? videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/)?.[1] : null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-dark-900/90 hover:border-primary-400/40 transition-all duration-300 flex flex-col shadow-cinema-card"
      >
        {/* Video Thumbnail / Preview Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider uppercase bg-black/80 backdrop-blur-md border border-white/10 text-primary-300 rounded-md">
              {category}
            </span>
          </div>

          {/* Client Tag */}
          {client && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2.5 py-1 text-[10px] font-medium bg-dark-950/80 backdrop-blur-md border border-white/10 text-gray-300 rounded-md">
                {client}
              </span>
            </div>
          )}

          {/* Play Button Trigger */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              type="button"
              onClick={() => {
                if (resolvedYoutubeId) {
                  setIsPlaying(true);
                } else if (videoUrl) {
                  window.open(videoUrl, '_blank');
                }
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              className="w-13 h-13 rounded-full bg-primary-500/90 text-dark-950 flex items-center justify-center shadow-glow-gold backdrop-blur-sm group-hover:bg-primary-500 transition-all cursor-pointer"
              aria-label={`Play ${title}`}
            >
              <Play className="w-5 h-5 ml-0.5 fill-dark-950" />
            </motion.button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2 group-hover:text-primary-300 transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
                {description}
              </p>
            )}
          </div>

          {/* Services Tag Pill Row */}
          {services && services.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
              {services.map((srv, i) => (
                <span
                  key={i}
                  className="text-[9px] px-2 py-0.5 rounded bg-white/[0.03] text-gray-400 border border-white/5 font-mono"
                >
                  {srv}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Embedded Video Modal */}
      {isPlaying && resolvedYoutubeId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6 lg:p-8"
          onClick={() => setIsPlaying(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-dark-900/80 border border-white/20 text-white flex items-center justify-center hover:bg-primary-500 hover:text-dark-950 transition-all cursor-pointer"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${resolvedYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
