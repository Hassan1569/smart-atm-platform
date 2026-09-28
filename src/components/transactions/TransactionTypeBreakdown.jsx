import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../common/Card.jsx';
import { formatCompact, formatCurrency } from '../../utils/formatters.js';

const COLORS = {
  Withdrawal: '#6366f1',
  Deposit:    '#10b981',
  Balance:    '#0ea5e9',
  Transfer:   '#f59e0b',
};

export default function TransactionTypeBreakdown({ data }) {
  if (!data || data.length === 0) return null;

  const chartData = data.map((d) => ({ name: d.type, value: d.count }));

  return (
    <Card title="Type Breakdown" subtitle="Volume distribution">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-40 h-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={2}
                stroke="none"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: 8,
                  fontSize: 12,
                  color: '#f1f5f9',
                }}
                formatter={(v, n) => [`${v.toLocaleString()}`, n]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex-1 w-full space-y-2">
          {data.map((d) => (
            <li key={d.type} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ background: COLORS[d.type] }}
                />
                <span className="text-slate-700 dark:text-slate-300 truncate">
                  {d.type}
                </span>
              </span>
              <span className="flex items-center gap-3 shrink-0">
                {d.amount > 0 && (
                  <span className="text-xs mono text-slate-500 dark:text-slate-400">
                    {formatCurrency(d.amount, 'PKR')}
                  </span>
                )}
                <span className="font-medium tabular-nums text-slate-900 dark:text-slate-100 w-16 text-right">
                  {formatCompact(d.count)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}