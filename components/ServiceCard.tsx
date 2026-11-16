'use client';

import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProceduralTexture } from '@/components/ui/ProceduralTexture';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  delay?: number;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <GlassPanel className="glass-interactive p-8 h-full flex flex-col justify-between">
        <ProceduralTexture variant="grain" />
      <div>
        <div className="w-12 h-12 border border-neutral-800 bg-neutral-900 flex items-center justify-center mb-6">
          <Icon className="w-5 h-5 text-white" />
        </div>

        <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3">{title}</h3>
        <p className="text-neutral-400 text-sm leading-relaxed mb-6">{description}</p>

        <ul className="space-y-2.5 mb-8 text-xs font-mono text-neutral-400">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-white">·</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/contact"
        className="block w-full text-center py-3.5 bg-neutral-900 hover:bg-white text-neutral-300 hover:text-black border border-neutral-800 hover:border-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors mt-auto"
      >
        Inquire for Project
      </Link>
      </GlassPanel>
    </motion.div>
  );
}
