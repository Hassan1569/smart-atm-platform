import Badge from '../common/Badge.jsx';
import { ALERT_STATUS } from '../../utils/constants.js';
import { titleCase } from '../../utils/helpers.js';

const STATUS_CLASSES = {
  [ALERT_STATUS.DETECTED]:       'bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-slate-500/20',
  [ALERT_STATUS.ACKNOWLEDGED]:   'bg-sky-500/10 text-sky-700 dark:text-sky-400 ring-sky-500/20',
  [ALERT_STATUS.ASSIGNED]:       'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 ring-indigo-500/20',
  [ALERT_STATUS.INVESTIGATING]:  'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20',
  [ALERT_STATUS.RESOLVED]:       'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20',
};

export default function AlertStatusBadge({ status }) {
  return (
    <Badge className={STATUS_CLASSES[status] ?? STATUS_CLASSES[ALERT_STATUS.DETECTED]}>
      {titleCase(status)}
    </Badge>
  );
}