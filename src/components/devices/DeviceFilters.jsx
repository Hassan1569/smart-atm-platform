import { Search, X } from 'lucide-react';
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';
import Button from '../common/Button.jsx';
import { DEVICE_STATUS } from '../../utils/constants.js';
import { titleCase } from '../../utils/helpers.js';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  ...Object.values(DEVICE_STATUS).map((s) => ({
    value: s,
    label: titleCase(s),
  })),
];

export default function DeviceFilters({ filters, setFilters, onReset, isFiltered }) {
  const update = (patch) => setFilters((prev) => ({ ...prev, ...patch }));

  return (
    <div className="flex flex-col lg:flex-row lg:items-end gap-3">
      <div className="flex-1 min-w-0">
        <Input
          label="Search"
          placeholder="Device name, ATM ID…"
          icon={Search}
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:w-[520px]">
        <Select
          label="Status"
          value={filters.status}
          options={STATUS_OPTIONS}
          onChange={(e) => update({ status: e.target.value })}
        />
        <Input
          label="ATM ID"
          placeholder="e.g. ATM-KHI-001"
          value={filters.atmId}
          onChange={(e) => update({ atmId: e.target.value })}
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