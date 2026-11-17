'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type VisualTier = 'full' | 'compact' | 'static';

/** One policy for capability, motion preference, context health and frame pacing. */
export function useVisualQuality() {
  const [tier, setTier] = useState<VisualTier>('static');
  const failed = useRef(false);
  const pacing = useRef({ elapsed: 0, slow: 0, frames: 0 });
  const fail = useCallback(() => { failed.current = true; setTier('static'); }, []);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = matchMedia('(pointer: coarse)');
    const update = () => {
      if (failed.current || motion.matches) { setTier('static'); return; }
      const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean; effectiveType?: string } };
      const probe = document.createElement('canvas');
      try {
        const gl = probe.getContext('webgl2');
        if (!gl) { fail(); return; }
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      } catch { fail(); return; }
      setTier(coarse.matches || (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
        (nav.hardwareConcurrency > 0 && nav.hardwareConcurrency <= 4) || nav.connection?.saveData ||
        /(^|-)2g$/.test(nav.connection?.effectiveType ?? '') ? 'compact' : 'full');
    };
    update();
    motion.addEventListener('change', update);
    coarse.addEventListener('change', update);
    return () => { motion.removeEventListener('change', update); coarse.removeEventListener('change', update); };
  }, [fail]);
  const reportFrame = useCallback((milliseconds: number) => {
    // Call only for consecutive visible frames; evaluate a sustained four-second window.
    const p = pacing.current;
    p.elapsed += milliseconds; p.frames++; if (milliseconds > 40) p.slow++;
    if (p.elapsed >= 4000) {
      if (p.frames > 30 && p.slow / p.frames > 0.5) fail();
      pacing.current = { elapsed: 0, slow: 0, frames: 0 };
    }
  }, [fail]);
  const bindContext = useCallback((canvas: HTMLCanvasElement) => {
    const lost = (event: Event) => { event.preventDefault(); fail(); };
    canvas.addEventListener('webglcontextlost', lost);
    return () => canvas.removeEventListener('webglcontextlost', lost);
  }, [fail]);
  return { tier, canAnimate: tier !== 'static', devicePixelBudget: tier === 'full' ? 1_500_000 : tier === 'compact' ? 750_000 : 0, reportFrame, bindContext, reportFailure: fail };
}
