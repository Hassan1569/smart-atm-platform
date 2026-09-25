/**
 * alertService — alert data access + lifecycle mutations.
 *
 * Lifecycle: detected → acknowledged → assigned → investigating → resolved
 *
 * NOTE: Mutations update an in-memory copy. State is not persisted across
 * page refresh. Phase 15 will add LocalStorage persistence + simulation.
 */

import { get, post } from './apiClient.js';
import { ALERTS } from '../data/alerts.js';
import { ALERT_STATUS } from '../utils/constants.js';

// In-memory working copy (safe to mutate)
let _alerts = structuredClone(ALERTS);

export async function getAlerts() {
  return get(() => _alerts);
}

export async function getRecentAlerts(limit = 5) {
  const all = await getAlerts();
  return [...all]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
}

export async function getAlertById(id) {
  const all = await getAlerts();
  const alert = all.find((a) => a.id === id);
  if (!alert) throw new Error(`Alert not found: ${id}`);
  return alert;
}

export async function getAlertSummary() {
  const all = await getAlerts();
  return {
    total: all.length,
    critical: all.filter((a) => a.severity === 'critical').length,
    warning: all.filter((a) => a.severity === 'warning').length,
    info: all.filter((a) => a.severity === 'info').length,
    open: all.filter((a) => a.status !== ALERT_STATUS.RESOLVED).length,
  };
}

/** Acknowledge an alert. */
export async function acknowledgeAlert(id, actor = 'System Admin') {
  return post({ id }).then(() => mutate(id, (a) => ({
    ...a,
    status: a.status === ALERT_STATUS.DETECTED ? ALERT_STATUS.ACKNOWLEDGED : a.status,
    assignee: a.assignee,
    acknowledgedAt: new Date().toISOString(),
    _lastActor: actor,
  })));
}

/** Assign an alert to a person. */
export async function assignAlert(id, assignee) {
  if (!assignee || !assignee.trim()) throw new Error('Assignee is required');
  return post({ id, assignee }).then(() => mutate(id, (a) => ({
    ...a,
    status: ALERT_STATUS.ASSIGNED,
    assignee: assignee.trim(),
    assignedAt: new Date().toISOString(),
  })));
}

/** Mark an alert as investigating. */
export async function investigateAlert(id) {
  return post({ id }).then(() => mutate(id, (a) => ({
    ...a,
    status: ALERT_STATUS.INVESTIGATING,
    investigatingAt: new Date().toISOString(),
  })));
}

/** Resolve an alert. */
export async function resolveAlert(id, resolution = 'Resolved') {
  return post({ id, resolution }).then(() => mutate(id, (a) => ({
    ...a,
    status: ALERT_STATUS.RESOLVED,
    resolvedAt: new Date().toISOString(),
    resolution,
  })));
}

// Internal mutation helper — updates in-memory array and returns the new item
function mutate(id, fn) {
  const idx = _alerts.findIndex((a) => a.id === id);
  if (idx === -1) throw new Error(`Alert not found: ${id}`);
  _alerts[idx] = fn(_alerts[idx]);
  return _alerts[idx];
}

/** Reset to seed (dev helper — not exposed in UI). */
export function _resetAlerts() {
  _alerts = structuredClone(ALERTS);
}