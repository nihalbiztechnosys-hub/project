import rawData from '../data/demoData.json';

export const STATUS_LIST = ['All', 'Draft', 'Active', 'Submitted', 'Completed', 'On Hold', 'Rejected'];

export const STATUS_STYLES = {
  Draft: { text: '#ea580c', bg: '#fff7ed' },
  Active: { text: '#3b82f6', bg: '#eff6ff' },
  Submitted: { text: '#0d9488', bg: '#f0fdfa' },
  Completed: { text: '#16a34a', bg: '#f0fdf4' },
  'On Hold': { text: '#6b7280', bg: '#f9fafb' },
  Rejected: { text: '#dc2626', bg: '#fef2f2' },
};

export const ALL_PROJECTS = rawData.map((p) => ({ ...p }));

export const COLUMN_DEFINITIONS = [
  { key: 'select', label: '', selectable: false, width: 'w-10' },
  { key: 'title', label: 'Title', selectable: true },
  { key: 'project', label: 'Project', selectable: true },
  { key: 'status', label: 'Status', selectable: true },
  { key: 'billedPercent', label: '% Amount Billed', selectable: true },
  { key: 'startDate', label: 'Start Date', selectable: true },
  { key: 'id', label: 'ID', selectable: true },
  { key: 'duration', label: 'Duration', selectable: true, computed: true },
  { key: 'assignedTo', label: 'Assigned To', selectable: true },
  { key: 'createdBy', label: 'Created By', selectable: true },
  { key: 'tags', label: 'Tags', selectable: true },
  { key: 'comments', label: 'Comments', selectable: true },
  { key: 'milestoneStatus', label: 'Milestone Status', selectable: true },
  { key: 'department', label: 'Department', selectable: true },
  { key: 'endDate', label: 'End Date', selectable: true },
  { key: 'favourite', label: 'Favourite', selectable: true },
];

export const DEFAULT_VISIBLE_COLUMNS = [
  'select',
  'title',
  'project',
  'status',
  'billedPercent',
  'startDate',
  'endDate',
  'id',
  'duration',
  'comments',
  'favourite',
];

export const selectableColumns = () =>
  COLUMN_DEFINITIONS.filter((c) => c.selectable);

export const uniqueValues = (key) =>
  [...new Set(ALL_PROJECTS.map((p) => p[key]).filter(Boolean))].sort();

export const allTags = () =>
  [...new Set(ALL_PROJECTS.flatMap((p) => p.tags || []))].sort();

export function formatDate(dateStr) {
  if (!dateStr) return '-';
  const [y, m, d] = dateStr.split('-');
  return `${d}-${m}-${y}`;
}

export function parseDate(dateStr) {
  return new Date(dateStr);
}

export function monthsBetween(startStr, endStr) {
  const start = parseDate(startStr);
  const end = parseDate(endStr);
  if (isNaN(start) || isNaN(end)) return 0;
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  return Math.max(1, months);
}

export function durationText(project) {
  return `${monthsBetween(project.startDate, project.endDate)}M`;
}

export function progressColor(percent) {
  if (percent >= 80) return 'bg-green-500';
  if (percent >= 40) return 'bg-blue-500';
  return 'bg-orange-500';
}

export function progressHex(percent) {
  if (percent >= 80) return '#22c55e';
  if (percent >= 40) return '#3b82f6';
  return '#f97316';
}

const statusOrder = {
  Draft: 1,
  Active: 2,
  Submitted: 3,
  Completed: 4,
  'On Hold': 5,
  Rejected: 6,
};

export function sortProjects(rows, sortKey, direction) {
  const sorted = [...rows];
  sorted.sort((a, b) => {
    let aVal;
    let bVal;

    switch (sortKey) {
      case 'id':
        aVal = a.id;
        bVal = b.id;
        break;
      case 'title':
        aVal = a.title;
        bVal = b.title;
        break;
      case 'project':
        aVal = a.project;
        bVal = b.project;
        break;
      case 'status':
        aVal = statusOrder[a.status] || 0;
        bVal = statusOrder[b.status] || 0;
        break;
      case 'billedPercent':
        aVal = a.billedPercent;
        bVal = b.billedPercent;
        break;
      case 'startDate':
        aVal = parseDate(a.startDate).getTime();
        bVal = parseDate(b.startDate).getTime();
        break;
      case 'duration':
        aVal = monthsBetween(a.startDate, a.endDate);
        bVal = monthsBetween(b.startDate, b.endDate);
        break;
      case 'comments':
        aVal = a.comments;
        bVal = b.comments;
        break;
      default:
        aVal = a[sortKey];
        bVal = b[sortKey];
    }

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}

export function filterProjects(rows, filters) {
  const { assignedTo, createdBy, tags, status, search, dateRangeStart, dateRangeEnd } = filters;
  const query = (search || '').toLowerCase().trim();

  return rows.filter((p) => {
    if (status && status !== 'All' && p.status !== status) return false;
    if (assignedTo && p.assignedTo !== assignedTo) return false;
    if (createdBy && p.createdBy !== createdBy) return false;
    if (tags && tags.length > 0) {
      const projectTags = p.tags || [];
      const hasAll = tags.every((t) => projectTags.includes(t));
      if (!hasAll) return false;
    }
    if (dateRangeStart && p.startDate < dateRangeStart) return false;
    if (dateRangeEnd && p.endDate > dateRangeEnd) return false;
    if (query) {
      const hay = `${p.title || ''} ${p.project || ''} ${p.id || ''} ${p.assignedTo || ''}`.toLowerCase();
      if (!hay.includes(query)) return false;
    }
    return true;
  });
}
