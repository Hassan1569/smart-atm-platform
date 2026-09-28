import { useEffect } from 'react';
import * as simulation from '../services/simulationService.js';

/**
 * Subscribe to a simulation event.
 * @example
 *   useSimulationEvent('atm:status', (payload) => console.log(payload));
 */
export function useSimulationEvent(event, handler) {
  useEffect(() => {
    if (!event || typeof handler !== 'function') return;
    const unsub = simulation.on(event, handler);
    return () => unsub();
  }, [event, handler]);
}