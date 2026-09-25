import Badge from '../common/Badge.jsx';
import { titleCase } from '../../utils/helpers.js';

const CLASSES = {
  critical: 'bg-red-500/10 text-red-700 dark:text-red-400 ring-red-500/20',
  high:     'bg-orange-500/10 text-orange-700 dark:text-orange-400 ring-orange-500/20',
  medium:   'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20',
  low:      'bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-slate-500/20',
};

export default function IncidentPriorityBadge({ priority }) {
  return (
    <Badge className={CLASSES[priority] ?? CLASSES.low}>
      {titleCase(priority)}
    </Badge>
  );
}