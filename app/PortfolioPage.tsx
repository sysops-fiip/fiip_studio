'use client';

import { ProceduralTexture } from '@/components/ui/ProceduralTexture';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { Reveal } from '@/components/ui/Reveal';

import { useState, useMemo } from 'react';
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
        <Reveal>
          <GlassPanel tone="light" elevation={2} className="p-6 sm:p-10">
            <ProceduralTexture variant="scan" className="opacity-[0.04]" />
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
              Production Archive
            </p>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-6">
              Commercials &amp; Feature Slate
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed font-mono">
              Selected broadcast campaigns, theatrical DI color mastering, and visual effects sequences delivered across India.
            </p>
          </GlassPanel>
        </Reveal>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Reveal>
          <GlassPanel tone="light" elevation={0} className="glass-interactive p-4 flex flex-wrap justify-center gap-2">
                <ProceduralTexture variant="mesh" className="opacity-[0.04]" />
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
        </GlassPanel>
        </Reveal>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <StaggerGroup key={selectedCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <div key={project.id} className="h-full">
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
            </div>
          ))}
        </StaggerGroup>
      </section>
    </div>
  );
}
