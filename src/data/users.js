/**
 * Mock users — 4 preset accounts, one per role.
 * All data is fictional.
 */

import { ROLE } from '../utils/constants.js';

export const USERS = [
  {
    id: 'USR-001',
    name: 'System Admin',
    email: 'admin@satm.local',
    password: 'admin123', // Plain-text — this is a prototype, not real auth
    role: ROLE.ADMIN,
    initials: 'SA',
    assignedAtms: [],
    active: true,
  },
  {
    id: 'USR-002',
    name: 'Fatima Noor',
    email: 'ops@satm.local',
    password: 'ops123',
    role: ROLE.OPS_MANAGER,
    initials: 'FN',
    assignedAtms: [],
    active: true,
  },
  {
    id: 'USR-003',
    name: 'Ahmed Khan',
    email: 'tech@satm.local',
    password: 'tech123',
    role: ROLE.TECHNICIAN,
    initials: 'AK',
    assignedAtms: [
      'ATM-KHI-001',
      'ATM-KHI-002',
      'ATM-KHI-003',
      'ATM-KHI-004',
      'ATM-LHR-001',
    ],
    active: true,
  },
  {
    id: 'USR-004',
    name: 'Zainab Ali',
    email: 'viewer@satm.local',
    password: 'viewer123',
    role: ROLE.VIEWER,
    initials: 'ZA',
    assignedAtms: [],
    active: true,
  },
];