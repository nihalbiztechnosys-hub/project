import TableHeader from './TableHeader';
import TableRow from './TableRow';

export default function ProjectTable({
  rows,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onToggleFavourite,
  onStatusChange,
  sortConfig,
  onSort,
  visibleColumns,
}) {
  const allSelected = rows.length > 0 && rows.every((r) => selectedIds.has(r.id));
  const columnCount = visibleColumns.length || 1;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full">
        <TableHeader
          allSelected={allSelected}
          onSelectAll={onSelectAll}
          sortConfig={sortConfig}
          onSort={onSort}
          visibleColumns={visibleColumns}
        />
        <tbody>
          {rows.length > 0 ? (
            rows.map((project) => (
              <TableRow
                key={project.id}
                project={project}
                selected={selectedIds.has(project.id)}
                visibleColumns={visibleColumns}
                onToggleSelect={onToggleSelect}
                onToggleFavourite={onToggleFavourite}
                onStatusChange={onStatusChange}
              />
            ))
          ) : (
            <tr>
              <td colSpan={columnCount} className="px-3 py-8 text-center text-sm text-gray-500">
                No projects found matching your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
