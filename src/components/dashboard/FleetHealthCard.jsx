import Card from '../common/Card.jsx';

export default function FleetHealthCard({ summary }) {
  if (!summary) return null;
  const { avgHealth, avgCash } = summary;

  const barColor = (v) => {
    if (v >= 85) return 'bg-emerald-500';
    if (v >= 60) return 'bg-amber-500';
    if (v >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Card title="Fleet Averages" subtitle="Health and cash across the fleet">
      <div className="space-y-5 py-1">
        <Meter label="Avg. Health" value={avgHealth} barColor={barColor(avgHealth)} />
        <Meter label="Avg. Cash"   value={avgCash}   barColor={barColor(avgCash)} />
      </div>
    </Card>
  );
}

function Meter({ label, value, barColor }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
          {label}
        </span>
        <span className="text-sm font-semibold tabular-nums text-slate-900 dark:text-slate-100">
          {value}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-300`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}