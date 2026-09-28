import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { STATUS_LABELS, STATUS_COLORS } from '../../utils/mapHelpers.js';
import { formatRelative, formatCurrency } from '../../utils/formatters.js';

export default function AtmMarkerPopup({ atm }) {
  return (
    <div className="min-w-[220px]">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: STATUS_COLORS[atm.status] }}
        />
        <span className="mono text-xs font-semibold text-slate-800 dark:text-slate-200">
          {atm.id}
        </span>
        <span className="ml-auto text-[11px] text-slate-500 dark:text-slate-400">
          {STATUS_LABELS[atm.status]}
        </span>
      </div>

      <p className="text-sm text-slate-700 dark:text-slate-300">{atm.location}</p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">{atm.city}</p>

      <dl className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <dt className="text-slate-500 dark:text-slate-400">Health</dt>
          <dd className="font-medium tabular-nums text-slate-800 dark:text-slate-200">
            {atm.health}%
          </dd>
        </div>
        <div>
          <dt className="text-slate-500 dark:text-slate-400">Cash</dt>
          <dd className="font-medium tabular-nums text-slate-800 dark:text-slate-200">
            {atm.cash}%
          </dd>
        </div>
        <div>
          <dt className="text-slate-500 dark:text-slate-400">Bank</dt>
          <dd className="text-slate-700 dark:text-slate-300 truncate">{atm.bank}</dd>
        </div>
        <div>
          <dt className="text-slate-500 dark:text-slate-400">Last seen</dt>
          <dd className="text-slate-700 dark:text-slate-300">
            {formatRelative(atm.lastSeen)}
          </dd>
        </div>
      </dl>

      <Link
        to={`/atms/${atm.id}`}
        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        Open details
        <ArrowUpRight className="h-3 w-3" />
      </Link>
    </div>
  );
}