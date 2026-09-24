import { RefreshCw } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import Button from '../components/common/Button.jsx';
import ErrorState from '../components/common/ErrorState.jsx';

import KpiGrid from '../components/dashboard/KpiGrid.jsx';
import AtmStatusChart from '../components/dashboard/AtmStatusChart.jsx';
import FleetHealthCard from '../components/dashboard/FleetHealthCard.jsx';
import TransactionVolumeCard from '../components/dashboard/TransactionVolumeCard.jsx';
import RecentAlerts from '../components/dashboard/RecentAlerts.jsx';
import RecentIncidents from '../components/dashboard/RecentIncidents.jsx';
import ActivityFeed from '../components/dashboard/ActivityFeed.jsx';
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton.jsx';

import { useDashboard } from '../hooks/useDashboard.js';
import { useRecentAlerts } from '../hooks/useRecentAlerts.js';
import { useRecentIncidents } from '../hooks/useRecentIncidents.js';
import { useActivity } from '../hooks/useActivity.js';

export default function Dashboard() {
  const dashboard = useDashboard();
  const alerts = useRecentAlerts(5);
  const incidents = useRecentIncidents(5);
  const activity = useActivity(8);

  const anyError = dashboard.error || alerts.error || incidents.error || activity.error;
  const anyLoading =
    dashboard.loading || alerts.loading || incidents.loading || activity.loading;

  const handleRefresh = () => {
    dashboard.refetch();
    alerts.refetch();
    incidents.refetch();
    activity.refetch();
  };

  return (
    <>
      <PageHeader
        title="Operations Dashboard"
        description="Fleet-wide ATM health, cash, and incident summary."
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={handleRefresh}
            disabled={anyLoading}
          >
            Refresh
          </Button>
        }
      />

      {anyError && !anyLoading && (
        <ErrorState
          title="Failed to load dashboard data"
          description={anyError.message ?? 'Unexpected error'}
          onRetry={handleRefresh}
        />
      )}

      {anyLoading && !dashboard.data && <DashboardSkeleton />}

      {dashboard.data && (
        <div className="space-y-5">
          {/* KPI row */}
          <KpiGrid summary={dashboard.data} />

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <AtmStatusChart summary={dashboard.data.atms} />
            <FleetHealthCard summary={dashboard.data.atms} />
            <TransactionVolumeCard volume={dashboard.data.transactionVolume} />
          </div>

          {/* Lists row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <RecentAlerts alerts={alerts.data} loading={alerts.loading} />
            <RecentIncidents incidents={incidents.data} loading={incidents.loading} />
            <ActivityFeed items={activity.data} loading={activity.loading} />
          </div>
        </div>
      )}
    </>
  );
}