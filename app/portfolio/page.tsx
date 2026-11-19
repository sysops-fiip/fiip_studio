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
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'Fix It In Post Studios Portfolio',
      },
    ],
  },
  twitter: {
    title: studio.pageMetadata.portfolio.title,
    description: studio.pageMetadata.portfolio.description,
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function Portfolio() {
  return <PortfolioPage />;
}
