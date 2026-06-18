import { formatDate, durationText } from './helpers';

const columnRenderers = {
  id: (p) => p.id,
  title: (p) => p.title,
  project: (p) => p.project,
  assignedTo: (p) => p.assignedTo,
  createdBy: (p) => p.createdBy,
  status: (p) => p.status,
  billedPercent: (p) => p.billedPercent,
  startDate: (p) => formatDate(p.startDate),
  endDate: (p) => formatDate(p.endDate),
  tags: (p) => (p.tags || []).join('; '),
  comments: (p) => p.comments,
  milestoneStatus: (p) => p.milestoneStatus,
  department: (p) => p.department,
  duration: (p) => durationText(p),
  favourite: (p) => (p.favourite ? 'Yes' : 'No'),
};

const columnLabels = {
  id: 'ID',
  title: 'Title',
  project: 'Project',
  assignedTo: 'Assigned To',
  createdBy: 'Created By',
  status: 'Status',
  billedPercent: '% Billed',
  startDate: 'Start Date',
  endDate: 'End Date',
  tags: 'Tags',
  comments: 'Comments',
  milestoneStatus: 'Milestone Status',
  department: 'Department',
  duration: 'Duration',
  favourite: 'Favourite',
};

export function exportProjectsToCSV(rows, visibleColumns, filename) {
  const exportableKeys = (visibleColumns || []).filter((key) => key !== 'select');
  if (exportableKeys.length === 0) {
    window.alert('Please select at least one column to export.');
    return;
  }

  const escapeCsv = (val) => {
    const str = val === undefined || val === null ? '' : String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const header = exportableKeys.map((key) => columnLabels[key] || key).join(',');
  const rowsCsv = rows.map((row) =>
    exportableKeys
      .map((key) => {
        const renderer = columnRenderers[key];
        const value = renderer ? renderer(row) : row[key];
        return escapeCsv(value);
      })
      .join(',')
  );

  const csv = [header, ...rowsCsv].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
