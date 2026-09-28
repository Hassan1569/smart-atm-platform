import { useMemo } from 'react';
import { formatDateTime, formatCurrency } from '../../utils/formatters.js';
import EmptyState from '../common/EmptyState.jsx';
import { Table as TableIcon } from 'lucide-react';

/** Heuristic: format cell values based on column name. */
function renderCell(value, columnKey) {
  if (value == null || value === '—') {
    return <span className="text-slate-400 dark:text-slate-500">—</span>;
  }

  // Number formatting for "%" columns
  if (typeof value === 'number') {
    if (columnKey.includes('%')) return <span className="tabular-nums">{value}%</span>;
    if (columnKey.toLowerCase().includes('amount') || columnKey.toLowerCase().includes('loaded') || columnKey.toLowerCase().includes('capacity')) {
      return <span className="mono tabular-nums">{formatCurrency(value, 'PKR')}</span>;
    }
    return <span className="tabular-nums">{value.toLocaleString()}</span>;
  }

  // Date formatting for ISO strings
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return <span className="text-xs">{formatDateTime(value)}</span>;
  }

  // ID columns
  if (columnKey.toLowerCase().includes('id')) {
    return <span className="mono text-xs">{value}</span>;
  }

  return String(value);
}

export default function ReportTable({ columns, rows }) {
  const displayRows = useMemo(() => rows.slice(0, 100), [rows]);

  if (!columns || !rows || rows.length === 0) {
    return (
      <EmptyState
        icon={TableIcon}
        title="No data"
        description="This report has no rows."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800">
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayRows.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-slate-100 dark:border-slate-800/60"
            >
              {columns.map((col) => (
                <td
                  key={col}
                  className="px-3 py-2.5 text-slate-700 dark:text-slate-300 whitespace-nowrap"
                >
                  {renderCell(row[col], col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length > 100 && (
        <p className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
          Showing first 100 of {rows.length} rows. Use filters to narrow down.
        </p>
      )}
    </div>
  );
}