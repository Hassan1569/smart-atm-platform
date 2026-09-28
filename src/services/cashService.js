/**
 * cashService — cash data access + derived aggregations.
 */

import { get } from './apiClient.js';
import { CASH_BY_ATM, REPLENISHMENTS } from '../data/cash.js';

/** Compute total cash currently loaded + total capacity for one ATM. */
function computeAtmCash(atmId, record) {
  if (!record) return null;
  const loaded = record.cassettes.reduce(
    (sum, c) => sum + (c.level / 100) * c.capacity,
    0
  );
  const capacity = record.cassettes.reduce((sum, c) => sum + c.capacity, 0);
  const utilization = capacity ? Math.round((loaded / capacity) * 100) : 0;
  return {
    atmId,
    currency: record.currency,
    cassettes: record.cassettes,
    loaded,
    capacity,
    utilization,
    lastReplenishment: record.lastReplenishment,
    nextReplenishment: record.nextReplenishment,
  };
}

export async function getCashByAtm(atmId) {
  const all = await get(() => CASH_BY_ATM);
  return computeAtmCash(atmId, all[atmId]);
}

export async function getAllCash() {
  const all = await get(() => CASH_BY_ATM);
  return Object.entries(all).map(([atmId, rec]) => computeAtmCash(atmId, rec));
}

export async function getCashSummary() {
  const rows = await getAllCash();
  const totalLoaded = rows.reduce((s, r) => s + r.loaded, 0);
  const totalCapacity = rows.reduce((s, r) => s + r.capacity, 0);
  const utilization = totalCapacity
    ? Math.round((totalLoaded / totalCapacity) * 100)
    : 0;
  const lowCashAtms = rows.filter((r) => r.utilization < 25).length;
  return { totalLoaded, totalCapacity, utilization, lowCashAtms, atmCount: rows.length };
}

export async function getReplenishments(limit = 20) {
  const all = await get(() => REPLENISHMENTS);
  return [...all]
    .sort((a, b) => new Date(b.ts) - new Date(a.ts))
    .slice(0, limit);
}