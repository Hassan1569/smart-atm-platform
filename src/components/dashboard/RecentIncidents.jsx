import { Link } from 'react-router-dom';
import { ChevronRight, AlertOctagon } from 'lucide-react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import EmptyState from '../common/EmptyState.jsx';
import Skeleton from '../common/Skeleton.jsx';
import { formatRelative } from '../../utils/formatters.js';
import { titleCase } from '../../utils/helpers.js';

const priorityMap = {
  critical: 'bg-red-500/10 text-red-700 dark:text-red-400 ring-red-500/20',
  high:     'bg-orange-500/10 text-orange-700 dark:text-orange-400 ring-orange-500/20',
  medium:   'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20',
  low:      'bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-slate-500/20',
};

export default function RecentIncidents({ incidents, loading }) {
  return (
    <Card
      title="Recent Incidents"
      actions={
        <Link
          to="/incidents"
          className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5"
        >
          View all <ChevronRight className="h-3 w-3" />
        </Link>
      }
      padding="none"
    >
      {loading ? (
        <div className="p-4 space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="line" height="14px" />
          ))}
        </div>
      ) : !incidents || incidents.length === 0 ? (
        <EmptyState icon={AlertOctagon} title="No incidents" description="Nothing open." />
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {incidents.map((i) => (
            <li key={i.id} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-slate-800 dark:text-slate-200 truncate">
                    {i.issue}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 mono">
                    {i.id} · {i.atmId} · {formatRelative(i.updatedAt)}
                  </p>
                </div>
                <Badge className={priorityMap[i.priority] ?? priorityMap.low}>
                  {titleCase(i.priority)}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}