/**
 * atmService — ATM data access.
 *
 * Holds a live in-memory copy of the ATM array. The simulation engine
 * mutates this copy (via `applySimulationEvent`), and pages refetch to
 * pick up the changes. The seed data in `data/atms.js` is untouched.
 */

import { get, post } from './apiClient.js';
import { ATMS } from '../data/atms.js';

// Live working copy (deep clone so we never mutate the seed)
let _atms = structuredClone(ATMS);

export async function getAtms() {
  return get(() => _atms);
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

// ---------------------------------------------------------------------------
// Simulation-facing API (called by SimulationContext)
// ---------------------------------------------------------------------------

/**
 * Snapshot (synchronous) — used by the simulation engine to read current state
 * without awaiting the mock latency.
 */
export function getAtmsSnapshot() {
  return _atms;
}

/**
 * Apply a simulation event to the live copy.
 * Mutates in place — subsequent `getAtms()` returns updated rows.
 */
export function applySimulationEvent(event, payload) {
  if (!event || !payload) return;

  switch (event) {
    case 'atm:health': {
      const idx = _atms.findIndex((a) => a.id === payload.atmId);
      if (idx === -1) return;
      _atms[idx] = {
        ..._atms[idx],
        health: payload.health,
        status: payload.status ?? _atms[idx].status,
        lastSeen: new Date().toISOString(),
      };
      return;
    }

    case 'atm:status': {
      const idx = _atms.findIndex((a) => a.id === payload.atmId);
      if (idx === -1) return;
      _atms[idx] = {
        ..._atms[idx],
        status: payload.to,
        health: payload.health ?? _atms[idx].health,
        network:
          payload.to === 'online'
            ? 'stable'
            : payload.to === 'warning'
            ? 'degraded'
            : 'unstable',
        lastSeen: new Date().toISOString(),
      };
      return;
    }

    case 'atm:cash': {
      const idx = _atms.findIndex((a) => a.id === payload.atmId);
      if (idx === -1) return;
      _atms[idx] = {
        ..._atms[idx],
        cash: payload.cash,
      };
      return;
    }

    default:
      return;
  }
}

/** Reset to seed (dev helper). */
export function _resetAtms() {
  _atms = structuredClone(ATMS);
}