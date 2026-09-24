/**
 * constants.js
 * Single source of truth for enums used across the platform.
 * Do NOT hardcode status strings elsewhere — import from here.
 */

// ---------- ATM / Device statuses ----------
export const ATM_STATUS = Object.freeze({
  ONLINE: 'online',
  WARNING: 'warning',
  CRITICAL: 'critical',
  OFFLINE: 'offline',
});

export const ATM_STATUS_LIST = Object.freeze(Object.values(ATM_STATUS));

export const DEVICE_STATUS = Object.freeze({
  OK: 'ok',
  WARNING: 'warning',
  FAILED: 'failed',
  OFFLINE: 'offline',
});

export const DEVICE_STATUS_LIST = Object.freeze(Object.values(DEVICE_STATUS));

// ---------- Alert severities ----------
export const SEVERITY = Object.freeze({
  CRITICAL: 'critical',
  WARNING: 'warning',
  INFO: 'info',
});

export const SEVERITY_LIST = Object.freeze(Object.values(SEVERITY));

// ---------- Alert / Incident statuses ----------
export const ALERT_STATUS = Object.freeze({
  DETECTED: 'detected',
  ACKNOWLEDGED: 'acknowledged',
  ASSIGNED: 'assigned',
  INVESTIGATING: 'investigating',
  RESOLVED: 'resolved',
});

export const ALERT_STATUS_LIST = Object.freeze(Object.values(ALERT_STATUS));

export const INCIDENT_STATUS = Object.freeze({
  DETECTED: 'detected',
  ASSIGNED: 'assigned',
  INVESTIGATING: 'investigating',
  REPAIR: 'repair',
  TESTING: 'testing',
  RESOLVED: 'resolved',
});

export const INCIDENT_STATUS_LIST = Object.freeze(Object.values(INCIDENT_STATUS));

export const INCIDENT_PRIORITY = Object.freeze({
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
});

export const INCIDENT_PRIORITY_LIST = Object.freeze(Object.values(INCIDENT_PRIORITY));

// ---------- Device groups ----------
export const DEVICE_GROUP = Object.freeze({
  ATM: 'atm',
  CASH_RECYCLER: 'cash-recycler',
  NETWORK_SYSTEM: 'network-system',
});

export const DEVICE_GROUP_LABEL = Object.freeze({
  [DEVICE_GROUP.ATM]: 'ATM Devices',
  [DEVICE_GROUP.CASH_RECYCLER]: 'Cash Recycler',
  [DEVICE_GROUP.NETWORK_SYSTEM]: 'Network / System',
});

// ---------- Transaction types ----------
export const TXN_TYPE = Object.freeze({
  WITHDRAWAL: 'withdrawal',
  DEPOSIT: 'deposit',
  BALANCE: 'balance',
  TRANSFER: 'transfer',
});

export const TXN_STATUS = Object.freeze({
  SUCCESS: 'success',
  FAILED: 'failed',
  PENDING: 'pending',
});

// ---------- User roles ----------
export const ROLE = Object.freeze({
  ADMIN: 'admin',
  OPS_MANAGER: 'ops_manager',
  TECHNICIAN: 'technician',
  VIEWER: 'viewer',
});

export const ROLE_LABEL = Object.freeze({
  [ROLE.ADMIN]: 'Administrator',
  [ROLE.OPS_MANAGER]: 'Operations Manager',
  [ROLE.TECHNICIAN]: 'Technician',
  [ROLE.VIEWER]: 'Viewer',
});

// ---------- Simulation ----------
export const SIMULATION_DEFAULT_INTERVAL_MS = 5000;

// ---------- LocalStorage keys ----------
export const STORAGE_KEYS = Object.freeze({
  THEME: 'satm.theme',
  SESSION: 'satm.session',
  SIMULATION: 'satm.simulation',
  SIDEBAR_COLLAPSED: 'satm.sidebar.collapsed',
});

// ---------- Currency ----------
export const DEFAULT_CURRENCY = 'PKR';