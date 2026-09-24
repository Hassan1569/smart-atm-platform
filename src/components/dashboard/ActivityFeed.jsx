import {
  Bell,
  AlertOctagon,
  Activity as ActivityIcon,
  Wrench,
  Banknote,
} from 'lucide-react';
import Card from '../common/Card.jsx';
import Skeleton from '../common/Skeleton.jsx';
import EmptyState from '../common/EmptyState.jsx';
import { formatRelative } from '../../utils/formatters.js';

const typeMap = {
  alert:       { icon: Bell,          color: 'text-red-500    bg-red-500/10'    },
  incident:    { icon: AlertOctagon,  color: 'text-orange-500 bg-orange-500/10' },
  status:      { icon: ActivityIcon,  color: 'text-sky-500    bg-sky-500/10'    },
  maintenance: { icon: Wrench,        color: 'text-indigo-500 bg-indigo-500/10' },
  cash:        { icon: Banknote,      color: 'text-emerald-500 bg-emerald-500/10' },
};

export default function ActivityFeed({ items, loading }) {
  return (
    <Card title="Activity Feed" subtitle="Latest platform events" padding="none">
      {loading ? (
        <div className="p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton variant="circle" width={28} height={28} />
              <div className="flex-1 space-y-1.5">
                <Skeleton variant="line" height="12px" />
                <Skeleton variant="line" height="10px" width="40%" />
              </div>
            </div>
          ))}
        </div>
      ) : !items || items.length === 0 ? (
        <EmptyState icon={ActivityIcon} title="No activity" />
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {items.map((a) => {
            const { icon: Icon, color } = typeMap[a.type] ?? typeMap.status;
            return (
              <li key={a.id} className="flex items-start gap-3 px-4 py-3">
                <div className={`shrink-0 p-1.5 rounded-md ${color}`}>
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-800 dark:text-slate-200">{a.message}</p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {a.actor} · {formatRelative(a.timestamp)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}