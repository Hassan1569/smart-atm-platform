import { ArrowUp, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Table from '../common/Table.jsx';
import StatusDot from '../common/StatusDot.jsx';
import { formatRelative } from '../../utils/formatters.js';
import { titleCase } from '../../utils/helpers.js';

function HealthBar({ value }) {
  const color =
    value >= 85 ? 'bg-emerald-500'
    : value >= 60 ? 'bg-amber-500'
    : value >= 30 ? 'bg-orange-500'
    : 'bg-red-500';
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs tabular-nums text-slate-600 dark:text-slate-400 w-8 text-right">
        {value}%
      </span>
    </div>
  );
}

function SortHeader({ label, sortKey, current, onSort }) {
  const isActive = current.key === sortKey;
  const Icon = current.direction === 'asc' ? ArrowUp : ArrowDown;
  return (
    <button
      onClick={() => onSort(sortKey)}
      className="inline-flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200"
    >
      {label}
      {isActive && <Icon className="h-3 w-3" />}
    </button>
  );
}

export default function AtmTable({ rows, sort, onSort }) {
  const navigate = useNavigate();

  const columns = [
    {
      key: 'id',
      header: <SortHeader label="ATM ID" sortKey="id" current={sort} onSort={onSort} />,
      width: 'w-[140px]',
      render: (row) => (
        <span className="mono text-xs text-slate-700 dark:text-slate-300">{row.id}</span>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (row) => (
        <div className="min-w-0">
          <p className="text-sm text-slate-800 dark:text-slate-200 truncate">{row.location}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{row.city}</p>
        </div>
      ),
    },
    {
      key: 'bank',
      header: 'Bank',
      render: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-400">{row.bank}</span>
      ),
    },
    {
      key: 'vendor',
      header: 'Vendor',
      render: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-400">{row.vendor}</span>
      ),
    },
    {
      key: 'status',
      header: <SortHeader label="Status" sortKey="status" current={sort} onSort={onSort} />,
      render: (row) => <StatusDot status={row.status} label={titleCase(row.status)} />,
    },
    {
      key: 'health',
      header: <SortHeader label="Health" sortKey="health" current={sort} onSort={onSort} />,
      render: (row) => <HealthBar value={row.health} />,
    },
    {
      key: 'cash',
      header: <SortHeader label="Cash" sortKey="cash" current={sort} onSort={onSort} />,
      align: 'right',
      render: (row) => (
        <span className="text-xs tabular-nums text-slate-700 dark:text-slate-300">
          {row.cash}%
        </span>
      ),
    },
    {
      key: 'lastSeen',
      header: 'Last Seen',
      align: 'right',
      render: (row) => (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {formatRelative(row.lastSeen)}
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(r) => r.id}
      onRowClick={(r) => navigate(`/atms/${r.id}`)}
      emptyState="No ATMs match the current filters."
    />
  );
}