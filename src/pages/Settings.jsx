import { Sun, Moon, LogOut, Trash2 } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';
import Button from '../components/common/Button.jsx';

import { useTheme } from '../hooks/useTheme.js';
import { useAuth } from '../hooks/useAuth.js';
import { ROLE_LABEL } from '../utils/constants.js';
import RoleBadge from '../components/common/RoleBadge.jsx';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  const handleClearSession = () => {
    if (!confirm('Sign out and clear your session?')) return;
    signOut();
    window.location.href = '/login';
  };

  const handleClearLocalData = () => {
    if (
      !confirm(
        'Clear all local data (theme, sidebar state, session)? This cannot be undone.'
      )
    )
      return;
    try {
      localStorage.removeItem('satm.theme');
      localStorage.removeItem('satm.sidebar.collapsed');
      localStorage.removeItem('satm.session');
    } catch {
      /* ignore */
    }
    window.location.href = '/login';
  };

  return (
    <>
      <PageHeader
        title="Settings"
        description="Theme, session, and platform preferences."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Appearance */}
        <Card title="Appearance" subtitle="Choose how the interface looks">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={[
                'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors',
                theme === 'light'
                  ? 'border-indigo-500 bg-indigo-500/5'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700',
              ].join(' ')}
            >
              <Sun className="h-5 w-5 text-amber-500" />
              <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Light
              </span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={[
                'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors',
                theme === 'dark'
                  ? 'border-indigo-500 bg-indigo-500/5'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700',
              ].join(' ')}
            >
              <Moon className="h-5 w-5 text-indigo-400" />
              <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Dark
              </span>
            </button>
          </div>
        </Card>

        {/* Account */}
        <Card title="Account" subtitle="Your signed-in profile">
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-600/10 dark:bg-indigo-500/15 flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">
                    {user.initials}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs mono text-slate-500 dark:text-slate-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">Role</span>
                <RoleBadge role={user.role} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ROLE_LABEL[user.role]} — permissions are enforced across the
                interface.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={LogOut}
                  onClick={handleClearSession}
                >
                  Sign out
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Not signed in.
            </p>
          )}
        </Card>

        {/* Simulation (placeholder for Phase 15) */}
        <Card title="Simulation" subtitle="Real-time updates">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            The real-time simulation engine will be added in Phase 15. When
            enabled, it will periodically update ATM health, cash levels,
            alerts, and activity feed.
          </p>
        </Card>

        {/* Danger zone */}
        <Card title="Danger Zone" subtitle="Reset local state">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Clear all local data stored by the app. You'll be signed out and
            your theme preference will be reset to the system default.
          </p>
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={handleClearLocalData}
          >
            Clear local data
          </Button>
        </Card>
      </div>
    </>
  );
}