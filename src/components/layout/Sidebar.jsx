import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Cpu,
  Bell,
  AlertOctagon,
  Wrench,
  Banknote,
  ArrowLeftRight,
  Map as MapIcon,
  BarChart3,
  Users as UsersIcon,
  Settings as SettingsIcon,
} from 'lucide-react';
import { STORAGE_KEYS } from '../../utils/constants.js';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';

const NAV = [
  {
    section: 'Operations',
    items: [
      { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/atms', label: 'ATMs', icon: Building2 },
      { to: '/devices', label: 'Devices', icon: Cpu },
    ],
  },
  {
    section: 'Monitoring',
    items: [
      { to: '/alerts', label: 'Alerts', icon: Bell },
      { to: '/incidents', label: 'Incidents', icon: AlertOctagon },
      { to: '/maintenance', label: 'Maintenance', icon: Wrench },
    ],
  },
  {
    section: 'Financial',
    items: [
      { to: '/cash', label: 'Cash Management', icon: Banknote },
      { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
    ],
  },
  {
    section: 'Insights',
    items: [
      { to: '/map', label: 'ATM Map', icon: MapIcon },
      { to: '/reports', label: 'Reports', icon: BarChart3 },
    ],
  },
  {
    section: 'Admin',
    items: [
      { to: '/users', label: 'Users', icon: UsersIcon },
      { to: '/settings', label: 'Settings', icon: SettingsIcon },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useLocalStorage(
    STORAGE_KEYS.SIDEBAR_COLLAPSED,
    false
  );

  return (
    <aside
      className={[
        'shrink-0 border-r border-slate-200 dark:border-slate-800',
        'bg-white dark:bg-slate-900 flex flex-col',
        'transition-[width] duration-200',
        collapsed ? 'w-16' : 'w-60',
      ].join(' ')}
    >
      {/* Brand */}
      <div className="h-14 flex items-center gap-2.5 px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="h-7 w-7 rounded-md bg-indigo-600 flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">A</span>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
              Smart ATM
            </p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mono">
              Ops Center
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {NAV.map((group) => (
          <div key={group.section} className="mb-3">
            {!collapsed && (
              <p className="px-4 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                {group.section}
              </p>
            )}
            <ul>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      title={collapsed ? item.label : undefined}
                      className={({ isActive }) =>
                        [
                          'group flex items-center gap-3 mx-2 px-2.5 py-2 rounded-md text-sm transition-colors',
                          isActive
                            ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100',
                        ].join(' ')
                      }
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="h-10 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? '»' : '« Collapse'}
      </button>
    </aside>
  );
}