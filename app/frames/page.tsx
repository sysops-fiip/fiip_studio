import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import studio from '@/content/studio.json';

export const metadata: Metadata = { title: 'Frames — Picture Review', description: studio.frames.pitch, alternates: { canonical: '/frames' } };

export default function FramesPage() {
  return <div className="frames-page">
    <section className="page-width page-intro"><p className="eyebrow">{studio.frames.name} / Picture review</p><h1>{studio.homepage.framesTitle}</h1><p className="section-intro">{studio.frames.pitch}</p><div className="hero-actions"><a className="pill-button pill-light" href={studio.frames.url} target="_blank" rel="noopener noreferrer">{studio.homepage.framesPortal}<ArrowUpRight size={16} /></a></div></section>
    <section className="page-width section-space"><div className="craft-list">{studio.frames.points.map((point, i) => <div key={point} className="flex gap-8 py-8 border-t border-neutral-800"><span className="eyebrow">0{i + 1}</span><p className="text-lg sm:text-2xl text-neutral-300 max-w-3xl leading-relaxed">{point}</p></div>)}</div></section>
    <section className="home-commission accent-commission"><div className="page-width"><h2>{studio.homepage.ctaTitle}</h2><Link href="/contact" className="pill-button pill-light">{studio.homepage.ctaLink}<ArrowUpRight size={16} /></Link></div></section>
  </div>;
}
