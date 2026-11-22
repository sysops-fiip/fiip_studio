'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', isOpen);
    return () => document.documentElement.classList.remove('menu-open');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIsOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [isOpen]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Disciplines', href: '/services' },
    { label: 'Work', href: '/portfolio' },
    { label: 'Commissioning', href: '/pricing' },
    { label: 'Studio', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled || isOpen
          ? 'glass-panel glass-dark glass-elevation-1 glass-nav'
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
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="nav-link text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://frames.fixitinpost.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono tracking-wider px-3.5 py-1.5 rounded-full border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
            >
              Frames Portal ↗
            </a>
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Link
                href="/contact"
                className="rounded-full px-5 py-2.5 bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors"
              >
                Let’s talk
              </Link>
            </div>

            <button
              className="lg:hidden text-white p-2 rounded-full hover:bg-neutral-900 transition-colors cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              ref={toggleRef}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation: full-screen editorial overlay */}
      </div>
      <div id="mobile-navigation" className={`mobile-menu lg:hidden ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen} inert={!isOpen ? true : undefined}>
        <ol className="mobile-menu-links">
          {navItems.map((item, i) => (
            <li key={item.href} style={{ transitionDelay: isOpen ? `${80 + i * 45}ms` : '0ms' }}>
              <Link href={item.href} aria-current={pathname === item.href ? 'page' : undefined} onClick={() => setIsOpen(false)}>
                <span>{String(i + 1).padStart(2, '0')}</span>{item.label}
              </Link>
            </li>
          ))}
        </ol>
        <div className="mobile-menu-foot" style={{ transitionDelay: isOpen ? '380ms' : '0ms' }}>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="pill-button pill-light">Let’s talk</Link>
          <a href="https://frames.fixitinpost.in" target="_blank" rel="noopener noreferrer" className="text-link">Frames review portal ↗</a>
          <a href="mailto:hello@fixitinpost.in" className="mobile-menu-mail">hello@fixitinpost.in</a>
        </div>
      </div>
    </nav>
  );
}
