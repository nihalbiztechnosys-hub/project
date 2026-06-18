import { useState, useMemo } from 'react';
import TopBar from './components/TopBar';
import FilterPanel from './components/FilterPanel';
import FilterChipBar from './components/FilterChipBar';
import ProjectTable from './components/ProjectTable';
import Pagination from './components/Pagination';
import FloatingActionBar from './components/FloatingActionBar';
import PreviewModal from './components/PreviewModal';
import AddProjectPage from './components/AddProjectPage';
import { useProjectFilters } from './hooks/useProjectFilters';
import { exportProjectsToCSV } from './utils/csvExport';
import { ALL_PROJECTS, DEFAULT_VISIBLE_COLUMNS } from './utils/helpers';

const ROWS_PER_PAGE = 5;

const defaultFilters = {
  assignedTo: '',
  createdBy: '',
  tags: [],
  status: 'All',
  search: '',
  dateRangeStart: '',
  dateRangeEnd: '',
};

const defaultSort = { key: 'startDate', direction: 'desc' };

export default function App() {
  const [projects, setProjects] = useState(ALL_PROJECTS.map((p) => ({ ...p })));
  const [filters, setFilters] = useState(defaultFilters);
  const [sortConfig, setSortConfig] = useState(defaultSort);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [savedFilters, setSavedFilters] = useState([]);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [previewRows, setPreviewRows] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_VISIBLE_COLUMNS);
  const [activeFilterTypes, setActiveFilterTypes] = useState([
    'assignedTo',
    'createdBy',
    'tags',
    'dateRange',
    'saved',
  ]);
  const [showAddProject, setShowAddProject] = useState(false);

  const filteredRows = useProjectFilters(projects, filters, sortConfig);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredRows.length / ROWS_PER_PAGE)),
    [filteredRows.length]
  );
  const currentPage = Math.min(page, totalPages);

  const pagedRows = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredRows.slice(start, start + ROWS_PER_PAGE);
  }, [filteredRows, currentPage]);

  const selectedRows = useMemo(
    () => filteredRows.filter((p) => selectedIds.has(p.id)),
    [filteredRows, selectedIds]
  );

  const updateFilters = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setSelectedIds(new Set());
    setPage(1);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
    setPage(1);
  };

  const handleSortChange = (config) => {
    setSortConfig(config);
    setPage(1);
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    const allFilteredIds = filteredRows.map((p) => p.id);
    const allSelected = allFilteredIds.every((id) => selectedIds.has(id));
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allFilteredIds));
    }
  };

  const handleToggleFavourite = (id) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favourite: !p.favourite } : p))
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setSortConfig(defaultSort);
    setSelectedIds(new Set());
    setPage(1);
  };

  const handleSaveFilter = (name) => {
    const snapshot = { ...filters };
    setSavedFilters((prev) => {
      const cleaned = prev.filter((f) => f.name !== name);
      return [...cleaned, { name, ...snapshot }];
    });
  };

  const handleApplySavedFilter = (saved) => {
    const snapshot = { ...saved };
    delete snapshot.name;
    setFilters(snapshot);
    setSelectedIds(new Set());
    setPage(1);
  };

  const handleDeleteSavedFilter = (name) => {
    setSavedFilters((prev) => prev.filter((f) => f.name !== name));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      handleClearFilters();
      setIsRefreshing(false);
    }, 500);
  };

  const buildFilename = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `project-report-${date}.csv`;
  };

  const handleExportAll = () => {
    exportProjectsToCSV(filteredRows, visibleColumns, buildFilename());
  };

  const handleExportSelected = () => {
    exportProjectsToCSV(selectedRows, visibleColumns, buildFilename());
  };

  const handlePreviewAll = () => {
    setPreviewRows(filteredRows);
  };

  const handlePreviewSelected = () => {
    setPreviewRows(selectedRows);
  };

  const handleClosePreview = () => {
    setPreviewRows(null);
  };

  const handleAddProject = () => {
    setShowAddProject(true);
  };

  const handleCloseAddProject = () => {
    setShowAddProject(false);
  };

  const handleAddProjectSubmit = (form) => {
    const maxNum = projects.reduce((max, p) => {
      const match = p.id.match(/PR-2026-(\d+)/);
      return match ? Math.max(max, parseInt(match[1], 10)) : max;
    }, 0);
    const nextNum = String(maxNum + 1).padStart(3, '0');
    const newProject = {
      ...form,
      id: `PR-2026-${nextNum}`,
      comments: Number(form.comments) || 0,
      billedPercent: Number(form.billedPercent) || 0,
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const handleFilterTypeChange = (next) => {
    if (next === null) {
      setActiveFilterTypes(['assignedTo', 'createdBy', 'tags', 'dateRange', 'saved']);
    } else {
      setActiveFilterTypes(next);
    }
  };

  const handleColumnChange = (next) => {
    if (next === null) {
      setVisibleColumns(DEFAULT_VISIBLE_COLUMNS);
    } else {
      setVisibleColumns(next);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopBar
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        onPreviewAll={handlePreviewAll}
        onExportAll={handleExportAll}
        onAddProject={handleAddProject}
      />

      <div className="flex flex-1 overflow-hidden">
        <FilterPanel
          filters={filters}
          onFilterChange={updateFilters}
          savedFilters={savedFilters}
          onSaveFilter={handleSaveFilter}
          onApplySavedFilter={handleApplySavedFilter}
          onDeleteSavedFilter={handleDeleteSavedFilter}
          activeFilterTypes={activeFilterTypes}
        />

        <main className="flex-1 overflow-y-auto p-4">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <FilterChipBar
                filters={filters}
                onFilterChange={updateFilters}
                onClearFilters={handleClearFilters}
                sortConfig={sortConfig}
                onSortChange={handleSortChange}
                visibleColumns={visibleColumns}
                onColumnChange={handleColumnChange}
                activeFilterTypes={activeFilterTypes}
                onFilterTypeChange={handleFilterTypeChange}
              />
            </div>

            <div className="mb-2 flex items-center justify-end text-xs text-gray-500">
              {filteredRows.length} result{filteredRows.length !== 1 ? 's' : ''}
            </div>

            <ProjectTable
              rows={pagedRows}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onSelectAll={handleSelectAll}
              onToggleFavourite={handleToggleFavourite}
              onStatusChange={handleStatusChange}
              sortConfig={sortConfig}
              onSort={handleSort}
              visibleColumns={visibleColumns}
            />

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              totalRows={filteredRows.length}
              onChange={setPage}
            />
          </div>
        </main>
      </div>

      <FloatingActionBar
        selectedCount={selectedRows.length}
        onExportSelected={handleExportSelected}
        onPreviewSelected={handlePreviewSelected}
      />

      {showAddProject && (
        <AddProjectPage onClose={handleCloseAddProject} onSubmit={handleAddProjectSubmit} />
      )}

      {previewRows && (
        <PreviewModal rows={previewRows} visibleColumns={visibleColumns} onClose={handleClosePreview} />
      )}
    </div>
  );
}
