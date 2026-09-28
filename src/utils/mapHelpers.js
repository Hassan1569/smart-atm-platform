/**
 * mapHelpers — marker icon + color helpers.
 */

import L from 'leaflet';
import { ATM_STATUS } from './constants.js';

export const STATUS_COLORS = {
  [ATM_STATUS.ONLINE]:   '#10b981', // emerald-500
  [ATM_STATUS.WARNING]:  '#f59e0b', // amber-500
  [ATM_STATUS.CRITICAL]: '#ef4444', // red-500
  [ATM_STATUS.OFFLINE]:  '#64748b', // slate-500
};

export const STATUS_LABELS = {
  [ATM_STATUS.ONLINE]:   'Online',
  [ATM_STATUS.WARNING]:  'Warning',
  [ATM_STATUS.CRITICAL]: 'Critical',
  [ATM_STATUS.OFFLINE]:  'Offline',
};

/**
 * Build a Leaflet divIcon — a colored dot marker.
 * Using divIcon avoids the classic Leaflet missing-icon issue in bundlers.
 */
export function buildMarkerIcon(status, isSelected = false) {
  const color = STATUS_COLORS[status] ?? STATUS_COLORS.offline;
  const size = isSelected ? 22 : 16;
  const ring = isSelected ? `box-shadow: 0 0 0 4px ${color}33, 0 0 0 8px ${color}22;` : '';
  const pulse =
    status === ATM_STATUS.CRITICAL && !isSelected
      ? 'animation: satmPulse 1.6s ease-out infinite;'
      : '';

  const html = `
    <div style="
      width:${size}px;
      height:${size}px;
      border-radius:50%;
      background:${color};
      border:2px solid #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      ${ring}
      ${pulse}
    "></div>
  `;

  return L.divIcon({
    html,
    className: 'satm-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

/** Build a Leaflet divIcon for clusters. */
export function buildClusterIcon(count, status) {
  const color = STATUS_COLORS[status] ?? STATUS_COLORS.offline;
  const size = Math.min(56, 28 + count * 2);
  const html = `
    <div style="
      width:${size}px;
      height:${size}px;
      border-radius:50%;
      background:${color};
      color:#ffffff;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:12px;
      font-weight:600;
      border:3px solid rgba(255,255,255,0.9);
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">${count}</div>
  `;
  return L.divIcon({
    html,
    className: 'satm-cluster',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}