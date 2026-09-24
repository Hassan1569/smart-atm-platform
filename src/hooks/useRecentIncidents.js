import { useAsync } from './useAsync.js';
import { getRecentIncidents } from '../services/incidentService.js';

export function useRecentIncidents(limit = 5) {
  return useAsync(() => getRecentIncidents(limit), [limit]);
}