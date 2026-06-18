import { useState, useEffect, useRef } from 'react';
import { Filter, ChevronDown, RotateCcw } from 'lucide-react';

const FILTER_TYPES = [
  { key: 'assignedTo', label: 'Assigned To' },
  { key: 'createdBy', label: 'Created By' },
  { key: 'tags', label: 'Tags' },
  { key: 'dateRange', label: 'Date Range' },
  { key: 'saved', label: 'Saved Filters' },
];

export default function FilterTypeSelector({ activeFilterTypes, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  const toggleType = (key) => {
    if (activeFilterTypes.includes(key)) {
      onChange(activeFilterTypes.filter((k) => k !== key));
    } else {
      onChange([...activeFilterTypes, key]);
    }
  };

  const resetTypes = () => {
    onChange(null); // reset to defaults in parent
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium ${
          open
            ? 'border-blue-500 bg-[#eff6ff] text-blue-700'
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
        }`}
        aria-label="Choose filters"
      >
        <Filter className="h-3.5 w-3.5" />
        Filters
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-1 w-52 rounded-md border border-gray-200 bg-white p-2 shadow-lg">
          <div className="mb-2 flex items-center justify-between border-b border-gray-100 pb-2">
            <span className="text-xs font-semibold text-gray-700">Show filter types</span>
            <button
              type="button"
              onClick={resetTypes}
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600"
              title="Reset to default"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {FILTER_TYPES.map((type) => {
              const checked = activeFilterTypes.includes(type.key);
              return (
                <label
                  key={type.key}
                  className="flex cursor-pointer items-center gap-2 rounded py-1 px-1 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleType(type.key)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  {type.label}
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
