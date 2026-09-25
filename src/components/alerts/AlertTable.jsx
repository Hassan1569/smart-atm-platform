import Table from '../common/Table.jsx';
import AlertSeverityBadge from './AlertSeverityBadge.jsx';
import AlertStatusBadge from './AlertStatusBadge.jsx';
import { formatRelative } from '../../utils/formatters.js';

export default function AlertTable({ rows, onRowClick }) {
  const columns = [
    {
      key: 'id',
      header: 'Alert',
      width: 'w-[110px]',
      render: (r) => (
        <span className="mono text-xs text-slate-700 dark:text-slate-300">{r.id}</span>
      ),
    },
    {
      key: 'severity',
      header: 'Severity',
      width: 'w-[120px]',
      render: (r) => <AlertSeverityBadge severity={r.severity} />,
    },
    {
      key: 'message',
      header: 'Message',
      render: (r) => (
        <span className="text-sm text-slate-800 dark:text-slate-200 line-clamp-2">
          {r.message}
        </span>
      ),
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
      key: 'status',
      header: 'Status',
      width: 'w-[140px]',
      render: (r) => <AlertStatusBadge status={r.status} />,
    },
    {
      key: 'assignee',
      header: 'Assignee',
      width: 'w-[140px]',
      render: (r) =>
        r.assignee ? (
          <span className="text-xs text-slate-600 dark:text-slate-400">{r.assignee}</span>
        ) : (
          <span className="text-xs text-slate-400 dark:text-slate-500">Unassigned</span>
        ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      align: 'right',
      width: 'w-[110px]',
      render: (r) => (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {formatRelative(r.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(r) => r.id}
      onRowClick={onRowClick}
      emptyState="No alerts match the current filters."
    />
  );
}