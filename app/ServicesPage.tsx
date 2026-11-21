import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import studio from '@/content/studio.json';
import { Mnemonic } from '@/components/Mnemonic';

export default function ServicesPage() {
  return <div className="studio-page">
    <section className="page-width page-intro"><p className="eyebrow">The disciplines</p><h1>{studio.homepage.craftTitle}</h1><p className="section-intro">{studio.homepage.craftIntro}</p><Mnemonic kind="generative" shape="wide" size={288} className="page-mnemonic" /></section>
    <section className="page-width section-space"><div className="discipline-details">{studio.disciplines.map((discipline,i) => <article key={discipline.id} id={discipline.id}><span className="eyebrow">0{i+1}</span><Mnemonic kind={discipline.id} size={72} /><h2>{discipline.title}</h2><p>{discipline.summary}</p></article>)}</div></section>
    <section className="home-commission accent-commission"><div className="page-width"><h2>{studio.homepage.ctaTitle}</h2><Link href="/contact" className="pill-button pill-light">{studio.homepage.ctaLink}<ArrowUpRight size={16} /></Link></div></section>
  </div>;
}
