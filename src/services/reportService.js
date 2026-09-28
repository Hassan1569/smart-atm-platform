/**
 * reportService — composes report datasets from existing services.
 * No new mock data — reuses ATMs, alerts, incidents, cash, transactions, maintenance.
 */

import { getAtms } from './atmService.js';
import { getAlerts } from './alertService.js';
import { getIncidents } from './incidentService.js';
import { getAllCash } from './cashService.js';
import { getAllMaintenance } from './maintenanceService.js';
import {
  getTypeBreakdown,
  getSuccessMetrics,
  getHourlyVolume,
  getAtmVolume,
} from './transactionService.js';

// ---------------------------------------------------------------------------
// Report definitions (metadata for the tab bar)
// ---------------------------------------------------------------------------

export const REPORT_TYPES = [
  { id: 'daily-atm',    label: 'Daily ATM',         description: 'Snapshot of every ATM with status, health, and cash.' },
  { id: 'availability', label: 'Availability',      description: 'Uptime summary by ATM and city.' },
  { id: 'device-health',label: 'Device Health',     description: 'Aggregate device health by ATM.' },
  { id: 'alert',        label: 'Alert Report',      description: 'All alerts with severity, status, and assignee.' },
  { id: 'incident',     label: 'Incident Report',   description: 'All incidents with priority, technician, and status.' },
  { id: 'cash',         label: 'Cash Report',       description: 'Fleet cash position and utilization by ATM.' },
  { id: 'transaction',  label: 'Transaction Report',description: 'Volume, success rate, and type breakdown.' },
  { id: 'maintenance',  label: 'Maintenance',       description: 'Scheduled and completed maintenance jobs.' },
];

// ---------------------------------------------------------------------------
// Individual report builders
// ---------------------------------------------------------------------------

async function buildDailyAtmReport() {
  const atms = await getAtms();
  const rows = atms.map((a) => ({
    'ATM ID':     a.id,
    Location:     a.location,
    City:         a.city,
    Bank:         a.bank,
    Vendor:       a.vendor,
    Model:        a.model,
    Status:       a.status,
    'Health %':   a.health,
    'Cash %':     a.cash,
    Network:      a.network,
    'Last Seen':  a.lastSeen,
  }));
  return {
    columns: ['ATM ID', 'Location', 'City', 'Bank', 'Vendor', 'Model', 'Status', 'Health %', 'Cash %', 'Network', 'Last Seen'],
    rows,
  };
}

async function buildAvailabilityReport() {
  const atms = await getAtms();
  const byCity = {};
  for (const a of atms) {
    if (!byCity[a.city]) byCity[a.city] = { total: 0, online: 0, warning: 0, critical: 0, offline: 0 };
    byCity[a.city].total++;
    byCity[a.city][a.status] = (byCity[a.city][a.status] ?? 0) + 1;
  }
  const rows = Object.entries(byCity).map(([city, c]) => {
    const availabilityPct = ((c.total - c.offline) / c.total) * 100;
    return {
      City:            city,
      'Total ATMs':    c.total,
      Online:          c.online ?? 0,
      Warning:         c.warning ?? 0,
      Critical:        c.critical ?? 0,
      Offline:         c.offline ?? 0,
      'Availability %': Number(availabilityPct.toFixed(1)),
    };
  });
  return {
    columns: ['City', 'Total ATMs', 'Online', 'Warning', 'Critical', 'Offline', 'Availability %'],
    rows,
  };
}

async function buildDeviceHealthReport() {
  const atms = await getAtms();
  // Simplified: derive from ATM-level health (Phase 6 deviceService can be wired later)
  const rows = atms.map((a) => ({
    'ATM ID':        a.id,
    City:            a.city,
    'Overall Health': a.health,
    'Failed Devices': a.health < 40 ? 3 : a.health < 70 ? 1 : 0,
    'Warning Devices': a.health < 85 ? 2 : 0,
    'Last Check':    a.lastSeen,
  }));
  return {
    columns: ['ATM ID', 'City', 'Overall Health', 'Failed Devices', 'Warning Devices', 'Last Check'],
    rows,
  };
}

async function buildAlertReport() {
  const alerts = await getAlerts();
  const rows = alerts
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((a) => ({
      'Alert ID':  a.id,
      ATM:         a.atmId,
      Severity:    a.severity,
      Message:     a.message,
      Status:      a.status,
      Assignee:    a.assignee ?? '—',
      Created:     a.createdAt,
    }));
  return {
    columns: ['Alert ID', 'ATM', 'Severity', 'Message', 'Status', 'Assignee', 'Created'],
    rows,
  };
}

async function buildIncidentReport() {
  const incidents = await getIncidents();
  const rows = incidents
    .slice()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .map((i) => ({
      'Incident ID': i.id,
      ATM:           i.atmId,
      Issue:         i.issue,
      Priority:      i.priority,
      Status:        i.status,
      Technician:    i.technician,
      Updated:       i.updatedAt,
    }));
  return {
    columns: ['Incident ID', 'ATM', 'Issue', 'Priority', 'Status', 'Technician', 'Updated'],
    rows,
  };
}

async function buildCashReport() {
  const rows = await getAllCash();
  const data = rows.map((r) => ({
    'ATM ID':       r.atmId,
    'Loaded':       Math.round(r.loaded),
    'Capacity':     r.capacity,
    'Utilization %': r.utilization,
    'Cassettes':    r.cassettes.length,
    'Last Replen.':  r.lastReplenishment,
    'Next Replen.':  r.nextReplenishment ?? '—',
  }));
  return {
    columns: ['ATM ID', 'Loaded', 'Capacity', 'Utilization %', 'Cassettes', 'Last Replen.', 'Next Replen.'],
    rows: data,
  };
}

async function buildTransactionReport() {
  const [breakdown, metrics, hourly, atmVolume] = await Promise.all([
    getTypeBreakdown(),
    getSuccessMetrics(),
    getHourlyVolume(),
    getAtmVolume(),
  ]);
  // Section 1: type breakdown
  const rows = breakdown.map((b) => ({
    Type:     b.type,
    Count:    b.count,
    Amount:   b.amount,
    Share:    `${((b.count / metrics.total) * 100).toFixed(1)}%`,
  }));
  // Meta info
  const meta = {
    total: metrics.total,
    success: metrics.success,
    failed: metrics.failed,
    successRate: metrics.successRate,
    atmCount: atmVolume.length,
    hourlyBuckets: hourly.length,
  };
  return {
    columns: ['Type', 'Count', 'Amount', 'Share'],
    rows,
    meta,
  };
}

async function buildMaintenanceReport() {
  const jobs = await getAllMaintenance();
  const rows = jobs
    .slice()
    .sort((a, b) => new Date(b.scheduledFor) - new Date(a.scheduledFor))
    .map((m) => ({
      'Job ID':      m.id,
      ATM:           m.atmId,
      Type:          m.type,
      Status:        m.status,
      Scheduled:     m.scheduledFor,
      Completed:     m.completedAt ?? '—',
      Technician:    m.technician,
      Description:   m.description,
    }));
  return {
    columns: ['Job ID', 'ATM', 'Type', 'Status', 'Scheduled', 'Completed', 'Technician', 'Description'],
    rows,
  };
}

// ---------------------------------------------------------------------------
// Public dispatcher
// ---------------------------------------------------------------------------

export async function buildReport(typeId) {
  switch (typeId) {
    case 'daily-atm':    return buildDailyAtmReport();
    case 'availability': return buildAvailabilityReport();
    case 'device-health':return buildDeviceHealthReport();
    case 'alert':        return buildAlertReport();
    case 'incident':     return buildIncidentReport();
    case 'cash':         return buildCashReport();
    case 'transaction':  return buildTransactionReport();
    case 'maintenance':  return buildMaintenanceReport();
    default: throw new Error(`Unknown report type: ${typeId}`);
  }
}