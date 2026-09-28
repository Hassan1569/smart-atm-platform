import { formatCurrency } from '../../utils/formatters.js';

export default function CassetteLevelBar({ cassette, currency = 'PKR' }) {
  const { name, level, capacity } = cassette;
  const amount = (level / 100) * capacity;

  const barColor =
    level >= 60 ? 'bg-emerald-500'
    : level >= 25 ? 'bg-amber-500'
    : level > 0 ? 'bg-orange-500'
    : 'bg-red-500';

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
            {name}
          </span>
        </div>
        <div className="flex items-baseline gap-2 shrink-0">
          <span className="text-xs mono tabular-nums text-slate-500 dark:text-slate-400">
            {formatCurrency(amount, currency)}
          </span>
          <span className="text-xs font-semibold tabular-nums text-slate-900 dark:text-slate-100 w-9 text-right">
            {level}%
          </span>
        </div>
      </div>
      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-300`}
          style={{ width: `${Math.max(0, Math.min(100, level))}%` }}
        />
      </div>
    </div>
  );
}