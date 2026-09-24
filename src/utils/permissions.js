/**
 * permissions.js
 * Single source of truth for role-based access.
 * Never hardcode role checks in components — import from here.
 */

import { ROLE } from './constants.js';

// Routes each role can access
const ROUTE_ACCESS = {
  [ROLE.ADMIN]: '*', // full access

  [ROLE.OPS_MANAGER]: [
    '/',
    '/atms',
    '/devices',
    '/alerts',
    '/incidents',
    '/maintenance',
    '/map',
    '/reports',
    '/settings',
  ],

  [ROLE.TECHNICIAN]: [
    '/',
    '/atms',
    '/devices',
    '/alerts',
    '/incidents',
    '/maintenance',
    '/map',
  ],

  [ROLE.VIEWER]: [
    '/',
    '/atms',
    '/devices',
    '/alerts',
    '/incidents',
    '/maintenance',
    '/cash',
    '/transactions',
    '/map',
    '/reports',
  ],
};

// Actions each role can perform
const ACTIONS = {
  [ROLE.ADMIN]: [
    'alert.ack',
    'alert.assign',
    'alert.resolve',
    'incident.create',
    'incident.assign',
    'incident.resolve',
    'cash.replenish',
    'user.manage',
    'settings.edit',
  ],
  [ROLE.OPS_MANAGER]: [
    'alert.ack',
    'alert.assign',
    'alert.resolve',
    'incident.create',
    'incident.assign',
    'incident.resolve',
    'settings.edit',
  ],
  [ROLE.TECHNICIAN]: [
    'alert.ack',
    'incident.resolve',
  ],
  [ROLE.VIEWER]: [],
};

/**
 * Check if a role can access a route path.
 * Handles dynamic segments: matches by longest static prefix.
 */
export function canAccessRoute(role, pathname) {
  if (!role) return false;
  const allowed = ROUTE_ACCESS[role];
  if (!allowed) return false;
  if (allowed === '*') return true;

  // Exact match or prefix match (e.g. /atms/123 → /atms)
  return allowed.some((allowedPath) => {
    if (allowedPath === '/') return pathname === '/';
    return pathname === allowedPath || pathname.startsWith(`${allowedPath}/`);
  });
}

/** Check if a role can perform an action. */
export function can(role, action) {
  if (!role) return false;
  const list = ACTIONS[role];
  if (!list) return false;
  return list.includes(action);
}

/** Return the list of routes a role can access (useful for sidebar filtering). */
export function allowedRoutes(role) {
  const allowed = ROUTE_ACCESS[role];
  if (allowed === '*') {
    return [
      '/',
      '/atms',
      '/devices',
      '/alerts',
      '/incidents',
      '/maintenance',
      '/cash',
      '/transactions',
      '/map',
      '/reports',
      '/users',
      '/settings',
    ];
  }
  return allowed ?? [];
}