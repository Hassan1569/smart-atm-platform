/**
 * atmService — all ATM data access.
 * Components never import from `data/` directly.
 */

import { get } from './apiClient.js';
import { ATMS } from '../data/atms.js';

export async function getAtms() {
  return get(() => ATMS);
}

export async function getAtmById(id) {
  const all = await getAtms();
  const atm = all.find((a) => a.id === id);
  if (!atm) throw new Error(`ATM not found: ${id}`);
  return atm;
}

export async function getAtmSummary() {
  const all = await getAtms();
  const total = all.length;
  const online = all.filter((a) => a.status === 'online').length;
  const warning = all.filter((a) => a.status === 'warning').length;
  const critical = all.filter((a) => a.status === 'critical').length;
  const offline = all.filter((a) => a.status === 'offline').length;
  const avgHealth = Math.round(
    all.reduce((sum, a) => sum + a.health, 0) / Math.max(1, total)
  );
  const avgCash = Math.round(
    all.reduce((sum, a) => sum + a.cash, 0) / Math.max(1, total)
  );
  const lowCash = all.filter((a) => a.cash < 25).length;

  return {
    total,
    online,
    warning,
    critical,
    offline,
    avgHealth,
    avgCash,
    lowCash,
  };
}