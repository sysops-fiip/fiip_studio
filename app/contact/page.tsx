import { Metadata } from 'next';
import ContactPage from '../ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Fix It In Post Studios. Located in Chennai, India. Contact us for AI-assisted VFX and post-production services. Response within 24 hours.',
  keywords: ['contact VFX studio', 'Chennai VFX company', 'AI post-production contact', 'VFX consultation', 'video production inquiry'],
  openGraph: {
    title: 'Contact Fix It In Post Studios',
    description: 'Get in touch with our Chennai-based VFX studio for AI-assisted post-production services. Response within 24 hours.',
    url: 'https://fixitinpost.studio/contact',
    images: [
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'Contact Fix It In Post Studios',
      },
    ],
  },
  twitter: {
    title: 'Contact Fix It In Post Studios',
    description: 'Get in touch with our Chennai-based VFX studio for AI-assisted post-production services.',
    images: ['/web-app-manifest-512x512.png'],
  },
};

export default function Contact() {
  return <ContactPage />;
}
