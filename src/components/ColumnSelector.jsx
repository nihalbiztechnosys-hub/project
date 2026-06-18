import { useState, useEffect, useRef } from 'react';
import { Columns, ChevronDown, RotateCcw } from 'lucide-react';
import { selectableColumns } from '../utils/helpers';

export default function ColumnSelector({ visibleColumns, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const allColumns = selectableColumns();

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

  const toggleColumn = (key) => {
    if (visibleColumns.includes(key)) {
      onChange(visibleColumns.filter((k) => k !== key));
    } else {
      onChange([...visibleColumns, key]);
    }
  };

  const resetColumns = () => {
    onChange(null); // signal to parent to restore defaults
  };

  const selectedCount = visibleColumns.length;

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
        aria-label="Choose columns"
      >
        <Columns className="h-3.5 w-3.5" />
        Columns ({selectedCount})
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-1 w-56 rounded-md border border-gray-200 bg-white p-2 shadow-lg">
          <div className="mb-2 flex items-center justify-between border-b border-gray-100 pb-2">
            <span className="text-xs font-semibold text-gray-700">Visible columns</span>
            <button
              type="button"
              onClick={resetColumns}
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600"
              title="Reset to default"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {allColumns.map((col) => {
              const checked = visibleColumns.includes(col.key);
              return (
                <label
                  key={col.key}
                  className="flex cursor-pointer items-center gap-2 rounded py-1 px-1 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleColumn(col.key)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  {col.label}
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
