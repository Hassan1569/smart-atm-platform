import { useEffect, useState } from 'react';

/**
 * useDebounce — returns a debounced copy of `value` that updates
 * only after `delay` ms have passed without further changes.
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}