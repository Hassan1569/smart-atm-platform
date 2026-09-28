import { useCallback, useEffect, useState } from 'react';
import { getAtms } from '../services/atmService.js';
import { applySimulationEvent } from '../services/atmService.js';
import { on } from '../services/simulationService.js';

/**
 * useLiveAtms — like useAtms but refreshes when simulation events fire.
 */
export function useLiveAtms() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const rows = await getAtms();
      setData(rows);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Subscribe to simulation events and apply them, then refresh
  useEffect(() => {
    const handlers = ['atm:health', 'atm:status', 'atm:cash'].map((evt) =>
      on(evt, (payload) => {
        applySimulationEvent(evt, payload);
        // refresh the in-memory list (silent — no loading flicker)
        load(true);
      })
    );
    return () => handlers.forEach((off) => off());
  }, [load]);

  return { data, loading, error, refetch: () => load(false) };
}   