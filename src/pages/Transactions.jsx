import { RefreshCw } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import ErrorState from '../components/common/ErrorState.jsx';

import TransactionSummaryCards from '../components/transactions/TransactionSummaryCards.jsx';
import HourlyVolumeChart from '../components/transactions/HourlyVolumeChart.jsx';
import TransactionTypeBreakdown from '../components/transactions/TransactionTypeBreakdown.jsx';
import RecentTransactionsTable from '../components/transactions/RecentTransactionsTable.jsx';

import { useTransactions } from '../hooks/useTransactions.js';
import { formatCompact } from '../utils/formatters.js';

export default function Transactions() {
  const txn = useTransactions();

  return (
    <>
      <PageHeader
        title="Transactions"
        description="Volume, success rate, and type breakdown across the fleet."
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={txn.refetch}
            disabled={txn.loading}
          >
            Refresh
          </Button>
        }
      />

      {/* Summary */}
      <div className="mb-4">
        {txn.loading && !txn.data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} padding="md">
                <Skeleton variant="line" height="10px" width="40%" />
                <div className="mt-2">
                  <Skeleton variant="line" height="24px" width="60%" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <TransactionSummaryCards summary={txn.data?.summary} />
        )}
      </div>

      {/* Error */}
      {txn.error && !txn.loading && (
        <Card>
          <ErrorState
            title="Failed to load transactions"
            description={txn.error.message}
            onRetry={txn.refetch}
          />
        </Card>
      )}

      {/* Loading */}
      {txn.loading && !txn.data && (
        <Card padding="md">
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} variant="line" height="16px" />
            ))}
          </div>
        </Card>
      )}

      {txn.data && (
        <div className="space-y-4">
          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <HourlyVolumeChart data={txn.data.hourly} />
            </div>
            <TransactionTypeBreakdown data={txn.data.breakdown} />
          </div>

          {/* Two-column: ATM volume + recent table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card title="Top ATMs by Volume" subtitle="Last 24 hours" padding="none">
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {txn.data.atmVolume.map((a) => (
                  <li
                    key={a.atmId}
                    className="px-4 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="mono text-xs text-indigo-600 dark:text-indigo-400 truncate">
                        {a.atmId}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {a.successRate.toFixed(1)}% success
                      </p>
                    </div>
                    <span className="text-sm font-semibold font-heading tabular-nums text-slate-900 dark:text-slate-100">
                      {formatCompact(a.count)}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="lg:col-span-2">
              <Card
                title="Recent Transactions"
                subtitle="Last 20"
                padding="none"
              >
                <RecentTransactionsTable rows={txn.data.recent} />
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
}