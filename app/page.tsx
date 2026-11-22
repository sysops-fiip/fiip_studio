import studio from '@/content/studio.json';
import { Metadata } from 'next';
import HomePage from './HomePage';

export const metadata: Metadata = {
  title: { absolute: `Fix It In Post Studios · ${studio.pageMetadata.home.title} · Chennai` },
  description: studio.pageMetadata.home.description,
  keywords: ['VFX studio', 'AI video production', 'post-production services', 'video editing', 'visual effects', 'content creation'],
  openGraph: {
    title: studio.pageMetadata.home.title,
    description: studio.pageMetadata.home.description,
    url: 'https://fixitinpost.in',
    images: [
      { url: '/og/fiip-og.jpg', width: 1200, height: 630, alt: 'Fix It In Post Studios' },
    ],
  },
  twitter: {
    title: studio.pageMetadata.home.title,
    description: studio.pageMetadata.home.description,
    images: ['/og/fiip-og.jpg'],
  },
};

export default function Home() {
  return <HomePage />;
}
