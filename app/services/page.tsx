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
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'Fix It In Post Studios Services',
      },
    ],
  },
  twitter: {
    title: studio.pageMetadata.services.title,
    description: studio.pageMetadata.services.description,
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function Services() {
  return <ServicesPage />;
}
