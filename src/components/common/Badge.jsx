/**
 * Badge
 * Props:
 *  - className (usually from statusBadge/roleBadge helpers)
 *  - children
 *  - dot (boolean) — show a leading dot
 */
export default function Badge({ children, className = '', dot = false }) {
  return (
    <span
      className={
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ' +
        className
      }
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full bg-current opacity-80"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}