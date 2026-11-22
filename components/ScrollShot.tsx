'use client';

import { ArrowDown, Play } from 'lucide-react';
import studio from '@/content/studio.json';
import manifest from '@/data/scroll-shot.json';
import { ScrollHero, HeroManifest } from './ScrollHero';

/* Homepage opening: through the lens, inside the shot (render passes), the final frame, then the headline. */
export function ScrollShot({ onReel }: { onReel: () => void }) {
  return <ScrollHero
    manifest={manifest as HeroManifest}
    eyebrow={studio.homepage.eyebrow}
    lede={<>Every frame,<br />from the inside.</>}
    chapters={['01 · Through the lens', '02 · Inside the shot', '03 · The final frame']}
    titleId="hero-title"
    title={<>The final<br /><span>feeling.</span></>}
    intro={<p className="cinema-intro">A world imagined.<br />Every detail made real.</p>}
    actions={<div className="hero-actions"><button className="pill-button pill-light" onClick={onReel}><Play size={13} fill="currentColor" />Watch the studio reel</button><a className="text-link" href="#selected-work">See the work <ArrowDown size={16} /></a></div>}
  />;
}
