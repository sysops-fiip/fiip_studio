'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-950 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Image
              src="/logo/Fix it in post Logo_Horizontal-White.png"
              alt="Fix It In Post Studios"
              width={140}
              height={40}
              className="h-8 w-auto mb-4 opacity-90"
            />
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Boutique Post-Production House specializing in Narrative Editorial,
              Photoreal Visual Effects &amp; Theatrical Color Grading (DI).
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4 font-mono uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Pricing & Scope', href: '/pricing' },
                { label: 'About Studio', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary-300 transition-colors text-xs sm:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pipelines & Suiting */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4 font-mono uppercase tracking-wider">Disciplines</h3>
            <ul className="space-y-2">
              {[
                { label: 'Narrative & Commercial Edit', href: '/services' },
                { label: 'Photoreal VFX & 3D Shading', href: '/services' },
                { label: 'DaVinci Resolve DI Color Suites', href: '/services' },
                { label: 'Frames Review Portal', href: 'https://frames.fixitinpost.in', external: true },
              ].map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary-300 transition-colors text-xs sm:text-sm inline-flex items-center gap-1"
                    >
                      {item.label} <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-primary-300 transition-colors text-xs sm:text-sm"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4 font-mono uppercase tracking-wider">Studio Suiting</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-xs sm:text-sm">Chennai, India</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:hello@fixitinpost.in"
                  className="text-gray-400 hover:text-primary-300 transition-colors text-xs sm:text-sm"
                >
                  hello@fixitinpost.in
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <a
                  href="https://wa.me/919500104320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-300 transition-colors text-xs sm:text-sm flex items-center gap-1"
                >
                  WhatsApp Studio Line <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.08] pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {currentYear} Fix It In Post Studios. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-mono text-[11px]">
            <span>ACEScc / DCI-P3 WORKFLOW</span>
            <span>10G NVME COLLAB</span>
            <span>DAVINCI RESOLVE STUDIO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
