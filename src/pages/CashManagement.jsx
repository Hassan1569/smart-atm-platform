import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Search, Building2, ArrowUpDown } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import Input from '../components/common/Input.jsx';
import Select from '../components/common/Select.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

import CashSummaryCard from '../components/cash/CashSummaryCard.jsx';
import CassetteLevelBar from '../components/cash/CassetteLevelBar.jsx';
import ReplenishmentHistory from '../components/cash/ReplenishmentHistory.jsx';

import { useCash } from '../hooks/useCash.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { formatDate, formatRelative } from '../utils/formatters.js';

const SORT_OPTIONS = [
  { value: 'utilization-asc',  label: 'Utilization: low → high' },
  { value: 'utilization-desc', label: 'Utilization: high → low' },
  { value: 'atmId-asc',        label: 'ATM ID: A → Z' },
];

export default function CashManagement() {
  const cash = useCash();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('utilization-asc');

  const debouncedSearch = useDebounce(search, 250);

  const rows = useMemo(() => {
    if (!cash.data?.rows) return [];
    const q = debouncedSearch.trim().toLowerCase();

    let filtered = cash.data.rows.filter((r) => {
      if (!q) return true;
      return r.atmId.toLowerCase().includes(q);
    });

    filtered = [...filtered].sort((a, b) => {
      switch (sortKey) {
        case 'utilization-desc':
          return b.utilization - a.utilization;
        case 'atmId-asc':
          return a.atmId.localeCompare(b.atmId);
        case 'utilization-asc':
        default:
          return a.utilization - b.utilization;
      }
    });

    return filtered;
  }, [cash.data, debouncedSearch, sortKey]);

  return (
    <>
      <PageHeader
        title="Cash Management"
        description="Fleet cash utilization, cassette levels, and replenishment."
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={cash.refetch}
            disabled={cash.loading}
          >
            Refresh
          </Button>
        }
      />

      {/* Summary */}
      <div className="mb-4">
        {cash.loading && !cash.data ? (
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
          <CashSummaryCard summary={cash.data?.summary} />
        )}
      </div>

      {/* Error */}
      {cash.error && !cash.loading && (
        <Card>
          <ErrorState
            title="Failed to load cash data"
            description={cash.error.message}
            onRetry={cash.refetch}
          />
        </Card>
      )}

      {/* Loading */}
      {cash.loading && !cash.data && (
        <Card padding="md">
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} variant="line" height="16px" />
            ))}
          </div>
        </Card>
      )}

      {cash.data && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Left: per-ATM cassette cards */}
          <div className="xl:col-span-2 space-y-4">
            {/* Filters */}
            <Card padding="md">
              <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                <div className="flex-1 min-w-0">
                  <Input
                    label="Filter by ATM ID"
                    placeholder="e.g. ATM-KHI-001"
                    icon={Search}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="sm:w-[260px]">
                  <Select
                    label="Sort"
                    value={sortKey}
                    options={SORT_OPTIONS}
                    onChange={(e) => setSortKey(e.target.value)}
                  />
                </div>
              </div>
            </Card>

            {rows.length === 0 ? (
              <Card>
                <EmptyState
                  icon={Building2}
                  title="No ATMs match"
                  description="Adjust your search."
                />
              </Card>
            ) : (
              rows.map((r) => (
                <Card
                  key={r.atmId}
                  title={r.atmId}
                  subtitle={`Last replenished ${formatRelative(r.lastReplenishment)} · Next ${r.nextReplenishment ? formatDate(r.nextReplenishment) : '—'}`}
                  actions={
                    <Link
                      to={`/atms/${r.atmId}`}
                      className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View ATM
                    </Link>
                  }
                  padding="md"
                >
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <Mini label="Utilization" value={`${r.utilization}%`} />
                    <Mini label="Loaded"      value={r.loaded.toLocaleString()} />
                    <Mini label="Capacity"    value={r.capacity.toLocaleString()} />
                  </div>
                  <div className="space-y-3">
                    {r.cassettes.map((c) => (
                      <CassetteLevelBar
                        key={c.name}
                        cassette={c}
                        currency={r.currency}
                      />
                    ))}
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Right: replenishment history */}
          <div className="space-y-4">
            <ReplenishmentHistory items={cash.data.replenishments} />
          </div>
        </div>
      )}
    </>
  );
}

function Mini({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold font-heading tabular-nums text-slate-900 dark:text-slate-100 truncate">
        {value}
      </p>
    </div>
  );
}