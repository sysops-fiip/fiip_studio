'use client';

import { useEffect, useMemo, useState } from 'react';
import { Play } from 'lucide-react';
import { Mnemonic } from '@/components/Mnemonic';
import { VideoDialog } from '@/components/ui/VideoDialog';
import projectsData from '@/data/projects.json';

type Category = 'All' | 'Commercials' | 'Visual Effects' | 'Color & DI' | 'Feature & OTT';
const CATEGORIES: Category[] = ['All', 'Commercials', 'Visual Effects', 'Color & DI', 'Feature & OTT'];
const LABEL: Record<Category, string> = { All: 'All work', Commercials: 'Commercials', 'Visual Effects': 'Visual effects', 'Color & DI': 'Colour & DI', 'Feature & OTT': 'Feature & OTT' };
const ytId = (p: { youtubeId?: string; videoUrl?: string }) => p.youtubeId || p.videoUrl?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/)?.[1] || '';

export default function PortfolioPage() {
  const [category, setCategory] = useState<Category>('All');
  const [video, setVideo] = useState<{ id: string; title: string } | null>(null);

  // Filter state lives in the URL (?category=...), so a filtered view can be shared.
  useEffect(() => {
    const q = new URLSearchParams(location.search).get('category');
    const match = CATEGORIES.find(c => c.toLowerCase().replace(/[^a-z]/g, '') === q);
    if (match) setCategory(match);
  }, []);
  const choose = (c: Category) => {
    setCategory(c);
    const url = new URL(location.href);
    if (c === 'All') url.searchParams.delete('category'); else url.searchParams.set('category', c.toLowerCase().replace(/[^a-z]/g, ''));
    history.replaceState(null, '', url);
  };

  const projects = useMemo(() => category === 'All' ? projectsData.projects : projectsData.projects.filter(p => p.category === category), [category]);

  return <div className="studio-page archive-page">
    <section className="page-width page-intro">
      <p className="eyebrow">Production archive</p>
      <h1>Commercials, features<br />and the frames between.</h1>
      <p className="section-intro">Broadcast campaigns, theatrical colour and visual effects sequences, delivered across India.</p>
      <Mnemonic kind="archive" shape="wide" size={288} className="page-mnemonic" />
    </section>

    <section className="page-width section-space archive-body" aria-labelledby="archive-title">
      <h2 id="archive-title" className="sr-only">Selected projects</h2>
      <div className="archive-tabs" role="toolbar" aria-label="Filter projects">
        {CATEGORIES.map((c, i) => <button key={c} aria-pressed={category === c} onClick={() => choose(c)}><span>0{i + 1}</span>{LABEL[c]}</button>)}
      </div>
      <p className="sr-only" role="status">{projects.length} projects</p>
      <div className="archive-grid">
        {projects.map(p => {
          const id = ytId(p);
          return <article key={p.id} className="archive-item">
            <button className="archive-thumb" disabled={!id} onClick={() => id && setVideo({ id, title: p.title })} aria-label={id ? `Watch ${p.title}` : p.title}>
              <img src={p.image} alt="" width={640} height={360} loading="lazy" decoding="async" />
              <span className="archive-meta">{LABEL[p.category as Category] ?? p.category}</span>
              {id && <span className="film-play"><Play size={16} fill="currentColor" /></span>}
            </button>
            <div className="archive-caption">
              <h3>{p.title}</h3>
              {p.client && <p className="archive-client">{p.client}</p>}
              {p.services?.length ? <p className="archive-services">{p.services.join(' · ')}</p> : null}
            </div>
          </article>;
        })}
      </div>
    </section>
    <VideoDialog open={!!video} onClose={() => setVideo(null)} youtubeId={video?.id ?? ''} title={video?.title ?? ''} />
  </div>;
}
