'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Plus } from 'lucide-react';

/* Scope builder: three choices that pre-fill the contact form. No prices or promises are shown. */
const FORMATS = [
  { id: 'commercial', label: 'Commercial', desc: 'TVC and digital campaign' },
  { id: 'feature', label: 'Feature & series', desc: 'Theatrical, OTT, episodic' },
  { id: 'brand', label: 'Brand & music film', desc: 'Long-form brand storytelling' },
  { id: 'vfx', label: 'VFX sequence', desc: 'Shots, CG and set extensions' },
] as const;
const DISCIPLINES = ['Editorial', 'Colour grading', 'Visual effects & cleanup', '3D & CG', 'Conform & mastering', 'AI-assisted VFX'];
const TIMING = [
  { id: 'rush', label: 'As soon as possible', desc: 'We confirm availability' },
  { id: 'standard', label: 'A set delivery date', desc: 'Agreed together' },
  { id: 'flexible', label: 'Milestones', desc: 'Long-form schedule' },
] as const;

export function PricingCalculator() {
  const [format, setFormat] = useState<string>('commercial');
  const [picked, setPicked] = useState<string[]>(['Editorial', 'Colour grading']);
  const [timing, setTiming] = useState<string>('standard');
  const toggle = (d: string) => setPicked(p => p.includes(d) ? (p.length > 1 ? p.filter(x => x !== d) : p) : [...p, d]);
  const formatLabel = FORMATS.find(f => f.id === format)?.label;

  return <div className="scope-builder">
    <fieldset>
      <legend><span>01</span>The work</legend>
      <div className="scope-options scope-4">{FORMATS.map(f => <button key={f.id} type="button" aria-pressed={format === f.id} onClick={() => setFormat(f.id)}><strong>{f.label}</strong><small>{f.desc}</small></button>)}</div>
    </fieldset>
    <fieldset>
      <legend><span>02</span>The disciplines</legend>
      <div className="scope-chips">{DISCIPLINES.map(d => <button key={d} type="button" aria-pressed={picked.includes(d)} onClick={() => toggle(d)}>{picked.includes(d) ? <Check size={13} /> : <Plus size={13} />}{d}</button>)}</div>
    </fieldset>
    <fieldset>
      <legend><span>03</span>The timing</legend>
      <div className="scope-options scope-3">{TIMING.map(t => <button key={t.id} type="button" aria-pressed={timing === t.id} onClick={() => setTiming(t.id)}><strong>{t.label}</strong><small>{t.desc}</small></button>)}</div>
    </fieldset>
    <div className="scope-summary">
      <div><p className="eyebrow">Your brief so far</p><p className="scope-line">{formatLabel} · {picked.join(', ')}</p></div>
      <Link className="pill-button pill-light" href={`/contact?type=${format}&services=${encodeURIComponent(picked.join(','))}&timeline=${timing}`}>Continue to the brief<ArrowUpRight size={16} /></Link>
    </div>
  </div>;
}
