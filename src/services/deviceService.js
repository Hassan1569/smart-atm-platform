/**
 * deviceService — device data access.
 */

import { get } from './apiClient.js';
import { DEVICES } from '../data/devices.js';

export async function getAllDevices() {
  return get(() => DEVICES);
}

export async function getDevicesByAtm(atmId) {
  const all = await getAllDevices();
  return all.filter((d) => d.atmId === atmId);
}

export async function getDeviceSummaryByAtm(atmId) {
  const devices = await getDevicesByAtm(atmId);
  const total = devices.length;
  const ok = devices.filter((d) => d.status === 'ok').length;
  const warning = devices.filter((d) => d.status === 'warning').length;
  const failed = devices.filter((d) => d.status === 'failed').length;
  const offline = devices.filter((d) => d.status === 'offline').length;

  const avgHealth = total
    ? Math.round(devices.reduce((s, d) => s + d.health, 0) / total)
    : 0;

  return { total, ok, warning, failed, offline, avgHealth };
}

/**
 * Fleet-wide grouping: { atm: [...], 'cash-recycler': [...], 'network-system': [...] }
 */
export async function getDevicesByAtmGrouped(atmId) {
  const devices = await getDevicesByAtm(atmId);
  return devices.reduce((acc, d) => {
    if (!acc[d.group]) acc[d.group] = [];
    acc[d.group].push(d);
    return acc;
  }, {});
}