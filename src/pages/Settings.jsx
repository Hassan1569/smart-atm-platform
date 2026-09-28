import { Sun, Moon, LogOut, Trash2, Activity } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';
import Button from '../components/common/Button.jsx';
import Select from '../components/common/Select.jsx';

import { useTheme } from '../hooks/useTheme.js';
import { useAuth } from '../hooks/useAuth.js';
import { useSimulation } from '../hooks/useSimulation.js';
import { ROLE_LABEL } from '../utils/constants.js';
import RoleBadge from '../components/common/RoleBadge.jsx';

const INTERVAL_OPTIONS = [
  { value: 3000,  label: 'Fast — 3 seconds' },
  { value: 5000,  label: 'Normal — 5 seconds' },
  { value: 10000, label: 'Slow — 10 seconds' },
  { value: 30000, label: 'Very slow — 30 seconds' },
];

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const {
    enabled: simEnabled,
    intervalMs,
    toggle: toggleSim,
    setIntervalMs,
    tick,
  } = useSimulation();

  const handleClearSession = () => {
    if (!confirm('Sign out and clear your session?')) return;
    signOut();
    window.location.href = '/login';
  };

  const handleClearLocalData = () => {
    if (
      !confirm(
        'Clear all local data (theme, sidebar state, session, simulation)? This cannot be undone.'
      )
    )
      return;
    try {
      localStorage.removeItem('satm.theme');
      localStorage.removeItem('satm.sidebar.collapsed');
      localStorage.removeItem('satm.session');
      localStorage.removeItem('satm.simulation');
    } catch {
      /* ignore */
    }
    window.location.href = '/login';
  };

  return (
    <>
      <PageHeader
        title="Settings"
        description="Theme, simulation, and platform preferences."
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

        {/* Simulation */}
        <Card
          title={
            <span className="inline-flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" />
              Real-time Simulation
            </span>
          }
          subtitle="Periodically mutates ATM state and generates alerts"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Simulation {simEnabled ? 'running' : 'paused'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {simEnabled
                    ? `Tick #${tick} — updates every ${intervalMs / 1000}s`
                    : 'No background changes will occur.'}
                </p>
              </div>
              <button
                onClick={toggleSim}
                className={[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  simEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700',
                ].join(' ')}
                aria-pressed={simEnabled}
                aria-label="Toggle simulation"
              >
                <span
                  className={[
                    'inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform',
                    simEnabled ? 'translate-x-5' : 'translate-x-0.5',
                  ].join(' ')}
                />
              </button>
            </div>

            <div>
              <Select
                label="Update interval"
                value={intervalMs}
                options={INTERVAL_OPTIONS.map((o) => ({
                  value: o.value,
                  label: o.label,
                }))}
                onChange={(e) => setIntervalMs(Number(e.target.value))}
              />
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              When enabled, ATM health, cash, and status change over time, and
              new alerts flow into the Notifications panel.
            </p>
          </div>
        </Card>

        {/* Danger zone */}
        <Card title="Danger Zone" subtitle="Reset local state">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Clear all local data stored by the app. You'll be signed out and
            your theme preference will be reset.
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