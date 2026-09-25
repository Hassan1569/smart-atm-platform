import StatusDot from '../common/StatusDot.jsx';
import HealthBar from './HealthBar.jsx';
import { formatRelative } from '../../utils/formatters.js';
import { titleCase } from '../../utils/helpers.js';

export default function DeviceCard({ device }) {
  const isBad = device.status === 'failed' || device.status === 'offline';

  return (
    <div
      className={[
        'rounded-lg border p-3 transition-colors',
        isBad
          ? 'border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/10'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
          {device.name}
        </p>
        <StatusDot status={device.status} />
      </div>

      <div className="mt-2">
        <HealthBar value={device.health} />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">
          {titleCase(device.status)}
        </span>
        <span className="text-slate-400 dark:text-slate-500">
          {formatRelative(device.lastChecked)}
        </span>
      </div>

      {device.error && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400 line-clamp-2">
          {device.error}
        </p>
      )}
    </div>
  );
}