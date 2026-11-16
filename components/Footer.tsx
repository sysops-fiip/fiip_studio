'use client';

import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProceduralTexture } from '@/components/ui/ProceduralTexture';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <GlassPanel className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 p-6 sm:p-8">
          <ProceduralTexture variant="grain" />
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/logo/Fix it in post Logo_Horizontal-White.png"
              alt="Fix It In Post Studios"
              width={140}
              height={40}
              className="h-8 w-auto mb-4 opacity-85"
            />
            <p className="text-neutral-400 text-xs font-mono leading-relaxed uppercase">
              Boutique Post-Production Facility specializing in Editorial,
              Photoreal VFX &amp; Theatrical DI Color Grading.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">Navigation</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Overview', href: '/' },
                { label: 'Disciplines', href: '/services' },
                { label: 'Project Archive', href: '/portfolio' },
                { label: 'Commissioning & Scope', href: '/pricing' },
                { label: 'Studio Profile', href: '/about' },
                { label: 'Direct Inquiry', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Suites & Pipeline */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">Infrastructure</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Narrative & Commercial Edit', href: '/services' },
                { label: 'Photoreal 3D CGI & Fusion VFX', href: '/services' },
                { label: 'DaVinci Resolve DI Color Suites', href: '/services' },
                { label: 'Frames Client Review Portal', href: 'https://frames.fixitinpost.in', external: true },
              ].map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1"
                    >
                      {item.label} <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-neutral-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Studio Desk */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">Studio Desk</h3>
            <ul className="space-y-3 text-xs font-mono text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <span>Chennai, Tamil Nadu, India</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <a
                  href="mailto:hello@fixitinpost.in"
                  className="hover:text-white transition-colors"
                >
                  hello@fixitinpost.in
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <a
                  href="https://wa.me/919500104320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  +91 9500 104 320 <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </GlassPanel>

        {/* Bottom Slate */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-neutral-400">
          <p>© {currentYear} FIX IT IN POST STUDIOS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 mt-4 md:mt-0 text-[11px] uppercase tracking-wider">
            <span>ACES 2065-1</span>
            <span>DCI-P3 4K</span>
            <span>10G NVME COLLAB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
