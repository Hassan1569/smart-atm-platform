/**
 * AppFooter — small attribution footer shown on every authenticated page.
 * Keeps the original author's credit visible when the app is reused.
 */
export default function AppFooter() {
  return (
    <footer className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500">
      <p>
        Smart ATM Operations & Monitoring Platform — <span className="font-medium text-slate-500 dark:text-slate-400">frontend prototype</span> · simulated data
      </p>
      <p className="mono">
        Built by{' '}
        <span className="font-semibold text-slate-500 dark:text-slate-400">
          Hassan
        </span>{' '}
        · © 2026
      </p>
    </footer>
  );
}