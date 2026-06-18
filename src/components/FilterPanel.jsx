import { useState } from 'react';
import { ChevronDown, X, Save } from 'lucide-react';
import { uniqueValues, allTags } from '../utils/helpers';

const FILTER_SECTIONS = {
  assignedTo: 'assignedTo',
  createdBy: 'createdBy',
  tags: 'tags',
  dateRange: 'dateRange',
  saved: 'saved',
};

export default function FilterPanel({
  filters,
  onFilterChange,
  savedFilters,
  onSaveFilter,
  onApplySavedFilter,
  onDeleteSavedFilter,
  activeFilterTypes,
}) {
  const [filterName, setFilterName] = useState('');
  const [tagsOpen, setTagsOpen] = useState(false);

  const assignedToList = uniqueValues('assignedTo');
  const createdByList = uniqueValues('createdBy');
  const tagsList = allTags();

  const isActive = (key) => activeFilterTypes.includes(key);

  const handleTagToggle = (tag) => {
    const current = new Set(filters.tags || []);
    if (current.has(tag)) current.delete(tag);
    else current.add(tag);
    onFilterChange({ tags: [...current] });
  };

  const saveFilter = () => {
    const name = filterName.trim();
    if (!name) return;
    onSaveFilter(name);
    setFilterName('');
  };

  const clearDateRange = () => {
    onFilterChange({ dateRangeStart: '', dateRangeEnd: '' });
  };

  return (
    <div className="w-[220px] flex-shrink-0 border-r border-gray-200 bg-white p-4">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">Filter By</h2>

      {isActive(FILTER_SECTIONS.assignedTo) && (
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-medium text-gray-600">Assigned To</label>
          <select
            value={filters.assignedTo || ''}
            onChange={(e) => onFilterChange({ assignedTo: e.target.value || '' })}
            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All</option>
            {assignedToList.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      )}

      {isActive(FILTER_SECTIONS.createdBy) && (
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-medium text-gray-600">Created By</label>
          <select
            value={filters.createdBy || ''}
            onChange={(e) => onFilterChange({ createdBy: e.target.value || '' })}
            className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All</option>
            {createdByList.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      )}

      {isActive(FILTER_SECTIONS.tags) && (
        <div className="mb-4">
          <div className="mb-1 text-xs font-semibold text-gray-900">Edit Filters</div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">Tags</label>
          <button
            type="button"
            onClick={() => setTagsOpen(!tagsOpen)}
            className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            <span className="truncate">
              {(filters.tags || []).length === 0 ? 'Select tags' : (filters.tags || []).join(', ')}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform ${tagsOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {tagsOpen && (
            <div className="mt-1 max-h-48 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-sm">
              {tagsList.map((tag) => (
                <label
                  key={tag}
                  className="flex cursor-pointer items-center gap-2 py-1 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={(filters.tags || []).includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  {tag}
                </label>
              ))}
            </div>
          )}
          <button
            type="button"
            className="mt-1 text-xs text-blue-600 hover:text-blue-800"
            onClick={() => setTagsOpen(!tagsOpen)}
          >
            Show Tags
          </button>
        </div>
      )}

      {isActive(FILTER_SECTIONS.dateRange) && (
        <div className="mb-4 rounded-md border border-gray-100 bg-gray-50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-700">Date Range</label>
            {(filters.dateRangeStart || filters.dateRangeEnd) && (
              <button
                type="button"
                onClick={clearDateRange}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>
          <div className="mb-2">
            <label className="mb-1 block text-xs text-gray-500">From</label>
            <input
              type="date"
              value={filters.dateRangeStart || ''}
              onChange={(e) => onFilterChange({ dateRangeStart: e.target.value })}
              className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-500">To</label>
            <input
              type="date"
              value={filters.dateRangeEnd || ''}
              onChange={(e) => onFilterChange({ dateRangeEnd: e.target.value })}
              className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {isActive(FILTER_SECTIONS.saved) && (
        <div className="mb-4 border-t border-gray-100 pt-4">
          <label className="mb-1.5 block text-xs font-semibold text-gray-900">Save Filter</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Filter name"
              className="flex-1 rounded-md border border-gray-300 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={saveFilter}
              className="inline-flex items-center rounded-md bg-navy px-2.5 py-1.5 text-sm text-white hover:bg-[#0f1a30]"
            >
              <Save className="h-4 w-4" />
            </button>
          </div>

          {savedFilters.length > 0 && (
            <div className="mt-3 space-y-2">
              <div className="text-xs font-semibold text-gray-900">Saved Filters</div>
              {savedFilters.map((saved) => (
                <div
                  key={saved.name}
                  className="group flex items-center justify-between rounded-md border border-blue-200 bg-blue-50 px-2 py-1.5 text-xs text-blue-800"
                >
                  <button
                    type="button"
                    onClick={() => onApplySavedFilter(saved)}
                    className="truncate text-left font-medium hover:underline"
                  >
                    {saved.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteSavedFilter(saved.name)}
                    className="ml-2 rounded p-0.5 text-blue-600 hover:bg-blue-100"
                    aria-label="Delete saved filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
