import Card from '../common/Card.jsx';
import StatusDot from '../common/StatusDot.jsx';
import { titleCase } from '../../utils/helpers.js';

function Metric({ label, value, suffix, tone = 'slate' }) {
  const toneMap = {
    emerald: 'text-emerald-600 dark:text-emerald-400',
    amber:   'text-amber-600 dark:text-amber-400',
    red:     'text-red-600 dark:text-red-400',
    slate:   'text-slate-900 dark:text-slate-100',
  };
  return (
    <div className="text-center">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className={`mt-1 text-3xl font-bold font-heading tabular-nums ${toneMap[tone]}`}>
        {value}
        {suffix && <span className="text-lg ml-0.5">{suffix}</span>}
      </p>
    </div>
  );
}

export default function AtmOverviewCard({ atm }) {
  if (!atm) return null;

  const healthTone =
    atm.health >= 85 ? 'emerald' : atm.health >= 60 ? 'amber' : 'red';

  const networkTone =
    atm.network === 'stable'   ? 'emerald'
    : atm.network === 'degraded' ? 'amber'
    : 'red';

  return (
    <Card title="Overview">
      <div className="grid grid-cols-3 gap-4 py-2">
        <Metric label="Health" value={atm.health} suffix="%" tone={healthTone} />
        <Metric label="Cash"   value={atm.cash}   suffix="%" tone={atm.cash < 25 ? 'red' : 'slate'} />
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Network
          </p>
          <div className="mt-2 flex justify-center">
            <StatusDot
              status={atm.network === 'stable' ? 'online' : atm.network === 'degraded' ? 'warning' : 'critical'}
              label={titleCase(atm.network)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}