/**
 * helpers.js
 * Pure utility functions. No React. No side effects.
 */

/**
 * Lightweight id generator.
 * NOTE: For prototype use only. Not cryptographically secure.
 */
export function uid(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Deep clone via structured clone fallback to JSON. */
export function deepClone(obj) {
  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(obj);
    } catch {
      /* fall through */
    }
  }
  return JSON.parse(JSON.stringify(obj));
}

/** Group array items by key function or property name. */
export function groupBy(arr, keyFnOrName) {
  const keyFn =
    typeof keyFnOrName === 'function'
      ? keyFnOrName
      : (item) => item?.[keyFnOrName];
  return arr.reduce((acc, item) => {
    const k = keyFn(item);
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

/** Sort array by property + direction. */
export function sortBy(arr, prop, direction = 'asc') {
  const dir = direction === 'desc' ? -1 : 1;
  return [...arr].sort((a, b) => {
    const av = a?.[prop];
    const bv = b?.[prop];
    if (av == null) return 1;
    if (bv == null) return -1;
    if (av < bv) return -1 * dir;
    if (av > bv) return 1 * dir;
    return 0;
  });
}

/** Simple debounce factory. */
export function debounce(fn, wait = 300) {
  let t;
  return function debounced(...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

/** Clamp a number between min and max. */
export function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

/** Random integer in [min, max] inclusive. */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Random float in [min, max]. */
export function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/** Pick a random element from an array. */
export function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Simple sleep helper (Promise-based). */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Returns true if value is a non-empty array. */
export function hasItems(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

/**
 * titleCase — 'hello-world_test' → 'Hello World Test'
 */
export function titleCase(str) {
  if (!str) return '';
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}