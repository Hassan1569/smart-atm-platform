/**
 * authService — SIMULATED authentication.
 *
 * ⚠️ This is NOT secure. Credentials are stored in plain text in
 * the mock data and the "session token" is a random string kept in
 * localStorage. Do not reuse this pattern for any real system.
 */

import { USERS } from '../data/users.js';
import { sleep, uid } from '../utils/helpers.js';
import { STORAGE_KEYS } from '../utils/constants.js';

const SESSION_KEY = STORAGE_KEYS.SESSION;

/** Simulate login. Returns { user, token } on success. */
export async function login(email, password) {
  await sleep(300 + Math.random() * 300);

  const user = USERS.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase().trim()
  );

  if (!user) {
    throw new Error('No account found with that email');
  }
  if (!user.active) {
    throw new Error('This account has been deactivated');
  }
  if (user.password !== password) {
    throw new Error('Incorrect password');
  }

  const token = uid('session');
  const session = {
    user: stripPassword(user),
    token,
    createdAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* ignore */
  }

  return session;
}

/** Read the current session from localStorage. Returns null if none. */
export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Clear session. */
export function logout() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

/** Remove the password field before returning user to the client. */
function stripPassword(user) {
  const { password, ...rest } = user;
  return rest;
}