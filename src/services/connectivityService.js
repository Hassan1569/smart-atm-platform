/**
 * connectivityService — SIMULATED connectivity probes.
 *
 * ⚠️ This does NOT perform real ICMP ping, TCP probes, or any network calls.
 * The browser cannot do ICMP, and this project explicitly forbids real
 * infrastructure probing (see docs/rules.md §A3).
 *
 * Future: swap this service for a real backend endpoint that runs
 * `ping` / `fping` server-side and returns results via REST.
 */

import { getAtmById } from './atmService.js';
import { randomInt, randomFloat } from '../utils/helpers.js';
import { sleep } from '../utils/helpers.js';

/**
 * Simulate a single ping probe.
 * Returns: { status, latencyMs, packetLoss, ip, lastChecked, lastOnline }
 */
export async function probe(atmId) {
  await sleep(150 + Math.random() * 250);

  const atm = await getAtmById(atmId);

  // Base profile per status
  const profiles = {
    online:   { ok: true,  latency: [18, 55],   loss: [0, 0.5] },
    warning:  { ok: true,  latency: [180, 420], loss: [2, 8] },
    critical: { ok: false, latency: [500, 900], loss: [15, 35] },
    offline:  { ok: false, latency: null,       loss: [100, 100] },
  };

  const profile = profiles[atm.status] ?? profiles.offline;

  const latencyMs = profile.latency
    ? Math.round(randomFloat(profile.latency[0], profile.latency[1]))
    : null;

  const packetLoss = Number(
    randomFloat(profile.loss[0], profile.loss[1]).toFixed(1)
  );

  return {
    atmId,
    ip: atm.ip,
    status: profile.ok ? 'responding' : 'unreachable',
    latencyMs,
    packetLoss,
    lastChecked: new Date().toISOString(),
    lastOnline: atm.lastSeen,
  };
}

/**
 * Simulate a series of probes for a sparkline.
 * Returns an array of N results at sensible intervals.
 */
export async function probeHistory(atmId, count = 20) {
  const atm = await getAtmById(atmId);
  const now = Date.now();

  const profiles = {
    online:   { base: 35,  variance: 15, loss: 0 },
    warning:  { base: 280, variance: 90, loss: 5 },
    critical: { base: 650, variance: 150, loss: 25 },
    offline:  { base: null, variance: 0, loss: 100 },
  };

  const profile = profiles[atm.status] ?? profiles.offline;

  return Array.from({ length: count }, (_, i) => {
    const ts = now - (count - i - 1) * 30 * 1000; // 30s apart
    if (profile.base == null) {
      return { ts, latencyMs: null, packetLoss: 100 };
    }
    return {
      ts,
      latencyMs: Math.max(1, Math.round(profile.base + (Math.random() - 0.5) * profile.variance)),
      packetLoss: Math.max(0, Number((profile.loss + (Math.random() - 0.5) * 2).toFixed(1))),
    };
  });
}