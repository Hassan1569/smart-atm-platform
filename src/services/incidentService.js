/**
 * incidentService — incident data access + lifecycle mutations.
 *
 * Lifecycle: detected → assigned → investigating → repair → testing → resolved
 * NOTE: Mutations are in-memory only (see alertService for rationale).
 */

import { get, post } from './apiClient.js';
import { INCIDENTS } from '../data/incidents.js';
import { INCIDENT_STATUS } from '../utils/constants.js';

let _incidents = structuredClone(INCIDENTS);

export async function getIncidents() {
  return get(() => _incidents);
}

export async function getRecentIncidents(limit = 5) {
  const all = await getIncidents();
  return [...all]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, limit);
}

export async function getIncidentById(id) {
  const all = await getIncidents();
  const inc = all.find((i) => i.id === id);
  if (!inc) throw new Error(`Incident not found: ${id}`);
  return inc;
}

export async function getIncidentSummary() {
  const all = await getIncidents();
  return {
    total: all.length,
    open: all.filter((i) => i.status !== INCIDENT_STATUS.RESOLVED).length,
    critical: all.filter((i) => i.priority === 'critical').length,
    resolved: all.filter((i) => i.status === INCIDENT_STATUS.RESOLVED).length,
  };
}

/** Assign to a technician. */
export async function assignIncident(id, technician) {
  if (!technician || !technician.trim()) throw new Error('Technician is required');
  return post({ id }).then(() =>
    mutate(id, (inc) => {
      const ts = new Date().toISOString();
      return {
        ...inc,
        technician: technician.trim(),
        status: INCIDENT_STATUS.ASSIGNED,
        updatedAt: ts,
        timeline: [...inc.timeline, { ts, event: 'Assigned', actor: 'Ops Manager', note: `Assigned to ${technician.trim()}` }],
      };
    })
  );
}

/** Advance status. */
export async function advanceStatus(id, nextStatus, note) {
  return post({ id, nextStatus }).then(() =>
    mutate(id, (inc) => {
      const ts = new Date().toISOString();
      return {
        ...inc,
        status: nextStatus,
        updatedAt: ts,
        timeline: [...inc.timeline, { ts, event: titleEvent(nextStatus), actor: inc.technician, note: note ?? null }],
      };
    })
  );
}

/** Add a comment. */
export async function addComment(id, author, text) {
  if (!text || !text.trim()) throw new Error('Comment cannot be empty');
  return post({ id, text }).then(() =>
    mutate(id, (inc) => {
      const ts = new Date().toISOString();
      return {
        ...inc,
        updatedAt: ts,
        comments: [...inc.comments, { ts, author, text: text.trim() }],
      };
    })
  );
}

/** Resolve incident with notes. */
export async function resolveIncident(id, notes) {
  return post({ id }).then(() =>
    mutate(id, (inc) => {
      const ts = new Date().toISOString();
      return {
        ...inc,
        status: INCIDENT_STATUS.RESOLVED,
        updatedAt: ts,
        resolutionNotes: notes?.trim() || 'Resolved',
        timeline: [...inc.timeline, { ts, event: 'Resolved', actor: inc.technician, note: notes?.trim() || null }],
      };
    })
  );
}

// Internal helpers
function mutate(id, fn) {
  const idx = _incidents.findIndex((i) => i.id === id);
  if (idx === -1) throw new Error(`Incident not found: ${id}`);
  _incidents[idx] = fn(_incidents[idx]);
  return _incidents[idx];
}

function titleEvent(status) {
  const map = {
    [INCIDENT_STATUS.DETECTED]: 'Detected',
    [INCIDENT_STATUS.ASSIGNED]: 'Assigned',
    [INCIDENT_STATUS.INVESTIGATING]: 'Investigating',
    [INCIDENT_STATUS.REPAIR]: 'Repair',
    [INCIDENT_STATUS.TESTING]: 'Testing',
    [INCIDENT_STATUS.RESOLVED]: 'Resolved',
  };
  return map[status] ?? status;
}

/** Reset to seed (dev helper). */
export function _resetIncidents() {
  _incidents = structuredClone(INCIDENTS);
}