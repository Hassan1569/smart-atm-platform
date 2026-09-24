import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../common/Card.jsx';

const STATUS_COLORS = {
  online:   '#10b981',
  warning:  '#f59e0b',
  critical: '#ef4444',
  offline:  '#94a3b8',
};

const LABELS = {
  online: 'Online',
  warning: 'Warning',
  critical: 'Critical',
  offline: 'Offline',
};

export default function AtmStatusChart({ summary }) {
  if (!summary) return null;

  const data = [
    { name: 'online',   value: summary.online   },
    { name: 'warning',  value: summary.warning  },
    { name: 'critical', value: summary.critical },
    { name: 'offline',  value: summary.offline  },
  ].filter((d) => d.value > 0);

  return (
    <Card title="ATM Status Distribution" subtitle="Fleet-wide snapshot">
      <div className="h-56 flex items-center">
        <ResponsiveContainer width="60%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={45}
              outerRadius={75}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
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
              formatter={(v, n) => [`${v} ATMs`, LABELS[n]]}
            />
          </PieChart>
        </ResponsiveContainer>
        <ul className="flex-1 space-y-2 text-sm">
          {data.map((d) => (
            <li key={d.name} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: STATUS_COLORS[d.name] }}
                />
                <span className="text-slate-600 dark:text-slate-300">
                  {LABELS[d.name]}
                </span>
              </span>
              <span className="font-medium tabular-nums text-slate-900 dark:text-slate-100">
                {d.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}