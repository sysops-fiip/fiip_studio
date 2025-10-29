'use client';

import { motion } from 'framer-motion';
import { ServiceCard } from '@/components/ServiceCard';
import { Zap, Palette, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      icon: Zap,
      title: 'AI-Enhanced Post',
      description: 'Smart automation for color correction, editing, and effects.',
      features: [
        'Automated color grading',
        'AI-powered editing',
        'Quick turnaround',
        'Perfect for creators',
      ],
    },
    {
      icon: Palette,
      title: 'Hybrid VFX',
      description: 'Blend of AI tools and professional craftsmanship.',
      features: [
        'Custom VFX sequences',
        'Advanced compositing',
        'Brand-quality output',
        'Creative consultation',
      ],
    },
    {
      icon: Sparkles,
      title: 'Generative Visuals',
      description: 'AI-generated shots and entirely new creative sequences.',
      features: [
        'AI scene generation',
        'Custom model training',
        'Cinematic quality',
        'Studio-grade delivery',
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Three tiers of AI-powered post-production excellence, designed for every project scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16 auto-rows-max">
             {services.map((service, index) => (
               <ServiceCard
                 key={index}
                 icon={service.icon}
                 title={service.title}
                 description={service.description}
                 features={service.features}
                 delay={index * 0.2}
               />
             ))}
          </div>
        </div>
      </section>


      {/* Tools & Technology */}
      <section className="section-padding">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Tools & Technology
            </h2>
            <p className="text-gray-400 text-lg">
              We leverage industry-leading tools for exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'DaVinci Resolve',
              'Fusion',
              'Blender',
              'ComfyUI',
              'Stable Diffusion',
              'Runway',
              'After Effects',
              'Nuke',
            ].map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="glass-effect p-6 rounded-lg text-center hover:border-primary-500/50 transition-all"
              >
                <p className="font-semibold text-white">{tool}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/30 rounded-2xl p-12 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Ready to Transform Your Project?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Let's discuss which service tier is perfect for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 active:scale-95"
          >
            Get Started Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
}