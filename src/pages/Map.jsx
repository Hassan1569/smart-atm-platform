import { useMemo, useState } from 'react';
import { RefreshCw, Search } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import Input from '../components/common/Input.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import ErrorState from '../components/common/ErrorState.jsx';

import AtmMapView from '../components/map/AtmMapView.jsx';
import MapLegend from '../components/map/MapLegend.jsx';

import { useAtms } from '../hooks/useAtms.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { ATM_STATUS } from '../utils/constants.js';

export default function Map() {
  const { data: atms, loading, error, refetch } = useAtms();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const debouncedSearch = useDebounce(search, 250);

  const filtered = useMemo(() => {
    if (!atms) return [];
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return atms;
    return atms.filter((a) =>
      `${a.id} ${a.location} ${a.city} ${a.bank}`.toLowerCase().includes(q)
    );
  }, [atms, debouncedSearch]);

  const counts = useMemo(() => {
    if (!atms) return null;
    return {
      [ATM_STATUS.ONLINE]:   atms.filter((a) => a.status === ATM_STATUS.ONLINE).length,
      [ATM_STATUS.WARNING]:  atms.filter((a) => a.status === ATM_STATUS.WARNING).length,
      [ATM_STATUS.CRITICAL]: atms.filter((a) => a.status === ATM_STATUS.CRITICAL).length,
      [ATM_STATUS.OFFLINE]:  atms.filter((a) => a.status === ATM_STATUS.OFFLINE).length,
    };
  }, [atms]);

  return (
    <>
      <PageHeader
        title="ATM Map"
        description="Geographic distribution with status-colored markers."
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
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 min-w-0 max-w-md">
            <Input
              placeholder="Search ATM ID, location, city, bank…"
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="ml-auto">
            {counts && <MapLegend counts={counts} />}
          </div>
        </div>
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
          <Skeleton variant="block" height="600px" />
        </Card>
      )}

      {atms && (
        <Card padding="none" bodyClassName="">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
              No ATMs match your search.
            </div>
          ) : (
            <AtmMapView
              atms={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          )}
        </Card>
      )}
    </>
  );
}