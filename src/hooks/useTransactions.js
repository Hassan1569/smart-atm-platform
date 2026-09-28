import { useAsync } from './useAsync.js';
import {
  getHourlyVolume,
  getTypeBreakdown,
  getSuccessMetrics,
  getAtmVolume,
  getRecentTransactions,
  getTransactionsSummary,
} from '../services/transactionService.js';

export function useTransactions() {
  return useAsync(
    async () => {
      const [summary, hourly, breakdown, success, atmVolume, recent] =
        await Promise.all([
          getTransactionsSummary(),
          getHourlyVolume(),
          getTypeBreakdown(),
          getSuccessMetrics(),
          getAtmVolume(),
          getRecentTransactions(20),
        ]);
      return { summary, hourly, breakdown, success, atmVolume, recent };
    },
    []
  );
}