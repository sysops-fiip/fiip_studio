import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';
import studio from '@/content/studio.json';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

export const metadata: Metadata = {
  metadataBase: new URL('https://fixitinpost.in'),
  title: {
    default: 'Fix It In Post Studios | Editorial · Visual Effects · DI Color Suites',
    template: '%s | Fix It In Post Studios',
  },
  description: studio.identity.description,
  keywords: [
    'Post-Production Studio', 'Film Editorial', 'DaVinci Resolve DI',
    'Color Grading Suite', 'Visual Effects', 'Photoreal 3D', 'Blender CGI',
    'Commercial Post Production', 'Chennai VFX Studio', 'India Post House',
    'ACES Color Management', 'Feature Film Conform'
  ],
  authors: [{ name: 'Fix It In Post Studios', url: 'https://fixitinpost.in' }],
  creator: 'Fix It In Post Studios',
  publisher: 'Fix It In Post Studios',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  category: 'Post Production',
  classification: 'Film & Commercial Post-Production Services',
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
    canonical: 'https://fixitinpost.in',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://fixitinpost.in',
    siteName: 'Fix It In Post Studios',
    title: 'Fix It In Post Studios | Editorial · Visual Effects · DI Color Suites',
    description: studio.identity.description,
    images: [
      {
        url: '/og/fiip-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Fix It In Post Studios',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix It In Post Studios | Editorial · Visual Effects · DI Color Suites',
    description: studio.identity.description,
    images: ['/og/fiip-og.jpg'],
  },
  other: {
    'theme-color': '#000000',
    'color-scheme': 'dark',
    'msapplication-TileColor': '#000000',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Organization',
          name: 'Fix It In Post Studios', alternateName: 'FIIP', url: 'https://fixitinpost.in',
          logo: 'https://fixitinpost.in/web-app-manifest-512x512.png', image: 'https://fixitinpost.in/og/fiip-og.jpg',
          description: studio.identity.description, email: studio.contact.general,
          address: { '@type': 'PostalAddress', addressLocality: studio.identity.city, addressCountry: 'IN' },
          sameAs: [studio.identity.imdb].filter(Boolean),
          knowsAbout: ['Visual effects', 'Colour grading', 'Conform and mastering', 'Film editing', 'Post-production'],
        }) }} />
        <ScrollProgress />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
