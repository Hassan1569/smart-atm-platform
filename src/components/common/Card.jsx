/**
 * Card
 * Props:
 *  - title, subtitle (optional)
 *  - actions (ReactNode on the top-right)
 *  - padding ('none' | 'sm' | 'md' | 'lg')
 *  - className, children
 */
export default function Card({
  title,
  subtitle,
  actions,
  padding = 'md',
  className = '',
  bodyClassName = '',
  children,
}) {
  const padMap = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const hasHeader = title || subtitle || actions;

  return (
    <section
      className={
        'rounded-lg bg-white dark:bg-slate-900 ' +
        'border border-slate-200 dark:border-slate-800 ' +
        'shadow-sm dark:shadow-none ' +
        className
      }
    >
      {hasHeader && (
        <header className="flex items-start justify-between gap-3 px-4 pt-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="min-w-0">
            {title && (
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </header>
      )}
      <div className={`${padMap[padding] ?? padMap.md} ${bodyClassName}`}>
        {children}
      </div>
    </section>
  );
}