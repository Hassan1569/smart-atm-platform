import { Search, Download } from 'lucide-react';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';

export default function ReportFilterBar({
  search,
  setSearch,
  onExport,
  totalRows,
  disabled,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-3">
      <div className="flex-1 min-w-0 max-w-md">
        <Input
          label="Filter rows"
          placeholder="Search any column…"
          icon={Search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3 sm:ml-auto">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {totalRows} row{totalRows === 1 ? '' : 's'}
        </span>
        <Button
          variant="secondary"
          size="md"
          icon={Download}
          onClick={onExport}
          disabled={disabled}
        >
          Print / Export
        </Button>
      </div>
    </div>
  );
}