/**
 * Select
 * Props:
 *  - label, error, hint
 *  - options: [{ value, label }]
 *  - size ('sm' | 'md')
 */
import { forwardRef } from 'react';

const Select = forwardRef(function Select(
  { label, error, hint, options = [], size = 'md', className = '', id, ...rest },
  ref
) {
  const selectId = id || rest.name || `select-${Math.random().toString(36).slice(2, 8)}`;
  const h = size === 'sm' ? 'h-8 text-xs' : 'h-9 text-sm';

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={[
          'w-full rounded-md border bg-white dark:bg-slate-900',
          'text-slate-900 dark:text-slate-100',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          h,
          'px-3 pr-8',
          error
            ? 'border-red-500 dark:border-red-500'
            : 'border-slate-300 dark:border-slate-700',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-invalid={!!error}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
});

export default Select;