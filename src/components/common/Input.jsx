/**
 * Input
 * Props:
 *  - label, error, hint
 *  - icon (leading icon component)
 *  - size ('sm' | 'md')
 *  - ...rest forwarded to <input>
 */
import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, error, hint, icon: Icon, size = 'md', className = '', id, ...rest },
  ref
) {
  const inputId = id || rest.name || `input-${Math.random().toString(36).slice(2, 8)}`;
  const h = size === 'sm' ? 'h-8 text-xs' : 'h-9 text-sm';

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            aria-hidden="true"
          />
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'w-full rounded-md border bg-white dark:bg-slate-900',
            'text-slate-900 dark:text-slate-100 placeholder:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            h,
            Icon ? 'pl-8 pr-3' : 'px-3',
            error
              ? 'border-red-500 dark:border-red-500'
              : 'border-slate-300 dark:border-slate-700',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={!!error}
          {...rest}
        />
      </div>
      {error ? (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
});

export default Input;