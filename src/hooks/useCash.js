import { useAsync } from './useAsync.js';
import {
  getCashSummary,
  getAllCash,
  getReplenishments,
} from '../services/cashService.js';

export function useCash() {
  return useAsync(
    async () => {
      const [summary, rows, replenishments] = await Promise.all([
        getCashSummary(),
        getAllCash(),
        getReplenishments(20),
      ]);
      return { summary, rows, replenishments };
    },
    []
  );
}