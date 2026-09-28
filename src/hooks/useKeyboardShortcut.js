import { useEffect } from 'react';

/**
 * useKeyboardShortcut('k', handler, { meta: true })
 * Fires handler on Cmd+K (Mac) or Ctrl+K (Windows).
 */
export function useKeyboardShortcut(key, handler, options = {}) {
  const { meta = false, shift = false, alt = false, enabled = true } = options;

  useEffect(() => {
    if (!enabled || typeof handler !== 'function') return;
    const onKey = (e) => {
      const metaOk = meta ? e.metaKey || e.ctrlKey : true;
      const shiftOk = shift ? e.shiftKey : true;
      const altOk = alt ? e.altKey : true;
      if (e.key.toLowerCase() === key.toLowerCase() && metaOk && shiftOk && altOk) {
        e.preventDefault();
        handler(e);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [key, handler, meta, shift, alt, enabled]);
}