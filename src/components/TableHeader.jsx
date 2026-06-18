import { ArrowUp, ArrowDown } from 'lucide-react';
import { COLUMN_DEFINITIONS } from '../utils/helpers';

export default function TableHeader({
  allSelected,
  onSelectAll,
  sortConfig,
  onSort,
  visibleColumns,
}) {
  const icon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="ml-1 inline h-3.5 w-3.5 text-gray-500" />
    ) : (
      <ArrowDown className="ml-1 inline h-3.5 w-3.5 text-gray-500" />
    );
  };

  const columns = COLUMN_DEFINITIONS.filter((col) => visibleColumns.includes(col.key));

  return (
    <thead className="bg-white">
      <tr>
        {columns.map((col) => (
          <th
            key={col.key}
            className={`border-b border-gray-200 px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-[#9aa0ac] ${
              col.width || ''
            } ${col.selectable && col.key !== 'favourite' && col.key !== 'comments' ? 'cursor-pointer select-none hover:bg-gray-50' : ''}`}
            onClick={() => {
              if (!col.selectable || col.key === 'favourite' || col.key === 'comments' || col.key === 'select') return;
              onSort(col.key);
            }}
          >
            <div className="flex items-center">
              {col.key === 'select' ? (
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              ) : (
                <>
                  {col.label}
                  {icon(col.key)}
                </>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
