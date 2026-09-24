/**
 * Skeleton
 * Props:
 *  - variant ('line' | 'block' | 'circle')
 *  - width, height (CSS values)
 *  - className
 */
export default function Skeleton({
  variant = 'line',
  width,
  height,
  className = '',
}) {
  const base = 'animate-pulse bg-slate-200 dark:bg-slate-800';

  const styles = {
    line: 'h-3 rounded',
    block: 'rounded-md',
    circle: 'rounded-full',
  };

  return (
    <div
      className={`${base} ${styles[variant]} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}