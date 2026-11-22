import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Mnemonic } from '@/components/Mnemonic';

export default function NotFound() {
  return <div className="studio-page">
    <section className="page-width page-intro" style={{ minHeight: '70vh' }}>
      <p className="eyebrow">404 · Missing frame</p>
      <h1>This frame didn&apos;t<br />make the cut.</h1>
      <p className="section-intro">The page you were looking for has moved or never existed.</p>
      <div className="hero-actions" style={{ marginTop: 32 }}><Link href="/" className="pill-button pill-light">Back to the start<ArrowUpRight size={16} /></Link><Link href="/portfolio" className="text-link">See the work<ArrowUpRight size={15} /></Link></div>
      <Mnemonic kind="editorial" shape="wide" size={288} className="page-mnemonic" />
    </section>
  </div>;
}
