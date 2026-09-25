import { Activity, RefreshCw, Wifi, WifiOff, Clock, AlertTriangle } from 'lucide-react';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';
import StatusDot from '../common/StatusDot.jsx';
import Skeleton from '../common/Skeleton.jsx';
import LatencySparkline from './LatencySparkline.jsx';
import { formatRelative, formatTime } from '../../utils/formatters.js';
import { useConnectivity } from '../../hooks/useConnectivity.js';

function Metric({ label, value, icon: Icon, tone = 'slate' }) {
  const toneMap = {
    emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
    amber:   'text-amber-600 dark:text-amber-400 bg-amber-500/10',
    red:     'text-red-600 dark:text-red-400 bg-red-500/10',
    sky:     'text-sky-600 dark:text-sky-400 bg-sky-500/10',
    slate:   'text-slate-600 dark:text-slate-400 bg-slate-500/10',
  };
  return (
    <div className="flex items-start gap-3">
      <div className={`shrink-0 p-2 rounded-md ${toneMap[tone]}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold font-heading tabular-nums text-slate-900 dark:text-slate-100">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ConnectivityPanel({ atmId }) {
  const { current, history, loading, error, refresh } = useConnectivity(atmId);

  if (error) {
    return (
      <Card title="Connectivity">
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to probe: {error.message}
        </p>
      </Card>
    );
  }

  if (loading && !current) {
    return (
      <Card title="Connectivity">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="line" height="40px" />
          ))}
        </div>
      </Card>
    );
  }

  if (!current) return null;

  const responding = current.status === 'responding';
  const latencyTone =
    current.latencyMs == null ? 'slate'
    : current.latencyMs < 100 ? 'emerald'
    : current.latencyMs < 400 ? 'amber'
    : 'red';

  const lossTone =
    current.packetLoss === 0 ? 'emerald'
    : current.packetLoss < 10 ? 'amber'
    : 'red';

  return (
    <div className="space-y-4">
      <Card
        title="Connectivity"
        subtitle={`Simulated ICMP probe — IP ${current.ip}`}
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={refresh}
            disabled={loading}
          >
            Ping now
          </Button>
        }
      >
        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <StatusDot
            status={responding ? 'online' : 'offline'}
            label={responding ? 'Responding' : 'Unreachable'}
            size="md"
          />
          <span className="text-xs text-slate-500 dark:text-slate-400">
            ·  Last checked {formatRelative(current.lastChecked)}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Metric
            label="Status"
            value={responding ? 'OK' : 'DOWN'}
            icon={responding ? Wifi : WifiOff}
            tone={responding ? 'emerald' : 'red'}
          />
          <Metric
            label="Latency"
            value={current.latencyMs != null ? `${current.latencyMs} ms` : '—'}
            icon={Activity}
            tone={latencyTone}
          />
          <Metric
            label="Packet Loss"
            value={`${current.packetLoss}%`}
            icon={AlertTriangle}
            tone={lossTone}
          />
          <Metric
            label="Last Online"
            value={formatRelative(current.lastOnline)}
            icon={Clock}
            tone="sky"
          />
        </div>
      </Card>

      <Card
        title="Latency — Last 10 Minutes"
        subtitle="Simulated series (30s interval)"
      >
        <LatencySparkline data={history} />
        <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500 mono">
          Latest sample: {formatTime(new Date().toISOString())}
        </p>
      </Card>

      <Card title="About this probe">
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          This is a <strong className="text-slate-700 dark:text-slate-300">simulated</strong> connectivity
          probe. The browser cannot perform real ICMP ping. In production, this
          panel would call a backend service that runs real probes from a
          monitoring node and returns the results over REST or WebSocket.
        </p>
      </Card>
    </div>
  );
}