import { Link } from 'react-router-dom';
import { ChevronRight, Bell } from 'lucide-react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import EmptyState from '../common/EmptyState.jsx';
import Skeleton from '../common/Skeleton.jsx';
import { statusBadge } from '../../utils/statusColors.js';
import { formatRelative } from '../../utils/formatters.js';
import { titleCase } from '../../utils/helpers.js';

export default function RecentAlerts({ alerts, loading }) {
  return (
    <Card
      title="Recent Alerts"
      actions={
        <Link
          to="/alerts"
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
      ) : !alerts || alerts.length === 0 ? (
        <EmptyState icon={Bell} title="No alerts" description="All clear." />
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {alerts.map((a) => (
            <li key={a.id} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-slate-800 dark:text-slate-200 truncate">
                    {a.message}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 mono">
                    {a.atmId} · {formatRelative(a.createdAt)}
                  </p>
                </div>
                <Badge className={statusBadge(a.severity)} dot>
                  {titleCase(a.severity)}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}