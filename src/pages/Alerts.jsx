import { useMemo, useState } from 'react';
import { RefreshCw, Bell, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

import AlertFilters from '../components/alerts/AlertFilters.jsx';
import AlertTable from '../components/alerts/AlertTable.jsx';
import AlertSummaryCards from '../components/alerts/AlertSummaryCards.jsx';
import AlertDetailsDrawer from '../components/alerts/AlertDetailsDrawer.jsx';
import AssignAlertDialog from '../components/alerts/AssignAlertDialog.jsx';
import ResolveAlertDialog from '../components/alerts/ResolveAlertDialog.jsx';

import { useAlerts } from '../hooks/useAlerts.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { ALERT_STATUS } from '../utils/constants.js';

const PAGE_SIZE = 8;

const DEFAULT_FILTERS = {
  search: '',
  severity: 'all',
  status: 'all',
  atmId: '',
  page: 1,
};

export default function Alerts() {
  const alerts = useAlerts();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // Drawer + dialogs
  const [selectedId, setSelectedId] = useState(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [resolveOpen, setResolveOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const debouncedSearch = useDebounce(filters.search, 250);
  const debouncedAtmId = useDebounce(filters.atmId, 250);

  const isFiltered =
    filters.search !== '' ||
    filters.severity !== 'all' ||
    filters.status !== 'all' ||
    filters.atmId !== '';

  const handleReset = () => setFilters(DEFAULT_FILTERS);

  // Derived: filtered + paginated
  const processed = useMemo(() => {
    if (!alerts.data) return { rows: [], total: 0 };

    const q = debouncedSearch.trim().toLowerCase();
    const atm = debouncedAtmId.trim().toLowerCase();

    const filtered = alerts.data
      .filter((a) => {
        if (filters.severity !== 'all' && a.severity !== filters.severity) return false;
        if (filters.status !== 'all' && a.status !== filters.status) return false;
        if (atm && !a.atmId.toLowerCase().includes(atm)) return false;
        if (q) {
          const hay = `${a.id} ${a.message} ${a.atmId} ${a.assignee ?? ''}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const total = filtered.length;
    const start = (filters.page - 1) * PAGE_SIZE;
    const rows = filtered.slice(start, start + PAGE_SIZE);
    return { rows, total };
  }, [alerts.data, debouncedSearch, debouncedAtmId, filters.severity, filters.status, filters.page]);

  // Derived: summary from the full dataset
  const summary = useMemo(() => {
    if (!alerts.data) return null;
    return {
      total: alerts.data.length,
      critical: alerts.data.filter((a) => a.severity === 'critical').length,
      warning: alerts.data.filter((a) => a.severity === 'warning').length,
      open: alerts.data.filter((a) => a.status !== ALERT_STATUS.RESOLVED).length,
    };
  }, [alerts.data]);

  const selectedAlert = alerts.data?.find((a) => a.id === selectedId) ?? null;

  const totalPages = Math.max(1, Math.ceil(processed.total / PAGE_SIZE));
  if (filters.page > totalPages) {
    setFilters((prev) => ({ ...prev, page: totalPages }));
  }

  // ----- Workflow handlers -----
  const handleAcknowledge = async (id) => {
    await alerts.acknowledge(id);
  };

  const handleInvestigate = async (id) => {
    await alerts.investigate(id);
  };

  const handleOpenAssign = (alert) => {
    setPendingAction(alert);
    setAssignOpen(true);
  };

  const handleConfirmAssign = async (assignee) => {
    if (!pendingAction) return;
    await alerts.assign(pendingAction.id, assignee);
    setAssignOpen(false);
    setPendingAction(null);
  };

  const handleOpenResolve = (alert) => {
    setPendingAction(alert);
    setResolveOpen(true);
  };

  const handleConfirmResolve = async (notes) => {
    if (!pendingAction) return;
    await alerts.resolve(pendingAction.id, notes);
    setResolveOpen(false);
    setPendingAction(null);
  };

  return (
    <>
      <PageHeader
        title="Alerts"
        description="Critical, warning, and informational alerts across the fleet."
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={alerts.refetch}
            disabled={alerts.loading}
          >
            Refresh
          </Button>
        }
      />

      {/* Summary */}
      <div className="mb-4">
        {alerts.loading && !alerts.data ? (
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
          <AlertSummaryCards summary={summary} />
        )}
      </div>

      {/* Filters */}
      <Card padding="md" className="mb-4">
        <AlertFilters
          filters={filters}
          setFilters={setFilters}
          onReset={handleReset}
          isFiltered={isFiltered}
        />
      </Card>

      {/* Error */}
      {alerts.error && !alerts.loading && (
        <Card>
          <ErrorState
            title="Failed to load alerts"
            description={alerts.error.message}
            onRetry={alerts.refetch}
          />
        </Card>
      )}

      {/* Loading (first load) */}
      {alerts.loading && !alerts.data && (
        <Card padding="md">
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} variant="line" height="16px" />
            ))}
          </div>
        </Card>
      )}

      {/* Table */}
      {alerts.data && (
        <Card padding="none">
          {processed.total === 0 ? (
            <EmptyState
              icon={Bell}
              title="No alerts found"
              description={
                isFiltered
                  ? 'Adjust your filters or search terms.'
                  : 'All clear. No active alerts.'
              }
            />
          ) : (
            <>
              <AlertTable
                rows={processed.rows}
                onRowClick={(row) => setSelectedId(row.id)}
              />
              <Pagination
                page={filters.page}
                pageSize={PAGE_SIZE}
                total={processed.total}
                onPageChange={(p) => setFilters((prev) => ({ ...prev, page: p }))}
              />
            </>
          )}
        </Card>
      )}

      {/* Drawer */}
      <AlertDetailsDrawer
        alert={selectedAlert}
        open={!!selectedAlert}
        onClose={() => setSelectedId(null)}
        onAcknowledge={handleAcknowledge}
        onAssign={handleOpenAssign}
        onInvestigate={handleInvestigate}
        onResolve={handleOpenResolve}
        mutating={alerts.mutating}
      />

      {/* Dialogs */}
      <AssignAlertDialog
        open={assignOpen}
        onClose={() => {
          setAssignOpen(false);
          setPendingAction(null);
        }}
        onConfirm={handleConfirmAssign}
        alert={pendingAction}
        loading={alerts.mutating}
      />

      <ResolveAlertDialog
        open={resolveOpen}
        onClose={() => {
          setResolveOpen(false);
          setPendingAction(null);
        }}
        onConfirm={handleConfirmResolve}
        alert={pendingAction}
        loading={alerts.mutating}
      />
    </>
  );
}