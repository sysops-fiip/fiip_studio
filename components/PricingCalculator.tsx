'use client';

import { useState } from 'react';
import { ArrowRight, Film, Palette, Clapperboard, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function PricingCalculator() {
  const [projectType, setProjectType] = useState<'commercial' | 'feature' | 'brand' | 'vfx'>('commercial');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Editorial Assembly',
    'DaVinci Resolve DI Color',
  ]);
  const [timeline, setTimeline] = useState<'rush' | 'standard' | 'flexible'>('standard');

  const projectTypes = [
    { id: 'commercial', label: 'Commercial TVC', icon: Clapperboard, desc: '15s to 90s Broadcast / Digital Ad' },
    { id: 'feature', label: 'Feature / OTT Series', icon: Film, desc: 'Episodic or Theatrical Long-Form' },
    { id: 'brand', label: 'Brand Film / Music Video', icon: Palette, desc: 'Cinematic Narrative Showcase' },
    { id: 'vfx', label: 'VFX & 3D Sequence', icon: Sparkles, desc: 'Complex CGI & Node Compositing' },
  ];

  const serviceOptions = [
    'Editorial Assembly',
    'DaVinci Resolve DI Color',
    'Invisible VFX & Cleanups',
    'Blender 3D Animation',
    'Multi-Language Dub Sync',
    'Theatrical DCP / HDR Master',
  ];

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto border border-neutral-800 bg-neutral-950 p-6 sm:p-10">
      {/* Step 1: Project Type */}
      <div className="mb-10">
        <label className="block font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">
          01 / Select Production Format
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {projectTypes.map((t) => {
            const Icon = t.icon;
            const isSelected = projectType === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setProjectType(t.id as any)}
                className={`p-4 text-left border transition-colors cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'accent-soft-bg accent-line text-white'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-neutral-400'}`} />
                  <span className={`text-[10px] font-mono uppercase ${isSelected ? 'text-white font-bold' : 'text-neutral-400'}`}>
                    {isSelected ? 'SELECTED' : 'OPTION'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-tight mb-1 text-white">
                    {t.label}
                  </p>
                  <p className="text-xs text-neutral-400">{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Services Needed */}
      <div className="mb-10">
        <label className="block font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">
          02 / Required Disciplines
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
          {serviceOptions.map((srv) => {
            const isSelected = selectedServices.includes(srv);
            return (
              <button
                key={srv}
                type="button"
                onClick={() => toggleService(srv)}
                className={`px-4 py-3 text-left border transition-colors cursor-pointer flex items-center justify-between uppercase ${
                  isSelected
                    ? 'accent-soft-bg accent-line text-white font-semibold'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <span>{srv}</span>
                <span>{isSelected ? '✓' : '+'}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Turnaround Window */}
      <div className="mb-10">
        <label className="block font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">
          03 / Schedule Turnaround
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'rush', label: 'Rush Turnaround', desc: '3–5 Days' },
            { id: 'standard', label: 'Standard Delivery', desc: '1–2 Weeks' },
            { id: 'flexible', label: 'Feature Timeline', desc: 'Long-Form Milestones' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTimeline(item.id as any)}
              className={`p-3 border text-center transition-colors cursor-pointer ${
                timeline === item.id
                  ? 'accent-soft-bg accent-line text-white'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
              }`}
            >
              <p className="text-xs font-mono font-bold uppercase mb-0.5 text-white">
                {item.label}
              </p>
              <p className="text-[10px] font-mono text-neutral-400">
                {item.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Scope Summary & Direct Consultation CTA */}
      <div className="p-6 bg-black border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
            Production Scope Specification
          </span>
          <h4 className="text-base font-bold uppercase tracking-tight accent-text">
            {projectTypes.find(p => p.id === projectType)?.label} · {selectedServices.length} Disciplines
          </h4>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Bids are calibrated by raw camera codecs (Arri, RED, Sony Venice) and deliverable masters.
          </p>
        </div>

        <Link
          href={`/contact?type=${projectType}&services=${encodeURIComponent(selectedServices.join(','))}&timeline=${timeline}`}
          className="px-6 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          Submit Project Scope
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
