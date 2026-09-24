/**
 * StatusDot
 * Props:
 *  - status (string) — ATM/Device/Severity status
 *  - label (string, optional) — if provided, renders dot + text
 *  - size ('sm' | 'md')
 */
import { statusDot, statusText } from '../../utils/statusColors.js';

export default function StatusDot({ status, label, size = 'sm' }) {
  const dotSize = size === 'md' ? 'h-2.5 w-2.5' : 'h-2 w-2';

  if (!label) {
    return (
      <span
        className={`inline-block ${dotSize} rounded-full ${statusDot(status)}`}
        aria-label={status}
        title={status}
      />
    );
  }

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`inline-block ${dotSize} rounded-full ${statusDot(status)}`}
        aria-hidden="true"
      />
      <span className={`text-xs font-medium ${statusText(status)}`}>{label}</span>
    </span>
  );
}