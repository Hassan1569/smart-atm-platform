import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as simulation from '../services/simulationService.js';
import { getAtmsSnapshot } from '../services/atmService.js';
import {
  STORAGE_KEYS,
  SIMULATION_DEFAULT_INTERVAL_MS,
} from '../utils/constants.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

export const SimulationContext = createContext(null);

export function SimulationProvider({ children }) {
  const [enabled, setEnabled] = useLocalStorage(STORAGE_KEYS.SIMULATION, false);
  const [intervalMs, setIntervalMsState] = useState(
    SIMULATION_DEFAULT_INTERVAL_MS
  );
  const [tick, setTick] = useState(0);

  // Start / stop the engine when `enabled` changes
  useEffect(() => {
    if (enabled) {
      simulation.setIntervalMs(intervalMs);
      // Pass a sync getter — the service calls this every tick
      simulation.start(() => getAtmsSnapshot());
    } else {
      simulation.stop();
    }
    return () => simulation.stop();
  }, [enabled, intervalMs]);

  // Bump our tick counter on every simulation activity event
  useEffect(() => {
    const off = simulation.on('activity:new', () => setTick((t) => t + 1));
    return () => off();
  }, []);

  const toggle = useCallback(() => setEnabled((v) => !v), [setEnabled]);

  const setIntervalMs = useCallback((ms) => {
    setIntervalMsState(ms);
    simulation.setIntervalMs(ms);
  }, []);

  const value = useMemo(
    () => ({
      enabled: !!enabled,
      intervalMs,
      tick,
      toggle,
      setEnabled,
      setIntervalMs,
    }),
    [enabled, intervalMs, tick, toggle, setEnabled, setIntervalMs]
  );

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
}