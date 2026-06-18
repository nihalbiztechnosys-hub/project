import { STATUS_STYLES } from '../utils/helpers';

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Draft;
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ color: style.text, backgroundColor: style.bg }}
    >
      {status}
    </span>
  );
}
