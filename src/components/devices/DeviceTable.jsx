import { Link } from 'react-router-dom';
import Table from '../common/Table.jsx';
import StatusDot from '../common/StatusDot.jsx';
import HealthBar from './HealthBar.jsx';
import { formatRelative } from '../../utils/formatters.js';
import { titleCase } from '../../utils/helpers.js';
import { DEVICE_GROUP_LABEL } from '../../utils/constants.js';

export default function DeviceTable({ rows }) {
  const columns = [
    {
      key: 'name',
      header: 'Device',
      render: (r) => (
        <span className="text-sm text-slate-800 dark:text-slate-200">{r.name}</span>
      ),
    },
    {
      key: 'group',
      header: 'Group',
      render: (r) => (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {DEVICE_GROUP_LABEL[r.group] ?? r.group}
        </span>
      ),
    },
    {
      key: 'atmId',
      header: 'ATM',
      render: (r) => (
        <Link
          to={`/atms/${r.atmId}`}
          onClick={(e) => e.stopPropagation()}
          className="mono text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {r.atmId}
        </Link>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <StatusDot status={r.status} label={titleCase(r.status)} />,
    },
    {
      key: 'health',
      header: 'Health',
      render: (r) => <HealthBar value={r.health} />,
    },
    {
      key: 'lastChecked',
      header: 'Last Checked',
      align: 'right',
      render: (r) => (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {formatRelative(r.lastChecked)}
        </span>
      ),
    },
    {
      key: 'error',
      header: 'Error',
      render: (r) =>
        r.error ? (
          <span className="text-xs text-red-600 dark:text-red-400 truncate block max-w-[220px]">
            {r.error}
          </span>
        ) : (
          <span className="text-xs text-slate-400 dark:text-slate-500">—</span>
        ),
    },
  ];

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(r) => r.id}
      emptyState="No devices match the current filters."
    />
  );
}