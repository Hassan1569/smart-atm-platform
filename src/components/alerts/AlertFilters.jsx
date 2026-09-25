import { Search, X } from 'lucide-react';
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';
import Button from '../common/Button.jsx';
import { SEVERITY, ALERT_STATUS } from '../../utils/constants.js';
import { titleCase } from '../../utils/helpers.js';

const SEVERITY_OPTIONS = [
  { value: 'all', label: 'All severities' },
  ...Object.values(SEVERITY).map((s) => ({ value: s, label: titleCase(s) })),
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  ...Object.values(ALERT_STATUS).map((s) => ({ value: s, label: titleCase(s) })),
];

export default function AlertFilters({ filters, setFilters, onReset, isFiltered }) {
  const update = (patch) => setFilters((prev) => ({ ...prev, ...patch }));

  return (
    <div className="flex flex-col lg:flex-row lg:items-end gap-3">
      <div className="flex-1 min-w-0">
        <Input
          label="Search"
          placeholder="Alert ID, message, ATM ID, assignee…"
          icon={Search}
          value={filters.search}
          onChange={(e) => update({ search: e.target.value, page: 1 })}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:w-[560px]">
        <Select
          label="Severity"
          value={filters.severity}
          options={SEVERITY_OPTIONS}
          onChange={(e) => update({ severity: e.target.value, page: 1 })}
        />
        <Select
          label="Status"
          value={filters.status}
          options={STATUS_OPTIONS}
          onChange={(e) => update({ status: e.target.value, page: 1 })}
        />
        <Input
          label="ATM ID"
          placeholder="e.g. ATM-KHI-002"
          value={filters.atmId}
          onChange={(e) => update({ atmId: e.target.value, page: 1 })}
        />
      </div>
      {isFiltered && (
        <Button variant="ghost" size="md" icon={X} onClick={onReset}>
          Reset
        </Button>
      )}
    </div>
  );
}