import type { Metadata } from 'next';
import studio from '@/content/studio.json';
import s from '../legal.module.css';

export const metadata: Metadata = { title: 'Privacy', description: 'What this website collects, why, and how to reach us about your data.', alternates: { canonical: '/privacy' } };
const UPDATED = '22 November 2026';
const a = studio.identity.registeredAddress;

export default function Privacy() {
  const mail = studio.contact.general;
  return <div className={`studio-page ${s.legal}`}>
    <section className="page-width page-intro"><p className="eyebrow">Privacy</p><h1>What this site<br />knows about you.</h1><p className="section-intro">Very little, by design. This page explains exactly what is collected when you visit {studio.identity.domain} and when you write to us.</p><p className={s.updated}>Last updated {UPDATED}</p></section>
    <section className={`page-width section-space ${s.body}`}>
      <h2>Who we are</h2>
      <p>This website is operated by {studio.identity.legalName}, a post-production studio registered at {a.street}, {a.city} {a.postalCode}, {a.region}, {a.country} (GSTIN {studio.identity.gstin}). For anything on this page, write to <a href={`mailto:${mail}`}>{mail}</a>.</p>
      <h2>Browsing the site</h2>
      <p>We do not use analytics, advertising or tracking tools, and the site sets no cookies and stores nothing in your browser. Fonts and images are served from our own domain.</p>
      <p>Like every website, our hosting provider (Vercel) processes technical request data such as your IP address, browser type and the pages requested, in order to deliver the site and protect it from abuse. We do not use this data to identify you.</p>
      <h2>Watching our work</h2>
      <p>Project films are hosted on YouTube. Nothing loads from YouTube until you press play; the player then opens from YouTube's privacy-enhanced domain (youtube-nocookie.com), and YouTube's own privacy policy applies to that playback.</p>
      <h2>Writing to us</h2>
      <p>The contact form does not send or store anything on this website. It prepares an email in your own mail app, and nothing is shared until you choose to send it. When you email us, we receive what you write: usually your name, email address and details of your project. We use it only to reply and to discuss the work, and we keep it for as long as that conversation or any resulting project needs it.</p>
      <h2>Client material</h2>
      <p>Footage and files shared with us for a project, and the Frames review portal, are governed by the agreement for that project, not by this page.</p>
      <h2>Your choices</h2>
      <p>You can ask us what we hold about you, ask us to correct it, or ask us to delete it, by writing to <a href={`mailto:${mail}`}>{mail}</a>. We will respond within a reasonable time.</p>
      <h2>Changes</h2>
      <p>If what the site collects changes, this page will change first, with a new date at the top.</p>
    </section>
  </div>;
}
