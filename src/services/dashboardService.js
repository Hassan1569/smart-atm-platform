/**
 * dashboardService — composes data from other services for the Dashboard.
 */

import { getAtmSummary } from './atmService.js';
import { getAlertSummary } from './alertService.js';
import { getIncidentSummary } from './incidentService.js';

export async function getDashboardSummary() {
  const [atms, alerts, incidents] = await Promise.all([
    getAtmSummary(),
    getAlertSummary(),
    getIncidentSummary(),
  ]);

  return {
    atms,
    alerts,
    incidents,
    // Derived placeholders (real values in later phases)
    transactionVolume: 8421, // 24h
    networkHealth: 94,       // %
  };
}