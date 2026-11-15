'use client';

import { motion } from 'framer-motion';
import { PricingCalculator } from '@/components/PricingCalculator';
import pricingData from '@/data/pricing.json';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-white">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary-400 mb-3 inline-block">
            Transparent Production Scoping
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Studio Engagement Models
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Every production has unique camera formats, deliverable requirements, and revision cycles.
            We provide clear, milestone-driven bids tailored to your delivery schedule.
          </p>
        </motion.div>
      </section>

      {/* Interactive Scope Estimator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Interactive Project Scope Builder
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Select your format and required disciplines to generate a project brief
          </p>
        </div>
        <PricingCalculator />
      </section>

      {/* Engagement Models Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Standard Studio Engagement Tiers
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            From single commercial turnarounds to long-term feature post partnerships
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingData.engagementModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 shadow-cinema-card ${
                model.featured
                  ? 'bg-dark-900 border-2 border-primary-400 shadow-glow-gold'
                  : 'bg-dark-900/60 border border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div>
                {model.featured && (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary-500 text-dark-950 mb-4 inline-block">
                    Recommended Model
                  </span>
                )}
                <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
                  {model.name}
                </h3>
                <p className="text-xs font-semibold text-primary-400 mb-4">{model.tagline}</p>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">{model.idealFor}</p>

                <div className="p-4 rounded-xl bg-dark-950 border border-white/5 space-y-2 mb-6 text-xs">
                  <div>
                    <span className="text-gray-400">Turnaround: </span>
                    <span className="font-semibold text-white">{model.turnaround}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Master Deliverables: </span>
                    <span className="font-semibold text-white">{model.deliverables}</span>
                  </div>
                </div>

                <ul className="space-y-3 pt-4 border-t border-white/5 text-xs text-gray-300">
                  {model.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={`/contact?tier=${model.id}`}
                  className={`w-full block text-center py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                    model.featured
                      ? 'bg-primary-500 text-dark-950 hover:bg-primary-400 shadow-glow-gold'
                      : 'bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/10'
                  }`}
                >
                  Consult on {model.name}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Direct Booking CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            Need an NDA or Custom Pipeline Review?
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm mb-6 max-w-xl mx-auto leading-relaxed">
            Our pipeline architects can audit your project timeline, raw camera codecs, and deliverable specifications directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-primary-500 hover:bg-primary-400 text-dark-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-glow-gold"
            >
              Open Direct Studio Inquiry
            </Link>
            <a
              href="mailto:hello@fixitinpost.in"
              className="px-6 py-3 border border-white/15 bg-white/[0.02] text-gray-200 font-semibold rounded-xl text-xs uppercase tracking-wider hover:bg-white/[0.08] transition-all"
            >
              hello@fixitinpost.in
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
