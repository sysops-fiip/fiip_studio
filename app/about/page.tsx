'use client';

import { motion } from 'framer-motion';
import { TeamCard } from '@/components/TeamCard';
import teamData from '@/data/team.json';

export default function About() {
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
              About Fix It In Post
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We merge human storytelling with AI precision to deliver cinematic visuals faster than ever before.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-dark-900">
        <div className="container-responsive max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">Our Story</h2>

            <div className="space-y-6 text-gray-300">
              <p>
                Founded in Chennai, India, Fix It In Post Studios emerged from a simple vision: to empower creators and studios with cutting-edge AI technology without compromising on artistic quality.
              </p>

              <p>
                Our team of VFX artists, AI engineers, and creative directors recognized an opportunity to revolutionize post-production workflows. Traditional VFX pipelines are time-consuming and expensive. We asked ourselves: what if we could combine human creativity with AI efficiency?
              </p>

              <p>
                Today, we've built a studio that bridges the gap between indie creators and large production houses. Whether you're filming a YouTube short or producing cinema-quality content, we have the expertise and technology to bring your vision to life faster and more affordably than ever before.
              </p>

              <p>
                We're not here to replace artists—we're here to amplify their potential. AI is our tool, but storytelling is our passion.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">
              Our Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Innovation',
                  description: 'We stay ahead of the curve, leveraging the latest AI and VFX technologies to deliver next-generation results.',
                },
                {
                  title: 'Quality',
                  description: 'Every frame matters. We maintain cinematic standards while embracing AI efficiency.',
                },
                {
                  title: 'Accessibility',
                  description: 'Professional-grade VFX should not be exclusive. We make premium services affordable for all creators.',
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="glass-effect p-8 rounded-xl text-center"
                >
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-dark-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Meet the Team</h2>
            <p className="text-gray-400 text-lg">
              Passionate creators and technologists working to transform your vision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamData.team.map((member, index) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role={member.role}
                image={member.image}
                bio={member.bio}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-padding">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Our Tech Stack
            </h2>
            <p className="text-gray-400 text-lg">
              Industry-leading tools and custom AI workflows
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                category: 'Color Grading & VFX',
                tools: ['DaVinci Resolve', 'Fusion', 'Nuke'],
              },
              {
                category: '3D & Animation',
                tools: ['Blender', 'After Effects', 'Cinema 4D'],
              },
              {
                category: 'AI & Generative',
                tools: ['ComfyUI', 'Stable Diffusion', 'Runway'],
              },
              {
                category: 'Post-Production',
                tools: ['Premiere Pro', 'Media Encoder', 'ffmpeg'],
              },
            ].map((stack, index) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect p-8 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  {stack.category}
                </h3>
                <ul className="space-y-2">
                  {stack.tools.map((tool) => (
                    <li key={tool} className="text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      {tool}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-dark-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: '50+', label: 'Projects Delivered' },
              { number: '100+', label: 'Satisfied Clients' },
              { number: '500+', label: 'Minutes of Content' },
              { number: '99%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
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
            Let's Create Together
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Ready to bring your creative vision to life? Let's talk.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 active:scale-95"
          >
            Get in Touch
          </a>
        </motion.div>
      </section>
    </div>
  );
}
