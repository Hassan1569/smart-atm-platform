import { useAsync } from './useAsync.js';
import { getRecentAlerts } from '../services/alertService.js';

export function useRecentAlerts(limit = 5) {
  return useAsync(() => getRecentAlerts(limit), [limit]);
}