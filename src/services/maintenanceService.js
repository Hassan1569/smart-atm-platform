/**
 * maintenanceService — maintenance data access.
 */

import { get } from './apiClient.js';
import { MAINTENANCE } from '../data/maintenance.js';

export async function getAllMaintenance() {
  return get(() => MAINTENANCE);
}

export async function getMaintenanceByAtm(atmId) {
  const all = await getAllMaintenance();
  return all.filter((m) => m.atmId === atmId);
}

export async function getMaintenanceSummary() {
  const all = await getAllMaintenance();
  return {
    scheduled:   all.filter((m) => m.status === 'scheduled').length,
    inProgress:  all.filter((m) => m.status === 'in_progress').length,
    completed:   all.filter((m) => m.status === 'completed').length,
    cancelled:   all.filter((m) => m.status === 'cancelled').length,
    total:       all.length,
  };
}

/** Upcoming = scheduled in the future, sorted ascending by scheduledFor. */
export async function getUpcoming(limit = 5) {
  const all = await getAllMaintenance();
  const now = Date.now();
  return all
    .filter((m) => m.status === 'scheduled' && new Date(m.scheduledFor).getTime() >= now)
    .sort((a, b) => new Date(a.scheduledFor) - new Date(b.scheduledFor))
    .slice(0, limit);
}

/** Recent = completed, sorted desc by completedAt. */
export async function getRecentCompleted(limit = 5) {
  const all = await getAllMaintenance();
  return all
    .filter((m) => m.status === 'completed' && m.completedAt)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, limit);
}