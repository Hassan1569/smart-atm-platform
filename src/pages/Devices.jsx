import { useMemo, useState } from 'react';
import { RefreshCw, Cpu } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

import DeviceFilters from '../components/devices/DeviceFilters.jsx';
import DeviceTable from '../components/devices/DeviceTable.jsx';

import { useAllDevices } from '../hooks/useAllDevices.js';
import { useDebounce } from '../hooks/useDebounce.js';

const PAGE_SIZE = 10;

const DEFAULT_FILTERS = {
  search: '',
  status: 'all',
  atmId: '',
  page: 1,
};

export default function Devices() {
  const { data: devices, loading, error, refetch } = useAllDevices();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const debouncedSearch = useDebounce(filters.search, 250);
  const debouncedAtmId = useDebounce(filters.atmId, 250);

  const isFiltered =
    filters.search !== '' || filters.status !== 'all' || filters.atmId !== '';

  const handleReset = () => setFilters(DEFAULT_FILTERS);

  const processed = useMemo(() => {
    if (!devices) return { rows: [], total: 0 };

    const q = debouncedSearch.trim().toLowerCase();
    const atm = debouncedAtmId.trim().toLowerCase();

    const filtered = devices.filter((d) => {
      if (filters.status !== 'all' && d.status !== filters.status) return false;
      if (atm && !d.atmId.toLowerCase().includes(atm)) return false;
      if (q) {
        const haystack = `${d.name} ${d.atmId} ${d.group}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    const total = filtered.length;
    const start = (filters.page - 1) * PAGE_SIZE;
    const rows = filtered.slice(start, start + PAGE_SIZE);
    return { rows, total };
  }, [devices, debouncedSearch, debouncedAtmId, filters.status, filters.page]);

  const totalPages = Math.max(1, Math.ceil(processed.total / PAGE_SIZE));
  if (filters.page > totalPages) {
    setFilters((prev) => ({ ...prev, page: totalPages }));
  }

  return (
    <>
      <PageHeader
        title="Devices"
        description="Fleet-wide device health across ATM, cash recycler, and network groups."
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={refetch}
            disabled={loading}
          >
            Refresh
          </Button>
        }
      />

      <Card padding="md" className="mb-4">
        <DeviceFilters
          filters={filters}
          setFilters={setFilters}
          onReset={handleReset}
          isFiltered={isFiltered}
        />
      </Card>

      {error && !loading && (
        <Card>
          <ErrorState
            title="Failed to load devices"
            description={error.message}
            onRetry={refetch}
          />
        </Card>
      )}

      {loading && !devices && (
        <Card padding="md">
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} variant="line" height="16px" />
            ))}
          </div>
        </Card>
      )}

      {devices && (
        <Card padding="none">
          {processed.total === 0 ? (
            <EmptyState
              icon={Cpu}
              title="No devices found"
              description="Adjust your filters or search terms."
            />
          ) : (
            <>
              <DeviceTable rows={processed.rows} />
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
    </>
  );
}