import { Outlet } from 'react-router-dom';

/**
 * AuthLayout — placeholder for Phase 14 (Login screen).
 * For now it's unused but stubbed to prevent import errors later.
 */
export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
}