import studio from '@/content/studio.json';
import { Metadata } from 'next';
import ServicesPage from '../ServicesPage';

export const metadata: Metadata = {
  alternates: { canonical: '/services' },
  title: studio.pageMetadata.services.title,
  description: studio.pageMetadata.services.description,
  keywords: ['VFX services', 'AI post-production', 'video editing services', 'hybrid VFX', 'generative visuals', 'AI video production', 'professional VFX'],
  openGraph: {
    title: studio.pageMetadata.services.title,
    description: studio.pageMetadata.services.description,
    url: 'https://fixitinpost.in/services',
    images: [
      { url: '/og/fiip-og.jpg', width: 1200, height: 630, alt: 'Fix It In Post Studios Services' },
    ],
  },
  twitter: {
    title: studio.pageMetadata.services.title,
    description: studio.pageMetadata.services.description,
    images: ['/og/fiip-og.jpg'],
  },
};

export default function Services() {
  return <ServicesPage />;
}
