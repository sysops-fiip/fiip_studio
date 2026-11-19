'use client';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProceduralTexture } from '@/components/ui/ProceduralTexture';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { VideoDialog } from '@/components/ui/VideoDialog';

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
            width={640} height={360} loading="lazy" decoding="async"
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
                  window.open(videoUrl, '_blank', 'noopener,noreferrer');
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

      <VideoDialog open={isPlaying && Boolean(resolvedYoutubeId)} onClose={() => setIsPlaying(false)} youtubeId={resolvedYoutubeId || ''} title={title} />
    </>
  );
}
