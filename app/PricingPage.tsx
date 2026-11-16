'use client';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { Reveal } from '@/components/ui/Reveal';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProceduralTexture } from '@/components/ui/ProceduralTexture';

import { PricingCalculator } from '@/components/PricingCalculator';
import pricingData from '@/data/pricing.json';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-black text-white selection:bg-white selection:text-black">
      {/* Hero Header */}
      <section className="glass-stage max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 text-center border-b border-neutral-900">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
            Commissioning &amp; Scope
          </p>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-6">
            Production Engagement
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed font-mono">
            Every production timeline involves tailored camera formats, deliverable specifications, and suite requirements.
            We provide milestone-driven commissioning for commercial campaigns, episodic OTT, and feature films.
          </p>
        </Reveal>
      </section>

      {/* Interactive Scope Builder */}
      <section className="glass-stage max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-neutral-900">
        <div className="text-center mb-10">
          <Reveal as="h2" className="text-xl sm:text-3xl font-bold uppercase tracking-tight mb-2">
            Project Scope Builder
          </Reveal>
          <Reveal as="p" className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Configure format and required disciplines for an official studio quotation
          </Reveal>
        </div>
        <Reveal><PricingCalculator /></Reveal>
      </section>

      {/* Engagement Slates (Editorial Structure) */}
      <section className="glass-stage max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-neutral-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
            Standard Slates
          </Reveal>
          <Reveal as="h2" className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            Studio Retainer &amp; Project Models
          </Reveal>
        </div>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingData.engagementModels.map((model, index) => (
            <div
              key={model.id}
              className="h-full"
            >
              <GlassPanel tone={model.featured ? 'tinted' : 'dark'} elevation={model.featured ? 2 : 1} className="p-8 h-full flex flex-col justify-between glass-interactive">
                <ProceduralTexture variant="grain" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                    SLATE 0{index + 1}
                  </span>
                  {model.featured && (
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-white text-white">
                      COMMERCIAL STANDARD
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-1">
                  {model.name}
                </h3>
                <p className="text-xs font-mono text-neutral-400 uppercase mb-6">{model.tagline}</p>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-mono">{model.idealFor}</p>

                <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-2 mb-6 font-mono text-xs">
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">TARGET TURNAROUND</span>
                    <span className="text-white font-medium">{model.turnaround}</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-800">
                    <span className="text-neutral-400 block text-[10px] uppercase">DELIVERABLES MASTER</span>
                    <span className="text-white font-medium">{model.deliverables}</span>
                  </div>
                </div>

                <ul className="space-y-2 pt-4 border-t border-neutral-900 font-mono text-xs text-neutral-400">
                  {model.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-white">·</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={`/contact?tier=${model.id}`}
                  className={`w-full block text-center py-3.5 font-mono text-xs uppercase tracking-wider font-semibold transition-colors ${
                    model.featured
                      ? 'bg-white text-black hover:bg-neutral-200'
                      : 'border border-neutral-800 text-neutral-300 hover:border-white hover:text-white'
                  }`}
                >
                  Consult on {model.name}
                </Link>
              </div>
              </GlassPanel>
            </div>
          ))}
        </StaggerGroup>
      </section>

      {/* NDA / Direct Review Slate */}
      <section className="glass-stage max-w-4xl mx-auto px-4 py-16 text-center">
        <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
          Confidentiality &amp; Pipeline
        </Reveal>
        <Reveal as="h2" className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-4">
          NDA &amp; Custom Workflow Audit
        </Reveal>
        <Reveal as="p" className="text-neutral-400 text-xs sm:text-sm font-mono mb-8 max-w-xl mx-auto leading-relaxed">
          For unreleased feature scripts, NDA brand campaigns, and custom technical pipeline integrations, contact our studio supervisors directly.
        </Reveal>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors"
          >
            Direct Inquiry
          </Link>
          <a
            href="mailto:hello@fixitinpost.in"
            className="px-8 py-3.5 border border-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-semibold hover:border-white transition-colors"
          >
            hello@fixitinpost.in
          </a>
        </div>
      </section>
    </div>
  );
}
