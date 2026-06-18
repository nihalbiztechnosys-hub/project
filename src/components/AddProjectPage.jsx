import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { uniqueValues, allTags, STATUS_LIST } from '../utils/helpers';

const MILESTONE_OPTIONS = ['Not Started', 'On Track', 'Delayed', 'Completed', 'Delivered', 'Rejected'];

function FormField({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function AddProjectPage({ onClose, onSubmit }) {
  const assignedToList = uniqueValues('assignedTo');
  const createdByList = uniqueValues('createdBy');
  const departmentList = uniqueValues('department');
  const tagsList = allTags();

  const [form, setForm] = useState({
    title: '',
    project: '',
    status: 'Draft',
    assignedTo: '',
    createdBy: '',
    department: '',
    startDate: '',
    endDate: '',
    billedPercent: 0,
    milestoneStatus: 'Not Started',
    tags: [],
    comments: 0,
    favourite: false,
  });

  const [errors, setErrors] = useState({});
  const [tagsOpen, setTagsOpen] = useState(false);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const toggleTag = (tag) => {
    setForm((prev) => {
      const current = new Set(prev.tags);
      if (current.has(tag)) current.delete(tag);
      else current.add(tag);
      return { ...prev, tags: [...current] };
    });
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Title is required';
    if (!form.project.trim()) nextErrors.project = 'Project is required';
    if (!form.status) nextErrors.status = 'Status is required';
    if (!form.assignedTo) nextErrors.assignedTo = 'Assigned To is required';
    if (!form.createdBy) nextErrors.createdBy = 'Created By is required';
    if (!form.department) nextErrors.department = 'Department is required';
    if (!form.startDate) nextErrors.startDate = 'Start date is required';
    if (!form.endDate) nextErrors.endDate = 'End date is required';
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      nextErrors.endDate = 'End date must be after start date';
    }
    if (form.billedPercent < 0 || form.billedPercent > 100) {
      nextErrors.billedPercent = 'Must be between 0 and 100';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1.5 text-gray-600 hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-[#1a1a2e]">Add Project</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-1.5 rounded-md bg-navy px-4 py-1.5 text-sm font-medium text-white hover:bg-[#0f1a30]"
          >
            <Plus className="h-4 w-4" />
            Submit
          </button>
        </div>
      </div>

      {/* Form body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="mb-4 text-sm font-semibold text-gray-800">Project Details</div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Title" required>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setField('title', e.target.value)}
                className={`rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g. ERP Migration Phase 2"
              />
              {errors.title && <span className="text-xs text-red-500">{errors.title}</span>}
            </FormField>

            <FormField label="Project / Client" required>
              <input
                type="text"
                value={form.project}
                onChange={(e) => setField('project', e.target.value)}
                className={`rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  errors.project ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g. Acme Corp"
              />
              {errors.project && <span className="text-xs text-red-500">{errors.project}</span>}
            </FormField>

            <FormField label="Status" required>
              <select
                value={form.status}
                onChange={(e) => setField('status', e.target.value)}
                className={`rounded-md border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  errors.status ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {STATUS_LIST.filter((s) => s !== 'All').map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Assigned To" required>
              <select
                value={form.assignedTo}
                onChange={(e) => setField('assignedTo', e.target.value)}
                className={`rounded-md border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  errors.assignedTo ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select</option>
                {assignedToList.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              {errors.assignedTo && <span className="text-xs text-red-500">{errors.assignedTo}</span>}
            </FormField>

            <FormField label="Created By" required>
              <select
                value={form.createdBy}
                onChange={(e) => setField('createdBy', e.target.value)}
                className={`rounded-md border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  errors.createdBy ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select</option>
                {createdByList.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              {errors.createdBy && <span className="text-xs text-red-500">{errors.createdBy}</span>}
            </FormField>

            <FormField label="Department" required>
              <select
                value={form.department}
                onChange={(e) => setField('department', e.target.value)}
                className={`rounded-md border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  errors.department ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select</option>
                {departmentList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.department && <span className="text-xs text-red-500">{errors.department}</span>}
            </FormField>

            <FormField label="Start Date" required>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setField('startDate', e.target.value)}
                className={`rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.startDate && <span className="text-xs text-red-500">{errors.startDate}</span>}
            </FormField>

            <FormField label="End Date" required>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setField('endDate', e.target.value)}
                className={`rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  errors.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.endDate && <span className="text-xs text-red-500">{errors.endDate}</span>}
            </FormField>

            <FormField label="% Amount Billed" required>
              <input
                type="number"
                min={0}
                max={100}
                value={form.billedPercent}
                onChange={(e) => setField('billedPercent', Number(e.target.value))}
                className={`rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  errors.billedPercent ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.billedPercent && <span className="text-xs text-red-500">{errors.billedPercent}</span>}
            </FormField>

            <FormField label="Milestone Status" required>
              <select
                value={form.milestoneStatus}
                onChange={(e) => setField('milestoneStatus', e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {MILESTONE_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Tags">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setTagsOpen(!tagsOpen)}
                  className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  <span className="truncate">
                    {form.tags.length === 0 ? 'Select tags' : form.tags.join(', ')}
                  </span>
                  <span className="text-xs text-gray-400">▼</span>
                </button>
                {tagsOpen && (
                  <div className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-sm">
                    {tagsList.map((tag) => (
                      <label
                        key={tag}
                        className="flex cursor-pointer items-center gap-2 py-1 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={form.tags.includes(tag)}
                          onChange={() => toggleTag(tag)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        {tag}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </FormField>

            <FormField label="Comments">
              <input
                type="number"
                min={0}
                value={form.comments}
                onChange={(e) => setField('comments', Number(e.target.value))}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </FormField>

            <FormField label="Favourite">
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.favourite}
                  onChange={(e) => setField('favourite', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Mark as favourite</span>
              </label>
            </FormField>
          </div>
        </div>
      </div>
    </div>
  );
}
