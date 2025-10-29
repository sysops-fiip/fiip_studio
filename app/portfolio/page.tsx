import { Metadata } from 'next';
import PortfolioPage from '../PortfolioPage';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore our portfolio of AI-assisted VFX projects. See the transformation power of our VFX work across ads, music videos, AI shots, and post-production.',
  keywords: ['VFX portfolio', 'video production portfolio', 'AI VFX projects', 'advertisement VFX', 'music video production', 'post-production showcase'],
  openGraph: {
    title: 'Portfolio - AI-Assisted VFX Projects',
    description: 'Explore our portfolio showcasing the transformation power of AI-assisted VFX across ads, music videos, and post-production.',
    url: 'https://fixitinpost.studio/portfolio',
    images: [
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'Fix It In Post Studios Portfolio',
      },
    ],
  },
  twitter: {
    title: 'Portfolio - AI-Assisted VFX Projects',
    description: 'Explore our showcase of AI-assisted VFX projects and transformations.',
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function Portfolio() {
  return <PortfolioPage />;
}
