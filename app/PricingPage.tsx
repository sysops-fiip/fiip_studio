import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Mnemonic } from '@/components/Mnemonic';
import { PricingCalculator } from '@/components/PricingCalculator';
import studio from '@/content/studio.json';

const FORMATS = [
  { kind: 'editorial', title: 'Commercial & brand', text: 'Campaign films, TVCs and their cutdowns: the edit, the grade, cleanups and finishing, delivered to every format the campaign runs in.' },
  { kind: 'colour', title: 'Feature & series', text: 'Long-form colour, conform and visual effects for theatrical, OTT and episodic work, planned around the production schedule.' },
  { kind: 'vfx', title: 'Studio partnership', text: 'Ongoing post capacity for production houses and agencies that bring us work regularly, with one team that knows the brand.' },
];
const STEPS = [
  { title: 'Brief', text: 'Tell us about the film, the footage and the delivery you need. The scope builder below starts that conversation.' },
  { title: 'Proposal', text: 'We come back with a scope, a team and a schedule written for this project.' },
  { title: 'Review in Frames', text: 'Cuts, grades and shots are reviewed on the frame in Frames, with versions, notes and approvals in one place.' },
  { title: 'Delivery', text: 'Masters are delivered to the specifications agreed in the proposal.' },
];

export default function PricingPage() {
  return <div className="studio-page commission-page">
    <section className="page-width page-intro">
      <p className="eyebrow">Commissioning</p>
      <h1>Every film is scoped<br />for what it needs.</h1>
      <p className="section-intro">No packages and no fixed price list. Tell us about the work and we will shape a proposal around it.</p>
      <Mnemonic kind="conform" shape="wide" size={288} className="page-mnemonic" />
    </section>

    <section className="page-width section-space" aria-labelledby="formats-title">
      <div className="section-heading"><div><p className="eyebrow">What we take on</p><h2 id="formats-title">Three ways to work together.</h2></div></div>
      <div className="commission-formats">{FORMATS.map(f => <article key={f.title}><Mnemonic kind={f.kind} shape="wide" size={216} /><h3>{f.title}</h3><p>{f.text}</p></article>)}</div>
    </section>

    <section className="page-width section-space" aria-labelledby="scope-title">
      <div className="section-heading"><div><p className="eyebrow">Scope builder</p><h2 id="scope-title">Start the brief.</h2></div><p className="section-intro">Three quick choices. They are carried into the message you send us, so nothing is submitted from this page.</p></div>
      <PricingCalculator />
    </section>

    <section className="page-width section-space" aria-labelledby="process-title">
      <div className="section-heading"><div><p className="eyebrow">How a project runs</p><h2 id="process-title">From brief to master.</h2></div></div>
      <ol className="commission-steps">{STEPS.map((s, i) => <li key={s.title}><span>0{i + 1}</span><h3>{s.title}</h3><p>{s.text}</p></li>)}</ol>
    </section>

    <section className="home-commission accent-commission"><div className="page-width"><h2>Working under NDA?</h2><p className="section-intro commission-nda">Unreleased scripts and confidential campaigns are routine for us. Write to us and we will set up the right process before anything is shared.</p><Link href="/contact" className="pill-button pill-light">{studio.homepage.ctaLink}<ArrowUpRight size={16} /></Link></div></section>
  </div>;
}
