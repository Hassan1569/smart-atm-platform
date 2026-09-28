/**
 * Mock cash data — per-ATM cassettes + replenishment history.
 * All data is fictional. Currency: PKR (Pakistani Rupee).
 */

const now = Date.now();
const day = 24 * 60 * 60 * 1000;
const iso = (offsetDays) => new Date(now + offsetDays * day).toISOString();

// Per-ATM cash state.
// Each cassette has: name, level (%) and capacity (PKR).
// Total = sum of cassette level × capacity.
export const CASH_BY_ATM = {
  'ATM-KHI-001': {
    currency: 'PKR',
    cassettes: [
      { name: 'Cassette 1', level: 82, capacity: 2_000_000 },
      { name: 'Cassette 2', level: 76, capacity: 2_000_000 },
      { name: 'Cassette 3', level: 78, capacity: 2_000_000 },
      { name: 'Reject Bin', level: 12, capacity: 500_000 },
    ],
    lastReplenishment: iso(-3),
    nextReplenishment: iso(4),
  },
  'ATM-KHI-002': {
    currency: 'PKR',
    cassettes: [
      { name: 'Cassette 1', level: 18, capacity: 2_000_000 },
      { name: 'Cassette 2', level: 32, capacity: 2_000_000 },
      { name: 'Cassette 3', level: 51, capacity: 2_000_000 },
      { name: 'Reject Bin', level: 38, capacity: 500_000 },
    ],
    lastReplenishment: iso(-5),
    nextReplenishment: iso(1),
  },
  'ATM-KHI-003': {
    currency: 'PKR',
    cassettes: [
      { name: 'Cassette 1', level: 0, capacity: 2_000_000 },
      { name: 'Cassette 2', level: 0, capacity: 2_000_000 },
      { name: 'Cassette 3', level: 5, capacity: 2_000_000 },
      { name: 'Reject Bin', level: 0, capacity: 500_000 },
    ],
    lastReplenishment: iso(-14),
    nextReplenishment: null,
  },
  'ATM-KHI-004': {
    currency: 'PKR',
    cassettes: [
      { name: 'Cassette 1', level: 94, capacity: 2_000_000 },
      { name: 'Cassette 2', level: 92, capacity: 2_000_000 },
      { name: 'Cassette 3', level: 88, capacity: 2_000_000 },
      { name: 'Reject Bin', level: 8, capacity: 500_000 },
    ],
    lastReplenishment: iso(-1),
    nextReplenishment: iso(6),
  },
  'ATM-LHR-001': {
    currency: 'PKR',
    cassettes: [
      { name: 'Cassette 1', level: 68, capacity: 2_000_000 },
      { name: 'Cassette 2', level: 60, capacity: 2_000_000 },
      { name: 'Cassette 3', level: 58, capacity: 2_000_000 },
      { name: 'Reject Bin', level: 22, capacity: 500_000 },
    ],
    lastReplenishment: iso(-2),
    nextReplenishment: iso(3),
  },
  'ATM-LHR-002': {
    currency: 'PKR',
    cassettes: [
      { name: 'Cassette 1', level: 8, capacity: 2_000_000 },
      { name: 'Cassette 2', level: 0, capacity: 2_000_000 },
      { name: 'Cassette 3', level: 16, capacity: 2_000_000 },
      { name: 'Reject Bin', level: 72, capacity: 500_000 },
    ],
    lastReplenishment: iso(-9),
    nextReplenishment: iso(0),
  },
  'ATM-LHR-003': {
    currency: 'PKR',
    cassettes: [
      { name: 'Cassette 1', level: 58, capacity: 2_000_000 },
      { name: 'Cassette 2', level: 52, capacity: 2_000_000 },
      { name: 'Cassette 3', level: 54, capacity: 2_000_000 },
      { name: 'Reject Bin', level: 18, capacity: 500_000 },
    ],
    lastReplenishment: iso(-4),
    nextReplenishment: iso(3),
  },
  'ATM-ISB-001': {
    currency: 'PKR',
    cassettes: [
      { name: 'Cassette 1', level: 88, capacity: 2_000_000 },
      { name: 'Cassette 2', level: 82, capacity: 2_000_000 },
      { name: 'Cassette 3', level: 76, capacity: 2_000_000 },
      { name: 'Reject Bin', level: 14, capacity: 500_000 },
    ],
    lastReplenishment: iso(-1),
    nextReplenishment: iso(6),
  },
  'ATM-ISB-002': {
    currency: 'PKR',
    cassettes: [
      { name: 'Cassette 1', level: 22, capacity: 2_000_000 },
      { name: 'Cassette 2', level: 28, capacity: 2_000_000 },
      { name: 'Cassette 3', level: 38, capacity: 2_000_000 },
      { name: 'Reject Bin', level: 34, capacity: 500_000 },
    ],
    lastReplenishment: iso(-6),
    nextReplenishment: iso(1),
  },
  'ATM-ISB-003': {
    currency: 'PKR',
    cassettes: [
      { name: 'Cassette 1', level: 74, capacity: 2_000_000 },
      { name: 'Cassette 2', level: 68, capacity: 2_000_000 },
      { name: 'Cassette 3', level: 62, capacity: 2_000_000 },
      { name: 'Reject Bin', level: 20, capacity: 500_000 },
    ],
    lastReplenishment: iso(-3),
    nextReplenishment: iso(4),
  },
  'ATM-PSH-001': {
    currency: 'PKR',
    cassettes: [
      { name: 'Cassette 1', level: 54, capacity: 2_000_000 },
      { name: 'Cassette 2', level: 48, capacity: 2_000_000 },
      { name: 'Cassette 3', level: 42, capacity: 2_000_000 },
      { name: 'Reject Bin', level: 26, capacity: 500_000 },
    ],
    lastReplenishment: iso(-2),
    nextReplenishment: iso(4),
  },
  'ATM-PSH-002': {
    currency: 'PKR',
    cassettes: [
      { name: 'Cassette 1', level: 16, capacity: 2_000_000 },
      { name: 'Cassette 2', level: 22, capacity: 2_000_000 },
      { name: 'Cassette 3', level: 30, capacity: 2_000_000 },
      { name: 'Reject Bin', level: 68, capacity: 500_000 },
    ],
    lastReplenishment: iso(-7),
    nextReplenishment: iso(0),
  },
};

// Fleet-wide replenishment log (recent history).
export const REPLENISHMENTS = [
  { id: 'REP-4001', atmId: 'ATM-KHI-004', ts: iso(-1), amount: 5_600_000, technician: 'Ahmed Khan',  note: 'Routine replenishment' },
  { id: 'REP-4002', atmId: 'ATM-ISB-001', ts: iso(-1), amount: 4_900_000, technician: 'Hassan Raza', note: 'Routine replenishment' },
  { id: 'REP-4003', atmId: 'ATM-LHR-001', ts: iso(-2), amount: 3_700_000, technician: 'Bilal Ahmad', note: 'Routine replenishment' },
  { id: 'REP-4004', atmId: 'ATM-PSH-001', ts: iso(-2), amount: 2_800_000, technician: 'Usman Malik', note: 'Partial refill' },
  { id: 'REP-4005', atmId: 'ATM-KHI-001', ts: iso(-3), amount: 4_700_000, technician: 'Ahmed Khan',  note: 'Routine replenishment' },
  { id: 'REP-4006', atmId: 'ATM-ISB-003', ts: iso(-3), amount: 4_100_000, technician: 'Hassan Raza', note: 'Routine replenishment' },
  { id: 'REP-4007', atmId: 'ATM-LHR-003', ts: iso(-4), amount: 3_300_000, technician: 'Bilal Ahmad', note: 'Routine replenishment' },
  { id: 'REP-4008', atmId: 'ATM-KHI-002', ts: iso(-5), amount: 2_100_000, technician: 'Ahmed Khan',  note: 'Emergency top-up' },
  { id: 'REP-4009', atmId: 'ATM-ISB-002', ts: iso(-6), amount: 2_600_000, technician: 'Hassan Raza', note: 'Routine replenishment' },
  { id: 'REP-4010', atmId: 'ATM-PSH-002', ts: iso(-7), amount: 1_400_000, technician: 'Usman Malik', note: 'Emergency top-up' },
  { id: 'REP-4011', atmId: 'ATM-LHR-002', ts: iso(-9), amount: 1_800_000, technician: 'Bilal Ahmad', note: 'Partial refill (dispenser fault)' },
];