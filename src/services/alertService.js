/**
 * alertService — alert data access.
 */

import { get } from './apiClient.js';
import { ALERTS } from '../data/alerts.js';

export async function getAlerts() {
  return get(() => ALERTS);
}

export async function getRecentAlerts(limit = 5) {
  const all = await getAlerts();
  return [...all]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
}

export async function getAlertSummary() {
  const all = await getAlerts();
  return {
    total: all.length,
    critical: all.filter((a) => a.severity === 'critical').length,
    warning: all.filter((a) => a.severity === 'warning').length,
    info: all.filter((a) => a.severity === 'info').length,
    open: all.filter((a) => a.status !== 'resolved').length,
  };
}