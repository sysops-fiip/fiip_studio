'use client';

import { motion } from 'framer-motion';
import { TeamCard } from '@/components/TeamCard';
import teamData from '@/data/team.json';
import Link from 'next/link';

export default function AboutPage() {
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
            Studio Heritage &amp; Philosophy
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Craft, Cinematography &amp; <br />
            <span className="gradient-text">Advanced Post Infrastructure</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Fix It In Post is a specialized post-production house built from the ground up for high-fidelity editorial,
            theatrical DI color grading, and photoreal visual effects.
          </p>
        </motion.div>
      </section>

      {/* Studio Story Section */}
      <section className="py-16 bg-dark-900 border-y border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-8 tracking-tight">
              Built by Filmmakers, Engineered for Scale
            </h2>

            <div className="space-y-6 text-gray-300 text-sm sm:text-base leading-relaxed">
              <p>
                Based in Chennai, India, Fix It In Post Studios was founded with a singular commitment: to eliminate the friction, latency, and compromises typical of traditional post pipelines.
              </p>

              <p>
                Our facility is architected around synchronized DaVinci Resolve Studio color suites, dedicated editorial offline bays, and high-performance 3D/VFX nodes connected over an enterprise 10Gbps NVMe collaborative storage network.
              </p>

              <p>
                Whether partnering with flagship national brands on tight commercial broadcast turnarounds or collaborating with film directors on feature narrative DI finishing, our artists deliver cinema-grade polish across every timeline.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Studio Values */}
      <section className="py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-xs font-mono uppercase tracking-widest text-primary-400 mb-3">
              Guiding Principles
            </h2>
            <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Our Studio Standards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: 'Color Fidelity & ACES Pipeline',
                description: 'Calibrated reference monitoring and ACEScc color science ensure our grades translate impeccably across theatrical DCPs, broadcast HDR, and mobile OLED screens.',
              },
              {
                title: 'Invisible Artistry',
                description: 'The greatest visual effects are the ones the audience never notices—flawless camera cleanups, dynamic rig removals, and seamless photoreal integration.',
              },
              {
                title: 'Zero Friction Collaboration',
                description: 'Our proprietary Frames portal empowers directors and agencies to review cuts, leave frame-accurate annotations, and compare version splits in real-time.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-dark-900 border border-white/[0.08] hover:border-primary-400/30 transition-all shadow-cinema-card"
              >
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-dark-900 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-xs font-mono uppercase tracking-widest text-primary-400 mb-3">
              The Post Roster
            </h2>
            <p className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Artists, Colorists &amp; Engineers
            </p>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Our multidisciplinary team collaborating across narrative editorial, visual effects, and DI color grading.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamData.team.map((member, index) => (
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

      {/* Studio CTA */}
      <section className="py-20 bg-dark-950 border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            Let&apos;s Build Something Unforgettable
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Ready to discuss your project timeline, review raw footage tests, or book suite time?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-primary-500 hover:bg-primary-400 text-dark-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-glow-gold"
            >
              Get in Touch with Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
