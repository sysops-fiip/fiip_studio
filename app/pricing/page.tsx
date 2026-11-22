import studio from '@/content/studio.json';
import { Metadata } from 'next';
import PricingPage from '../PricingPage';

export const metadata: Metadata = {
  alternates: { canonical: '/pricing' },
  title: studio.pageMetadata.pricing.title,
  description: studio.pageMetadata.pricing.description,
  keywords: ['VFX pricing', 'video production costs', 'AI post-production pricing', 'transparent pricing', 'VFX service costs', 'project estimation'],
  openGraph: {
    title: studio.pageMetadata.pricing.title,
    description: studio.pageMetadata.pricing.description,
    url: 'https://fixitinpost.in/pricing',
    images: [
      { url: '/og/fiip-og.jpg', width: 1200, height: 630, alt: 'Fix It In Post Studios Pricing' },
    ],
  },
  twitter: {
    title: studio.pageMetadata.pricing.title,
    description: studio.pageMetadata.pricing.description,
    images: ['/og/fiip-og.jpg'],
  },
};

export default function Pricing() {
  return <PricingPage />;
}
