'use client';
import { useState } from 'react';
const passes = [
  { id: 'final', name: 'Final composite', label: 'Everything, together.', description: 'Light, atmosphere and surface detail become one finished frame.' },
  { id: 'splat', name: 'Splat reconstruction', label: 'Capture the world.', description: 'Millions of soft splats rebuild a place in three dimensions before a single polygon is drawn.' },
  { id: 'wire', name: 'Geometry', label: 'The shape of an idea.', description: 'A world begins with structure. Every silhouette gives the shot its weight.' },
  { id: 'clay', name: 'Clay & light', label: 'Let the light lead.', description: 'Strip away the surfaces to read the space, the scale and the lighting.' },
  { id: 'normal', name: 'Surface normals', label: 'Detail has direction.', description: 'Surface direction gives every edge, ridge and plane a different response to light.' },
  { id: 'uv', name: 'UV & texture', label: 'A place for every detail.', description: 'Texture coordinates carry the surface work across the world.' },
];
export function ShotBreakdown() {
 const [active,setActive]=useState(0);
 return <section id="inside-the-shot" className="breakdown-section page-width section-space" aria-labelledby="breakdown-title">
  <div className="section-heading"><div><p className="eyebrow">01 / Inside the shot</p><h2 id="breakdown-title">Every layer.<br />One feeling.</h2></div><p className="section-intro">Go beneath the finished image. Explore the visual language of a shot, from its first structure to its final atmosphere.</p></div>
  <div className="breakdown-stage">{passes.map((p,i)=><img key={p.id} src={`/images/cinematic/observatory-${p.id}.webp`} alt={i===active?`Observatory concept environment — ${p.name}`:''} aria-hidden={i!==active} className={i===active?'is-active':''} loading="lazy" width={1536} height={864} />)}<span className="breakdown-stamp">FIIP / OBSERVATORY STUDY</span><span className="breakdown-pass">{passes[active].name}</span></div>
  <div className="breakdown-tabs" aria-label="Shot layers">{passes.map((p,i)=><button key={p.id} aria-pressed={active===i} onClick={()=>setActive(i)}><span>0{i+1}</span>{p.name}</button>)}</div>
  <div className="breakdown-foot"><div aria-live="polite"><h3>{passes[active].label}</h3><p>{passes[active].description}</p></div><small>Generated concept study · illustrative passes</small></div>
 </section>;
}
