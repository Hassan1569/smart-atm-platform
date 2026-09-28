import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';

export default function DashboardLayout() {
  return (
    <div className="h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Skip-to-content for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-3 focus:py-2 focus:rounded-md focus:bg-indigo-600 focus:text-white focus:text-sm"
      >
        Skip to content
      </a>

      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-y-auto focus:outline-none"
        >
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}