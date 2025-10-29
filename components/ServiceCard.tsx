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
      transition={{ delay }}
      viewport={{ once: true }}
      className="group glass-effect p-8 sm:p-10 rounded-xl hover:border-primary-500/50 transition-all duration-300 hover:shadow-glow-lg h-full flex flex-col border border-primary-500/20"
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-white" />
      </div>

       {/* Content */}
       <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
       <p className="text-gray-400 text-base mb-6">{description}</p>

       {/* Features */}
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-300 text-base">
            <span className="text-primary-400 font-bold flex-shrink-0 mt-0.5">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/contact"
        className="inline-block w-full text-center px-6 py-3 bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 border border-primary-500/50 rounded-lg font-semibold text-base transition-all duration-300 hover:border-primary-400 mt-auto"
      >
        Request Quote
      </Link>
    </motion.div>
  );
}
