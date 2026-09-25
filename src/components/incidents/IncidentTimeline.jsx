import { CheckCircle2 } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters.js';

export default function IncidentTimeline({ timeline = [] }) {
  if (!timeline.length) {
    return <p className="text-xs text-slate-500 dark:text-slate-400">No timeline events yet.</p>;
  }

  return (
    <ol className="relative space-y-4 pl-6">
      <span
        className="absolute left-[9px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-800"
        aria-hidden="true"
      />
      {timeline.map((entry, idx) => (
        <li key={idx} className="relative">
          <span className="absolute -left-6 top-1 h-[18px] w-[18px] rounded-full bg-emerald-500/15 flex items-center justify-center">
            <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
          </span>
          <div>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {entry.event}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {entry.actor} · {formatDateTime(entry.ts)}
            </p>
            {entry.note && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 italic">
                {entry.note}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}