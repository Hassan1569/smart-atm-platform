/**
 * activityService — activity feed access.
 */

import { get } from './apiClient.js';
import { ACTIVITY } from '../data/activity.js';

export async function getActivity(limit = 10) {
  const all = await get(() => ACTIVITY);
  return [...all]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);
}