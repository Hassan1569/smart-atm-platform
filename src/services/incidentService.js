/**
 * incidentService — incident data access.
 */

import { get } from './apiClient.js';
import { INCIDENTS } from '../data/incidents.js';

export async function getIncidents() {
  return get(() => INCIDENTS);
}

export async function getRecentIncidents(limit = 5) {
  const all = await getIncidents();
  return [...all]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, limit);
}

export async function getIncidentSummary() {
  const all = await getIncidents();
  return {
    total: all.length,
    open: all.filter((i) => i.status !== 'resolved').length,
    critical: all.filter((i) => i.priority === 'critical').length,
  };
}