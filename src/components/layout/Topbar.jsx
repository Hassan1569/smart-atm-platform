import { Search, Bell } from 'lucide-react';
import ThemeToggle from './ThemeToggle.jsx';
import UserMenu from './UserMenu.jsx';
import SimulationToggle from './SimulationToggle.jsx';
import { useNotifications } from '../../hooks/useNotifications.js';

export default function Topbar() {
  const { setOpen, unreadCount } = useNotifications();

  return (
    <header className="h-14 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3 px-4">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search ATM ID, incident, alert…"
            disabled
            className="w-full h-9 pl-8 pr-3 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed"
            aria-label="Global search (coming soon)"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <SimulationToggle />
        <ThemeToggle />

        <button
          onClick={() => setOpen(true)}
          className="relative p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center min-w-[14px] h-[14px] px-1 rounded-full bg-red-500 text-white text-[9px] font-semibold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        <div className="ml-1 pl-2 border-l border-slate-200 dark:border-slate-800">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}