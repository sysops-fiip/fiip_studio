'use client';

import { ProceduralTexture } from '@/components/ui/ProceduralTexture';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { Reveal } from '@/components/ui/Reveal';

import { TeamCard } from '@/components/TeamCard';
import teamData from '@/data/team.json';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-black text-white selection:bg-white selection:text-black">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 text-center border-b border-neutral-900">
        <Reveal>
          <GlassPanel tone="light" elevation={2} className="p-6 sm:p-10">
            <ProceduralTexture variant="scan" className="opacity-[0.04]" />
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
              Studio Profile
            </p>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-6">
              Craft, Cinematography &amp; Post Architecture
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 max-w-3xl mx-auto leading-relaxed font-mono">
              Fix It In Post is a specialized post-production house built for high-fidelity editorial,
              theatrical DI color grading, and photoreal visual effects.
            </p>
          </GlassPanel>
        </Reveal>
      </section>

      {/* Studio Story Section */}
      <section className="glass-stage py-20 bg-neutral-950 border-b border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
              Facility History
            </p>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-8">
              Built by Filmmakers, Engineered for Scale
            </h2>

            <div className="space-y-6 text-neutral-400 text-sm sm:text-base leading-relaxed font-mono">
              <p>
                Based in Chennai, India, Fix It In Post Studios was founded to eliminate the friction, latency, and compromises typical of traditional post pipelines.
              </p>

              <p>
                Our facility is architected around synchronized DaVinci Resolve Studio color suites, dedicated editorial bays, and high-performance 3D/VFX nodes connected over an enterprise 10Gbps NVMe collaborative storage network.
              </p>

              <p>
                Whether partnering with flagship national brands on tight commercial broadcast turnarounds or collaborating with film directors on feature narrative DI finishing, our artists deliver cinema-grade polish across every timeline.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Studio Standards */}
      <section className="glass-stage py-20 bg-black border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
              Studio Benchmarks
            </Reveal>
            <Reveal as="h2" className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Operational Standards
            </Reveal>
          </div>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                index: '01',
                title: 'Color Fidelity & ACES Pipeline',
                description: 'Calibrated reference monitoring and ACES 2065-1 color science ensure our grades translate impeccably across theatrical DCPs, broadcast HDR, and mobile OLED screens.',
              },
              {
                index: '02',
                title: 'Invisible Artistry',
                description: 'The greatest visual effects are the ones the audience never notices—flawless camera cleanups, dynamic rig removals, and seamless photoreal integration.',
              },
              {
                index: '03',
                title: 'Zero Friction Collaboration',
                description: 'Our proprietary Frames portal empowers directors and agencies to review cuts, leave frame-accurate annotations, and compare version splits in real-time.',
              },
            ].map((value) => (
              <GlassPanel tone="light" elevation={1}
                key={value.title}
                className="glass-interactive p-8 hover:border-neutral-600 transition-colors"
              >
                <ProceduralTexture variant="mesh" className="opacity-[0.04]" />
                <span className="font-mono text-xs text-neutral-400 block mb-4">{value.index} / STANDARD</span>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm font-mono leading-relaxed">{value.description}</p>
              </GlassPanel>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Team Section */}
      <section className="glass-stage py-20 bg-neutral-950 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-900">
            <div>
              <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
                Studio Roster
              </Reveal>
              <Reveal as="h2" className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                Artists, Colorists &amp; Engineers
              </Reveal>
            </div>
            <Reveal as="p" className="text-xs sm:text-sm text-neutral-400 max-w-md mt-4 md:mt-0 font-mono">
              Nine multidisciplinary artists collaborating across narrative editorial, visual effects, and DI color grading.
            </Reveal>
          </div>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamData.team.map((member) => (
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

      {/* Studio CTA */}
      <section className="glass-stage py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
            Suite Availability
          </Reveal>
          <Reveal as="h2" className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            Consult on Upcoming Slate
          </Reveal>
          <Reveal as="p" className="text-neutral-400 text-xs sm:text-sm font-mono mb-8 max-w-md mx-auto leading-relaxed">
            Ready to review camera test footage, discuss deliverables, or schedule suite time?
          </Reveal>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors"
            >
              Get in Touch with Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
