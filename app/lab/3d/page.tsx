import { Metadata } from 'next';
import HomePage from '../../HomePage';
import type { HeroManifest } from '@/components/ScrollHero';
import manifest from '@/data/heroes-3d/home.json';

// Hidden test page: the homepage with the Blender-rendered hero instead of the AI clip. Not linked, not indexed, not in the sitemap.
export const metadata: Metadata = { title: 'Lab · 3D hero test', robots: { index: false, follow: false } };

export default function Lab3D() {
  return <HomePage heroManifest={manifest as HeroManifest} />;
}
