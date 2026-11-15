'use client';

import { motion } from 'framer-motion';
import { Film, Sparkles, Palette, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const coreServices = [
    {
      icon: Film,
      title: 'Editorial & Master Conform',
      badge: 'PILLAR 01',
      description: 'Precision offline narrative editing, high-energy commercial pacing, and robust timeline conforms.',
      features: [
        'Narrative Feature & Short Film Editorial',
        'High-Paced Commercials & Brand TVCs',
        'Episodic OTT Assembly & Broadcast Conform',
        'Multi-Language Dub & Audio Synchronization',
        'Offline-to-Online Master Re-linking & Archiving',
      ],
    },
    {
      icon: Sparkles,
      title: 'Visual Effects, 3D & Hybrid AI',
      badge: 'PILLAR 02',
      description: 'From photoreal 3D product CGI in Blender to invisible cleanups and proprietary generative AI pipelines.',
      features: [
        'Invisible Wire, Rig & Blemish Removal',
        'Photoreal 3D Animation & Shading (Blender)',
        'Node-Based Compositing & Screen Replacements (Fusion)',
        'Matte Painting & Dynamic Environment Extensions',
        'Proprietary ComfyUI Generative VFX Synthesis',
      ],
    },
    {
      icon: Palette,
      title: 'Color Grading & DI Finishing',
      badge: 'PILLAR 03',
      description: 'Dedicated DaVinci Resolve color suites led by resident and partner colorists.',
      features: [
        'Raw Sensor Debayer & Tailored Show LUT Development',
        'High-Fashion & Commercial Beauty Retouching',
        'Theatrical Color Timing (DCI-P3 Color Space)',
        'Broadcast HDR (Rec.2100 PQ / HLG) & SDR Deliverables',
        'Real-time Collaborative Grading across Studio LAN',
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-black text-white selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center border-b border-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
            Studio Disciplines
          </p>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-6">
            Edit · Visual Effects · Grade
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed font-mono">
            A boutique post-production house built for directors, agencies, and producers who demand cinematic precision with zero pipeline friction.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
                className="p-8 border border-neutral-800 bg-neutral-950 hover:border-neutral-600 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 border border-neutral-800 bg-neutral-900 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 font-mono">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 pt-6 border-t border-neutral-900 font-mono text-xs text-neutral-400">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-white">·</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-6">
                  <Link
                    href="/contact"
                    className="w-full py-3.5 bg-neutral-900 hover:bg-white text-neutral-300 hover:text-black border border-neutral-800 hover:border-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors text-center block"
                  >
                    Inquire for Suite Time →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Frames Client Interface Walkthrough */}
      <section className="py-20 bg-neutral-950 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
              Pipeline Integration
            </p>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
              How Clients Interface With Us
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-mono max-w-xl mx-auto leading-relaxed">
              No lost email chains, expiring transfer links, or ambiguous revision timestamps.
              Our proprietary Frames portal connects your team directly into our editing and color suites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-6 border border-neutral-800 bg-black">
              <span className="text-neutral-400 block text-[10px] mb-3">PHASE 01</span>
              <h4 className="text-base font-bold text-white uppercase mb-2">Ingest &amp; Instant Dailies</h4>
              <p className="text-neutral-400 leading-relaxed">
                Raw footage streams directly into our 10Gbps NVMe pool. Proxies and dailies are accessible in Frames within hours of camera wrap.
              </p>
            </div>

            <div className="p-6 border border-neutral-800 bg-black">
              <span className="text-neutral-400 block text-[10px] mb-3">PHASE 02</span>
              <h4 className="text-base font-bold text-white uppercase mb-2">Frame-Accurate Reviews</h4>
              <p className="text-neutral-400 leading-relaxed">
                Pause on any millisecond, draw annotations, and leave notes. Markers push straight into our editors&apos; and colorists&apos; DaVinci timelines.
              </p>
            </div>

            <div className="p-6 border border-neutral-800 bg-black">
              <span className="text-neutral-400 block text-[10px] mb-3">PHASE 03</span>
              <h4 className="text-base font-bold text-white uppercase mb-2">Master Package &amp; Delivery</h4>
              <p className="text-neutral-400 leading-relaxed">
                Approved cuts generate automated delivery bundles—DCP, ProRes 4444 XQ, web-optimized MP4s, and broadcast deliverables with QC reports.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://frames.fixitinpost.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors"
            >
              Open Frames Portal
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
