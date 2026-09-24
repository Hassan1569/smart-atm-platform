import { useAsync } from './useAsync.js';
import { getActivity } from '../services/activityService.js';

export function useActivity(limit = 10) {
  return useAsync(() => getActivity(limit), [limit]);
}