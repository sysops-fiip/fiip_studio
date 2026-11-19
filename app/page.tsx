import studio from '@/content/studio.json';
import { Metadata } from 'next';
import HomePage from './HomePage';

export const metadata: Metadata = {
  title: studio.pageMetadata.home.title,
  description: studio.pageMetadata.home.description,
  keywords: ['VFX studio', 'AI video production', 'post-production services', 'video editing', 'visual effects', 'content creation'],
  openGraph: {
    title: studio.pageMetadata.home.title,
    description: studio.pageMetadata.home.description,
    url: 'https://fixitinpost.in',
    images: [
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'Fix It In Post Studios - AI-Assisted VFX & Video Production',
      },
    ],
  },
  twitter: {
    title: studio.pageMetadata.home.title,
    description: studio.pageMetadata.home.description,
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function Home() {
  return <HomePage />;
}
