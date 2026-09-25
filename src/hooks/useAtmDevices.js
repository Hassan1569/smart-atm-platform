import { useAsync } from './useAsync.js';
import { getDevicesByAtmGrouped } from '../services/deviceService.js';

export function useAtmDevices(atmId) {
  return useAsync(() => getDevicesByAtmGrouped(atmId), [atmId]);
}