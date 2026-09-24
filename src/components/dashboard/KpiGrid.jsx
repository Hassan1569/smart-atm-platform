import {
  Building2,
  Wifi,
  AlertTriangle,
  WifiOff,
  HeartPulse,
  Banknote,
  AlertOctagon,
  ArrowLeftRight,
} from 'lucide-react';
import KpiCard from './KpiCard.jsx';

export default function KpiGrid({ summary }) {
  if (!summary) return null;
  const { atms, alerts, incidents, transactionVolume } = summary;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        label="Total ATMs"
        value={atms.total}
        hint={`${atms.online} online`}
        icon={Building2}
        tone="indigo"
      />
      <KpiCard
        label="Online"
        value={atms.online}
        hint={`${Math.round((atms.online / atms.total) * 100)}% of fleet`}
        icon={Wifi}
        tone="emerald"
      />
      <KpiCard
        label="Warning"
        value={atms.warning}
        hint="Degraded performance"
        icon={AlertTriangle}
        tone="amber"
      />
      <KpiCard
        label="Offline / Critical"
        value={atms.offline + atms.critical}
        hint={`${atms.critical} critical · ${atms.offline} offline`}
        icon={WifiOff}
        tone="red"
      />
      <KpiCard
        label="Fleet Health"
        value={`${atms.avgHealth}%`}
        hint="Average across all ATMs"
        icon={HeartPulse}
        tone="emerald"
      />
      <KpiCard
        label="Low Cash"
        value={atms.lowCash}
        hint="Below 25% capacity"
        icon={Banknote}
        tone="amber"
      />
      <KpiCard
        label="Open Incidents"
        value={incidents.open}
        hint={`${incidents.critical} critical`}
        icon={AlertOctagon}
        tone="red"
      />
      <KpiCard
        label="Transactions (24h)"
        value={transactionVolume.toLocaleString()}
        hint="Withdrawals · Deposits · Balance"
        icon={ArrowLeftRight}
        tone="sky"
      />
    </div>
  );
}