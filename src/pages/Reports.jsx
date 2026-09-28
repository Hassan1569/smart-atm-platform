import { useMemo, useState } from 'react';
import { RefreshCw, FileText } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import ErrorState from '../components/common/ErrorState.jsx';

import ReportFilterBar from '../components/reports/ReportFilterBar.jsx';
import ReportTable from '../components/reports/ReportTable.jsx';

import { useReport } from '../hooks/useReport.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { REPORT_TYPES } from '../services/reportService.js';

export default function Reports() {
  const [typeId, setTypeId] = useState('daily-atm');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 250);

  const report = useReport(typeId);

  const activeMeta = useMemo(
    () => REPORT_TYPES.find((t) => t.id === typeId),
    [typeId]
  );

  const filteredRows = useMemo(() => {
    if (!report.data?.rows) return [];
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return report.data.rows;
    return report.data.rows.filter((row) =>
      Object.values(row).some((v) =>
        String(v ?? '').toLowerCase().includes(q)
      )
    );
  }, [report.data, debouncedSearch]);

  const handleExport = () => {
    window.print();
  };

  const handleSwitchType = (id) => {
    setTypeId(id);
    setSearch('');
  };

  return (
    <>
      <PageHeader
        title="Reports"
        description={activeMeta?.description ?? 'Choose a report type.'}
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={report.refetch}
            disabled={report.loading}
          >
            Refresh
          </Button>
        }
      />

      {/* Report type tabs */}
      <div className="mb-4 border-b border-slate-200 dark:border-slate-800 print:hidden">
        <nav className="flex gap-1 -mb-px overflow-x-auto">
          {REPORT_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSwitchType(t.id)}
              className={[
                'px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                typeId === t.id
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
              ].join(' ')}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Filter bar */}
      <div className="print:hidden">
        <Card padding="md" className="mb-4">
          <ReportFilterBar
            search={search}
            setSearch={setSearch}
            onExport={handleExport}
            totalRows={filteredRows.length}
            disabled={!report.data || report.loading}
          />
        </Card>
      </div>

      {/* Print header (only visible when printing) */}
      <div className="hidden print:block mb-4">
        <h1 className="text-xl font-bold">Smart ATM Platform — {activeMeta?.label} Report</h1>
        <p className="text-xs text-slate-500">
          Generated {new Date().toLocaleString('en-GB')}
        </p>
      </div>

      {/* Error */}
      {report.error && !report.loading && (
        <Card>
          <ErrorState
            title="Failed to load report"
            description={report.error.message}
            onRetry={report.refetch}
          />
        </Card>
      )}

      {/* Loading */}
      {report.loading && !report.data && (
        <Card padding="md">
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} variant="line" height="14px" />
            ))}
          </div>
        </Card>
      )}

      {/* Report content */}
      {report.data && !report.loading && (
        <Card padding="none">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {activeMeta?.label}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto">
              {filteredRows.length} rows
            </span>
          </div>
          <ReportTable columns={report.data.columns} rows={filteredRows} />
        </Card>
      )}
    </>
  );
}