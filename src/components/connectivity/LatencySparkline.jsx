import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from 'recharts';

export default function LatencySparkline({ data }) {
  if (!data || data.length === 0) return null;

  const chartData = data.map((d, i) => ({
    i,
    latency: d.latencyMs ?? 0,
    label: new Date(d.ts).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));

  return (
    <div className="h-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="latencyFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0ea5e9" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis hide />
          <Tooltip
            contentStyle={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: 8,
              fontSize: 12,
              color: '#f1f5f9',
            }}
            formatter={(v) => [`${v} ms`, 'Latency']}
            labelFormatter={(_, payload) =>
              payload?.[0]?.payload?.label ?? ''
            }
          />
          <Area
            type="monotone"
            dataKey="latency"
            stroke="#0ea5e9"
            strokeWidth={1.5}
            fill="url(#latencyFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}