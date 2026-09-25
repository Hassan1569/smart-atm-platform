export default function HealthBar({ value, showLabel = true }) {
  const color =
    value >= 85 ? 'bg-emerald-500'
    : value >= 60 ? 'bg-amber-500'
    : value >= 30 ? 'bg-orange-500'
    : 'bg-red-500';

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs tabular-nums text-slate-600 dark:text-slate-400 w-9 text-right">
          {value}%
        </span>
      )}
    </div>
  );
}