import studio from '@/content/studio.json';
import { Metadata } from 'next';
import PortfolioPage from '../PortfolioPage';

export const metadata: Metadata = {
  alternates: { canonical: '/portfolio' },
  title: studio.pageMetadata.portfolio.title,
  description: studio.pageMetadata.portfolio.description,
  keywords: ['VFX portfolio', 'video production portfolio', 'AI VFX projects', 'advertisement VFX', 'music video production', 'post-production showcase'],
  openGraph: {
    title: studio.pageMetadata.portfolio.title,
    description: studio.pageMetadata.portfolio.description,
    url: 'https://fixitinpost.in/portfolio',
    images: [
      { url: '/og/fiip-og.jpg', width: 1200, height: 630, alt: 'Fix It In Post Studios Portfolio' },
    ],
  },
  twitter: {
    title: studio.pageMetadata.portfolio.title,
    description: studio.pageMetadata.portfolio.description,
    images: ['/og/fiip-og.jpg'],
  },
};

export default function Portfolio() {
  return <PortfolioPage />;
}
