'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Film, Sparkles, Palette, ArrowRight, CheckCircle2, ShieldCheck, Cpu, MonitorPlay, X } from 'lucide-react';
import { PortfolioCard } from '@/components/PortfolioCard';
import { TeamCard } from '@/components/TeamCard';
import projectsData from '@/data/projects.json';
import teamData from '@/data/team.json';

// Dynamic import with SSR false for Three.js 3D WebGL Hero Canvas
const Cinematic3DHero = dynamic(() => import('@/components/Cinematic3DHero'), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  const [showHeroVideo, setShowHeroVideo] = useState(false);
  const featuredProjects = projectsData.projects.slice(0, 6);
  const coreTeam = teamData.team;

  const clientBrands = [
    'Nestlé',
    'Hindustan Unilever',
    'Kalyan Jewellers',
    'Havells',
    'Nippon Paint',
    'Asian Paints',
    'Sony Pictures Network',
    'Casagrand',
    'Brigade Group',
    'Preethi Appliances',
    'GoldWinner',
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-white selection:bg-primary-500/30 selection:text-white">
      {/* Hero Section with Interactive 3D WebGL Integration */}
      <section className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
        {/* Interactive 3D Cinema Anamorphic Lens (Desktop WebGL) */}
        <Cinematic3DHero />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          {/* Studio Discipline Monospace Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-block"
          >
            <div className="px-4 py-1.5 bg-white/[0.04] border border-white/10 rounded-full backdrop-blur-md flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-gray-300">
                Editorial · Photoreal VFX · DI Color Suites
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08]"
          >
            Where Craft, Cinematography
            <br />
            <span className="gradient-text">&amp; Advanced Post Converge</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-gray-300 mb-10 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Fix It In Post is a boutique post-production house delivering narrative editing,
            photoreal visual effects, 3D CGI, and flagship DaVinci Resolve color grading
            for feature films, television, and national commercial campaigns.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 relative z-20"
          >
            <button
              onClick={() => setShowHeroVideo(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-primary-500 text-dark-950 font-bold rounded-xl hover:bg-primary-400 hover:shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer text-sm"
            >
              <Play className="w-4 h-4 fill-dark-950" />
              Watch 2025 Showreel
            </button>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/15 bg-white/[0.03] text-gray-200 font-semibold rounded-xl hover:bg-white/[0.08] hover:border-primary-400/50 transition-all duration-300 text-sm flex items-center justify-center gap-2"
            >
              Explore Commercials &amp; Works
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Hero Showreel Video Preview Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black group aspect-video cursor-pointer"
            onClick={() => setShowHeroVideo(true)}
          >
            <img
              src="https://img.youtube.com/vi/zF-ztC0lzJs/maxresdefault.jpg"
              alt="Fix It In Post 2025 Showreel"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-black/40 to-black/20 flex flex-col items-center justify-center p-6">
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-primary-500 text-dark-950 flex items-center justify-center shadow-glow-gold mb-3 sm:mb-4"
              >
                <Play className="w-7 h-7 sm:w-9 sm:h-9 ml-1 fill-dark-950" />
              </motion.div>
              <span className="text-xs sm:text-base font-semibold tracking-wider uppercase text-white/95">
                Fix It In Post Studios — 2025 VFX Showreel
              </span>
              <span className="text-[11px] sm:text-xs font-mono text-gray-400 mt-1">
                2:45 MIN · 4K HDR MASTER · 24.00 FPS
              </span>
            </div>
          </motion.div>

          {/* Studio Infrastructure Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mt-14 pt-10 border-t border-white/[0.08]">
            <div className="p-4 rounded-xl bg-dark-900/60 border border-white/5">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary-400 font-mono">
                10G / 2.5G
              </p>
              <p className="text-xs text-gray-400 mt-1">Collaborative NVMe Media Pipeline</p>
            </div>
            <div className="p-4 rounded-xl bg-dark-900/60 border border-white/5">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary-400 font-mono">
                4K / 8K RAW
              </p>
              <p className="text-xs text-gray-400 mt-1">DaVinci Resolve Studio Color Suites</p>
            </div>
            <div className="p-4 rounded-xl bg-dark-900/60 border border-white/5">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary-400 font-mono">
                30+
              </p>
              <p className="text-xs text-gray-400 mt-1">National Commercials &amp; OTT Campaigns</p>
            </div>
            <div className="p-4 rounded-xl bg-dark-900/60 border border-white/5">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary-400 font-mono">
                Frames
              </p>
              <p className="text-xs text-gray-400 mt-1">Proprietary Review &amp; Approval Suite</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Client Brands Bar */}
      <section className="py-12 border-y border-white/[0.08] bg-dark-900/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
          <p className="text-[11px] font-mono uppercase tracking-widest text-gray-400">
            Trusted by Broadcasters, Agencies &amp; Flagship Brands
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 max-w-6xl mx-auto px-4">
          {clientBrands.map((brand, i) => (
            <span
              key={i}
              className="text-xs sm:text-sm font-medium tracking-wide text-gray-400 hover:text-primary-300 transition-colors"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* The Three Pillars Section */}
      <section className="py-24 bg-dark-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-primary-400 mb-3">
              Comprehensive Post-Production
            </h2>
            <p className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Our Core Disciplines
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              From the first offline assembly to final master packaging, our studio is architected
              around three collaborative creative pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Pillar 1: Editorial */}
            <div className="p-8 rounded-2xl bg-dark-900 border border-white/[0.08] hover:border-primary-400/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-6">
                  <Film className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Narrative &amp; Commercial Edit</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Pacing, emotional resonance, and tight narrative flow across feature films,
                  high-energy commercials, episodic television, and complex multi-cam timelines.
                </p>
              </div>
              <ul className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-400" /> Offline Assembly &amp; Story Architecture</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-400" /> Online Master Conform &amp; Packaging</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-400" /> Multi-Language Dub &amp; Audio Alignment</li>
              </ul>
            </div>

            {/* Pillar 2: Visual Effects & 3D */}
            <div className="p-8 rounded-2xl bg-dark-900 border border-primary-400/30 hover:border-primary-400/60 transition-all duration-300 flex flex-col justify-between relative shadow-glow-sm">
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 border border-primary-500/30">
                  Featured Reel
                </span>
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">VFX, 3D &amp; Hybrid AI</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Invisible rig removals, screen replacements, photoreal 3D product rendering in Blender,
                  and proprietary ComfyUI generative workflows that accelerate the creative frontier.
                </p>
              </div>
              <ul className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-400" /> Invisible Blemish &amp; Rig Removal</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-400" /> Photoreal 3D Animation &amp; Shading</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-400" /> Fusion Node Compositing &amp; Cleanups</li>
              </ul>
            </div>

            {/* Pillar 3: Color & DI */}
            <div className="p-8 rounded-2xl bg-dark-900 border border-white/[0.08] hover:border-primary-400/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-6">
                  <Palette className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Color Grading &amp; DI</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Dedicated DaVinci Resolve color suites led by resident and partner colorists,
                  shaping emotive visual tone, skin fidelity, and theatrical HDR deliverability.
                </p>
              </div>
              <ul className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-400" /> Raw Sensor Debayer &amp; Look Development</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-400" /> High-Fashion &amp; Commercial Beauty Grade</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-400" /> Theatrical DCP &amp; Broadcast SDR/HDR</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Frames Pipeline Client Interface Feature */}
      <section className="py-20 bg-dark-900 border-y border-white/[0.08] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-mono text-primary-300 mb-6">
                <Cpu className="w-3.5 h-3.5" />
                Studio Pipeline Technology
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
                Client Review via the <br />
                <span className="gradient-text">Frames App Portal</span>
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-8">
                We believe post-production should have zero friction. Clients, directors, and agencies
                interface directly with our studio suites via <strong>Frames</strong>—our secure, frame-accurate
                review and approval application.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MonitorPlay className="w-3.5 h-3.5 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Frame-Accurate Video Annotations</h4>
                    <p className="text-xs text-gray-400">Leave drawings, notes, and color feedback stamped directly to the exact timeline frame.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Instant Version Comparison</h4>
                    <p className="text-xs text-gray-400">Compare V1 vs V2 or Raw vs Grade with side-by-side split screen in real time.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct DaVinci Resolve Integration</h4>
                    <p className="text-xs text-gray-400">Client approvals trigger immediate timeline conforms across our PostgreSQL network.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="https://frames.fixitinpost.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-dark-950 font-bold rounded-xl hover:bg-gray-200 transition-all text-sm inline-flex items-center gap-2"
                >
                  Open Frames Portal
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Portal Visual Mockup */}
            <div className="lg:col-span-6">
              <div className="p-5 sm:p-6 rounded-3xl bg-dark-950 border border-white/15 shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="text-xs font-mono text-gray-400 ml-2">frames.fixitinpost.in · Review Suite</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-primary-500/20 text-primary-300">
                    LIVE PIPELINE
                  </span>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-4">
                  <img
                    src="https://img.youtube.com/vi/7YsacApzJqU/maxresdefault.jpg"
                    alt="Frames Client Interface"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                    <span className="font-mono text-primary-300">TC: 01:00:14:18 · Version 2.4</span>
                    <span className="text-gray-300 text-[11px] truncate ml-2">Note: "Approve grade contrast on hero plate"</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                  <div className="p-3 rounded-xl bg-dark-900 border border-white/5">
                    <p className="text-[11px] text-gray-400">Project</p>
                    <p className="text-xs font-bold text-white truncate">Pushpa 2 x Comfort</p>
                  </div>
                  <div className="p-3 rounded-xl bg-dark-900 border border-white/5">
                    <p className="text-[11px] text-gray-400">Stage</p>
                    <p className="text-xs font-bold text-primary-300">DI Final Master</p>
                  </div>
                  <div className="p-3 rounded-xl bg-dark-900 border border-white/5">
                    <p className="text-[11px] text-gray-400">Status</p>
                    <p className="text-xs font-bold text-emerald-400">Approved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works Grid */}
      <section className="py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-primary-400 mb-3">
                Selected Works
              </h2>
              <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Commercials &amp; Feature Projects
              </p>
            </div>
            <Link
              href="/portfolio"
              className="mt-4 md:mt-0 text-sm font-semibold text-primary-300 hover:text-primary-200 inline-flex items-center gap-1.5"
            >
              View All 30+ Works <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProjects.map((project, index) => (
              <PortfolioCard
                key={project.id}
                id={project.id}
                title={project.title}
                client={project.client}
                category={project.category}
                image={project.image}
                videoUrl={project.videoUrl}
                youtubeId={project.youtubeId}
                description={project.description}
                services={project.services}
                delay={index * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Studio Team Roster */}
      <section className="py-24 bg-dark-900 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-primary-400 mb-3">
              The People Behind The Pixels
            </h2>
            <p className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Our Studio Roster
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Editors, colorists, and VFX artists collaborating in synchronized suites on the shared studio network.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreTeam.map((member, index) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role={member.role}
                specialty={member.specialty}
                image={member.image}
                fallbackInitials={member.fallbackInitials}
                bio={member.bio}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-dark-950 border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 tracking-tight">
            Ready to bring your visuals to life?
          </h2>
          <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Whether it&apos;s a nationwide commercial campaign, feature film DI color grade, or complex visual effects sequence, let&apos;s discuss your timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-primary-500 text-dark-950 font-bold rounded-xl hover:bg-primary-400 hover:shadow-glow-gold transition-all text-sm"
            >
              Schedule Studio Consultation
            </Link>
            <a
              href="mailto:hello@fixitinpost.in"
              className="px-8 py-3.5 border border-white/15 bg-white/[0.02] text-gray-200 font-semibold rounded-xl hover:bg-white/[0.08] transition-all text-sm"
            >
              hello@fixitinpost.in
            </a>
          </div>
        </div>
      </section>

      {/* Global Hero Video Modal */}
      {showHeroVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6 lg:p-8"
          onClick={() => setShowHeroVideo(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowHeroVideo(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-dark-900/80 border border-white/20 text-white flex items-center justify-center hover:bg-primary-500 hover:text-dark-950 transition-all cursor-pointer"
              aria-label="Close Showreel"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src="https://www.youtube.com/embed/zF-ztC0lzJs?autoplay=1&rel=0&modestbranding=1"
              title="Fix it in Post Studios - 2025 VFX Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </div>
  );
}
