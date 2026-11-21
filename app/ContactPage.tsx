'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import studio from '@/content/studio.json';
import { Mnemonic } from '@/components/Mnemonic';

const copy = studio.contactPage;
export default function ContactPage() {
  const params = useSearchParams();
  const scope = ['type', 'services', 'timeline', 'tier'].map(key => {
    const value = params.get(key)?.replace(/[\r\n]/g, ' ').slice(0,500);
    return value ? `${key[0].toUpperCase() + key.slice(1)}: ${value}` : '';
  }).filter(Boolean).join('\n');
  const [prepared, setPrepared] = useState(false);
  function prepareEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const subject = `Project inquiry: ${fields.get('project') || fields.get('name')}`;
    const body = `Name: ${fields.get('name')}\nEmail: ${fields.get('email')}\nProject: ${fields.get('project')}\n\n${fields.get('message')}`;
    window.location.href = `mailto:${studio.contact.general}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  return <div className="studio-page">
    <section className="page-width page-intro"><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="section-intro">{copy.intro}</p><Mnemonic kind="contact" size={120} className="page-mnemonic" /></section>
    <section className="page-width section-space contact-layout">
      <div><p className="eyebrow">{copy.emailLabel}</p><a className="contact-email" href={`mailto:${studio.contact.general}`}>{studio.contact.general}<ArrowUpRight size={20} /></a><p className="eyebrow mt-12">{copy.locationLabel}</p><p className="text-neutral-300">{studio.identity.city}, {studio.identity.country}</p></div>
      <form onSubmit={prepareEmail} className="contact-form"><h2>{copy.formTitle}</h2><div className="contact-fields">{(['name','email','project'] as const).map(field => <label key={field}>{copy[field]}<input name={field} type={field==='email'?'email':'text'} spellCheck={field!=='email'} autoComplete={field==='project'?'off':field} required={field!=='project'} maxLength={200} /></label>)}<label>{copy.message}<textarea name="message" defaultValue={scope ? `Project scope\n${scope}\n\nBrief: ` : ""} required rows={5} maxLength={5000} /></label></div><p className="text-xs text-neutral-400 leading-relaxed mb-6">{copy.formNote}</p><button className="pill-button pill-light" type="submit">{copy.action}<ArrowUpRight size={16} /></button>{prepared && <p role="status" className="mt-6 text-sm text-neutral-300">{copy.prepared}</p>}</form>
    </section>
  </div>;
}
