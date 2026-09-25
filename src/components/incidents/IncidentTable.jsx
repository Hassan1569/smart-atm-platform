import Table from '../common/Table.jsx';
import IncidentPriorityBadge from './IncidentPriorityBadge.jsx';
import IncidentStatusBadge from './IncidentStatusBadge.jsx';
import { formatRelative } from '../../utils/formatters.js';

export default function IncidentTable({ rows, onRowClick }) {
  const columns = [
    {
      key: 'id',
      header: 'Incident',
      width: 'w-[110px]',
      render: (r) => (
        <span className="mono text-xs text-slate-700 dark:text-slate-300">{r.id}</span>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      width: 'w-[110px]',
      render: (r) => <IncidentPriorityBadge priority={r.priority} />,
    },
    {
      key: 'issue',
      header: 'Issue',
      render: (r) => (
        <span className="text-sm text-slate-800 dark:text-slate-200 line-clamp-2">{r.issue}</span>
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
      render: (r) => <IncidentStatusBadge status={r.status} />,
    },
    {
      key: 'technician',
      header: 'Technician',
      width: 'w-[140px]',
      render: (r) =>
        r.technician && r.technician !== 'Unassigned' ? (
          <span className="text-xs text-slate-600 dark:text-slate-400">{r.technician}</span>
        ) : (
          <span className="text-xs text-slate-400 dark:text-slate-500">Unassigned</span>
        ),
    },
    {
      key: 'updatedAt',
      header: 'Updated',
      align: 'right',
      width: 'w-[110px]',
      render: (r) => (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {formatRelative(r.updatedAt)}
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
      emptyState="No incidents match the current filters."
    />
  );
}