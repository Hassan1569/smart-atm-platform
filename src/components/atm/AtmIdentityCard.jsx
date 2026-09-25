import Card from '../common/Card.jsx';
import StatusDot from '../common/StatusDot.jsx';
import { formatDate, formatRelative } from '../../utils/formatters.js';
import { titleCase } from '../../utils/helpers.js';

function Row({ label, value, mono = false }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">
        {label}
      </span>
      <span
        className={[
          'text-xs text-right text-slate-800 dark:text-slate-200 truncate',
          mono ? 'mono' : '',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  );
}

export default function AtmIdentityCard({ atm }) {
  if (!atm) return null;

  return (
    <Card title="Identity & Location" subtitle={atm.id}>
      <div className="mb-3">
        <StatusDot
          status={atm.status}
          label={titleCase(atm.status)}
          size="md"
        />
      </div>

      <div>
        <Row label="Location" value={atm.location} />
        <Row label="City" value={atm.city} />
        <Row label="Bank" value={atm.bank} />
        <Row label="Vendor" value={atm.vendor} />
        <Row label="Model" value={atm.model} />
        <Row label="Type" value={atm.type} />
        <Row label="IP Address" value={atm.ip} mono />
        <Row label="Software" value={atm.swVersion} mono />
        <Row label="Firmware" value={atm.fwVersion} mono />
        <Row label="Installed" value={formatDate(atm.installDate)} />
        <Row label="Last Maintenance" value={formatDate(atm.lastMaintenance)} />
        <Row label="Last Seen" value={formatRelative(atm.lastSeen)} />
      </div>
    </Card>
  );
}