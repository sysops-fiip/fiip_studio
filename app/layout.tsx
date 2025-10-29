import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://fixitinpost.studio'),
  title: {
    default: 'Fix It In Post Studios - AI-Assisted VFX & Video Production',
    template: '%s | Fix It In Post Studios'
  },
  description: 'Premium AI-assisted post-production and VFX services for creators, brands, and studios. We don\'t just fix it in post—we reinvent it. Cinematic quality, faster turnaround, innovative creativity.',
  keywords: [
    'VFX', 'AI', 'Post-Production', 'Video Editing', 'Video Production',
    'AI-Assisted VFX', 'Cinematic VFX', 'Professional Video Editing',
    'Content Creation', 'Film Production', 'Visual Effects', 'India',
    'Chennai', 'DaVinci Resolve', 'Fusion', 'Blender', 'Stable Diffusion'
  ],
  authors: [{ name: 'Fix It In Post Studios', url: 'https://fixitinpost.studio' }],
  creator: 'Fix It In Post Studios',
  publisher: 'Fix It In Post Studios',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  category: 'Technology',
  classification: 'Video Production & VFX Services',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://fixitinpost.studio',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://fixitinpost.studio',
    siteName: 'Fix It In Post Studios',
    title: 'Fix It In Post Studios - AI-Assisted VFX & Video Production',
    description: 'Premium AI-assisted post-production and VFX services for creators, brands, and studios. We don\'t just fix it in post—we reinvent it.',
    images: [
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'Fix It In Post Studios - AI-Assisted VFX & Video Production',
        type: 'image/png',
      },
      {
        url: '/logo/Fix it in post Logo_Horizontal-White.png',
        width: 400,
        height: 120,
        alt: 'Fix It In Post Studios Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@fixitinpost', // Add your Twitter handle if available
    creator: '@fixitinpost', // Add your Twitter handle if available
    title: 'Fix It In Post Studios - AI-Assisted VFX & Video Production',
    description: 'Premium AI-assisted post-production and VFX services. We don\'t just fix it in post—we reinvent it.',
    images: ['/web-app-manifest-512x512.png'],
  },
  verification: {
    google: 'your-google-site-verification-code', // Add your Google Search Console verification code
  },
  other: {
    'theme-color': '#0f172a',
    'color-scheme': 'dark',
    'msapplication-TileColor': '#0f172a',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark-900 text-white">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
