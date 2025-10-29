'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ServiceCard } from '@/components/ServiceCard';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { Zap, Palette, Sparkles } from 'lucide-react';

export default function Home() {
  const services = [
    {
      icon: Zap,
      title: 'AI-Enhanced Post',
      description: 'Smart automation for color correction, editing, and effects.',
      price: '₹300–500',
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
      price: '₹600–900',
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
      price: '₹1200+',
      features: [
        'AI scene generation',
        'Custom model training',
        'Cinematic quality',
        'Studio-grade delivery',
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden bg-dark-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-accent-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-block"
          >
            <div className="px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full">
              <span className="text-sm font-semibold text-primary-300">
                🎬 AI-Powered VFX Studio
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            We don't just fix it in post
            <br />
            <span className="gradient-text">we reinvent it</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            AI-assisted post-production and VFX for creators, brands, and studios.
            Cinematic quality, faster turnaround, innovative creativity.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 hover:shadow-glow-lg transition-all duration-300 active:scale-95"
            >
              View Our Reel
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-primary-500 text-primary-300 font-semibold rounded-lg hover:bg-primary-500/10 hover:shadow-glow-md transition-all duration-300"
            >
              Get a Quote
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 lg:gap-12 mt-16"
          >
            {[
              { number: '50+', label: 'Projects Delivered' },
              { number: '99%', label: 'Client Satisfaction' },
              { number: '24h', label: 'Avg Turnaround' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text mb-3">
                  {stat.number}
                </p>
                <p className="text-base text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              What We Do
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Three tiers of AI-powered excellence, from creator-friendly to studio-grade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                price={service.price}
                features={service.features}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              The Difference We Make
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Drag the slider to see the transformation power of our VFX.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&h=675&fit=crop"
              afterImage="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=675&fit=crop"
              beforeLabel="Before"
              afterLabel="After VFX"
            />
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Who We Work With
            </h2>
            <p className="text-gray-400 text-lg">
              Trusted by creators, brands, and studios worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              'Filmmakers',
              'Brands',
              'Studios',
              'YouTubers',
              'Agencies',
              'Music Labels',
              'Production Houses',
              'OTT Platforms',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="glass-effect p-8 rounded-lg text-center hover:border-primary-500/50 transition-all border border-primary-500/20"
              >
                <p className="font-semibold text-white text-lg">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/30 rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Start Your Project Today
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Get a detailed quote within 24 hours. No hidden fees. Transparent pricing.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold text-base rounded-lg hover:shadow-glow-lg transition-all duration-300 active:scale-95"
            >
              Get a Quote Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
