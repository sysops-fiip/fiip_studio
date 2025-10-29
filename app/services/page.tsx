import { Metadata } from 'next';
import ServicesPage from '../ServicesPage';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our three tiers of AI-powered VFX excellence: AI-Enhanced Post, Hybrid VFX, and Generative Visuals. From creator-friendly to studio-grade production.',
  keywords: ['VFX services', 'AI post-production', 'video editing services', 'hybrid VFX', 'generative visuals', 'AI video production', 'professional VFX'],
  openGraph: {
    title: 'Our Services - AI-Powered VFX & Post-Production',
    description: 'Three tiers of AI-powered VFX excellence: AI-Enhanced Post, Hybrid VFX, and Generative Visuals. From creator-friendly to studio-grade.',
    url: 'https://fixitinpost.studio/services',
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
    title: 'Our Services - AI-Powered VFX & Post-Production',
    description: 'Three tiers of AI-powered VFX excellence for creators, brands, and studios.',
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function Services() {
  return <ServicesPage />;
}
