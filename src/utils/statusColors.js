/**
 * statusColors.js
 * Single source of truth for status → Tailwind class mappings.
 * Never hardcode status colors in components — import from here.
 */

import { ATM_STATUS, DEVICE_STATUS, SEVERITY, ROLE } from './constants.js';

// Dot background colors (for the little status dot)
const dotMap = {
  // ATM
  [ATM_STATUS.ONLINE]: 'bg-emerald-500',
  [ATM_STATUS.WARNING]: 'bg-amber-500',
  [ATM_STATUS.CRITICAL]: 'bg-red-500',
  [ATM_STATUS.OFFLINE]: 'bg-slate-400 dark:bg-slate-500',

  // Device
  [DEVICE_STATUS.OK]: 'bg-emerald-500',
  [DEVICE_STATUS.FAILED]: 'bg-red-500',

  // Severity
  [SEVERITY.INFO]: 'bg-sky-500',
};

// Text color for status labels
const textMap = {
  [ATM_STATUS.ONLINE]: 'text-emerald-600 dark:text-emerald-400',
  [ATM_STATUS.WARNING]: 'text-amber-600 dark:text-amber-400',
  [ATM_STATUS.CRITICAL]: 'text-red-600 dark:text-red-400',
  [ATM_STATUS.OFFLINE]: 'text-slate-500 dark:text-slate-400',

  [DEVICE_STATUS.OK]: 'text-emerald-600 dark:text-emerald-400',
  [DEVICE_STATUS.FAILED]: 'text-red-600 dark:text-red-400',

  [SEVERITY.CRITICAL]: 'text-red-600 dark:text-red-400',
  [SEVERITY.WARNING]: 'text-amber-600 dark:text-amber-400',
  [SEVERITY.INFO]: 'text-sky-600 dark:text-sky-400',
};

// Badge backgrounds (pill style)
const badgeMap = {
  [ATM_STATUS.ONLINE]: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20',
  [ATM_STATUS.WARNING]: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20',
  [ATM_STATUS.CRITICAL]: 'bg-red-500/10 text-red-700 dark:text-red-400 ring-red-500/20',
  [ATM_STATUS.OFFLINE]: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-slate-500/20',

  [DEVICE_STATUS.OK]: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20',
  [DEVICE_STATUS.WARNING]: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20',
  [DEVICE_STATUS.FAILED]: 'bg-red-500/10 text-red-700 dark:text-red-400 ring-red-500/20',
  [DEVICE_STATUS.OFFLINE]: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-slate-500/20',

  [SEVERITY.CRITICAL]: 'bg-red-500/10 text-red-700 dark:text-red-400 ring-red-500/20',
  [SEVERITY.WARNING]: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20',
  [SEVERITY.INFO]: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 ring-sky-500/20',
};

// Role badge colors (used in Users table, Sidebar user chip)
const roleMap = {
  [ROLE.ADMIN]: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 ring-indigo-500/20',
  [ROLE.OPS_MANAGER]: 'bg-violet-500/10 text-violet-700 dark:text-violet-400 ring-violet-500/20',
  [ROLE.TECHNICIAN]: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 ring-sky-500/20',
  [ROLE.VIEWER]: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-slate-500/20',
};

// Public helpers
export const statusDot = (status) => dotMap[status] ?? 'bg-slate-400';
export const statusText = (status) => textMap[status] ?? 'text-slate-500';
export const statusBadge = (status) => badgeMap[status] ?? 'bg-slate-500/10 text-slate-600 ring-slate-500/20';
export const roleBadge = (role) => roleMap[role] ?? roleMap[ROLE.VIEWER];