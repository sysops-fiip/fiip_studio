'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';

interface PortfolioCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  videoUrl?: string;
  description?: string;
  delay?: number;
}

export function PortfolioCard({
  id,
  title,
  category,
  image,
  videoUrl,
  description,
  delay = 0,
}: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center"
      >
        <div className="text-center">
          {videoUrl && (
            <motion.a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0.8 }}
              animate={{ scale: isHovered ? 1 : 0.8 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full hover:bg-primary-600 transition-colors mb-4"
            >
              <Play className="w-6 h-6 text-white ml-1" />
            </motion.a>
          )}
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-300 text-sm mb-4">{description || category}</p>
          <span className="inline-block px-3 py-1 bg-primary-500/30 border border-primary-500/50 rounded-full text-xs font-medium text-primary-300">
            {category}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
