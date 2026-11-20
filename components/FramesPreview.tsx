"use client";

import { useRef, type PointerEvent } from 'react';
import Image from 'next/image';

export function FramesPreview() {
  const panel = useRef<HTMLDivElement>(null);
  function reset() {
    panel.current?.style.removeProperty('--review-x');
    panel.current?.style.removeProperty('--review-y');
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)').matches) { reset(); return; }
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    panel.current?.style.setProperty('--review-x', `${3 - (y - .5) * 6}deg`);
    panel.current?.style.setProperty('--review-y', `${-7 + (x - .5) * 10}deg`);
  }
  return (
          <div className="review-hover" onPointerMove={move} onPointerLeave={reset}><div ref={panel} className="review-study" role="img" aria-label="Illustration of frame-based review">
            <div className="review-header"><span>FRAMES</span><span>PICTURE REVIEW</span><i /></div>
            <div className="review-image"><Image src="/images/work/comfort.webp" alt="Commercial image used to illustrate reviewing a frame" fill sizes="(max-width: 767px) 90vw, 45vw" /><span className="review-crosshair" aria-hidden="true" /><div className="review-timecode">01:00:14:18 <span>V02</span></div></div>
            <div className="review-note"><span className="note-dot" /><p>A note. On the exact frame.</p><span>01</span></div>
            <div className="review-timeline" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <i key={i} />)}<span /></div>
          </div>
</div>
  );
}
