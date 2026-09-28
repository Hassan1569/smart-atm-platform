import { Banknote, Gauge, TrendingDown, Building2 } from 'lucide-react';
import Card from '../common/Card.jsx';
import { formatCompact, formatCurrency } from '../../utils/formatters.js';

function Stat({ label, value, hint, icon: Icon, tone }) {
  const toneMap = {
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    amber:   'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    red:     'bg-red-500/10 text-red-600 dark:text-red-400',
    indigo:  'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  };
  return (
    <Card padding="md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-1.5 text-2xl font-bold font-heading tabular-nums text-slate-900 dark:text-slate-100 truncate">
            {value}
          </p>
          {hint && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
          )}
        </div>
        <div className={`shrink-0 p-2 rounded-md ${toneMap[tone]}`}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
}

export default function CashSummaryCard({ summary }) {
  if (!summary) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat
        label="Total Loaded"
        value={formatCurrency(summary.totalLoaded, 'PKR')}
        hint={`Capacity ${formatCompact(summary.totalCapacity)}`}
        icon={Banknote}
        tone="emerald"
      />
      <Stat
        label="Utilization"
        value={`${summary.utilization}%`}
        hint="Loaded / capacity"
        icon={Gauge}
        tone={summary.utilization < 30 ? 'amber' : 'indigo'}
      />
      <Stat
        label="Low Cash ATMs"
        value={summary.lowCashAtms}
        hint="Below 25% capacity"
        icon={TrendingDown}
        tone={summary.lowCashAtms > 0 ? 'red' : 'emerald'}
      />
      <Stat
        label="ATMs Tracked"
        value={summary.atmCount}
        hint="In cash management"
        icon={Building2}
        tone="indigo"
      />
    </div>
  );
}