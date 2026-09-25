import { X, User, Clock, AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button.jsx';
import AlertSeverityBadge from './AlertSeverityBadge.jsx';
import AlertStatusBadge from './AlertStatusBadge.jsx';
import { ALERT_STATUS, SEVERITY } from '../../utils/constants.js';
import { formatDateTime, formatRelative } from '../../utils/formatters.js';
import { Link } from 'react-router-dom';

const SEVERITY_ICONS = {
  [SEVERITY.CRITICAL]: AlertCircle,
  [SEVERITY.WARNING]: AlertTriangle,
  [SEVERITY.INFO]: Info,
};

const STEPS = [
  { key: 'created',        label: 'Detected',       status: ALERT_STATUS.DETECTED },
  { key: 'acknowledgedAt', label: 'Acknowledged',   status: ALERT_STATUS.ACKNOWLEDGED },
  { key: 'assignedAt',     label: 'Assigned',       status: ALERT_STATUS.ASSIGNED },
  { key: 'investigatingAt',label: 'Investigating',  status: ALERT_STATUS.INVESTIGATING },
  { key: 'resolvedAt',     label: 'Resolved',       status: ALERT_STATUS.RESOLVED },
];

export default function AlertDetailsDrawer({
  alert,
  open,
  onClose,
  onAcknowledge,
  onAssign,
  onInvestigate,
  onResolve,
  mutating,
}) {
  if (!open || !alert) return null;

  const Icon = SEVERITY_ICONS[alert.severity] ?? Info;
  const canAck = alert.status === ALERT_STATUS.DETECTED;
  const canAssign = alert.status !== ALERT_STATUS.RESOLVED;
  const canInvestigate = alert.status === ALERT_STATUS.ASSIGNED;
  const canResolve = alert.status !== ALERT_STATUS.RESOLVED;

  return (
    <div className="fixed inset-0 z-40 flex justify-end" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl">
        {/* Header */}
        <header className="flex items-start justify-between gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="min-w-0">
            <p className="mono text-xs text-slate-500 dark:text-slate-400">{alert.id}</p>
            <div className="mt-1.5 flex items-center gap-2 flex-wrap">
              <AlertSeverityBadge severity={alert.severity} />
              <AlertStatusBadge status={alert.status} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            aria-label="Close drawer"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Message */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <Icon className="h-5 w-5 shrink-0 mt-0.5 text-slate-500" aria-hidden="true" />
            <p className="text-sm text-slate-800 dark:text-slate-200">{alert.message}</p>
          </div>

          {/* Metadata */}
          <dl className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <dt className="text-slate-500 dark:text-slate-400">ATM</dt>
              <dd className="mt-0.5">
                <Link
                  to={`/atms/${alert.atmId}`}
                  className="mono text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {alert.atmId}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Created</dt>
              <dd className="mt-0.5 text-slate-800 dark:text-slate-200">
                {formatRelative(alert.createdAt)}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Assignee</dt>
              <dd className="mt-0.5 flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                <User className="h-3 w-3" />
                {alert.assignee ?? 'Unassigned'}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Last update</dt>
              <dd className="mt-0.5 text-slate-800 dark:text-slate-200">
                {formatRelative(alert.resolvedAt ?? alert.investigatingAt ?? alert.assignedAt ?? alert.acknowledgedAt ?? alert.createdAt)}
              </dd>
            </div>
          </dl>

          {/* Timeline */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Workflow
            </h3>
            <ol className="space-y-3">
              {STEPS.map((step, idx) => {
                const ts = step.key === 'created' ? alert.createdAt : alert[step.key];
                const done = !!ts;
                const isCurrent =
                  alert.status === step.status ||
                  (idx === STEPS.length - 1 && alert.status === ALERT_STATUS.RESOLVED);
                return (
                  <li key={step.key} className="flex items-start gap-3">
                    <div
                      className={[
                        'shrink-0 mt-0.5 h-5 w-5 rounded-full flex items-center justify-center text-[10px]',
                        done
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400',
                      ].join(' ')}
                    >
                      {done ? <CheckCircle2 className="h-3 w-3" /> : idx + 1}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={[
                          'text-sm',
                          done
                            ? 'text-slate-800 dark:text-slate-200 font-medium'
                            : 'text-slate-400 dark:text-slate-500',
                          isCurrent && done ? 'text-indigo-600 dark:text-indigo-400' : '',
                        ].join(' ')}
                      >
                        {step.label}
                      </p>
                      {done && (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatDateTime(ts)}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Resolution notes */}
          {alert.resolution && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Resolution Notes
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 rounded-md p-3">
                {alert.resolution}
              </p>
            </div>
          )}

          {/* Created timestamp mono */}
          <div className="flex items-center gap-1.5 text-[11px] mono text-slate-400 dark:text-slate-500">
            <Clock className="h-3 w-3" />
            {formatDateTime(alert.createdAt)}
          </div>
        </div>

        {/* Footer actions */}
        <footer className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
          {canAck && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onAcknowledge(alert.id)}
              disabled={mutating}
            >
              Acknowledge
            </Button>
          )}
          {canAssign && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onAssign(alert)}
              disabled={mutating}
            >
              {alert.assignee ? 'Reassign' : 'Assign'}
            </Button>
          )}
          {canInvestigate && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onInvestigate(alert.id)}
              disabled={mutating}
            >
              Start Investigating
            </Button>
          )}
          {canResolve && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onResolve(alert)}
              disabled={mutating}
              className="ml-auto"
            >
              Resolve
            </Button>
          )}
          {alert.status === ALERT_STATUS.RESOLVED && (
            <div className="ml-auto inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Resolved
            </div>
          )}
        </footer>
      </aside>
    </div>
  );
}