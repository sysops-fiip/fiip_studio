'use client';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProceduralTexture } from '@/components/ui/ProceduralTexture';

import { useState } from 'react';
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
}: PortfolioCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube ID if not explicitly provided
  const resolvedYoutubeId = youtubeId || (videoUrl ? videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/)?.[1] : null);

  return (
    <>
      <div
        className="group h-full"
      >
      <GlassPanel className="glass-interactive overflow-hidden h-full flex flex-col">
        <ProceduralTexture variant="grain" />
        {/* Video Thumbnail / Preview Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 opacity-85"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

          {/* Category Tag */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-black/90 border border-neutral-800 text-neutral-300">
              {category}
            </span>
          </div>

          {/* Client Tag */}
          {client && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-black/90 border border-neutral-800 text-neutral-400">
                {client}
              </span>
            </div>
          )}

          {/* Play Button Trigger */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                if (resolvedYoutubeId) {
                  setIsPlaying(true);
                } else if (videoUrl) {
                  window.open(videoUrl, '_blank');
                }
              }}
              className="w-12 h-12 bg-white text-black flex items-center justify-center group-hover:scale-105 transition-transform cursor-pointer"
              aria-label={`Play ${title}`}
            >
              <Play className="w-5 h-5 ml-0.5 fill-black" />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight uppercase mb-2 group-hover:text-neutral-200 transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2 mb-4 font-normal">
                {description}
              </p>
            )}
          </div>

          {/* Services Tag Pill Row */}
          {services && services.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-900 font-mono text-[10px] text-neutral-400">
              {services.map((srv, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 border border-neutral-800 bg-neutral-900/60 uppercase"
                >
                  {srv}
                </span>
              ))}
            </div>
          )}
        </div>
      </GlassPanel>
      </div>

      {/* Embedded Video Modal */}
      {isPlaying && resolvedYoutubeId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 lg:p-8"
          onClick={() => setIsPlaying(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black border border-neutral-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/80 border border-neutral-700 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
              aria-label="Close video"
            >
              <X className="w-4 h-4" />
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
