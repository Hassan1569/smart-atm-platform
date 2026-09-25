import { useMemo, useState } from 'react';
import { RefreshCw, Building2 } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

import AtmFilters from '../components/atm/AtmFilters.jsx';
import AtmTable from '../components/atm/AtmTable.jsx';

import { useAtms } from '../hooks/useAtms.js';
import { useDebounce } from '../hooks/useDebounce.js';

const PAGE_SIZE = 8;

const DEFAULT_FILTERS = {
  search: '',
  status: 'all',
  city: '',
  bank: '',
  vendor: '',
  page: 1,
};

export default function ATMs() {
  const { data: atms, loading, error, refetch } = useAtms();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState({ key: 'id', direction: 'asc' });

  const debouncedSearch = useDebounce(filters.search, 250);
  const debouncedCity = useDebounce(filters.city, 250);
  const debouncedBank = useDebounce(filters.bank, 250);
  const debouncedVendor = useDebounce(filters.vendor, 250);

  const isFiltered =
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.city !== '' ||
    filters.bank !== '' ||
    filters.vendor !== '';

  const handleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  const handleReset = () => setFilters(DEFAULT_FILTERS);

  const processed = useMemo(() => {
    if (!atms) return { rows: [], total: 0 };

    const q = debouncedSearch.trim().toLowerCase();
    const city = debouncedCity.trim().toLowerCase();
    const bank = debouncedBank.trim().toLowerCase();
    const vendor = debouncedVendor.trim().toLowerCase();

    let filtered = atms.filter((a) => {
      if (filters.status !== 'all' && a.status !== filters.status) return false;
      if (city && !a.city.toLowerCase().includes(city)) return false;
      if (bank && !a.bank.toLowerCase().includes(bank)) return false;
      if (vendor && !a.vendor.toLowerCase().includes(vendor)) return false;
      if (q) {
        const haystack = [a.id, a.location, a.city, a.bank, a.vendor, a.ip]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    filtered = [...filtered].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av < bv) return sort.direction === 'asc' ? -1 : 1;
      if (av > bv) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    const total = filtered.length;
    const start = (filters.page - 1) * PAGE_SIZE;
    const rows = filtered.slice(start, start + PAGE_SIZE);

    return { rows, total };
  }, [
    atms,
    debouncedSearch,
    debouncedCity,
    debouncedBank,
    debouncedVendor,
    filters.status,
    filters.page,
    sort,
  ]);

  const totalPages = Math.max(1, Math.ceil(processed.total / PAGE_SIZE));
  if (filters.page > totalPages) {
    setFilters((prev) => ({ ...prev, page: totalPages }));
  }

  return (
    <>
      <PageHeader
        title="ATM Management"
        description="Search, filter, and inspect the ATM fleet."
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
        <AtmFilters
          filters={filters}
          setFilters={setFilters}
          onReset={handleReset}
          isFiltered={isFiltered}
        />
      </Card>

      {error && !loading && (
        <Card>
          <ErrorState
            title="Failed to load ATMs"
            description={error.message}
            onRetry={refetch}
          />
        </Card>
      )}

      {loading && !atms && (
        <Card padding="md">
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} variant="line" height="16px" />
            ))}
          </div>
        </Card>
      )}

      {atms && (
        <Card padding="none">
          {processed.total === 0 ? (
            <EmptyState
              icon={Building2}
              title="No ATMs found"
              description="Adjust your filters or search terms."
            />
          ) : (
            <>
              <AtmTable
                rows={processed.rows}
                sort={sort}
                onSort={handleSort}
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
    </>
  );
}