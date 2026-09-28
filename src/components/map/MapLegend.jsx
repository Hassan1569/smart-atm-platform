import { STATUS_COLORS, STATUS_LABELS } from '../../utils/mapHelpers.js';

export default function MapLegend({ counts }) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-3 py-2 shadow-sm">
      <ul className="flex items-center gap-4 text-xs">
        {Object.entries(STATUS_LABELS).map(([status, label]) => (
          <li key={status} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: STATUS_COLORS[status] }}
            />
            <span className="text-slate-600 dark:text-slate-400">
              {label}
              {counts?.[status] != null && (
                <span className="ml-1 text-slate-400 dark:text-slate-500 tabular-nums">
                  ({counts[status]})
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}