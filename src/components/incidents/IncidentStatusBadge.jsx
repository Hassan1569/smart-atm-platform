import Badge from '../common/Badge.jsx';
import { INCIDENT_STATUS } from '../../utils/constants.js';
import { titleCase } from '../../utils/helpers.js';

const CLASSES = {
  [INCIDENT_STATUS.DETECTED]:      'bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-slate-500/20',
  [INCIDENT_STATUS.ASSIGNED]:      'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 ring-indigo-500/20',
  [INCIDENT_STATUS.INVESTIGATING]: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 ring-sky-500/20',
  [INCIDENT_STATUS.REPAIR]:        'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20',
  [INCIDENT_STATUS.TESTING]:       'bg-violet-500/10 text-violet-700 dark:text-violet-400 ring-violet-500/20',
  [INCIDENT_STATUS.RESOLVED]:      'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20',
};

export default function IncidentStatusBadge({ status }) {
  return (
    <Badge className={CLASSES[status] ?? CLASSES[INCIDENT_STATUS.DETECTED]}>
      {titleCase(status)}
    </Badge>
  );
}