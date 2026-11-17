'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface VideoDialogProps { open: boolean; onClose: () => void; youtubeId: string; title: string }

export function VideoDialog({ open, onClose, youtubeId, title }: VideoDialogProps) {
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const callback = useRef(onClose);
  useEffect(() => { callback.current = onClose; }, [onClose]);
  useEffect(() => {
    if (!open || !dialog.current) return;
    const previous = document.activeElement as HTMLElement | null;
    const root = dialog.current;
    const siblings = Array.from(document.body.children).filter((el): el is HTMLElement => el instanceof HTMLElement && el !== root);
    const inert = siblings.map(el => el.inert);
    siblings.forEach(el => { el.inert = true; });
    const { overflow, paddingRight } = document.body.style;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;
    close.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); callback.current(); }
      if (e.key === 'Tab') {
        const items = Array.from(root.querySelectorAll<HTMLElement>('button, iframe'));
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    const focus = (e: FocusEvent) => { if (!root.contains(e.target as Node)) close.current?.focus(); };
    document.addEventListener('keydown', key);
    document.addEventListener('focusin', focus);
    return () => {
      document.removeEventListener('keydown', key); document.removeEventListener('focusin', focus);
      siblings.forEach((el, i) => { el.inert = inert[i]; });
      document.body.style.overflow = overflow; document.body.style.paddingRight = paddingRight;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [open]);
  if (!open) return null;
  return createPortal(
    <div ref={dialog} role="dialog" aria-modal="true" aria-label={title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
      style={{ padding: 'max(16px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left))' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <span tabIndex={0} className="sr-only" onFocus={() => dialog.current?.querySelector('iframe')?.focus()} />
      <div className="w-full max-w-5xl">
        <div className="flex justify-end pb-3">
          <button ref={close} type="button" onClick={onClose} aria-label="Close video" className="flex h-11 w-11 items-center justify-center border border-neutral-700 bg-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><X size={18} /></button>
        </div>
        <iframe src={`https://www.youtube.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&rel=0`} title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
          className="aspect-video w-full border border-neutral-800 bg-black" style={{ maxHeight: 'calc(100dvh - 120px)' }} />
      </div>
      <span tabIndex={0} className="sr-only" onFocus={() => close.current?.focus()} />
    </div>, document.body);
}
