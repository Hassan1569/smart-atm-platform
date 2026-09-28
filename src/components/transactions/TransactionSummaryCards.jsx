import { ArrowLeftRight, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import Card from '../common/Card.jsx';
import { formatCompact, formatCurrency } from '../../utils/formatters.js';

function Stat({ label, value, hint, icon: Icon, tone }) {
  const toneMap = {
    indigo:  'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    red:     'bg-red-500/10 text-red-600 dark:text-red-400',
    sky:     'bg-sky-500/10 text-sky-600 dark:text-sky-400',
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

export default function TransactionSummaryCards({ summary }) {
  if (!summary) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat
        label="Total (24h)"
        value={formatCompact(summary.total)}
        hint={`${summary.period.from ? 'Last 24 hours' : ''}`}
        icon={ArrowLeftRight}
        tone="indigo"
      />
      <Stat
        label="Successful"
        value={formatCompact(summary.success)}
        hint={`${summary.successRate.toFixed(1)}% success rate`}
        icon={CheckCircle2}
        tone="emerald"
      />
      <Stat
        label="Failed"
        value={summary.failed}
        hint="Investigate failures"
        icon={XCircle}
        tone="red"
      />
      <Stat
        label="Total Amount"
        value={formatCurrency(summary.totalAmount, 'PKR')}
        hint="Sum of transaction value"
        icon={TrendingUp}
        tone="sky"
      />
    </div>
  );
}