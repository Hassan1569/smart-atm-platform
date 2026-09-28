import { useEffect, useState } from 'react';
import { getActivity } from '../services/activityService.js';
import { on } from '../services/simulationService.js';

export function useActivity(limit = 10) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const rows = await getActivity(limit);
        if (mounted) setData(rows);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [limit]);

  // Prepend new simulation activity entries
  useEffect(() => {
    const off = on('activity:new', (entry) => {
      setData((prev) => {
        const next = [entry, ...(prev ?? [])];
        return next.slice(0, limit);
      });
    });
    return () => off();
  }, [limit]);

  return { data, loading, error, refetch: () => {} };
}