import { useMemo, useState } from 'react';
import { RefreshCw, AlertOctagon } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

import IncidentFilters from '../components/incidents/IncidentFilters.jsx';
import IncidentTable from '../components/incidents/IncidentTable.jsx';
import IncidentSummaryCards from '../components/incidents/IncidentSummaryCards.jsx';
import IncidentDetailsDrawer from '../components/incidents/IncidentDetailsDrawer.jsx';
import AssignIncidentDialog from '../components/incidents/AssignIncidentDialog.jsx';
import ResolveIncidentDialog from '../components/incidents/ResolveIncidentDialog.jsx';

import { useIncidents } from '../hooks/useIncidents.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { INCIDENT_STATUS } from '../utils/constants.js';

const PAGE_SIZE = 8;

const DEFAULT_FILTERS = {
  search: '',
  priority: 'all',
  status: 'all',
  atmId: '',
  technician: '',
  page: 1,
};

export default function Incidents() {
  const incidents = useIncidents();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedId, setSelectedId] = useState(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [resolveOpen, setResolveOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const debouncedSearch = useDebounce(filters.search, 250);
  const debouncedAtmId = useDebounce(filters.atmId, 250);
  const debouncedTech = useDebounce(filters.technician, 250);

  const isFiltered =
    filters.search !== '' ||
    filters.priority !== 'all' ||
    filters.status !== 'all' ||
    filters.atmId !== '' ||
    filters.technician !== '';

  const handleReset = () => setFilters(DEFAULT_FILTERS);

  const processed = useMemo(() => {
    if (!incidents.data) return { rows: [], total: 0 };

    const q = debouncedSearch.trim().toLowerCase();
    const atm = debouncedAtmId.trim().toLowerCase();
    const tech = debouncedTech.trim().toLowerCase();

    const filtered = incidents.data
      .filter((i) => {
        if (filters.priority !== 'all' && i.priority !== filters.priority) return false;
        if (filters.status !== 'all' && i.status !== filters.status) return false;
        if (atm && !i.atmId.toLowerCase().includes(atm)) return false;
        if (tech && !(i.technician ?? '').toLowerCase().includes(tech)) return false;
        if (q) {
          const hay = `${i.id} ${i.issue} ${i.atmId} ${i.technician ?? ''}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    const total = filtered.length;
    const start = (filters.page - 1) * PAGE_SIZE;
    const rows = filtered.slice(start, start + PAGE_SIZE);
    return { rows, total };
  }, [
    incidents.data,
    debouncedSearch,
    debouncedAtmId,
    debouncedTech,
    filters.priority,
    filters.status,
    filters.page,
  ]);

  const summary = useMemo(() => {
    if (!incidents.data) return null;
    return {
      total: incidents.data.length,
      open: incidents.data.filter((i) => i.status !== INCIDENT_STATUS.RESOLVED).length,
      critical: incidents.data.filter((i) => i.priority === 'critical').length,
      resolved: incidents.data.filter((i) => i.status === INCIDENT_STATUS.RESOLVED).length,
    };
  }, [incidents.data]);

  const selectedIncident =
    incidents.data?.find((i) => i.id === selectedId) ?? null;

  const totalPages = Math.max(1, Math.ceil(processed.total / PAGE_SIZE));
  if (filters.page > totalPages) {
    setFilters((prev) => ({ ...prev, page: totalPages }));
  }

  // ----- Handlers -----
  const handleAdvance = async (id, nextStatus) => {
    await incidents.advance(id, nextStatus);
  };

  const handleComment = async (id, text) => {
    await incidents.comment(id, 'System Admin', text);
  };

  const handleOpenAssign = (inc) => {
    setPendingAction(inc);
    setAssignOpen(true);
  };

  const handleConfirmAssign = async (tech) => {
    if (!pendingAction) return;
    await incidents.assign(pendingAction.id, tech);
    setAssignOpen(false);
    setPendingAction(null);
  };

  const handleOpenResolve = (inc) => {
    setPendingAction(inc);
    setResolveOpen(true);
  };

  const handleConfirmResolve = async (notes) => {
    if (!pendingAction) return;
    await incidents.resolve(pendingAction.id, notes);
    setResolveOpen(false);
    setPendingAction(null);
  };

  return (
    <>
      <PageHeader
        title="Incidents"
        description="Track incident lifecycle, priorities, and technician assignments."
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={incidents.refetch}
            disabled={incidents.loading}
          >
            Refresh
          </Button>
        }
      />

      <div className="mb-4">
        {incidents.loading && !incidents.data ? (
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
          <IncidentSummaryCards summary={summary} />
        )}
      </div>

      <Card padding="md" className="mb-4">
        <IncidentFilters
          filters={filters}
          setFilters={setFilters}
          onReset={handleReset}
          isFiltered={isFiltered}
        />
      </Card>

      {incidents.error && !incidents.loading && (
        <Card>
          <ErrorState
            title="Failed to load incidents"
            description={incidents.error.message}
            onRetry={incidents.refetch}
          />
        </Card>
      )}

      {incidents.loading && !incidents.data && (
        <Card padding="md">
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} variant="line" height="16px" />
            ))}
          </div>
        </Card>
      )}

      {incidents.data && (
        <Card padding="none">
          {processed.total === 0 ? (
            <EmptyState
              icon={AlertOctagon}
              title="No incidents found"
              description={
                isFiltered ? 'Adjust your filters or search terms.' : 'No incidents reported.'
              }
            />
          ) : (
            <>
              <IncidentTable
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

      <IncidentDetailsDrawer
        incident={selectedIncident}
        open={!!selectedIncident}
        onClose={() => setSelectedId(null)}
        onAssign={handleOpenAssign}
        onAdvance={handleAdvance}
        onComment={handleComment}
        onResolve={handleOpenResolve}
        mutating={incidents.mutating}
      />

      <AssignIncidentDialog
        open={assignOpen}
        onClose={() => {
          setAssignOpen(false);
          setPendingAction(null);
        }}
        onConfirm={handleConfirmAssign}
        incident={pendingAction}
        loading={incidents.mutating}
      />

      <ResolveIncidentDialog
        open={resolveOpen}
        onClose={() => {
          setResolveOpen(false);
          setPendingAction(null);
        }}
        onConfirm={handleConfirmResolve}
        incident={pendingAction}
        loading={incidents.mutating}
      />
    </>
  );
}