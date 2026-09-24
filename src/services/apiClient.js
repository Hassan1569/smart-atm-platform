/**
 * apiClient — simulated async boundary.
 * All services go through this. Swap internals with real fetch later
 * without touching any component.
 */

import { sleep } from '../utils/helpers.js';

const MIN_LATENCY = 120;
const MAX_LATENCY = 320;

/** Simulated network latency. */
async function latency() {
  const ms = MIN_LATENCY + Math.random() * (MAX_LATENCY - MIN_LATENCY);
  await sleep(ms);
}

/** Simulated failure rate (0 = off, 1 = always fail). */
let failureRate = 0;
export function setFailureRate(rate) {
  failureRate = Math.max(0, Math.min(1, rate));
}

async function maybeFail() {
  if (failureRate > 0 && Math.random() < failureRate) {
    throw new Error('Simulated network error');
  }
}

/** Simulated read — returns a deep-cloned copy of the dataset. */
export async function get(loader) {
  await latency();
  await maybeFail();
  const data = loader();
  return structuredClone(data);
}

/** Simulated write — returns the mutated payload. */
export async function post(payload) {
  await latency();
  await maybeFail();
  return payload;
}

/** Simulated update — returns the mutated payload. */
export async function patch(payload) {
  await latency();
  await maybeFail();
  return payload;
}

/** Simulated delete. */
export async function del(id) {
  await latency();
  await maybeFail();
  return { id };
}