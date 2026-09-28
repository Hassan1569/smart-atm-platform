import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Settings as SettingsIcon, User as UserIcon } from 'lucide-react';
import RoleBadge from '../common/RoleBadge.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { canAccessRoute } from '../../utils/permissions.js';

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  if (!user) return null;

  const handleSignOut = () => {
    signOut();
    navigate('/login', { replace: true });
  };

  const canSeeSettings = canAccessRoute(user.role, '/settings');

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="h-8 w-8 rounded-full bg-indigo-600/10 dark:bg-indigo-500/15 flex items-center justify-center">
          <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">
            {user.initials}
          </span>
        </div>
        <div className="hidden md:block text-left leading-tight">
          <p className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate max-w-[120px]">
            {user.name}
          </p>
          <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mono">
            {user.role.replace('_', ' ')}
          </p>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg z-50 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-indigo-600/10 dark:bg-indigo-500/15 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">
                  {user.initials}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mono">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <RoleBadge role={user.role} />
            </div>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setOpen(false);
                navigate('/settings');
              }}
              disabled={!canSeeSettings}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <SettingsIcon className="h-4 w-4" />
              Settings
            </button>
            <div className="px-4 py-2 flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed">
              <UserIcon className="h-4 w-4" />
              Profile (coming soon)
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 py-1">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-500/5"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}