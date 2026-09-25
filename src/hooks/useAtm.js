import { useAsync } from './useAsync.js';
import { getAtmById } from '../services/atmService.js';

export function useAtm(id) {
  return useAsync(() => getAtmById(id), [id]);
}