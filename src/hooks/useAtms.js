import { useAsync } from './useAsync.js';
import { getAtms } from '../services/atmService.js';

export function useAtms() {
  return useAsync(() => getAtms(), []);
}