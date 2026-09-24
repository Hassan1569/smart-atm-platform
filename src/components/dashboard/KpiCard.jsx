import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from '../common/Card.jsx';

/**
 * KpiCard
 * Props:
 *  - label, value, hint
 *  - icon (component)
 *  - tone ('indigo' | 'emerald' | 'amber' | 'red' | 'sky' | 'slate')
 *  - trend ({ direction: 'up' | 'down', value: string })
 */
const toneMap = {
  indigo:  'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  amber:   'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  red:     'bg-red-500/10 text-red-600 dark:text-red-400',
  sky:     'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  slate:   'bg-slate-500/10 text-slate-600 dark:text-slate-400',
};

export default function KpiCard({ label, value, hint, icon: Icon, tone = 'indigo', trend }) {
  const TrendIcon = trend?.direction === 'up' ? ArrowUpRight : ArrowDownRight;
  const trendColor =
    trend?.direction === 'up'
      ? 'text-emerald-600 dark:text-emerald-400'
      : 'text-red-600 dark:text-red-400';

  return (
    <Card padding="md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-1.5 text-2xl font-bold font-heading tabular-nums text-slate-900 dark:text-slate-100">
            {value}
          </p>
          {hint && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
          )}
        </div>
        {Icon && (
          <div className={`shrink-0 p-2 rounded-md ${toneMap[tone]}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
        )}
      </div>
      {trend && (
        <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${trendColor}`}>
          <TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {trend.value}
        </div>
      )}
    </Card>
  );
}