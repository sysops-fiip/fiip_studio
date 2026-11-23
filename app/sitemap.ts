export const dynamic = 'force-static';
import { MetadataRoute } from 'next';

// lastModified = when each page's content last changed (update when publishing content edits).
const base = 'https://fixitinpost.in';
const pages: [string, string, MetadataRoute.Sitemap[number]['changeFrequency'], number][] = [
  ['/', '2026-11-22', 'weekly', 1],
  ['/portfolio', '2026-11-22', 'weekly', 0.9],
  ['/services', '2026-11-22', 'monthly', 0.9],
  ['/frames', '2026-11-21', 'monthly', 0.8],
  ['/about', '2026-11-22', 'monthly', 0.8],
  ['/pricing', '2026-11-22', 'monthly', 0.7],
  ['/contact', '2026-11-22', 'yearly', 0.7],
  ['/privacy', '2026-11-22', 'yearly', 0.2],
  ['/terms', '2026-11-22', 'yearly', 0.2],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(([path, date, changeFrequency, priority]) => ({ url: `${base}${path === '/' ? '' : path}`, lastModified: new Date(date), changeFrequency, priority }));
}
