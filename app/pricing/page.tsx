import { Metadata } from 'next';
import PricingPage from '../PricingPage';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent pricing for AI-assisted VFX services. Three tiers: Creator, Brand, and Studio. Use our instant calculator to estimate your project costs.',
  keywords: ['VFX pricing', 'video production costs', 'AI post-production pricing', 'transparent pricing', 'VFX service costs', 'project estimation'],
  openGraph: {
    title: 'Pricing - Transparent AI-Assisted VFX Services',
    description: 'Transparent pricing for AI-assisted VFX services. Three tiers with instant calculator to estimate your project costs.',
    url: 'https://fixitinpost.studio/pricing',
    images: [
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'Fix It In Post Studios Pricing',
      },
    ],
  },
  twitter: {
    title: 'Pricing - Transparent AI-Assisted VFX Services',
    description: 'Transparent pricing for AI-assisted VFX services with instant project cost calculator.',
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function Pricing() {
  return <PricingPage />;
}
