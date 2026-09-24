import { Search, Bell, Activity } from 'lucide-react';
import ThemeToggle from './ThemeToggle.jsx';
import { ROLE_LABEL } from '../../utils/constants.js';

export default function Topbar() {
  return (
    <header className="h-14 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3 px-4">
      {/* Global search (placeholder for now) */}
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
            aria-label="Global search (coming in a later phase)"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        {/* Simulation indicator (placeholder — Phase 15) */}
        <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <Activity className="h-3.5 w-3.5" aria-hidden="true" />
          Simulation: off
        </div>

        <ThemeToggle />

        <button
          className="relative p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Notifications"
          title="Notifications (coming soon)"
        >
          <Bell className="h-4 w-4" />
        </button>

        {/* User chip */}
        <div className="ml-1 flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              SA
            </span>
          </div>
          <div className="hidden md:block leading-tight">
            <p className="text-xs font-medium text-slate-900 dark:text-slate-100">
              System Admin
            </p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mono">
              {ROLE_LABEL.admin}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}