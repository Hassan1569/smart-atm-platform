import { useAsync } from './useAsync.js';
import { getAllMaintenance } from '../services/maintenanceService.js';

export function useMaintenance() {
  return useAsync(() => getAllMaintenance(), []);
}