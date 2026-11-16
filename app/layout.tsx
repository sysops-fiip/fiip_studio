import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ProceduralTexture } from '@/components/ui/ProceduralTexture';

export const metadata: Metadata = {
  metadataBase: new URL('https://fixitinpost.in'),
  title: {
    default: 'Fix It In Post Studios | Editorial · Visual Effects · DI Color Suites',
    template: '%s | Fix It In Post Studios',
  },
  description: 'Boutique post-production house delivering narrative editorial, photoreal 3D/VFX, and flagship DaVinci Resolve color grading for feature films, episodic OTT, and national commercial campaigns.',
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
    description: 'Boutique post-production house delivering narrative editorial, photoreal 3D/VFX, and flagship DaVinci Resolve color grading for feature films, episodic OTT, and national commercial campaigns.',
    images: [
      {
        url: '/logo/Fix it in post Logo_Horizontal-White.png',
        width: 1200,
        height: 630,
        alt: 'Fix It In Post Studios Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix It In Post Studios | Editorial · Visual Effects · DI Color Suites',
    description: 'Boutique post-production house delivering narrative editorial, photoreal 3D/VFX, and flagship DaVinci Resolve color grading.',
    images: ['/logo/Fix it in post Logo_Horizontal-White.png'],
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
        <ProceduralTexture variant="grain" className="site-grain" />
        <ScrollProgress />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
