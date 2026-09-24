import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/common/Button.jsx';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <p className="mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
        Error 404
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-6">
        <Button icon={Home}>Back to Dashboard</Button>
      </Link>
    </div>
  );
}