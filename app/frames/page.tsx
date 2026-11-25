import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import studio from '@/content/studio.json';
import { Mnemonic } from '@/components/Mnemonic';
import { FramesExperience } from '@/components/FramesExperience';

export const metadata: Metadata = { title: 'Frames — Picture Review', description: studio.frames.pitch, alternates: { canonical: '/frames' } };

export default function FramesPage() {
  return <div className="frames-page">
    <section className="page-width page-intro"><Mnemonic kind="review" shape="wide" size={288} className="page-mnemonic" /><p className="eyebrow">{studio.frames.name} / Picture review</p><h1>{studio.homepage.framesTitle}</h1><p className="section-intro">{studio.frames.pitch}</p><div className="hero-actions"><a className="pill-button pill-light" href={studio.frames.url} target="_blank" rel="noopener noreferrer">{studio.homepage.framesPortal}<ArrowUpRight size={16} /></a></div></section>
    <section className="page-width frames-login" aria-labelledby="frames-login-title"><div className="frames-login-card"><div><p className="eyebrow">Client login</p><h2 id="frames-login-title">Already working with us?</h2><p>Sign in to Frames with the studio account we set up for you to review shots, leave notes and approve versions.</p></div><a className="pill-button pill-light" href={studio.frames.url} target="_blank" rel="noopener noreferrer">Sign in to Frames<ArrowUpRight size={16} /></a></div></section>
    <section className="page-width frames-overview-demo" aria-label="Explore the Frames review workflow"><FramesExperience /></section>
    <section className="page-width section-space frames-overview-story"><div><p className="eyebrow">One shared picture</p><h2>The shot moves.<br/>Everyone moves with it.</h2></div><div className="frames-feature-lines"><article><span>01</span><h3>Versions, in context.</h3><p>Compare the current shot with its previous version using wipe, overlay or side-by-side views.</p></article><article><span>02</span><h3>Feedback, on the frame.</h3><p>Timecoded notes, visual annotations and replies keep the discussion attached to the image. Resolve a note when the work is done.</p></article><article><span>03</span><h3>Work, with an owner.</h3><p>Assign tasks to an artist and follow their status as work moves towards the next review.</p></article></div></section>
    <section className="home-commission accent-commission"><div className="page-width"><h2>{studio.homepage.ctaTitle}</h2><Link href="/contact" className="pill-button pill-light">{studio.homepage.ctaLink}<ArrowUpRight size={16} /></Link></div></section>
  </div>;
}
