'use client';

import { ArrowDown } from 'lucide-react';
import studio from '@/content/studio.json';
import { ScrollHero, HeroManifest } from './ScrollHero';
import disciplines from '@/data/heroes/disciplines.json';
import work from '@/data/heroes/work.json';
import commissioning from '@/data/heroes/commissioning.json';
import studioHero from '@/data/heroes/studio.json';
import contact from '@/data/heroes/contact.json';

/* Page heroes: one world, one grammar (see design/page-heroes/CONCEPTS.md). */
const lines = (t: string) => t.split('\n').flatMap((l, i) => (i ? [<br key={i} />, l] : [l]));
const down = (href: string, label: string) => <div className="hero-actions"><a className="text-link" href={href}>{label} <ArrowDown size={16} /></a></div>;
const intro = (t: string) => <p className="cinema-intro hero-page-intro">{t}</p>;

export const DisciplinesHero = () => <ScrollHero manifest={disciplines as HeroManifest} screens={[5, 4.5]} statePrefix="Hand"
  eyebrow="The disciplines" lede={<>One shot.<br />Five hands.</>} chapters={['01 · Into the frame', '02 · Every hand on it', '03 · Delivered']}
  titleId="disciplines-title" title={lines(studio.homepage.craftTitle)} intro={intro(studio.homepage.craftIntro)} actions={down('#disciplines', 'See the disciplines')} />;

export const WorkHero = () => <ScrollHero manifest={work as HeroManifest} screens={[5, 4.5]} statePrefix="Project"
  eyebrow="Production archive" lede={<>Every frame<br />we have touched.</>} chapters={['01 · The archive', '02 · Selected work', '03 · Delivered']}
  titleId="archive-hero-title" title={<>Commercials, features<br />and the frames between.</>} intro={intro('Broadcast campaigns, theatrical colour and visual effects sequences, delivered across India.')} actions={down('#archive', 'Browse the work')} />;

export const CommissionHero = () => <ScrollHero manifest={commissioning as HeroManifest} screens={[4.5, 4]} statePrefix="Step"
  eyebrow="Commissioning" lede={<>From a blank page<br />to the master.</>} chapters={['01 · The blank page', '02 · Brief to approval', '03 · Approved']}
  titleId="commission-title" title={<>Every film is scoped<br />for what it needs.</>} intro={intro('No packages and no fixed price list. Tell us about the work and we will shape a proposal around it.')} actions={down('#scope', 'Start the brief')} />;

export const StudioHero = () => <ScrollHero manifest={studioHero as HeroManifest} screens={[5, 4.5]} statePrefix="Sheet"
  eyebrow={studio.studioPage.eyebrow} lede={<>The people<br />behind the frame.</>} chapters={['01 · The lightbox', '02 · Developing', '03 · The studio']}
  titleId="studio-title" title={lines(studio.studioPage.title)} intro={intro(studio.studioPage.intro)} actions={down('#artists', 'Meet the artists')} />;

export const ContactHero = () => <ScrollHero manifest={contact as HeroManifest} screens={[4, 3.5]}
  eyebrow={studio.contactPage.eyebrow} lede={<>Back out<br />into the world.</>} chapters={['01 · Leaving the frame', '02 · The signal']}
  titleId="contact-title" title={lines(studio.contactPage.title)} intro={intro(studio.contactPage.intro)} actions={down('#brief', 'Write to us')} />;
