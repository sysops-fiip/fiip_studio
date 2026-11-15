'use client';

import { motion } from 'framer-motion';
import { Film, Sparkles, Palette, CheckCircle2, ArrowRight, MonitorPlay, ShieldCheck, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const coreServices = [
    {
      icon: Film,
      title: 'Editorial & Master Conform',
      badge: 'Core Post Discipline',
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
      badge: 'Advanced VFX',
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
      badge: 'Studio Suite',
      description: 'Dedicated DaVinci Resolve color suites led by veteran resident and partner colorists.',
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
    <div className="min-h-screen pt-28 pb-20 bg-dark-900 text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-3 inline-block">
            Studio Capabilities
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Edit · Visual Effects · Grade
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A boutique post-production house built for directors, agencies, and producers who demand cinematic precision with zero pipeline friction.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-dark-800/80 border border-white/10 hover:border-primary-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-3 pt-6 border-t border-white/5 text-xs text-gray-300">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-6">
                  <Link
                    href="/contact"
                    className="w-full py-3 bg-white/5 hover:bg-primary-500 hover:text-white border border-white/10 rounded-xl font-semibold text-xs transition-all text-center block"
                  >
                    Inquire for Project →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* The Frames Pipeline Interface Walkthrough */}
      <section className="py-20 bg-dark-950 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/30 text-xs font-semibold text-primary-300 mb-4">
              <Cpu className="w-3.5 h-3.5" />
              Client Experience
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              How You Interface With Us
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              No lost email chains, expiring WeTransfer links, or ambiguous revision timestamps.
              Our proprietary <strong>Frames portal</strong> bridges your team directly into our editing and color suites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-dark-900 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-primary-500/20 text-primary-400 font-bold flex items-center justify-center mb-4">
                01
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Ingest & Instant Dailies</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Raw footage streams directly into our 10Gbps NVMe pool. Proxies and dailies are generated and accessible to your team in Frames within hours of wrap.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-900 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-primary-500/20 text-primary-400 font-bold flex items-center justify-center mb-4">
                02
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Frame-Accurate Reviews</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Pause on any millisecond, draw annotations, and leave notes. Markers push straight into our editors' and colorists' DaVinci Resolve timelines.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-900 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-primary-500/20 text-primary-400 font-bold flex items-center justify-center mb-4">
                03
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Master Package & Delivery</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Approved cuts generate automated delivery bundles—DCP, ProRes 4444 XQ, web-optimized MP4s, and broadcast deliverables with full QC logs.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://frames.fixitinpost.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark-900 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
            >
              <MonitorPlay className="w-4 h-4 text-primary-600" />
              Visit frames.fixitinpost.in
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
