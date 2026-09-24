import { useAsync } from './useAsync.js';
import { getDashboardSummary } from '../services/dashboardService.js';

export function useDashboard() {
  return useAsync(() => getDashboardSummary(), []);
}