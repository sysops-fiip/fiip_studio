'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Image
              src="/logo/Fix it in post Logo_Horizontal-White.png"
              alt="Fix It In Post Studios"
              width={140}
              height={40}
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm">
              AI-assisted VFX & video production studio based in India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Pricing', href: '/pricing' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                { label: 'AI-Assisted Post', href: '/services' },
                { label: 'Hybrid VFX', href: '/services' },
                { label: 'Generative Visuals', href: '/services' },
                { label: 'Pricing', href: '/pricing' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Chennai, India</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                 <a
                   href="mailto:hello@fixitinpost.in"
                   className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                 >
                   hello@fixitinpost.in
                 </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                 <a
                   href="https://wa.me/919500104320"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-1"
                 >
                   WhatsApp <ExternalLink className="w-3 h-3" />
                 </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 py-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            © {currentYear} Fix It In Post Studios. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
