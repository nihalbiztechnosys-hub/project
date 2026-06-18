import { useState, useEffect, useRef } from 'react';
import { STATUS_STYLES, STATUS_LIST } from '../utils/helpers';

export default function StatusSelect({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const style = STATUS_STYLES[status] || STATUS_STYLES.Draft;

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  const handleSelect = (newStatus) => {
    if (newStatus !== status) {
      onChange(newStatus);
    }
    setOpen(false);
  };

  const options = STATUS_LIST.filter((s) => s !== 'All');

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-opacity hover:opacity-80"
        style={{ color: style.text, backgroundColor: style.bg }}
      >
        {status}
        <span className="text-[10px] opacity-60">▼</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 min-w-[120px] rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          {options.map((option) => {
            const optionStyle = STATUS_STYLES[option] || STATUS_STYLES.Draft;
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={`flex w-full items-center justify-between px-3 py-1.5 text-left text-xs font-medium hover:bg-gray-50 ${
                  option === status ? 'bg-gray-50' : ''
                }`}
              >
                <span
                  className="rounded-full px-2 py-0.5"
                  style={{ color: optionStyle.text, backgroundColor: optionStyle.bg }}
                >
                  {option}
                </span>
                {option === status && <span className="text-blue-600">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
