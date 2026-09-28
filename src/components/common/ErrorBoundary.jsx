import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.href = '/';
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex p-3 rounded-full bg-red-500/10 mb-4">
            <AlertTriangle className="h-7 w-7 text-red-500" />
          </div>
          <h1 className="text-xl font-semibold font-heading text-slate-900 dark:text-slate-100">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            An unexpected error occurred in the interface. Try reloading the
            page. If the problem persists, clear local data from Settings.
          </p>

          {this.state.error?.message && (
            <pre className="mt-4 p-3 rounded-md bg-slate-100 dark:bg-slate-900 text-[11px] text-left text-red-600 dark:text-red-400 overflow-x-auto mono">
              {this.state.error.message}
            </pre>
          )}

          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={this.handleHome}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Home className="h-4 w-4" /> Home
            </button>
            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
            >
              <RefreshCw className="h-4 w-4" /> Reload
            </button>
          </div>
        </div>
      </div>
    );
  }
}