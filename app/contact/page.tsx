import studio from '@/content/studio.json';
import { Metadata } from 'next';
import ContactPage from '../ContactPage';
import { Suspense } from 'react';

export const metadata: Metadata = {
  alternates: { canonical: '/contact' },
  title: studio.pageMetadata.contact.title,
  description: studio.pageMetadata.contact.description,
  keywords: ['contact VFX studio', 'Chennai VFX company', 'AI post-production contact', 'VFX consultation', 'video production inquiry'],
  openGraph: {
    title: studio.pageMetadata.contact.title,
    description: studio.pageMetadata.contact.description,
    url: 'https://fixitinpost.in/contact',
    images: [
      { url: '/og/fiip-og.jpg', width: 1200, height: 630, alt: 'Contact Fix It In Post Studios' },
    ],
  },
  twitter: {
    title: studio.pageMetadata.contact.title,
    description: studio.pageMetadata.contact.description,
    images: ['/og/fiip-og.jpg'],
  },
};

export default function Contact() {
  return <Suspense><ContactPage /></Suspense>;
}
