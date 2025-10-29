'use client';

import { motion } from 'framer-motion';

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  bio?: string;
  delay?: number;
}

export function TeamCard({ name, role, image, bio, delay = 0 }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="glass-effect rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-primary-500/20 to-accent-500/20">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
        <p className="text-primary-400 text-sm font-medium mb-3">{role}</p>
        {bio && <p className="text-gray-400 text-sm">{bio}</p>}
      </div>
    </motion.div>
  );
}
