import { Menu, List, RefreshCw, MoreHorizontal, Plus, FileText, Download } from 'lucide-react';

export default function TopBar({
  isRefreshing,
  onRefresh,
  onPreviewAll,
  onExportAll,
  onAddProject,
}) {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded p-1.5 text-gray-600 hover:bg-gray-100"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-[#1a1a2e]">Project Report</h1>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md bg-teal px-3 py-1.5 text-sm font-medium text-white hover:bg-[#0b7c75]"
        >
          <List className="h-4 w-4" />
          List View
        </button>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white p-1.5 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          aria-label="Refresh"
          title="Refresh"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>

        <button
          type="button"
          onClick={onPreviewAll}
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <FileText className="h-4 w-4" />
          Preview Report
        </button>

        <button
          type="button"
          onClick={onExportAll}
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Download className="h-4 w-4" />
          Export All
        </button>

        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white p-1.5 text-gray-600 hover:bg-gray-50"
          aria-label="More options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onAddProject}
          className="inline-flex items-center gap-1.5 rounded-md bg-navy px-3 py-1.5 text-sm font-medium text-white hover:bg-[#0f1a30]"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>
    </header>
  );
}
