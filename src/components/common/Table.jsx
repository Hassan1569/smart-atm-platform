/**
 * Table
 * Props:
 *  - columns: [{ key, header, align?, width?, render?(row) }]
 *  - rows: array
 *  - rowKey: (row, idx) => string
 *  - onRowClick?: (row) => void
 *  - emptyState?: ReactNode
 */
export default function Table({
  columns,
  rows,
  rowKey,
  onRowClick,
  emptyState,
}) {
  if (!rows || rows.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
        {emptyState ?? 'No records.'}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={[
                  'px-3 py-2.5 text-xs font-semibold uppercase tracking-wider',
                  'text-slate-500 dark:text-slate-400',
                  col.align === 'right' ? 'text-right' : 'text-left',
                  col.width ?? '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={rowKey ? rowKey(row, idx) : idx}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={[
                'border-b border-slate-100 dark:border-slate-800/60',
                onRowClick
                  ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={[
                    'px-3 py-3 text-slate-700 dark:text-slate-300',
                    col.align === 'right' ? 'text-right' : 'text-left',
                  ].join(' ')}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}