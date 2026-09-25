import { useAsync } from './useAsync.js';
import { getAllDevices } from '../services/deviceService.js';

export function useAllDevices() {
  return useAsync(() => getAllDevices(), []);
}