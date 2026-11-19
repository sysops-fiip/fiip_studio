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
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'Fix It In Post Studios Team',
      },
    ],
  },
  twitter: {
    title: studio.pageMetadata.about.title,
    description: studio.pageMetadata.about.description,
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function About() {
  return <AboutPage />;
}
