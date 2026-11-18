import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { TeamCard } from '@/components/TeamCard';
import studio from '@/content/studio.json';
import team from '@/data/team.json';

const copy = studio.studioPage;
export default function AboutPage() {
  return <div className="studio-page">
    <section className="page-width page-intro"><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="section-intro">{copy.intro}</p></section>
    <section className="page-width studio-section section-space"><h2>{copy.storyTitle}</h2><p className="section-intro">{copy.story}</p></section>
    <section className="page-width pb-16" aria-labelledby="artists-title"><div className="section-heading"><h2 id="artists-title">{copy.rosterTitle}</h2><p className="section-intro">{copy.rosterIntro}</p></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">{team.team.filter(person => !person.external).map(person => <TeamCard key={person.id} {...person} />)}</div></section>
    <section className="page-width section-space" aria-labelledby="collaborators-title"><h2 id="collaborators-title" className="mb-10">{copy.collaboratorsTitle}</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{team.team.filter(person => person.external).map(person => <TeamCard key={person.id} {...person} />)}</div></section>
    <section className="home-commission accent-commission"><div className="page-width"><h2>{copy.cta}</h2><Link className="pill-button pill-light" href="/contact">{studio.homepage.ctaLink}<ArrowUpRight size={17} /></Link></div></section>
  </div>;
}
