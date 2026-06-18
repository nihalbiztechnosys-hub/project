import { MessageSquare, Bookmark, BookmarkCheck } from 'lucide-react';
import StatusSelect from './StatusSelect';
import ProgressBar from './ProgressBar';
import { COLUMN_DEFINITIONS, formatDate, durationText } from '../utils/helpers';

function Cell({ col, project, onToggleSelect, onToggleFavourite, onStatusChange }) {
  switch (col.key) {
    case 'select':
      return (
        <input
          type="checkbox"
          checked={project.selected}
          onChange={() => onToggleSelect(project.id)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      );
    case 'title':
      return <div className="font-semibold text-[#1a1a2e]">{project.title}</div>;
    case 'project':
      return <span className="text-sm text-gray-600">{project.project}</span>;
    case 'status':
      return <StatusSelect status={project.status} onChange={(newStatus) => onStatusChange(project.id, newStatus)} />;
    case 'billedPercent':
      return <ProgressBar percent={project.billedPercent} />;
    case 'startDate':
      return <span className="text-sm text-gray-700">{formatDate(project.startDate)}</span>;
    case 'id':
      return (
        <div className="max-w-[90px] truncate text-sm text-gray-600" title={project.id}>
          {project.id}
        </div>
      );
    case 'duration':
      return <span className="text-sm text-gray-600">{durationText(project)}</span>;
    case 'assignedTo':
      return <span className="text-sm text-gray-700">{project.assignedTo}</span>;
    case 'createdBy':
      return <span className="text-sm text-gray-700">{project.createdBy}</span>;
    case 'tags':
      return (
        <div className="flex flex-wrap gap-1">
          {(project.tags || []).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      );
    case 'comments':
      return (
        <div
          className={`flex items-center gap-1 text-xs ${
            project.comments === 0 ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          {project.comments}
        </div>
      );
    case 'milestoneStatus':
      return <span className="text-sm text-gray-700">{project.milestoneStatus}</span>;
    case 'department':
      return <span className="text-sm text-gray-700">{project.department}</span>;
    case 'endDate':
      return <span className="text-sm text-gray-700">{formatDate(project.endDate)}</span>;
    case 'favourite':
      return (
        <button
          type="button"
          onClick={() => onToggleFavourite(project.id)}
          className={`rounded p-1 transition-colors ${
            project.favourite ? 'text-yellow-500 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-100'
          }`}
          aria-label={project.favourite ? 'Remove bookmark' : 'Add bookmark'}
        >
          {project.favourite ? (
            <BookmarkCheck className="h-4 w-4 fill-current" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </button>
      );
    default:
      return <span className="text-sm text-gray-700">{project[col.key]}</span>;
  }
}

export default function TableRow({
  project,
  selected,
  visibleColumns,
  onToggleSelect,
  onToggleFavourite,
  onStatusChange,
}) {
  const columns = COLUMN_DEFINITIONS.filter((col) => visibleColumns.includes(col.key));
  const rowProject = { ...project, selected };

  return (
    <tr
      className={`border-b border-[#e8e8e8] transition-colors hover:bg-[#f9fafb] ${
        selected ? 'bg-[#eff6ff]' : 'bg-white'
      }`}
    >
      {columns.map((col) => (
        <td key={col.key} className="px-3 py-3">
          <Cell
            col={col}
            project={rowProject}
            onToggleSelect={onToggleSelect}
            onToggleFavourite={onToggleFavourite}
            onStatusChange={onStatusChange}
          />
        </td>
      ))}
    </tr>
  );
}
