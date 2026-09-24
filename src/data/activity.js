/**
 * Mock activity feed — 10 seed records.
 * All data is fictional.
 */

export const ACTIVITY = [
  {
    id: 'ACT-1001',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    type: 'alert',
    message: 'Critical alert on ATM-LHR-002 — cash dispenser jam',
    actor: 'System',
  },
  {
    id: 'ACT-1002',
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    type: 'incident',
    message: 'INC-1043 assigned to Bilal Ahmad',
    actor: 'Ops Manager',
  },
  {
    id: 'ACT-1003',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    type: 'status',
    message: 'ATM-KHI-003 went offline',
    actor: 'System',
  },
  {
    id: 'ACT-1004',
    timestamp: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
    type: 'alert',
    message: 'Warning: ATM-KHI-002 latency above threshold',
    actor: 'System',
  },
  {
    id: 'ACT-1005',
    timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    type: 'incident',
    message: 'INC-1042 assigned to Ahmed Khan',
    actor: 'Ops Manager',
  },
  {
    id: 'ACT-1006',
    timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    type: 'maintenance',
    message: 'ATM-ISB-001 preventive maintenance completed',
    actor: 'Sara Iqbal',
  },
  {
    id: 'ACT-1007',
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    type: 'cash',
    message: 'ATM-LHR-001 replenished — now at 62%',
    actor: 'Cash Ops',
  },
  {
    id: 'ACT-1008',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    type: 'alert',
    message: 'Info: ATM-KHI-004 maintenance scheduled in 5 days',
    actor: 'System',
  },
  {
    id: 'ACT-1009',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    type: 'status',
    message: 'ATM-ISB-002 card reader errors exceeded threshold',
    actor: 'System',
  },
  {
    id: 'ACT-1010',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    type: 'status',
    message: 'Daily reconciliation completed for all ATMs',
    actor: 'System',
  },
];