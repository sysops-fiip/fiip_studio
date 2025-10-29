import { Metadata } from 'next';
import HomePage from './HomePage';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Fix It In Post Studios. Premium AI-assisted post-production and VFX services for creators, brands, and studios. We don\'t just fix it in post—we reinvent it.',
  keywords: ['VFX studio', 'AI video production', 'post-production services', 'video editing', 'visual effects', 'content creation'],
  openGraph: {
    title: 'Fix It In Post Studios - AI-Assisted VFX & Video Production',
    description: 'Premium AI-assisted post-production and VFX services for creators, brands, and studios. We don\'t just fix it in post—we reinvent it.',
    url: 'https://fixitinpost.studio',
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
    title: 'Fix It In Post Studios - AI-Assisted VFX & Video Production',
    description: 'Premium AI-assisted post-production and VFX services. We don\'t just fix it in post—we reinvent it.',
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function Home() {
  return <HomePage />;
}
