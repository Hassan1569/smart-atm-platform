import { Search, X } from 'lucide-react';
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';
import Button from '../common/Button.jsx';
import { INCIDENT_STATUS, INCIDENT_PRIORITY } from '../../utils/constants.js';
import { titleCase } from '../../utils/helpers.js';

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All priorities' },
  ...Object.values(INCIDENT_PRIORITY).map((p) => ({ value: p, label: titleCase(p) })),
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  ...Object.values(INCIDENT_STATUS).map((s) => ({ value: s, label: titleCase(s) })),
];

export default function IncidentFilters({ filters, setFilters, onReset, isFiltered }) {
  const update = (patch) => setFilters((prev) => ({ ...prev, ...patch }));

  return (
    <div className="flex flex-col lg:flex-row lg:items-end gap-3">
      <div className="flex-1 min-w-0">
        <Input
          label="Search"
          placeholder="Incident ID, issue, ATM ID, technician…"
          icon={Search}
          value={filters.search}
          onChange={(e) => update({ search: e.target.value, page: 1 })}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:w-[720px]">
        <Select
          label="Priority"
          value={filters.priority}
          options={PRIORITY_OPTIONS}
          onChange={(e) => update({ priority: e.target.value, page: 1 })}
        />
        <Select
          label="Status"
          value={filters.status}
          options={STATUS_OPTIONS}
          onChange={(e) => update({ status: e.target.value, page: 1 })}
        />
        <Input
          label="ATM ID"
          placeholder="e.g. ATM-KHI-003"
          value={filters.atmId}
          onChange={(e) => update({ atmId: e.target.value, page: 1 })}
        />
        <Input
          label="Technician"
          placeholder="e.g. Ahmed"
          value={filters.technician}
          onChange={(e) => update({ technician: e.target.value, page: 1 })}
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