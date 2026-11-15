'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PortfolioCard } from '@/components/PortfolioCard';
import projectsData from '@/data/projects.json';

type CategoryType = 'All' | 'Commercials' | 'Visual Effects' | 'Color & DI' | 'Feature & OTT';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');

  const categories: CategoryType[] = [
    'All',
    'Commercials',
    'Visual Effects',
    'Color & DI',
    'Feature & OTT',
  ];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return projectsData.projects;
    }
    return projectsData.projects.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-white">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary-400 mb-3 inline-block">
            Production Archive
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Commercials, Features &amp; VFX Showcases
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            From national broadcast brand commercials to feature film DI finishing and photoreal 3D/AI visuals.
          </p>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-primary-500 text-dark-950 font-bold shadow-glow-gold'
                  : 'bg-white/[0.03] text-gray-300 hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.04 }}
              layout
            >
              <PortfolioCard
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
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
