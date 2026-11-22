import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import studio from '@/content/studio.json';
import { Mnemonic } from '@/components/Mnemonic';
import { DisciplinesHero } from '@/components/PageHeroes';

export default function ServicesPage() {
  return <div className="studio-page has-hero">
    <DisciplinesHero />
    <section id="disciplines" className="page-width section-space hero-follow"><div className="discipline-details">{studio.disciplines.map((discipline,i) => <article key={discipline.id} id={discipline.id}><span className="eyebrow">0{i+1}</span><Mnemonic kind={discipline.id} size={72} /><h2>{discipline.title}</h2><p>{discipline.summary}</p></article>)}</div></section>
    <section className="home-commission accent-commission"><div className="page-width"><h2>{studio.homepage.ctaTitle}</h2><Link href="/contact" className="pill-button pill-light">{studio.homepage.ctaLink}<ArrowUpRight size={16} /></Link></div></section>
  </div>;
}
