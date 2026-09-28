import { useEffect } from 'react';

export function useEscapeKey(handler, enabled = true) {
  useEffect(() => {
    if (!enabled || typeof handler !== 'function') return;
    const onKey = (e) => {
      if (e.key === 'Escape') handler(e);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [handler, enabled]);
}