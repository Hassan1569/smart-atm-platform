import { Link } from 'react-router-dom';
import { Banknote } from 'lucide-react';
import Card from '../common/Card.jsx';
import EmptyState from '../common/EmptyState.jsx';
import { formatCurrency, formatRelative } from '../../utils/formatters.js';

export default function ReplenishmentHistory({ items }) {
  return (
    <Card
      title="Recent Replenishments"
      subtitle="Last 20 entries"
      padding="none"
    >
      {!items || items.length === 0 ? (
        <EmptyState icon={Banknote} title="No replenishments recorded" />
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[480px] overflow-y-auto">
          {items.map((r) => (
            <li key={r.id} className="px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      to={`/atms/${r.atmId}`}
                      className="mono text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {r.atmId}
                    </Link>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 mono">
                      {r.id}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                    {r.note}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {r.technician} · {formatRelative(r.ts)}
                  </p>
                </div>
                <span className="text-xs font-semibold font-heading tabular-nums text-emerald-600 dark:text-emerald-400 shrink-0">
                  +{formatCurrency(r.amount, 'PKR')}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}