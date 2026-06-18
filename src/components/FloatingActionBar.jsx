import { Download, FileText } from 'lucide-react';

export default function FloatingActionBar({
  selectedCount,
  onExportSelected,
  onPreviewSelected,
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2.5 shadow-lg">
      <span className="text-sm font-medium text-gray-800">
        {selectedCount} row{selectedCount !== 1 ? 's' : ''} selected
      </span>
      <div className="h-4 w-px bg-gray-300" />
      <button
        type="button"
        onClick={onExportSelected}
        className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0f1a30]"
      >
        <Download className="h-3.5 w-3.5" />
        Export Selected
      </button>
      <button
        type="button"
        onClick={onPreviewSelected}
        className="inline-flex items-center gap-1.5 rounded-full border border-blue-500 bg-[#eff6ff] px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
      >
        <FileText className="h-3.5 w-3.5" />
        Preview Selected
      </button>
    </div>
  );
}
