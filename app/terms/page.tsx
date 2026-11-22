import type { Metadata } from 'next';
import studio from '@/content/studio.json';
import s from '../legal.module.css';

export const metadata: Metadata = { title: 'Terms of use', description: 'Terms for using the Fix It In Post Studios website and its content.', alternates: { canonical: '/terms' } };
const UPDATED = '22 November 2026';

export default function Terms() {
  const mail = studio.contact.general;
  return <div className={`studio-page ${s.legal}`}>
    <section className="page-width page-intro"><p className="eyebrow">Terms of use</p><h1>Using this<br />website.</h1><p className="section-intro">These terms cover the website at {studio.identity.domain}. Work we do for clients is covered by the agreement for that project, not by this page.</p><p className={s.updated}>Last updated {UPDATED}</p></section>
    <section className={`page-width section-space ${s.body}`}>
      <h2>Our content</h2>
      <p>The text, design, graphics, animations, code and studio imagery on this site belong to {studio.identity.fullName} unless stated otherwise. You are welcome to view and share links to it; please do not copy, republish or reuse it without our written permission.</p>
      <h2>Client work shown here</h2>
      <p>Films, stills, names and logos of projects in our portfolio belong to their respective owners and are shown to illustrate our contribution to them. Their appearance here does not grant any right to use them, and does not imply endorsement beyond the work described.</p>
      <h2>Concept and generated imagery</h2>
      <p>Some imagery on this site, including the opening shot and studio portraits, was created or refined with generative tools under our direction, and is presented as studio artwork rather than documentary footage.</p>
      <h2>Information on this site</h2>
      <p>We keep this site accurate and current, but it is a general introduction to the studio. Scope, schedules, deliverables and pricing for any project are only those set out in a written proposal or agreement.</p>
      <h2>Links to other services</h2>
      <p>Links to services we do not run, such as YouTube or IMDb, are provided for convenience; those services have their own terms and policies.</p>
      <h2>Frames</h2>
      <p>Access to the Frames review portal is provided to clients and collaborators as part of a project and is governed by that project's arrangements.</p>
      <h2>Contact</h2>
      <p>Questions about these terms: <a href={`mailto:${mail}`}>{mail}</a>.</p>
    </section>
  </div>;
}
