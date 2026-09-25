import { useMemo, useState } from 'react';
import { RefreshCw, Wrench, Search } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import Input from '../components/common/Input.jsx';
import Select from '../components/common/Select.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

import MaintenanceTable from '../components/maintenance/MaintenanceTable.jsx';
import MaintenanceSummaryCards from '../components/maintenance/MaintenanceSummaryCards.jsx';

import { useMaintenance } from '../hooks/useMaintenance.js';
import { useDebounce } from '../hooks/useDebounce.js';

const PAGE_SIZE = 8;

const TABS = [
  { id: 'all',         label: 'All' },
  { id: 'scheduled',   label: 'Scheduled' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'completed',   label: 'History' },
  { id: 'cancelled',   label: 'Cancelled' },
];

const STATUS_OPTIONS = [
  { value: 'all',         label: 'All statuses' },
  { value: 'scheduled',   label: 'Scheduled' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed',   label: 'Completed' },
  { value: 'cancelled',   label: 'Cancelled' },
];

export default function Maintenance() {
  const maintenance = useMaintenance();
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 250);

  const summary = useMemo(() => {
    if (!maintenance.data) return null;
    return {
      scheduled:  maintenance.data.filter((m) => m.status === 'scheduled').length,
      inProgress: maintenance.data.filter((m) => m.status === 'in_progress').length,
      completed:  maintenance.data.filter((m) => m.status === 'completed').length,
      cancelled:  maintenance.data.filter((m) => m.status === 'cancelled').length,
      total:      maintenance.data.length,
    };
  }, [maintenance.data]);

  const typeOptions = useMemo(() => {
    if (!maintenance.data) return [{ value: 'all', label: 'All types' }];
    const types = Array.from(new Set(maintenance.data.map((m) => m.type)));
    return [
      { value: 'all', label: 'All types' },
      ...types.map((t) => ({ value: t, label: t })),
    ];
  }, [maintenance.data]);

  const processed = useMemo(() => {
    if (!maintenance.data) return { rows: [], total: 0 };

    const q = debouncedSearch.trim().toLowerCase();

    let filtered = maintenance.data.filter((m) => {
      if (tab !== 'all' && m.status !== tab) return false;
      if (typeFilter !== 'all' && m.type !== typeFilter) return false;
      if (statusFilter !== 'all' && m.status !== statusFilter) return false;
      if (q) {
        const hay = `${m.id} ${m.description} ${m.atmId} ${m.technician}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    // Sort: in-progress first, then scheduled (ascending by date), then completed (desc), then cancelled
    const order = { in_progress: 0, scheduled: 1, completed: 2, cancelled: 3 };
    filtered = [...filtered].sort((a, b) => {
      const oa = order[a.status] ?? 9;
      const ob = order[b.status] ?? 9;
      if (oa !== ob) return oa - ob;
      const dateA = new Date(a.completedAt ?? a.scheduledFor).getTime();
      const dateB = new Date(b.completedAt ?? b.scheduledFor).getTime();
      return a.status === 'completed' ? dateB - dateA : dateA - dateB;
    });

    const total = filtered.length;
    const start = (page - 1) * PAGE_SIZE;
    const rows = filtered.slice(start, start + PAGE_SIZE);
    return { rows, total };
  }, [maintenance.data, tab, debouncedSearch, typeFilter, statusFilter, page]);

  const totalPages = Math.max(1, Math.ceil(processed.total / PAGE_SIZE));
  if (page > totalPages) setPage(totalPages);

  const showHistory = tab === 'completed';

  return (
    <>
      <PageHeader
        title="Maintenance"
        description="Scheduled maintenance and historical service records."
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={maintenance.refetch}
            disabled={maintenance.loading}
          >
            Refresh
          </Button>
        }
      />

      {/* Summary */}
      <div className="mb-4">
        {maintenance.loading && !maintenance.data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} padding="md">
                <Skeleton variant="line" height="10px" width="40%" />
                <div className="mt-2">
                  <Skeleton variant="line" height="24px" width="50%" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <MaintenanceSummaryCards summary={summary} />
        )}
      </div>

      {/* Filters */}
      <Card padding="md" className="mb-4">
        <div className="flex flex-col lg:flex-row lg:items-end gap-3">
          <div className="flex-1 min-w-0">
            <Input
              label="Search"
              placeholder="Job ID, description, ATM, technician…"
              icon={Search}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:w-[360px]">
            <Select
              label="Type"
              value={typeFilter}
              options={typeOptions}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
            />
            <Select
              label="Status"
              value={statusFilter}
              options={STATUS_OPTIONS}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="mb-4 border-b border-slate-200 dark:border-slate-800">
        <nav className="flex gap-1 -mb-px overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setPage(1);
              }}
              className={[
                'px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
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

      {/* Error */}
      {maintenance.error && !maintenance.loading && (
        <Card>
          <ErrorState
            title="Failed to load maintenance"
            description={maintenance.error.message}
            onRetry={maintenance.refetch}
          />
        </Card>
      )}

      {/* Loading */}
      {maintenance.loading && !maintenance.data && (
        <Card padding="md">
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} variant="line" height="16px" />
            ))}
          </div>
        </Card>
      )}

      {/* Table */}
      {maintenance.data && (
        <Card padding="none">
          {processed.total === 0 ? (
            <EmptyState
              icon={Wrench}
              title="No maintenance records"
              description="Adjust your filters or search terms."
            />
          ) : (
            <>
              <MaintenanceTable rows={processed.rows} showHistory={showHistory} />
              <Pagination
                page={page}
                pageSize={PAGE_SIZE}
                total={processed.total}
                onPageChange={setPage}
              />
            </>
          )}
        </Card>
      )}
    </>
  );
}