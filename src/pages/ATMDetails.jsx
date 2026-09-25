import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Cpu } from 'lucide-react';

import PageHeader from '../components/common/PageHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import StatusDot from '../components/common/StatusDot.jsx';
import Badge from '../components/common/Badge.jsx';

import AtmOverviewCard from '../components/atm/AtmOverviewCard.jsx';
import AtmIdentityCard from '../components/atm/AtmIdentityCard.jsx';
import AtmDetailsSkeleton from '../components/atm/AtmDetailsSkeleton.jsx';

import DeviceGroupSection from '../components/devices/DeviceGroupSection.jsx';

import { useAtm } from '../hooks/useAtm.js';
import { useAtmDevices } from '../hooks/useAtmDevices.js';
import { DEVICE_GROUP, DEVICE_GROUP_LABEL } from '../utils/constants.js';
import { titleCase } from '../utils/helpers.js';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'devices', label: 'System Health' },
  { id: 'cash', label: 'Cash' },
  { id: 'incidents', label: 'Incidents' },
];

export default function ATMDetails() {
  const { id } = useParams();
  const atm = useAtm(id);
  const devices = useAtmDevices(id);
  const [tab, setTab] = useState('overview');

  const handleRefresh = () => {
    atm.refetch();
    devices.refetch();
  };

  const loading = atm.loading || devices.loading;
  const error = atm.error;

  return (
    <>
      <div className="mb-3">
        <Link
          to="/atms"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to ATMs
        </Link>
      </div>

      <PageHeader
        title={atm.data ? `ATM ${atm.data.id}` : `ATM ${id}`}
        description={atm.data ? atm.data.location : 'Loading…'}
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={handleRefresh}
            disabled={loading}
          >
            Refresh
          </Button>
        }
      />

      {error && !loading && (
        <Card>
          <ErrorState
            title="Failed to load ATM"
            description={error.message}
            onRetry={handleRefresh}
          />
        </Card>
      )}

      {loading && !atm.data && <AtmDetailsSkeleton />}

      {atm.data && (
        <>
          {/* Tabs */}
          <div className="mb-4 border-b border-slate-200 dark:border-slate-800">
            <nav className="flex gap-1 -mb-px">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={[
                    'px-3 py-2 text-sm font-medium border-b-2 transition-colors',
                    tab === t.id
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
                  ].join(' ')}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>

          {tab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <AtmOverviewCard atm={atm.data} />
              </div>
              <AtmIdentityCard atm={atm.data} />
            </div>
          )}

          {tab === 'devices' && (
            <div className="space-y-6">
              {devices.loading && !devices.data && (
                <Card padding="md">
                  <EmptyState icon={Cpu} title="Loading devices…" />
                </Card>
              )}

              {devices.data && (
                <>
                  <DeviceGroupSection
                    title={DEVICE_GROUP_LABEL[DEVICE_GROUP.ATM]}
                    devices={devices.data[DEVICE_GROUP.ATM]}
                  />
                  <DeviceGroupSection
                    title={DEVICE_GROUP_LABEL[DEVICE_GROUP.CASH_RECYCLER]}
                    devices={devices.data[DEVICE_GROUP.CASH_RECYCLER]}
                  />
                  <DeviceGroupSection
                    title={DEVICE_GROUP_LABEL[DEVICE_GROUP.NETWORK_SYSTEM]}
                    devices={devices.data[DEVICE_GROUP.NETWORK_SYSTEM]}
                  />
                </>
              )}
            </div>
          )}

          {tab === 'cash' && (
            <Card title="Cash">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Detailed cassette breakdown coming in Phase 10.
                </p>
                <Badge className="bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 ring-indigo-500/20">
                  {atm.data.cash}% loaded
                </Badge>
              </div>
            </Card>
          )}

          {tab === 'incidents' && (
            <Card title="Incidents">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Incident history coming in Phase 9. Meanwhile, see the{' '}
                <Link to="/incidents" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  Incidents page
                </Link>
                .
              </p>
            </Card>
          )}
        </>
      )}
    </>
  );
}