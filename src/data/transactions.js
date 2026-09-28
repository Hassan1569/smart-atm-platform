/**
 * Mock transaction data — aggregates + recent list.
 * All data is fictional.
 */

const now = Date.now();
const min = (m) => new Date(now - m * 60 * 1000).toISOString();
const hr = (h) => new Date(now - h * 60 * 60 * 1000).toISOString();

/** Hourly volume — 24 buckets (last 24 hours), with a realistic diurnal curve. */
export const HOURLY_VOLUME = Array.from({ length: 24 }, (_, i) => {
  // Peak around 10am and 6pm; low around 4am.
  const hourOfDay = (new Date().getHours() - 23 + i + 24) % 24;
  const base =
    hourOfDay >= 9 && hourOfDay <= 12 ? 180
    : hourOfDay >= 17 && hourOfDay <= 20 ? 165
    : hourOfDay >= 5 && hourOfDay <= 8 ? 90
    : hourOfDay >= 13 && hourOfDay <= 16 ? 130
    : 35;
  // Small deterministic jitter based on index
  const jitter = ((i * 37) % 23) - 11;
  return {
    hourLabel: `${String(hourOfDay).padStart(2, '0')}:00`,
    withdrawals: Math.max(0, Math.round(base * 0.55 + jitter)),
    deposits:    Math.max(0, Math.round(base * 0.28 + jitter / 2)),
    balance:     Math.max(0, Math.round(base * 0.17 + jitter / 3)),
  };
});

/** Type breakdown aggregate. */
export const TYPE_BREAKDOWN = [
  { type: 'Withdrawal', count: 5320, amount: 26_600_000 },
  { type: 'Deposit',    count: 2140, amount: 18_400_000 },
  { type: 'Balance',    count: 1890, amount: 0 },
  { type: 'Transfer',   count:  370, amount:  1_850_000 },
];

/** Success rate breakdown. */
export const SUCCESS_METRICS = {
  total: 9720,
  success: 9530,
  failed: 190,
  successRate: 98.05, // %
};

/** ATM-wise volume (top 6). */
export const ATM_VOLUME = [
  { atmId: 'ATM-KHI-004', count: 1240, successRate: 99.2 },
  { atmId: 'ATM-KHI-001', count: 1180, successRate: 98.7 },
  { atmId: 'ATM-ISB-001', count: 1050, successRate: 98.9 },
  { atmId: 'ATM-LHR-001', count:  980, successRate: 97.4 },
  { atmId: 'ATM-LHR-003', count:  870, successRate: 96.1 },
  { atmId: 'ATM-ISB-003', count:  760, successRate: 98.3 },
];

/** Recent transactions list (individual rows). */
const TXN_TYPES = ['Withdrawal', 'Deposit', 'Balance', 'Transfer'];
const STATUSES = ['success', 'success', 'success', 'success', 'success', 'failed'];
const ATMS = [
  'ATM-KHI-001', 'ATM-KHI-002', 'ATM-KHI-004',
  'ATM-LHR-001', 'ATM-LHR-002', 'ATM-LHR-003',
  'ATM-ISB-001', 'ATM-ISB-002', 'ATM-ISB-003',
  'ATM-PSH-001',
];

export const RECENT_TRANSACTIONS = Array.from({ length: 40 }, (_, i) => {
  const type = TXN_TYPES[i % TXN_TYPES.length];
  const status = STATUSES[(i * 7) % STATUSES.length];
  const atmId = ATMS[(i * 3) % ATMS.length];
  const amount = type === 'Balance' ? 0 : 5000 + ((i * 2573) % 45000);
  const ts = min(i * 4 + (i % 3));
  return {
    id: `TXN-${800000 + i}`,
    atmId,
    type,
    amount,
    status,
    ts,
  };
});

/** Helper timestamps for the summary tiles. */
export const PERIOD = {
  from: hr(24),
  to: min(0),
};