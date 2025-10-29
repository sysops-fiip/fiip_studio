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

      {/* Key Differences */}
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
              Key Differences
            </h2>
            <p className="text-gray-400 text-lg">
              Choose the right plan for your project needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Creator Plan',
                highlights: ['Up to 5 min videos', '24hr turnaround', '1 revision round', 'Basic AI tools']
              },
              {
                title: 'Brand Plan',
                highlights: ['Up to 20 min videos', '48hr turnaround', '3 revision rounds', 'Advanced VFX']
              },
              {
                title: 'Studio Plan',
                highlights: ['Unlimited length', '72hr turnaround', 'Unlimited revisions', 'Custom AI training']
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect p-6 rounded-xl text-center"
              >
                <h3 className="text-xl font-bold text-white mb-4">{plan.title}</h3>
                <ul className="space-y-2">
                  {plan.highlights.map((highlight, i) => (
                    <li key={i} className="text-gray-300 text-sm">• {highlight}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
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