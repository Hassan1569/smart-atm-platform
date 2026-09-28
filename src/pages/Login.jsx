import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';
import { useAuth } from '../hooks/useAuth.js';

const PRESET_ACCOUNTS = [
  { role: 'Admin',              email: 'admin@satm.local',  password: 'admin123' },
  { role: 'Operations Manager', email: 'ops@satm.local',    password: 'ops123' },
  { role: 'Technician',         email: 'tech@satm.local',   password: 'tech123' },
  { role: 'Viewer',             email: 'viewer@satm.local', password: 'viewer123' },
];

export default function Login() {
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    const from = location.state?.from ?? '/';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      const from = location.state?.from ?? '/';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillAccount = (acct) => {
    setEmail(acct.email);
    setPassword(acct.password);
    setError(null);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Left: brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-12">
            <div className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <div>
              <p className="text-sm font-semibold">Smart ATM</p>
              <p className="text-[10px] uppercase tracking-wider text-indigo-200 mono">
                Ops Center
              </p>
            </div>
          </div>
          <h1 className="text-3xl font-bold font-heading leading-tight max-w-sm">
            ATM Operations & Monitoring Command Center
          </h1>
          <p className="mt-4 text-sm text-indigo-100/80 max-w-md leading-relaxed">
            Fleet-wide visibility into device health, connectivity, cash, alerts,
            incidents, and maintenance — in one place.
          </p>
        </div>
       <div className="text-xs text-indigo-200/60 mono space-y-1">
  <p>Frontend prototype · Simulated data · No real ATM integration</p>
  <p>
    Built by <span className="text-white font-semibold">Hassan</span> · © 2026
  </p>
</div>
      </div>

      {/* Right: login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 text-center">
            <div className="inline-flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Smart ATM</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mono">
                  Ops Center
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold font-heading text-slate-900 dark:text-slate-100">
            Sign in
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Use one of the preset demo accounts below.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@satm.local"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-md bg-red-500/10 border border-red-500/20 text-xs text-red-700 dark:text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              icon={LogIn}
              loading={loading}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Demo accounts
            </p>
            <div className="space-y-2">
              {PRESET_ACCOUNTS.map((acct) => (
                <button
                  key={acct.email}
                  type="button"
                  onClick={() => fillAccount(acct)}
                  className="w-full text-left px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                        {acct.role}
                      </p>
                      <p className="text-[11px] mono text-slate-500 dark:text-slate-400 truncate">
                        {acct.email}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400 mono shrink-0">
                      {acct.password}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 text-center">
              Click any account to auto-fill credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}