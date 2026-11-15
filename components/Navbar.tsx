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
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Overview', href: '/' },
    { label: 'Disciplines', href: '/services' },
    { label: 'Archive', href: '/portfolio' },
    { label: 'Commissioning', href: '/pricing' },
    { label: 'Studio', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-neutral-900'
          : 'bg-transparent border-b border-transparent'
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
              className="h-8 w-auto opacity-90 hover:opacity-100 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://frames.fixitinpost.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono tracking-wider px-2.5 py-1 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
            >
              Frames Portal ↗
            </a>
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors"
              >
                Inquire
              </Link>
            </div>

            <button
              className="md:hidden text-white p-2 hover:bg-neutral-900 transition-colors cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-black border-t border-neutral-900 px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-mono uppercase tracking-wider text-neutral-400 hover:text-white py-2 border-b border-neutral-900"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href="https://frames.fixitinpost.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono uppercase tracking-wider py-2.5 border border-neutral-800 text-neutral-300 text-center"
              >
                Frames Review Portal ↗
              </a>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider"
              >
                Inquire
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
