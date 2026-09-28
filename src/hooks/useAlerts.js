import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getAlerts,
  acknowledgeAlert,
  assignAlert,
  investigateAlert,
  resolveAlert,
} from '../services/alertService.js';
import { on } from '../services/simulationService.js';

export function useAlerts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mutating, setMutating] = useState(false);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rows = await getAlerts();
      if (mounted.current) setData(rows);
    } catch (err) {
      if (mounted.current) setError(err);
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => {
      mounted.current = false;
    };
  }, [load]);

  // Prepend new alerts from simulation
  useEffect(() => {
    const off = on('alert:new', (alert) => {
      setData((prev) => {
        if (!prev) return [alert];
        // Avoid duplicates
        if (prev.some((a) => a.id === alert.id)) return prev;
        return [alert, ...prev];
      });
    });
    return () => off();
  }, []);

  const runMutation = useCallback(async (fn) => {
    setMutating(true);
    try {
      await fn();
      await load();
    } finally {
      if (mounted.current) setMutating(false);
    }
  }, [load]);

  return {
    data,
    loading,
    error,
    mutating,
    refetch: load,
    acknowledge: (id) => runMutation(() => acknowledgeAlert(id)),
    assign: (id, assignee) => runMutation(() => assignAlert(id, assignee)),
    investigate: (id) => runMutation(() => investigateAlert(id)),
    resolve: (id, resolution) => runMutation(() => resolveAlert(id, resolution)),
  };
}