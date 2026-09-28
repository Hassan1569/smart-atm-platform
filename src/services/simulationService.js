/**
 * simulationService — timer-driven event bus.
 *
 * Publishes typed events at sensible intervals so the UI can react
 * to "live" changes: ATM health drift, status flips, cash depletion,
 * new alerts, activity feed entries.
 *
 * Rules (see docs/architecture.md §9):
 *  - Health drifts ±1–3 within [0, 100].
 *  - Status flips only if health crosses thresholds.
 *  - Cash decreases slowly; replenishment resets to 90%+.
 *  - 1–2 changes per tick, never chaotic.
 *
 * This is a SIMULATION. No real ATM is contacted.
 */

import { ATM_STATUS, SEVERITY, ALERT_STATUS } from '../utils/constants.js';
import { uid, clamp, randomInt, pickRandom } from '../utils/helpers.js';

// -- Event bus (simple pub/sub) --------------------------------------------
const subscribers = new Map(); // event → Set<callback>

function subscribe(event, callback) {
  if (!subscribers.has(event)) subscribers.set(event, new Set());
  subscribers.get(event).add(callback);
  return () => subscribers.get(event)?.delete(callback);
}

function emit(event, payload) {
  const set = subscribers.get(event);
  if (!set) return;
  for (const cb of set) {
    try {
      cb(payload);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[simulation] subscriber error', err);
    }
  }
}

// -- State ----------------------------------------------------------------
let timer = null;
let running = false;
let intervalMs = 5000;
let tickCount = 0;

// -- Tick logic -----------------------------------------------------------
const HEALTH_THRESHOLDS = {
  offline: 15,
  critical: 45,
  warning: 75,
  online: 76,
};

/**
 * Given a health value, derive the correct ATM status.
 */
function statusFromHealth(health) {
  if (health < HEALTH_THRESHOLDS.offline) return ATM_STATUS.OFFLINE;
  if (health < HEALTH_THRESHOLDS.critical) return ATM_STATUS.CRITICAL;
  if (health < HEALTH_THRESHOLDS.warning) return ATM_STATUS.WARNING;
  return ATM_STATUS.ONLINE;
}

/**
 * Pick 1–3 random ATMs and mutate their health/cash/status.
 * Emits `atm:health`, `atm:status`, `atm:cash` events accordingly.
 */
function runAtmTick(atms) {
  if (!atms || atms.length === 0) return;

  const changesCount = randomInt(1, 3);
  const chosen = new Set();
  while (chosen.size < changesCount) {
    chosen.add(randomInt(0, atms.length - 1));
  }

  for (const idx of chosen) {
    const atm = atms[idx];

    // Health drift — biased toward staying near current value
    const drift = randomInt(-3, 2);
    const newHealth = clamp((atm.health ?? 100) + drift, 0, 100);

    // Cash drift — mostly downward, sometimes replenish
    let newCash = atm.cash ?? 70;
    if (Math.random() < 0.05 && newCash < 20) {
      // Rare replenish event
      newCash = randomInt(85, 95);
      emit('atm:cash', { atmId: atm.id, cash: newCash, reason: 'replenished' });
    } else if (Math.random() < 0.6) {
      newCash = clamp(newCash - randomInt(1, 2), 0, 100);
      if (newCash !== atm.cash) {
        emit('atm:cash', { atmId: atm.id, cash: newCash });
      }
    }

    // Status flip based on new health
    const prevStatus = atm.status;
    const nextStatus = statusFromHealth(newHealth);
    if (nextStatus !== prevStatus) {
      emit('atm:status', {
        atmId: atm.id,
        from: prevStatus,
        to: nextStatus,
        health: newHealth,
      });
    }

    // Health event (always emitted when changed)
    if (newHealth !== atm.health) {
      emit('atm:health', { atmId: atm.id, health: newHealth, status: nextStatus });
    }
  }
}

/**
 * Occasionally generate a new alert (say 20% chance per tick).
 * New alerts are tagged with `simulated: true`.
 */
function maybeEmitAlert(atms) {
  if (Math.random() > 0.2 || !atms || atms.length === 0) return;

  // Weight toward problem ATMs
  const problemAtms = atms.filter(
    (a) => a.status === ATM_STATUS.WARNING || a.status === ATM_STATUS.CRITICAL || a.status === ATM_STATUS.OFFLINE
  );
  const pool = problemAtms.length > 0 ? problemAtms : atms;
  const atm = pickRandom(pool);

  const templates = {
    [ATM_STATUS.CRITICAL]: [
      { severity: SEVERITY.CRITICAL, message: 'Card reader read failure detected' },
      { severity: SEVERITY.CRITICAL, message: 'Cash dispenser jam detected' },
      { severity: SEVERITY.CRITICAL, message: 'Host connection timeout' },
    ],
    [ATM_STATUS.WARNING]: [
      { severity: SEVERITY.WARNING, message: 'Network latency elevated' },
      { severity: SEVERITY.WARNING, message: 'Cash level below 35%' },
      { severity: SEVERITY.WARNING, message: 'Printer paper low' },
    ],
    [ATM_STATUS.OFFLINE]: [
      { severity: SEVERITY.CRITICAL, message: 'ATM unreachable — no response' },
    ],
    [ATM_STATUS.ONLINE]: [
      { severity: SEVERITY.INFO, message: 'Scheduled reconciliation completed' },
    ],
  };

  const candidates = templates[atm.status] ?? templates[ATM_STATUS.ONLINE];
  const template = pickRandom(candidates);

  emit('alert:new', {
    id: uid('ALR-SIM'),
    atmId: atm.id,
    severity: template.severity,
    message: template.message,
    createdAt: new Date().toISOString(),
    status: ALERT_STATUS.DETECTED,
    assignee: null,
    simulated: true,
  });
}

/**
 * Emit a generic activity entry (used by dashboard feed).
 */
function emitActivity(tick) {
  emit('activity:new', {
    id: uid('ACT-SIM'),
    timestamp: new Date().toISOString(),
    type: 'status',
    message: `Simulation tick #${tick} — system scan complete`,
    actor: 'Simulation',
    simulated: true,
  });
}

// -- Public API ------------------------------------------------------------

/**
 * Start the simulation loop.
 * @param {() => Array} getAtms — callback that returns the current ATM list
 */
export function start(getAtms) {
  if (running) return;
  running = true;
  timer = setInterval(() => {
    tickCount += 1;
    try {
      const atms = getAtms?.() ?? [];
      runAtmTick(atms);
      maybeEmitAlert(atms);
      emitActivity(tickCount);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[simulation] tick error', err);
    }
  }, intervalMs);
}

export function stop() {
  if (timer) clearInterval(timer);
  timer = null;
  running = false;
}

export function setIntervalMs(ms) {
  intervalMs = Math.max(1000, ms);
  if (running) {
    stop();
    // restart with new interval — caller must call start again
  }
}

export function getIntervalMs() {
  return intervalMs;
}

export function isRunning() {
  return running;
}

export function getTickCount() {
  return tickCount;
}

export const on = subscribe;
export const off = (event, cb) => subscribers.get(event)?.delete(cb);