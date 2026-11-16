'use client';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { Reveal } from '@/components/ui/Reveal';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProceduralTexture } from '@/components/ui/ProceduralTexture';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, ArrowRight, ArrowUpRight, X } from 'lucide-react';
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
    'NESTLÉ',
    'HINDUSTAN UNILEVER',
    'KALYAN JEWELLERS',
    'HAVELLS',
    'NIPPON PAINT',
    'ASIAN PAINTS',
    'SONY PICTURES NETWORK',
    'CASAGRAND',
    'BRIGADE GROUP',
    'PREETHI',
    'GOLDWINNER',
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Hero Section with Interactive 3D WebGL Monochromatic Optics */}
      <section className="relative min-h-[94vh] pt-32 pb-20 flex items-center justify-center overflow-hidden border-b border-neutral-900">
        {/* Monochromatic 3D Cinema Anamorphic Assembly */}
        <Cinematic3DHero />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          {/* Studio Discipline Monospace Slate */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-block"
          >
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-neutral-400 border-b border-neutral-800 pb-2">
              FIIP POST STUDIOS · EDITORIAL · VFX &amp; 3D · DI COLOR
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tightest mb-8 leading-[1.02] uppercase text-white"
          >
            Where Craft,
            <br />
            Cinematography
            <br />
            &amp; Post Converge.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-400 mb-12 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            A boutique post-production facility delivering narrative editing, photoreal 3D visual effects,
            and flagship DaVinci Resolve color grading for feature films, episodic television, and national commercial campaigns.
          </motion.p>

          {/* Hero Actions (Editorial Monochrome) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-18 relative z-20"
          >
            <button
              onClick={() => setShowHeroVideo(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-none hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2.5 text-xs font-mono uppercase tracking-wider cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              Watch 2025 Showreel
            </button>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto px-8 py-4 border border-neutral-700 bg-transparent text-white font-semibold rounded-none hover:border-white transition-colors text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Selected Commercials
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Hero Showreel Video Frame (Cinema Letterbox) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-5xl mx-auto overflow-hidden border border-neutral-800 bg-neutral-950 group aspect-video cursor-pointer"
            onClick={() => setShowHeroVideo(true)}
          >
            {/* Branded reel plate — deliberately no auto-pulled YouTube thumbnail:
                the poster crop read as a random face and cheapened the hero. */}
            <ProceduralTexture variant="mesh" className="opacity-[0.10]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,#1d1d1d_0%,#0b0b0b_55%,#050505_100%)]" />
            {/* Anamorphic gate marks */}
            <div className="absolute inset-6 sm:inset-10 pointer-events-none">
              {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r','bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((c)=>(
                <span key={c} className={`absolute w-8 h-8 border-white/25 ${c}`} />
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/20 bg-black/80 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all mb-4">
                <Play className="w-6 h-6 ml-0.5 fill-current" />
              </div>
              <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-white">
                FIIP STUDIOS — 2025 VFX &amp; POST REEL
              </span>
              <span className="text-[11px] font-mono text-neutral-500 mt-1 tracking-widest">
                2025 · 4K DCI · 24.00 FPS · 2:45 MIN
              </span>
            </div>
          </motion.div>

          {/* Studio capabilities row — plain language, no jargon */}
          <GlassPanel className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16 p-6 sm:p-10 text-left">
            {[
              { k: 'EDITORIAL', v: 'Features, episodic & commercial cutdowns' },
              { k: 'VFX & 3D', v: 'Compositing, clean-up, CG integration' },
              { k: 'DI COLOR', v: 'DaVinci Resolve grading suites' },
              { k: 'FRAMES', v: 'Frame-accurate client review' },
            ].map((item) => (
              <div key={item.k}>
                <p className="font-mono text-lg font-bold text-white tracking-tight">{item.k}</p>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{item.v}</p>
              </div>
            ))}
          </GlassPanel>
        </div>
      </section>

      {/* Brand Credits Slate */}
      <section className="py-8 border-b border-neutral-900 bg-neutral-950 overflow-hidden texture-band">
        <ProceduralTexture variant="dots" density={1.2} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
          <Reveal as="p" className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            Select Commercial Clients &amp; Agency Partners
          </Reveal>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 max-w-6xl mx-auto px-4">
          {clientBrands.map((brand, i) => (
            <span
              key={i}
              className="text-xs font-mono tracking-widest text-neutral-400 hover:text-white transition-colors"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Editorial Disciplines Section (Non-SaaS) */}
      <section className="py-24 bg-black border-b border-neutral-900 texture-band">
        <ProceduralTexture variant="mesh" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-900">
            <div>
              <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
                Post Infrastructure
              </Reveal>
              <Reveal as="h2" className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                Core Disciplines
              </Reveal>
            </div>
            <Reveal as="p" className="text-xs sm:text-sm text-neutral-400 max-w-md mt-4 md:mt-0 leading-relaxed font-mono">
              Synchronized editorial bays, node-based VFX compositing, and calibrated reference color suites on a unified media pipeline.
            </Reveal>
          </div>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Discipline 01 */}
            <GlassPanel className="p-8 flex flex-col justify-between glass-interactive">
              <ProceduralTexture variant="grain" />
              <div>
                <span className="font-mono text-xs text-neutral-400 block mb-6">01 / EDITORIAL</span>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-white">
                  Narrative &amp; Commercial Edit
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                  Pacing, dramatic cadence, and structural story architecture across feature films,
                  high-energy broadcast commercials, and episodic OTT deliveries.
                </p>
              </div>
              <div className="space-y-2 pt-6 border-t border-neutral-900 text-xs font-mono text-neutral-400">
                <p>· Offline Assembly &amp; Creative Cut</p>
                <p>· Online Master Conform &amp; QC</p>
                <p>· Multi-Language Dub &amp; Audio Alignment</p>
              </div>
            </GlassPanel>

            {/* Discipline 02 */}
            <GlassPanel className="p-8 flex flex-col justify-between glass-interactive">
              <ProceduralTexture variant="grain" />
              <div>
                <span className="font-mono text-xs text-neutral-400 block mb-6">02 / VISUAL EFFECTS &amp; 3D</span>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-white">
                  Photoreal VFX &amp; CGI
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                  Seamless rig and blemish cleanups, dynamic screen replacements, Blender 3D photoreal product rendering,
                  and custom neural diffusion workflows for high-concept visuals.
                </p>
              </div>
              <div className="space-y-2 pt-6 border-t border-neutral-800 text-xs font-mono text-neutral-400">
                <p>· Invisible Rig, Wire &amp; Skin Cleanups</p>
                <p>· Photoreal 3D Shading &amp; Animation</p>
                <p>· Fusion Node Compositing &amp; Matte Painting</p>
              </div>
            </GlassPanel>

            {/* Discipline 03 */}
            <GlassPanel className="p-8 flex flex-col justify-between glass-interactive">
              <ProceduralTexture variant="grain" />
              <div>
                <span className="font-mono text-xs text-neutral-400 block mb-6">03 / DI COLOR &amp; FINISHING</span>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-white">
                  Color Grading &amp; DI Suites
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                  Dedicated DaVinci Resolve suites led by resident and partner colorists,
                  crafting bespoke cinematic looks and theatrical DCI-P3 mastering.
                </p>
              </div>
              <div className="space-y-2 pt-6 border-t border-neutral-900 text-xs font-mono text-neutral-400">
                <p>· Raw Sensor Debayer &amp; Look Dev</p>
                <p>· High-Fashion Commercial Beauty Grades</p>
                <p>· Theatrical DCP &amp; Broadcast HDR/SDR</p>
              </div>
            </GlassPanel>
          </StaggerGroup>
        </div>
      </section>

      {/* The Frames Review App Feature */}
      <section className="py-24 bg-neutral-950 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
                Client Review Suite
              </Reveal>
              <Reveal as="h2" className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-6">
                Frames Portal Integration
              </Reveal>
              <Reveal as="p" className="text-neutral-400 text-sm leading-relaxed mb-8">
                Eliminate scattered WhatsApp threads and expired download links.
                Directors, agencies, and producers interface directly with our suites through <strong>Frames</strong>,
                our dedicated frame-accurate review application.
              </Reveal>

              <div className="space-y-4 mb-8 font-mono text-xs text-neutral-400 border-l border-neutral-800 pl-4">
                <div>
                  <Reveal as="p" className="text-white font-medium">Frame-Accurate Timecode Notes</Reveal>
                  <Reveal as="p" className="text-neutral-400 mt-0.5">Annotate exact millisecond timestamps directly from desktop or mobile.</Reveal>
                </div>
                <div>
                  <Reveal as="p" className="text-white font-medium">Split-Screen Version Comparison</Reveal>
                  <Reveal as="p" className="text-neutral-400 mt-0.5">Compare V1 vs V2 or Raw Log vs Graded Master in real time.</Reveal>
                </div>
                <div>
                  <Reveal as="p" className="text-white font-medium">DaVinci Resolve Timeline Sync</Reveal>
                  <Reveal as="p" className="text-neutral-400 mt-0.5">Client approval markers load directly onto editor timelines.</Reveal>
                </div>
              </div>

              <a
                href="https://frames.fixitinpost.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black text-xs font-mono uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors"
              >
                Access Frames Portal
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Portal Interface Preview */}
            <Reveal className="lg:col-span-7">
              <GlassPanel elevation={2} className="p-4 sm:p-6">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-900 mb-4 font-mono text-[11px] text-neutral-400">
                  <span>FRAMES.FIXITINPOST.IN · SUITE MONITOR</span>
                  <span className="text-white">LIVE PIPELINE</span>
                </div>

                <div className="relative aspect-video overflow-hidden bg-neutral-900 mb-4">
                  <img
                    src="https://img.youtube.com/vi/7YsacApzJqU/maxresdefault.jpg"
                    alt="Frames Client Interface"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/80 backdrop-blur-sm border border-neutral-800 flex items-center justify-between font-mono text-xs">
                    <span className="text-white">TC: 01:00:14:18 · V2.4</span>
                    <span className="text-neutral-400 text-[11px] truncate ml-3">"Approved grade contrast on hero plate"</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 font-mono text-xs border-t border-neutral-900 pt-3">
                  <div>
                    <span className="text-neutral-400 block text-[10px]">PROJECT</span>
                    <span className="text-white font-medium truncate block">Pushpa 2 x Comfort</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">STAGE</span>
                    <span className="text-white font-medium block">DI Master</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">STATUS</span>
                    <span className="text-white font-medium block">APPROVED</span>
                  </div>
                </div>
              </GlassPanel>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Works Grid */}
      <section className="py-24 bg-black border-b border-neutral-900 texture-band">
        <ProceduralTexture variant="mesh" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-900">
            <div>
              <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
                Selected Archive
              </Reveal>
              <Reveal as="h2" className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                Recent Works
              </Reveal>
            </div>
            <Link
              href="/portfolio"
              className="mt-4 md:mt-0 font-mono text-xs uppercase tracking-wider text-neutral-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
            >
              View Full 30+ Project Slate <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
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
              />
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Studio Team Roster */}
      <section className="py-24 bg-neutral-950 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-900">
            <div>
              <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
                Studio Roster
              </Reveal>
              <Reveal as="h2" className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                Artists &amp; Colorists
              </Reveal>
            </div>
            <Reveal as="p" className="text-xs sm:text-sm text-neutral-400 max-w-md mt-4 md:mt-0 font-mono">
              Nine editors, colorists, and VFX supervisors collaborating across shared studio suites.
            </Reveal>
          </div>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreTeam.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role={member.role}
                specialty={member.specialty}
                image={member.image}
                fallbackInitials={member.fallbackInitials}
                bio={member.bio}
              />
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Direct Studio Inquiry Slate */}
      <section className="py-24 bg-black">
        <GlassPanel className="max-w-4xl mx-auto p-6 sm:p-10 text-center">
          <ProceduralTexture variant="grain" />
          <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
            Commissioning &amp; Bookings
          </Reveal>
          <Reveal as="h2" className="text-3xl sm:text-6xl font-black uppercase tracking-tight mb-6">
            Initiate Project Timeline
          </Reveal>
          <Reveal as="p" className="text-neutral-400 text-sm sm:text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Whether for a national commercial broadcast turnaround, feature film DI color grade, or complex VFX sequence, let&apos;s review your raw camera specs and schedule.
          </Reveal>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors"
            >
              Request Studio Schedule
            </Link>
            <a
              href="mailto:hello@fixitinpost.in"
              className="px-8 py-4 border border-neutral-800 text-white font-semibold text-xs font-mono uppercase tracking-wider hover:border-white transition-colors"
            >
              hello@fixitinpost.in
            </a>
          </div>
        </GlassPanel>
      </section>

      {/* Showreel Video Modal */}
      {showHeroVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 lg:p-8"
          onClick={() => setShowHeroVideo(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black border border-neutral-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowHeroVideo(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/80 border border-neutral-700 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
              aria-label="Close Showreel"
            >
              <X className="w-4 h-4" />
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
