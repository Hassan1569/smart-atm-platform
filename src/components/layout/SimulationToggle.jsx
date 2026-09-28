import { Activity } from 'lucide-react';
import { useSimulation } from '../../hooks/useSimulation.js';

export default function SimulationToggle() {
  const { enabled, toggle, tick } = useSimulation();

  return (
    <button
      onClick={toggle}
      className={[
        'hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium',
        'border transition-colors',
        enabled
          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
          : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
      ].join(' ')}
      title={enabled ? 'Simulation running — click to stop' : 'Simulation paused — click to start'}
      aria-pressed={enabled}
    >
      <Activity className="h-3.5 w-3.5" aria-hidden="true" />
      <span>
        {enabled ? (
          <>
            <span className="relative inline-flex h-1.5 w-1.5 mr-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live · tick {tick}
          </>
        ) : (
          'Simulation: off'
        )}
      </span>
    </button>
  );
}