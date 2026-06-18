import { Search, X, Clock } from 'lucide-react';
import StatusChipBar from './StatusChipBar';
import ColumnSelector from './ColumnSelector';
import FilterTypeSelector from './FilterTypeSelector';

export default function FilterChipBar({
  filters,
  onFilterChange,
  onClearFilters,
  sortConfig,
  onSortChange,
  visibleColumns,
  onColumnChange,
  activeFilterTypes,
  onFilterTypeChange,
}) {
  const activeChips = [];
  if (filters.status && filters.status !== 'All') {
    activeChips.push({ key: 'status', label: `Status: ${filters.status}` });
  }
  if (filters.assignedTo) {
    activeChips.push({ key: 'assignedTo', label: `Assigned: ${filters.assignedTo}` });
  }
  if (filters.createdBy) {
    activeChips.push({ key: 'createdBy', label: `Created: ${filters.createdBy}` });
  }
  (filters.tags || []).forEach((tag) => {
    activeChips.push({ key: `tag-${tag}`, label: `Tag: ${tag}` });
  });
  if (filters.dateRangeStart) {
    activeChips.push({ key: 'dateRangeStart', label: `From: ${filters.dateRangeStart}` });
  }
  if (filters.dateRangeEnd) {
    activeChips.push({ key: 'dateRangeEnd', label: `To: ${filters.dateRangeEnd}` });
  }

  const removeChip = (chip) => {
    if (chip.key === 'status') onFilterChange({ status: 'All' });
    else if (chip.key === 'assignedTo') onFilterChange({ assignedTo: '' });
    else if (chip.key === 'createdBy') onFilterChange({ createdBy: '' });
    else if (chip.key.startsWith('tag-')) {
      const tag = chip.label.replace('Tag: ', '');
      onFilterChange({ tags: (filters.tags || []).filter((t) => t !== tag) });
    }
    else if (chip.key === 'dateRangeStart') onFilterChange({ dateRangeStart: '' });
    else if (chip.key === 'dateRangeEnd') onFilterChange({ dateRangeEnd: '' });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <StatusChipBar active={filters.status || 'All'} onChange={(s) => onFilterChange({ status: s })} />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-[#eff6ff] px-2.5 py-1 text-xs font-medium text-blue-800"
            >
              {chip.label}
              <button
                type="button"
                onClick={() => removeChip(chip)}
                className="rounded-full p-0.5 hover:bg-blue-200"
                aria-label={`Remove ${chip.label}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}

          {activeChips.length === 0 && (
            <span className="text-xs text-gray-400">No active filters</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              placeholder="Search..."
              className="w-48 rounded-md border border-gray-300 py-1.5 pl-9 pr-7 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {(filters.search || '').length > 0 && (
              <button
                type="button"
                onClick={() => onFilterChange({ search: '' })}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <FilterTypeSelector
            activeFilterTypes={activeFilterTypes}
            onChange={onFilterTypeChange}
          />

          <button
            type="button"
            onClick={onClearFilters}
            className="rounded-md border border-gray-300 bg-white p-1.5 text-gray-600 hover:bg-gray-50"
            aria-label="Clear filters"
            title="Clear all filters"
          >
            <X className="h-4 w-4" />
          </button>

          <ColumnSelector visibleColumns={visibleColumns} onChange={onColumnChange} />

          <div className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-600">
            <Clock className="h-3.5 w-3.5" />
            <span>
              Sorted by <span className="font-medium text-gray-800">{sortConfig.key}</span>{' '}
              {sortConfig.direction === 'asc' ? '↑' : '↓'}
            </span>
          </div>

          <select
            value={`${sortConfig.key}|${sortConfig.direction}`}
            onChange={(e) => {
              const [key, direction] = e.target.value.split('|');
              onSortChange({ key, direction });
            }}
            className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-700 outline-none focus:border-blue-500"
          >
            <option value="startDate|desc">Start Date ↓</option>
            <option value="startDate|asc">Start Date ↑</option>
            <option value="title|asc">Title A-Z</option>
            <option value="title|desc">Title Z-A</option>
            <option value="billedPercent|desc">% Billed ↓</option>
            <option value="billedPercent|asc">% Billed ↑</option>
            <option value="status|asc">Status</option>
          </select>
        </div>
      </div>
    </div>
  );
}
