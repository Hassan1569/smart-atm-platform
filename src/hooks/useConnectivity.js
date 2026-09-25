import { useCallback, useEffect, useRef, useState } from 'react';
import { probe, probeHistory } from '../services/connectivityService.js';

/**
 * useConnectivity
 * - Runs a live probe on mount
 * - Fetches a history series for the sparkline
 * - Provides manual `refresh()` for the "Ping now" button
 */
export function useConnectivity(atmId) {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  const run = useCallback(async () => {
    if (!atmId) return;
    setLoading(true);
    setError(null);
    try {
      const [c, h] = await Promise.all([probe(atmId), probeHistory(atmId, 20)]);
      if (mounted.current) {
        setCurrent(c);
        setHistory(h);
      }
    } catch (err) {
      if (mounted.current) setError(err);
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [atmId]);

  useEffect(() => {
    mounted.current = true;
    run();
    return () => {
      mounted.current = false;
    };
  }, [run]);

  return { current, history, loading, error, refresh: run };
}