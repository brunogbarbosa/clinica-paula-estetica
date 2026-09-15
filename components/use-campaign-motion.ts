'use client';

import { useEffect, useRef } from 'react';

/** One gentle entrance. Content never waits for a download or replays on scroll. */
export function useCampaignMotion() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    const animations: Animation[] = [];
    root.current?.querySelectorAll('.campaign-copy, .campaign-portrait, .campaign-metrics, .campaign-signature').forEach((element, index) => {
      animations.push(element.animate([
        { opacity: .3, transform: 'translateY(16px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 650, delay: index * 60, easing: 'cubic-bezier(.2,.7,.2,1)' }));
    });
    const stop = () => { if (preference.matches) animations.forEach(animation => animation.cancel()); };
    preference.addEventListener('change', stop);
    return () => {
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener('change', stop);
    };
  }, []);
  return root;
}
