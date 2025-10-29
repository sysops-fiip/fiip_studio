import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fix It In Post Studios - AI-Assisted VFX & Video Production',
  description: 'Premium AI-assisted post-production and VFX services for creators, brands, and studios based in India.',
  keywords: ['VFX', 'AI', 'Post-Production', 'Video Editing', 'India', 'AI-Assisted VFX', 'Video Production'],
  authors: [{ name: 'Fix It In Post Studios' }],
  creator: 'Fix It In Post Studios',
  publisher: 'Fix It In Post Studios',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://fixitinpost.studio',
    siteName: 'Fix It In Post Studios',
    title: 'Fix It In Post Studios - AI-Assisted VFX & Video Production',
    description: 'Premium AI-assisted post-production and VFX services for creators, brands, and studios.',
    images: [
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'Fix It In Post Studios Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix It In Post Studios',
    description: 'AI-Assisted VFX & Video Production',
    images: ['/web-app-manifest-512x512.png'],
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
