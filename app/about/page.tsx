import { Metadata } from 'next';
import AboutPage from '../AboutPage';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Fix It In Post Studios - a Chennai-based VFX studio pioneering AI-assisted post-production. Meet our team of VFX artists, AI engineers, and creative directors.',
  keywords: ['about VFX studio', 'AI post-production team', 'Chennai VFX company', 'creative team', 'VFX artists', 'AI engineers'],
  openGraph: {
    title: 'About Fix It In Post Studios - AI-Assisted VFX & Video Production',
    description: 'Learn about our Chennai-based VFX studio pioneering AI-assisted post-production. Meet our team of VFX artists, AI engineers, and creative directors.',
    url: 'https://fixitinpost.studio/about',
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
    title: 'About Fix It In Post Studios',
    description: 'Chennai-based VFX studio pioneering AI-assisted post-production. Meet our creative team.',
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function About() {
  return <AboutPage />;
}
