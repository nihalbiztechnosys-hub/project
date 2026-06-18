import { STATUS_LIST } from '../utils/helpers';

export default function StatusChipBar({ active, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {STATUS_LIST.map((status) => {
        const isActive = active === status;
        return (
          <button
            key={status}
            type="button"
            onClick={() => onChange(status)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              isActive
                ? 'border border-blue-500 bg-[#eff6ff] text-blue-700'
                : 'border border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}
