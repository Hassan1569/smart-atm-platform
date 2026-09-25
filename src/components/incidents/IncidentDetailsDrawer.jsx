import { Link } from 'react-router-dom';
import { X, User, Wrench, CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import Button from '../common/Button.jsx';
import IncidentPriorityBadge from './IncidentPriorityBadge.jsx';
import IncidentStatusBadge from './IncidentStatusBadge.jsx';
import IncidentTimeline from './IncidentTimeline.jsx';
import IncidentComments from './IncidentComments.jsx';
import { INCIDENT_STATUS } from '../../utils/constants.js';
import { formatDateTime, formatRelative } from '../../utils/formatters.js';

const NEXT_STATUS = {
  [INCIDENT_STATUS.ASSIGNED]:      { next: INCIDENT_STATUS.INVESTIGATING, label: 'Start Investigating' },
  [INCIDENT_STATUS.INVESTIGATING]: { next: INCIDENT_STATUS.REPAIR,        label: 'Mark as Repair'      },
  [INCIDENT_STATUS.REPAIR]:        { next: INCIDENT_STATUS.TESTING,       label: 'Move to Testing'     },
  [INCIDENT_STATUS.TESTING]:       { next: null,                          label: null                  },
};

export default function IncidentDetailsDrawer({
  incident,
  open,
  onClose,
  onAssign,
  onAdvance,
  onComment,
  onResolve,
  mutating,
}) {
  if (!open || !incident) return null;

  const advanceCfg = NEXT_STATUS[incident.status];
  const canAssign = incident.status !== INCIDENT_STATUS.RESOLVED;
  const canAdvance = !!advanceCfg?.next;
  const canResolve =
    incident.status !== INCIDENT_STATUS.RESOLVED &&
    incident.status !== INCIDENT_STATUS.DETECTED;

  return (
    <div className="fixed inset-0 z-40 flex justify-end" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className="relative w-full max-w-lg h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl">
        {/* Header */}
        <header className="flex items-start justify-between gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="min-w-0">
            <p className="mono text-xs text-slate-500 dark:text-slate-400">{incident.id}</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1 truncate">
              {incident.issue}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <IncidentPriorityBadge priority={incident.priority} />
              <IncidentStatusBadge status={incident.status} />
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
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {/* Metadata */}
          <dl className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <dt className="text-slate-500 dark:text-slate-400">ATM</dt>
              <dd className="mt-0.5">
                <Link
                  to={`/atms/${incident.atmId}`}
                  className="mono text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {incident.atmId}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Related Alert</dt>
              <dd className="mt-0.5 mono text-slate-700 dark:text-slate-300">
                {incident.alertId ?? '—'}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Technician</dt>
              <dd className="mt-0.5 flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                <Wrench className="h-3 w-3" />
                {incident.technician ?? 'Unassigned'}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Created</dt>
              <dd className="mt-0.5 text-slate-800 dark:text-slate-200">
                {formatRelative(incident.createdAt)}
              </dd>
            </div>
          </dl>

          {/* Timeline */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Timeline
            </h3>
            <IncidentTimeline timeline={incident.timeline} />
          </div>

          {/* Comments */}
          <IncidentComments
            comments={incident.comments}
            onAdd={(text) => onComment(incident.id, text)}
            disabled={mutating}
          />

          {/* Resolution notes */}
          {incident.resolutionNotes && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Resolution Notes
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 rounded-md p-3">
                {incident.resolutionNotes}
              </p>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-[11px] mono text-slate-400 dark:text-slate-500">
            <Clock className="h-3 w-3" />
            Last updated {formatDateTime(incident.updatedAt)}
          </div>
        </div>

        {/* Footer */}
        <footer className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
          {canAssign && (
            <Button
              variant="secondary"
              size="sm"
              icon={User}
              onClick={() => onAssign(incident)}
              disabled={mutating}
            >
              {incident.technician && incident.technician !== 'Unassigned'
                ? 'Reassign'
                : 'Assign'}
            </Button>
          )}

          {canAdvance && (
            <Button
              variant="secondary"
              size="sm"
              icon={ArrowRight}
              onClick={() => onAdvance(incident.id, advanceCfg.next)}
              disabled={mutating}
            >
              {advanceCfg.label}
            </Button>
          )}

          {canResolve && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onResolve(incident)}
              disabled={mutating}
              className="ml-auto"
            >
              Resolve
            </Button>
          )}

          {incident.status === INCIDENT_STATUS.RESOLVED && (
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