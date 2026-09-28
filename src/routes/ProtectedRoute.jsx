import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { canAccessRoute } from '../utils/permissions.js';

/**
 * ProtectedRoute
 * - Redirects to /login if not authenticated
 * - Redirects to /404 if the role can't access the path
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-slate-500 dark:text-slate-400">Loading…</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!canAccessRoute(user.role, location.pathname)) {
    return <Navigate to="/" replace />;
  }

  return children;
}