'use client';

import { motion } from 'framer-motion';
import { PricingCalculator } from '@/components/PricingCalculator';
import pricingData from '@/data/pricing.json';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
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
              Transparent Pricing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Fair, flexible pricing for projects of all sizes. No hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="section-padding bg-dark-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Instant Estimate Calculator
            </h2>
            <p className="text-gray-400 text-lg">
              Enter your video length to see pricing across all tiers
            </p>
          </motion.div>

          <PricingCalculator />
        </div>
      </section>

      {/* Detailed Pricing Table */}
      <section className="section-padding">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-center">
              Pricing Tiers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 auto-rows-max">
              {pricingData.tiers.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative glass-effect rounded-2xl p-8 sm:p-10 transition-all duration-300 h-full flex flex-col ${
                    index === 1 ? 'border-2 border-primary-500 lg:scale-105' : 'border border-primary-500/20'
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{tier.description}</p>

                  <div className="mb-8">
                    <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text">
                      ₹{tier.minPrice}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Starting from • {tier.unit}
                    </p>
                  </div>

                  <h4 className="font-semibold text-white mb-6 text-lg">Includes:</h4>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`block w-full text-center px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 mt-auto ${
                      index === 1
                        ? 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-glow-lg'
                        : 'bg-primary-500/20 text-primary-300 hover:bg-primary-500/30 border border-primary-500/50'
                    }`}
                  >
                    Choose Plan
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-dark-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">
              Feature Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-white font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 text-white font-semibold">Creator</th>
                    <th className="text-center py-4 px-4 text-white font-semibold">Brand</th>
                    <th className="text-center py-4 px-4 text-white font-semibold">Studio</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Video Length', creator: 'Up to 5 min', brand: 'Up to 20 min', studio: 'Unlimited' },
                    { feature: 'Turnaround Time', creator: '24 hours', brand: '48 hours', studio: '72 hours' },
                    { feature: 'Revisions', creator: '1 round', brand: '3 rounds', studio: 'Unlimited' },
                    { feature: 'Delivery Formats', creator: 'MP4, ProRes', brand: 'MP4, ProRes, DCP', studio: 'All formats + RAW' },
                    { feature: 'AI Integration Level', creator: 'Basic', brand: 'Advanced', studio: 'Custom' },
                    { feature: 'Color Grading', creator: 'Standard', brand: 'Advanced', studio: 'Cinematic' },
                    { feature: 'Creative Consultation', creator: '—', brand: '✓', studio: '✓' },
                    { feature: 'Custom AI Training', creator: '—', brand: '—', studio: '✓' },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-gray-300">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-gray-400">{row.creator}</td>
                      <td className="py-4 px-4 text-center text-gray-400">{row.brand}</td>
                      <td className="py-4 px-4 text-center text-gray-400">{row.studio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-responsive max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Pricing FAQ
            </h2>
          </motion.div>

          <div className="space-y-6">
            {pricingData.faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-300">{item.answer}</p>
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
            Need a Custom Quote?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            For bulk projects or unique requirements, get in touch for a personalized proposal.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 active:scale-95"
          >
            Request Custom Quote
          </Link>
        </motion.div>
      </section>
    </div>
  );
}