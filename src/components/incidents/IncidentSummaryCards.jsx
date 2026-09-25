import { AlertOctagon, AlertCircle, CheckCircle2, Wrench } from 'lucide-react';
import Card from '../common/Card.jsx';

function Stat({ label, value, icon: Icon, tone }) {
  const toneMap = {
    red:     'bg-red-500/10 text-red-600 dark:text-red-400',
    amber:   'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    indigo:  'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  };
  return (
    <Card padding="md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-1 text-2xl font-bold font-heading tabular-nums text-slate-900 dark:text-slate-100">
            {value}
          </p>
        </div>
        <div className={`p-2 rounded-md ${toneMap[tone]}`}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
}

export default function IncidentSummaryCards({ summary }) {
  if (!summary) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat label="Total"    value={summary.total}    icon={Wrench}         tone="indigo" />
      <Stat label="Open"     value={summary.open}     icon={AlertOctagon}   tone="amber" />
      <Stat label="Critical" value={summary.critical} icon={AlertCircle}    tone="red" />
      <Stat label="Resolved" value={summary.resolved} icon={CheckCircle2}   tone="emerald" />
    </div>
  );
}