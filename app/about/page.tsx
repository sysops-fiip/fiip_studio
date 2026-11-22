import studio from '@/content/studio.json';
import { Metadata } from 'next';
import AboutPage from '../AboutPage';

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: studio.pageMetadata.about.title,
  description: studio.pageMetadata.about.description,
  keywords: ['about VFX studio', 'AI post-production team', 'Chennai VFX company', 'creative team', 'VFX artists', 'AI engineers'],
  openGraph: {
    title: studio.pageMetadata.about.title,
    description: studio.pageMetadata.about.description,
    url: 'https://fixitinpost.in/about',
    images: [
      { url: '/og/fiip-og.jpg', width: 1200, height: 630, alt: 'Fix It In Post Studios Team' },
    ],
  },
  twitter: {
    title: studio.pageMetadata.about.title,
    description: studio.pageMetadata.about.description,
    images: ['/og/fiip-og.jpg'],
  },
};

export default function About() {
  return <AboutPage />;
}
