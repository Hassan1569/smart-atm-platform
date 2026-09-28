import { useEffect, useRef } from 'react';
import {
  Bell,
  X,
  AlertCircle,
  AlertTriangle,
  Info,
  Trash2,
  CheckCheck,
} from 'lucide-react';
import Button from '../common/Button.jsx';
import EmptyState from '../common/EmptyState.jsx';
import { useNotifications } from '../../hooks/useNotifications.js';
import { formatRelative } from '../../utils/formatters.js';

const TYPE_ICONS = {
  critical: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const TYPE_COLORS = {
  critical: 'text-red-600 dark:text-red-400 bg-red-500/10',
  warning: 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
  info: 'text-sky-600 dark:text-sky-400 bg-sky-500/10',
};

export default function NotificationsPanel() {
  const {
    notifications,
    unreadCount,
    open,
    setOpen,
    markAllRead,
    clear,
    dismiss,
  } = useNotifications();

  const panelRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  // Mark all as read when opening the panel
  useEffect(() => {
    if (open && unreadCount > 0) {
      const t = setTimeout(markAllRead, 800);
      return () => clearTimeout(t);
    }
  }, [open, unreadCount, markAllRead]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/50"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        ref={panelRef}
        className="relative w-full max-w-sm h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl animate-slide-in-right"
      >
        <header className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Notifications
            </h2>
            {notifications.length > 0 && (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                ({notifications.length})
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            aria-label="Close notifications"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2 px-5 py-2 border-b border-slate-100 dark:border-slate-800">
            <Button
              size="sm"
              variant="ghost"
              icon={CheckCheck}
              onClick={markAllRead}
              disabled={unreadCount === 0}
            >
              Mark all read
            </Button>
            <Button
              size="sm"
              variant="ghost"
              icon={Trash2}
              onClick={clear}
              className="ml-auto text-red-600 dark:text-red-400"
            >
              Clear
            </Button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <EmptyState
              icon={Bell}
              title="No notifications"
              description="New simulation alerts will appear here."
            />
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {notifications.map((n) => {
                const Icon = TYPE_ICONS[n.type] ?? Info;
                const color = TYPE_COLORS[n.type] ?? TYPE_COLORS.info;
                return (
                  <li
                    key={n.id}
                    className={[
                      'px-4 py-3 flex items-start gap-3 transition-colors',
                      !n.read ? 'bg-indigo-500/5' : '',
                    ].join(' ')}
                  >
                    <div className={`shrink-0 p-1.5 rounded-md ${color}`}>
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                        {n.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                        {n.message}
                      </p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                        {formatRelative(n.createdAt)}
                      </p>
                    </div>
                    <button
                      onClick={() => dismiss(n.id)}
                      className="p-1 text-slate-300 hover:text-slate-600 dark:hover:text-slate-300"
                      aria-label="Dismiss"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}