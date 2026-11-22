import Link from 'next/link';
import Image from 'next/image';
import studio from '@/content/studio.json';

export function Footer() {
  return <footer className="studio-footer"><div className="page-width">
    <div className="footer-main"><div><Link href="/" aria-label="Fix It In Post home"><Image src="/logo/Fix it in post Logo_Horizontal-White.png" alt="Fix It In Post Studios" width={140} height={40} className="h-8 w-auto" /></Link><p>{studio.homepage.footerDescription}</p></div>
      <div className="footer-links"><Link href="/portfolio">Work</Link><Link href="/services">Disciplines</Link><Link href="/about">Studio</Link><Link href="/frames">Frames</Link><Link href="/pricing">Commissioning</Link><Link href="/contact">Contact</Link><a href={`mailto:${studio.contact.general}`}>{studio.contact.general}</a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {studio.identity.legalName} · GSTIN {studio.identity.gstin}</span><span className="footer-legal"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></span><span>{studio.identity.city}, {studio.identity.country}</span></div>
  </div></footer>;
}
