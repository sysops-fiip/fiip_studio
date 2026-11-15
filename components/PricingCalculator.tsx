'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Film, Palette, Clapperboard } from 'lucide-react';
import Link from 'next/link';

export function PricingCalculator() {
  const [projectType, setProjectType] = useState<'commercial' | 'feature' | 'brand' | 'vfx'>('commercial');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Editorial Assembly',
    'DaVinci Resolve DI Color',
  ]);
  const [timeline, setTimeline] = useState<'rush' | 'standard' | 'flexible'>('standard');

  const projectTypes = [
    { id: 'commercial', label: 'Commercial TVC', icon: Clapperboard, desc: '15s to 90s TV & Digital Ad' },
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
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-dark-800/80 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
      {/* Step 1: Project Type */}
      <div className="mb-10">
        <label className="block text-xs font-bold uppercase tracking-wider text-primary-400 mb-4">
          Step 1: Select Production Format
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projectTypes.map((t) => {
            const Icon = t.icon;
            const isSelected = projectType === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setProjectType(t.id as any)}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-primary-500/15 border-primary-500 shadow-glow-sm'
                    : 'bg-dark-900/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-primary-400' : 'text-gray-400'}`} />
                  {isSelected && <Check className="w-4 h-4 text-primary-400" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-0.5">{t.label}</p>
                  <p className="text-xs text-gray-400">{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Services Needed */}
      <div className="mb-10">
        <label className="block text-xs font-bold uppercase tracking-wider text-primary-400 mb-4">
          Step 2: Required Post Disciplines
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {serviceOptions.map((srv) => {
            const isSelected = selectedServices.includes(srv);
            return (
              <button
                key={srv}
                type="button"
                onClick={() => toggleService(srv)}
                className={`px-4 py-3 rounded-xl text-left border text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-white/10 border-primary-400/60 text-white'
                    : 'bg-dark-900/40 border-white/5 text-gray-400 hover:border-white/15'
                }`}
              >
                <span>{srv}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Turnaround Window */}
      <div className="mb-10">
        <label className="block text-xs font-bold uppercase tracking-wider text-primary-400 mb-4">
          Step 3: Target Turnaround
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'rush', label: 'Fast-Track / Rush', desc: '3–5 Business Days' },
            { id: 'standard', label: 'Standard Schedule', desc: '1–2 Weeks' },
            { id: 'flexible', label: 'Multi-Milestone', desc: 'Long-form / Episodic' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTimeline(item.id as any)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                timeline === item.id
                  ? 'bg-primary-500/10 border-primary-500 text-white'
                  : 'bg-dark-900/40 border-white/5 text-gray-400 hover:border-white/15'
              }`}
            >
              <p className="text-xs font-bold text-white mb-0.5">{item.label}</p>
              <p className="text-[11px] text-gray-400">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Scope Summary & Direct Consultation CTA */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-primary-400">
            Tailored Studio Project Bid
          </span>
          <h4 className="text-lg font-bold text-white mt-0.5">
            {projectTypes.find(p => p.id === projectType)?.label} · {selectedServices.length} Disciplines
          </h4>
          <p className="text-xs text-gray-400 mt-1">
            Bids are tailored by raw camera sensor specs, cut length, and deliverable masters.
          </p>
        </div>

        <Link
          href={`/contact?type=${projectType}&services=${encodeURIComponent(selectedServices.join(','))}&timeline=${timeline}`}
          className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold text-sm transition-all shadow-glow-sm flex items-center gap-2 shrink-0 cursor-pointer"
        >
          Request Official Studio Bid
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
