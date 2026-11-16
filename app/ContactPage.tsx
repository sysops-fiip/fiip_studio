'use client';

import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProceduralTexture } from '@/components/ui/ProceduralTexture';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'commercial',
    timeline: 'standard',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', projectType: 'commercial', timeline: 'standard', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-black text-white selection:bg-white selection:text-black">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 text-center border-b border-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
            Direct Studio Inquiry
          </p>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-6">
            Initiate Project Collaboration
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed font-mono">
            Connect directly with our post supervisors to audit raw camera codecs, schedule review sessions, and discuss delivery timelines.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4"
          >
            <GlassPanel className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-neutral-800 bg-neutral-900 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Facility Address</h3>
                  <p className="text-xs font-mono text-neutral-300 leading-relaxed">
                    2, Senthamarai Salai, New Colony, Kottivakkam, Chennai, Tamil Nadu 600041
                  </p>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-neutral-800 bg-neutral-900 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Direct Inquiries</h3>
                  <a
                    href="mailto:hello@fixitinpost.in"
                    className="text-sm font-mono text-white hover:text-neutral-300 transition-colors"
                  >
                    hello@fixitinpost.in
                  </a>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-neutral-800 bg-neutral-900 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Studio Desk (WhatsApp)</h3>
                  <a
                    href="https://wa.me/919500104320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono text-white hover:text-neutral-300 transition-colors"
                  >
                    +91 9500 104 320
                  </a>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-neutral-800 bg-neutral-900 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Response Window</h3>
                  <p className="text-xs font-mono text-neutral-300">
                    Typically within 4–12 hours for active production briefs.
                  </p>
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <GlassPanel elevation={2} className="p-8 sm:p-10">
              <ProceduralTexture variant="grain" />
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-6">Production Brief</h2>

              {submitted && (
                <div className="mb-6 p-4 border border-white bg-neutral-900 text-white font-mono text-xs uppercase tracking-wider">
                  ✓ Brief received. Our studio team will review your timeline and reach out shortly.
                </div>
              )}

              <div className="space-y-5 font-mono text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-2">
                    Name / Production Entity
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="e.g. John Doe / Studio Films"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-2">
                      Official Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                      placeholder="producer@agency.com"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-2">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-2">
                      Format
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="commercial">Commercial / TVC Campaign</option>
                      <option value="feature">Feature Film / OTT Long-Form</option>
                      <option value="vfx">Visual Effects &amp; 3D CGI</option>
                      <option value="color">DaVinci Resolve DI Color Only</option>
                      <option value="comprehensive">Comprehensive Turnkey Post</option>
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-2">
                      Schedule
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="rush">Rush (3–5 Days)</option>
                      <option value="standard">Standard (1–2 Weeks)</option>
                      <option value="flexible">Multi-Month / Feature Production</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-2">
                    Scope &amp; Technical Requirements
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                    placeholder="Specify raw camera formats (e.g. Arri RAW, RED, Sony Venice), deliverable masters, and specific VFX cleanups..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Submit Studio Brief
                </button>
              </div>
            </form>
            </GlassPanel>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
