import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getIncidents,
  assignIncident,
  advanceStatus,
  addComment,
  resolveIncident,
} from '../services/incidentService.js';

export function useIncidents() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mutating, setMutating] = useState(false);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rows = await getIncidents();
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

  const run = useCallback(async (fn) => {
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
    assign: (id, tech) => run(() => assignIncident(id, tech)),
    advance: (id, status, note) => run(() => advanceStatus(id, status, note)),
    comment: (id, author, text) => run(() => addComment(id, author, text)),
    resolve: (id, notes) => run(() => resolveIncident(id, notes)),
  };
}