'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const pricingTiers = [
  {
    name: 'Creator Plan',
    minPrice: 300,
    maxPrice: 500,
    description: 'AI-Assisted Post',
  },
  {
    name: 'Brand Plan',
    minPrice: 600,
    maxPrice: 900,
    description: 'Hybrid VFX',
  },
  {
    name: 'Studio Plan',
    minPrice: 1200,
    maxPrice: 2000,
    description: 'Generative Visuals',
  },
];

interface PricingResult {
  tier: string;
  minCost: number;
  maxCost: number;
  description: string;
}

export function PricingCalculator() {
  const [seconds, setSeconds] = useState(60);
  const [results, setResults] = useState<PricingResult[]>([]);

  const calculatePrices = (videoSeconds: number) => {
    const calculated = pricingTiers.map((tier) => ({
      tier: tier.name,
      minCost: tier.minPrice * videoSeconds,
      maxCost: tier.maxPrice * videoSeconds,
      description: tier.description,
    }));
    setResults(calculated);
  };

  const handleInputChange = (value: number) => {
    setSeconds(value);
    calculatePrices(value);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Input Section */}
      <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/30 rounded-xl p-8 mb-8">
        <label className="block text-sm font-semibold text-gray-300 mb-4">
          Video Length (seconds)
        </label>
        <input
          type="range"
          min="1"
          max="300"
          value={seconds}
          onChange={(e) => handleInputChange(Number(e.target.value))}
          className="w-full h-3 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
        />
        <div className="flex items-center justify-between mt-4">
          <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text">
            {seconds}s
          </div>
          <button
            onClick={() => handleInputChange(60)}
            className="px-4 py-2 text-sm bg-primary-500/20 hover:bg-primary-500/30 border border-primary-500/50 rounded-lg transition-colors"
          >
            Reset to 60s
          </button>
        </div>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Estimated Pricing</h3>
          {results.map((result, index) => (
            <motion.div
              key={result.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect p-6 rounded-xl hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-lg">{result.tier}</h4>
                  <p className="text-gray-400 text-sm">{result.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text">
                    ₹{result.minCost.toLocaleString()} - ₹{result.maxCost.toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    ₹{Math.round(result.minCost / seconds)}/sec - ₹{Math.round(result.maxCost / seconds)}/sec
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* CTA */}
          <div className="mt-8 text-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 active:scale-95"
            >
              Get Detailed Quote
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
