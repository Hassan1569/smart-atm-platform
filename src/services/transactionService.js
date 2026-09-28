/**
 * transactionService — transaction data access + derived aggregations.
 */

import { get } from './apiClient.js';
import {
  HOURLY_VOLUME,
  TYPE_BREAKDOWN,
  SUCCESS_METRICS,
  ATM_VOLUME,
  RECENT_TRANSACTIONS,
  PERIOD,
} from '../data/transactions.js';

export async function getHourlyVolume() {
  return get(() => HOURLY_VOLUME);
}

export async function getTypeBreakdown() {
  return get(() => TYPE_BREAKDOWN);
}

export async function getSuccessMetrics() {
  return get(() => SUCCESS_METRICS);
}

export async function getAtmVolume() {
  return get(() => ATM_VOLUME);
}

export async function getRecentTransactions(limit = 20) {
  const all = await get(() => RECENT_TRANSACTIONS);
  return [...all].sort((a, b) => new Date(b.ts) - new Date(a.ts)).slice(0, limit);
}

export async function getTransactionsSummary() {
  const [metrics, breakdown, period] = await Promise.all([
    getSuccessMetrics(),
    getTypeBreakdown(),
    get(() => PERIOD),
  ]);

  const totalAmount = breakdown.reduce((s, b) => s + b.amount, 0);

  return {
    total: metrics.total,
    success: metrics.success,
    failed: metrics.failed,
    successRate: metrics.successRate,
    totalAmount,
    period,
  };
}