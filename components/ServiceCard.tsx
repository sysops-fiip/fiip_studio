'use client';

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="group p-8 sm:p-10 rounded-2xl bg-dark-900 border border-white/[0.08] hover:border-primary-400/40 transition-all duration-300 hover:shadow-cinema-card h-full flex flex-col"
    >
      {/* Icon */}
      <div className="w-13 h-13 bg-primary-500/10 border border-primary-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 group-hover:border-primary-400/40 transition-all">
        <Icon className="w-6 h-6 text-primary-400" />
      </div>

      {/* Content */}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2.5 text-gray-300 text-xs sm:text-sm">
            <span className="text-primary-400 font-bold flex-shrink-0 mt-0.5">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/contact"
        className="inline-block w-full text-center px-6 py-3 bg-white/[0.03] hover:bg-primary-500 text-gray-200 hover:text-dark-950 border border-white/10 hover:border-primary-400 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 mt-auto"
      >
        Request Quote
      </Link>
    </motion.div>
  );
}
