import { progressColor } from '../utils/helpers';

export default function ProgressBar({ percent }) {
  return (
    <div className="w-full">
      <div className="h-1.5 w-full rounded bg-gray-200">
        <div
          className={`h-1.5 rounded ${progressColor(percent)}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="mt-0.5 block text-xs text-gray-500">{percent}%</span>
    </div>
  );
}
