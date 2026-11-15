'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Clock } from 'lucide-react';

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
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-white">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary-400 mb-3 inline-block">
            Direct Studio Inquiry
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Initiate Project Collaboration
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have an upcoming commercial, feature DI grade, or complex visual effects sequence?
            Connect with our post supervisors to review scope and timeline availability.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] shadow-cinema-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-500/10 border border-primary-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-gray-400 mb-1">Studio Location</h3>
                  <p className="text-sm font-medium text-white leading-relaxed">
                    2, Senthamarai Salai, New Colony, Kottivakkam, Chennai, Tamil Nadu 600041
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] shadow-cinema-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-500/10 border border-primary-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-gray-400 mb-1">Direct Inquiries</h3>
                  <a
                    href="mailto:hello@fixitinpost.in"
                    className="text-base font-semibold text-primary-300 hover:text-primary-200 transition-colors"
                  >
                    hello@fixitinpost.in
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] shadow-cinema-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-500/10 border border-primary-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-gray-400 mb-1">WhatsApp Studio Desk</h3>
                  <a
                    href="https://wa.me/919500104320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-primary-300 hover:text-primary-200 transition-colors"
                  >
                    +91 9500 104 320
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] shadow-cinema-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-500/10 border border-primary-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-gray-400 mb-1">Response Window</h3>
                  <p className="text-sm text-gray-300">
                    Typically within 4–12 hours for active production bids.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-dark-900 border border-white/[0.08] shadow-cinema-card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">Project Inquiry Brief</h2>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs sm:text-sm font-medium"
                >
                  ✓ Thank you. Your inquiry has been routed to our studio coordination team.
                </motion.div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                    Your Name / Production Company
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="e.g. John Doe / Studio Films"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Official Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-400 transition-colors"
                      placeholder="director@agency.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-400 transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Project Format
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-400 transition-colors"
                    >
                      <option value="commercial">Commercial / TVC Campaign</option>
                      <option value="feature">Feature Film / OTT Long-Form</option>
                      <option value="vfx">Visual Effects &amp; 3D CGI</option>
                      <option value="color">DaVinci Resolve DI Color Only</option>
                      <option value="comprehensive">Comprehensive Turnkey Post</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Target Schedule
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-400 transition-colors"
                    >
                      <option value="rush">Rush (3–5 Business Days)</option>
                      <option value="standard">Standard (1–2 Weeks)</option>
                      <option value="flexible">Multi-Month / Feature Production</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                    Project Scope &amp; Technical Requirements
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-400 transition-colors resize-none"
                    placeholder="Specify raw camera formats (e.g. Arri RAW, RED, Sony Venice), required deliverables, and any specific VFX cleanups or references..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primary-500 hover:bg-primary-400 text-dark-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-glow-gold active:scale-98 cursor-pointer"
                >
                  Submit Studio Brief
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
