import Badge from '../common/Badge.jsx';
import { titleCase } from '../../utils/helpers.js';

const STATUS_CLASSES = {
  scheduled:   'bg-sky-500/10 text-sky-700 dark:text-sky-400 ring-sky-500/20',
  in_progress: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20',
  completed:   'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20',
  cancelled:   'bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-slate-500/20',
};

const TYPE_CLASSES = {
  Preventive:         'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 ring-indigo-500/20',
  Corrective:         'bg-red-500/10 text-red-700 dark:text-red-400 ring-red-500/20',
  Firmware:           'bg-violet-500/10 text-violet-700 dark:text-violet-400 ring-violet-500/20',
  'Cash Replenishment':'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20',
};

export function MaintenanceStatusBadge({ status }) {
  return (
    <Badge className={STATUS_CLASSES[status] ?? STATUS_CLASSES.scheduled}>
      {titleCase(status.replace('_', ' '))}
    </Badge>
  );
}

export function MaintenanceTypeBadge({ type }) {
  return (
    <Badge className={TYPE_CLASSES[type] ?? TYPE_CLASSES.Preventive}>
      {type}
    </Badge>
  );
}