import { CalendarClock, Wrench, CheckCircle2, XCircle } from 'lucide-react';
import Card from '../common/Card.jsx';

function Stat({ label, value, icon: Icon, tone }) {
  const toneMap = {
    sky:     'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    amber:   'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    slate:   'bg-slate-500/10 text-slate-600 dark:text-slate-400',
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

export default function MaintenanceSummaryCards({ summary }) {
  if (!summary) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat label="Scheduled"   value={summary.scheduled}  icon={CalendarClock} tone="sky" />
      <Stat label="In Progress" value={summary.inProgress} icon={Wrench}        tone="amber" />
      <Stat label="Completed"   value={summary.completed}  icon={CheckCircle2}  tone="emerald" />
      <Stat label="Cancelled"   value={summary.cancelled}  icon={XCircle}       tone="slate" />
    </div>
  );
}