# Project Management Reporting Dashboard

A fully functional React dashboard for project management reporting. It mirrors the requested ERP Timesheet-style layout and includes filtering, sorting, pagination, CSV export, row selection, saved filters, and a print-friendly report preview.

## Stack

- React 19 (JavaScript + JSX hooks)
- Tailwind CSS 3
- Vite
- lucide-react icons

## Data

All demo data lives in a single file:

```
src/data/demoData.json
```

Every component reads from this source, so future updates or API integration only require changing one place.

## Component Structure

```
src/
├── App.jsx                    # Main app shell & state management
├── main.jsx                   # React entry point
├── index.css                  # Tailwind imports + print styles
├── data/demoData.json         # Single source of demo data
├── hooks/useProjectFilters.js # Memoized filtering + sorting hook
├── utils/helpers.js           # Formatting, status colors, sorting logic
├── utils/csvExport.js         # CSV export helper
└── components/
    ├── TopBar.jsx
    ├── FilterPanel.jsx
    ├── StatusChipBar.jsx
    ├── FilterChipBar.jsx
    ├── ColumnSelector.jsx
    ├── FilterTypeSelector.jsx
    ├── ProjectTable.jsx
    ├── TableHeader.jsx
    ├── TableRow.jsx
    ├── Pagination.jsx
    ├── FloatingActionBar.jsx
    ├── PreviewModal.jsx
    ├── AddProjectPage.jsx
    ├── StatusBadge.jsx
    └── ProgressBar.jsx
```

## Features

- Sidebar filters (Assigned To, Created By, Tags multi-select, Date Range) with AND logic
- Status chip filter bar (All, Draft, Active, Submitted, Completed, On Hold, Rejected)
- Live search across Title, Project, ID, and Assigned To
- Column visibility selector — choose which columns to display; the table, preview, and CSV export update automatically
- Filter type selector — choose which filter controls appear in the sidebar
- Date range filter — pick start/end dates and export/preview only projects in that range
- Column sorting (click headers) with ↑/↓ indicator and a sort dropdown
- Row selection (checkbox + Select All) with selected-row highlight and floating action bar
- Pagination (5 rows per page)
- Export All / Export Selected as CSV (only visible columns are exported)
- Save Filter and Saved Filter chips
- Refresh button (resets filters + 500 ms spinner)
- In-browser Report Preview modal (filtered or selected rows)
- Print-to-PDF via `window.print()` with A4 landscape print styles
- Color-coded status badges and progress bars
- Add Project form page — side-by-side fields, dropdowns for option fields, auto-generated ID

## Run locally

```bash
cd project-management-report
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Notes

- No backend or localStorage is used — everything is in-memory.
- The demo data is intentionally easy to replace with real API calls later.
- Each UI concern is isolated into its own component for easy maintenance and integration.
