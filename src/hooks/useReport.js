import { useAsync } from './useAsync.js';
import { buildReport } from '../services/reportService.js';

export function useReport(typeId) {
  return useAsync(() => buildReport(typeId), [typeId]);
}