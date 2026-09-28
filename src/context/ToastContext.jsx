import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { on } from '../services/simulationService.js';
import { uid } from '../utils/helpers.js';

export const ToastContext = createContext(null);

const MAX_TOASTS = 3;
const DEFAULT_DURATION = 4500;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((toast) => {
    const id = toast.id ?? uid('toast');
    setToasts((prev) => [{ id, ...toast }, ...prev].slice(0, MAX_TOASTS));
    const duration = toast.duration ?? DEFAULT_DURATION;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Auto-toast on new simulation alerts (only critical + warning to avoid spam)
  useEffect(() => {
    const off = on('alert:new', (alert) => {
      if (alert.severity === 'info') return;
      push({
        type: alert.severity,
        title: `${alert.severity === 'critical' ? 'Critical' : 'Warning'} alert`,
        message: `${alert.atmId} — ${alert.message}`,
      });
    });
    return () => off();
  }, [push]);

  const value = useMemo(
    () => ({ toasts, push, dismiss }),
    [toasts, push, dismiss]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Internal — viewport + toast cards
// ---------------------------------------------------------------------------

import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const TYPE_STYLES = {
  success: 'border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200',
  error:   'border-red-500/30 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200',
  critical:'border-red-500/30 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200',
  warning: 'border-amber-500/30 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200',
  info:    'border-sky-500/30 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200',
};

const TYPE_ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  critical: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

function ToastViewport({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;
  return (
    <div
      className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 w-full max-w-sm pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((t) => {
        const Icon = TYPE_ICONS[t.type] ?? Info;
        const style = TYPE_STYLES[t.type] ?? TYPE_STYLES.info;
        return (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto rounded-lg border px-4 py-3 shadow-lg flex items-start gap-3 animate-fade-in ${style}`}
          >
            <Icon className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              {t.title && (
                <p className="text-sm font-semibold">{t.title}</p>
              )}
              {t.message && (
                <p className="text-xs mt-0.5 opacity-90">{t.message}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              className="p-0.5 rounded opacity-60 hover:opacity-100"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}