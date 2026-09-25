import Table from '../common/Table.jsx';
import { MaintenanceStatusBadge, MaintenanceTypeBadge } from './MaintenanceBadges.jsx';
import { formatDate, formatRelative } from '../../utils/formatters.js';

export default function MaintenanceTable({ rows, showHistory = false }) {
  const columns = [
    {
      key: 'id',
      header: 'Job',
      width: 'w-[110px]',
      render: (r) => (
        <span className="mono text-xs text-slate-700 dark:text-slate-300">{r.id}</span>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      width: 'w-[150px]',
      render: (r) => <MaintenanceTypeBadge type={r.type} />,
    },
    {
      key: 'atmId',
      header: 'ATM',
      width: 'w-[130px]',
      render: (r) => (
        <span className="mono text-xs text-slate-600 dark:text-slate-400">{r.atmId}</span>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      render: (r) => (
        <span className="text-sm text-slate-800 dark:text-slate-200 line-clamp-2">
          {r.description}
        </span>
      ),
    },
    {
      key: 'technician',
      header: 'Technician',
      width: 'w-[140px]',
      render: (r) => (
        <span className="text-xs text-slate-600 dark:text-slate-400">{r.technician}</span>
      ),
    },
    {
      key: 'scheduledFor',
      header: showHistory ? 'Completed' : 'Scheduled For',
      width: 'w-[140px]',
      render: (r) => (
        <span className="text-xs text-slate-600 dark:text-slate-400">
          {showHistory && r.completedAt
            ? formatDate(r.completedAt)
            : formatDate(r.scheduledFor)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: 'w-[130px]',
      render: (r) => <MaintenanceStatusBadge status={r.status} />,
    },
  ];

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(r) => r.id}
      emptyState="No maintenance records."
    />
  );
}