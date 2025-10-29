'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PortfolioCard } from '@/components/PortfolioCard';
import projectsData from '@/data/projects.json';

type CategoryType = 'All' | 'Ads' | 'Music Videos' | 'AI Shots' | 'Post-Production' | 'Social Media';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');

  const categories: CategoryType[] = [
    'All',
    'Ads',
    'Music Videos',
    'AI Shots',
    'Post-Production',
    'Social Media',
  ];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return projectsData.projects;
    }
    return projectsData.projects.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

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
              Our Portfolio
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our recent projects and see the power of AI-assisted VFX in action.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-glow-md'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding">
        <div className="container-responsive">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <PortfolioCard
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  image={project.image}
                  videoUrl={project.videoUrl}
                  description={project.description}
                />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">No projects found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '100+', label: 'Happy Clients' },
              { number: '500+', label: 'Mins of Content' },
              { number: '99%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/30 rounded-2xl p-12 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Want Your Project in Our Portfolio?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Let's create something amazing together. Contact us for a free consultation.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 active:scale-95"
          >
            Start Your Project
          </a>
        </motion.div>
      </section>
    </div>
  );
}
