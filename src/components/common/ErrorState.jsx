/**
 * ErrorState
 * Props:
 *  - title, description
 *  - onRetry (function)
 */
import { AlertTriangle } from 'lucide-react';
import Button from './Button.jsx';

export default function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4">
      <div className="mb-3 p-3 rounded-full bg-red-500/10">
        <AlertTriangle className="h-6 w-6 text-red-500" aria-hidden="true" />
      </div>
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {title}
      </h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
        {description}
      </p>
      {onRetry && (
        <div className="mt-4">
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}