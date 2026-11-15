'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-950/85 backdrop-blur-xl border-b border-white/[0.08]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 h-12 mr-8">
            <Image
              src="/logo/Fix it in post Logo_Horizontal-White.png"
              alt="Fix It In Post Studios"
              width={130}
              height={40}
              className="h-9 w-auto opacity-95 hover:opacity-100 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-primary-300 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://frames.fixitinpost.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-primary-300 hover:bg-primary-500/10 hover:border-primary-400/40 transition-all"
            >
              Frames Portal ↗
            </a>
          </div>

          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Link
                href="/contact"
                className="inline-block px-5 py-2.5 bg-primary-500 text-dark-950 rounded-lg font-bold hover:bg-primary-400 transition-all duration-300 hover:shadow-glow-gold text-xs tracking-wide uppercase"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-dark-950/95 backdrop-blur-2xl border-t border-white/[0.08] px-4 py-6 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-gray-200 hover:text-primary-300 py-2 border-b border-white/5"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href="https://frames.fixitinpost.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-primary-300 text-center"
              >
                Frames Review Portal ↗
              </a>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 bg-primary-500 text-dark-950 font-bold rounded-lg text-sm"
              >
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
