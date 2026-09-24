import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../common/Card.jsx';
import { formatCompact } from '../../utils/formatters.js';

// Static 12h sparkline data (Phase 11 will make this real)
const DATA = Array.from({ length: 12 }, (_, i) => ({
  hour: `${i * 2}:00`,
  value: 300 + Math.round(200 * Math.sin(i / 2) + Math.random() * 120),
}));

export default function TransactionVolumeCard({ volume = 0 }) {
  return (
    <Card
      title="Transaction Volume"
      subtitle="Last 24 hours"
      actions={
        <span className="text-sm font-semibold font-heading tabular-nums text-slate-900 dark:text-slate-100">
          {formatCompact(volume)}
        </span>
      }
    >
      <div className="h-40 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="txnFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: 8,
                fontSize: 12,
                color: '#f1f5f9',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#txnFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}