import { Link } from 'react-router-dom';
import Table from '../common/Table.jsx';
import Badge from '../common/Badge.jsx';
import { formatCurrency, formatRelative } from '../../utils/formatters.js';

const STATUS_CLASSES = {
  success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20',
  failed:  'bg-red-500/10 text-red-700 dark:text-red-400 ring-red-500/20',
  pending: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20',
};

export default function RecentTransactionsTable({ rows }) {
  const columns = [
    {
      key: 'id',
      header: 'Txn ID',
      width: 'w-[110px]',
      render: (r) => (
        <span className="mono text-xs text-slate-700 dark:text-slate-300">{r.id}</span>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      width: 'w-[130px]',
      render: (r) => (
        <span className="text-sm text-slate-800 dark:text-slate-200">{r.type}</span>
      ),
    },
    {
      key: 'atmId',
      header: 'ATM',
      width: 'w-[140px]',
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
      key: 'amount',
      header: 'Amount',
      align: 'right',
      width: 'w-[140px]',
      render: (r) =>
        r.amount > 0 ? (
          <span className="mono text-xs tabular-nums text-slate-700 dark:text-slate-300">
            {formatCurrency(r.amount, 'PKR')}
          </span>
        ) : (
          <span className="text-xs text-slate-400 dark:text-slate-500">—</span>
        ),
    },
    {
      key: 'status',
      header: 'Status',
      width: 'w-[110px]',
      render: (r) => (
        <Badge className={STATUS_CLASSES[r.status] ?? STATUS_CLASSES.pending}>
          {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'ts',
      header: 'When',
      align: 'right',
      width: 'w-[110px]',
      render: (r) => (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {formatRelative(r.ts)}
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(r) => r.id}
      emptyState="No recent transactions."
    />
  );
}