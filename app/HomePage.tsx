'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react';
import { VideoDialog } from '@/components/ui/VideoDialog';
import { Reveal } from '@/components/ui/Reveal';
import { FramesPreview } from '@/components/FramesPreview';
import studio from '@/content/studio.json';
import projects from '@/data/projects.json';

const LensStudy = dynamic(() => import('@/components/LensStudy'), { ssr: false });
const copy = studio.homepage;

export default function HomePage() {
  const [video, setVideo] = useState<{ id: string; title: string } | null>(null);
  const [showLens, setShowLens] = useState(false);
  const openReel = () => setVideo({ id: copy.reelId, title: 'FIIP studio reel' });
  return (
    <div className="studio-home">
      <section className="optics-hero" aria-labelledby="hero-title">
        <div className="hero-object absolute" aria-hidden="true">
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/optics/cinema-lens-mobile.webp" />
            <img src="/images/optics/cinema-lens.webp" width="1280" height="1280" alt="" fetchPriority="high" />
          </picture>
        </div>
        <div className="hero-editorial page-width">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 id="hero-title">{copy.headline[0]}<br /><span>{copy.headline[1]}</span></h1>
          <p className="hero-intro">{copy.intro}</p>
          <p className="hero-description">{copy.description}</p>
          <div className="hero-actions">
            <button className="pill-button pill-light" onClick={openReel}><Play size={13} fill="currentColor" />{copy.watchLabel}</button>
            <a className="text-link" href="#selected-work">{copy.workLabel}<ArrowDown size={16} /></a>
          </div>
        </div>
        <button className="lens-explore" onClick={() => setShowLens(true)}>Explore the lens <ArrowUpRight size={13} /></button>
        <div className="hero-footnote page-width absolute" aria-hidden="true"><span>FIX IT IN POST</span><span>EDIT / VFX / COLOUR / FINISH</span><span>SCROLL TO DISCOVER <ArrowDown size={12} /></span></div>
      </section>

      <section id="selected-work" className="selected-work section-space page-width" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">{copy.workEyebrow}</p><h2 id="work-title">{copy.workTitle}</h2></div><Link href="/portfolio" className="text-link">{copy.archiveLabel}<ArrowUpRight size={17} /></Link></div>
        <div className="selected-grid">
          {copy.featured.map((work, index) => {
            const project = projects.projects.find(p => p.id === work.id)!;
            return <article key={work.id} className={`selected-film selected-film-${index}`}>
              <button className="film-image" aria-label={`Watch ${work.name} — ${work.subtitle}`} onClick={() => setVideo({ id: project.youtubeId, title: `${work.name} — ${work.subtitle}` })}>
                <Image src={work.image} alt={work.alt} fill sizes={index === 0 ? '(max-width: 767px) 100vw, 90vw' : '(max-width: 767px) 100vw, 45vw'} />
                <span className="film-index">0{index + 1} / {work.subtitle}</span>
                <span className="film-play"><Play size={18} fill="currentColor" /></span>
                <span className="film-overlay-title">{work.title}</span>
              </button>
              <div className="film-caption"><h3>{work.name}</h3><p>{work.contribution}</p></div>
            </article>;
          })}
        </div>
      </section>

      <section className="reel-section page-width" aria-label={copy.reelEyebrow}>
        <button className="reel-cover" onClick={openReel} aria-label="Play FIIP studio reel">
          <div className="reel-images" aria-hidden="true">
            <Image src="/images/work/kalyan.webp" alt="" fill sizes="50vw" />
            <div><Image src="/images/work/comfort.webp" alt="" fill sizes="25vw" /></div>
            <div><Image src="/images/work/nippon.webp" alt="" fill sizes="25vw" /></div>
          </div>
          <div className="reel-copy"><span className="eyebrow">{copy.reelEyebrow}</span><h2>{copy.reelTitle}</h2><span className="reel-play"><Play size={20} fill="currentColor" /><span>{copy.reelAction}</span></span></div>
          <span className="reel-marker" aria-hidden="true">FIIP / PICTURE & POST</span>
        </button>
      </section>

      <section className="craft-section section-space page-width" aria-labelledby="craft-title">
        <div className="section-heading"><div><p className="eyebrow">{copy.craftEyebrow}</p><h2 id="craft-title">{copy.craftTitle}</h2></div><p className="section-intro">{copy.craftIntro}</p></div>
        <div className="craft-list">{copy.craft.map((item, index) => <Reveal key={item.title}><Link href="/services" className="craft-row"><span className="craft-number">0{index + 1}</span><h3>{item.title}</h3><div><p>{item.text}</p><span>{item.detail}</span></div><ArrowUpRight size={22} /></Link></Reveal>)}</div>
      </section>

      <section className="frames-section section-space" aria-labelledby="frames-title">
        <div className="page-width frames-grid">
          <div><p className="eyebrow">{copy.framesEyebrow}</p><h2 id="frames-title">{copy.framesTitle}</h2><p className="section-intro">{copy.framesDescription}</p><div className="hero-actions"><Link href="/frames" className="pill-button">{copy.framesLink}<ArrowUpRight size={16} /></Link><a href={studio.frames.url} target="_blank" rel="noopener noreferrer" className="text-link">{copy.framesPortal}<ArrowUpRight size={15} /></a></div></div>
          <FramesPreview />
        </div>
      </section>

      <section className="studio-section section-space page-width" aria-labelledby="studio-title">
        <div><p className="eyebrow">{copy.studioEyebrow}</p><h2 id="studio-title">{copy.studioTitle}</h2></div>
        <div className="studio-summary"><p className="section-intro">{copy.studioDescription}</p><div className="artist-signatures" aria-label="Studio artists">{studio.roster.map(person => <Link key={person.id} href={`/about#${person.id}`} title={person.name} aria-label={`View ${person.name}’s profile`}>{person.image ? <Image src={person.image} alt="" width={56} height={56} sizes="56px" /> : <span aria-hidden="true">{person.fallbackInitials}</span>}</Link>)}</div><Link href="/about" className="text-link">{copy.studioLink}<ArrowUpRight size={17} /></Link></div>
      </section>

      <section className="home-commission accent-commission"><div className="page-width"><p className="eyebrow accent-text">{copy.ctaEyebrow}</p><h2>{copy.ctaTitle}</h2><Link href="/contact" className="pill-button pill-light">{copy.ctaLink}<ArrowUpRight size={18} /></Link></div></section>
      {showLens && <LensStudy onClose={() => setShowLens(false)} />}
      <VideoDialog open={!!video} onClose={() => setVideo(null)} youtubeId={video?.id ?? ''} title={video?.title ?? ''} />
    </div>
  );
}
