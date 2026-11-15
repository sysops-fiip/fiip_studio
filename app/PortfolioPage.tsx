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
    <div className="min-h-screen pt-28 pb-20 bg-black text-white selection:bg-white selection:text-black">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center border-b border-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
            Production Archive
          </p>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-6">
            Commercials &amp; Feature Slate
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed font-mono">
            Selected broadcast campaigns, theatrical DI color mastering, and visual effects sequences delivered across India.
          </p>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                selectedCategory === category
                  ? 'bg-white text-black font-semibold'
                  : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ delay: index * 0.03 }}
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
