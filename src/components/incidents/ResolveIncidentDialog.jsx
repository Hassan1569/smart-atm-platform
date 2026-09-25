import { useEffect, useState } from 'react';
import Modal from '../common/Modal.jsx';
import Button from '../common/Button.jsx';

export default function ResolveIncidentDialog({ open, onClose, onConfirm, incident, loading }) {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (open) setNotes('');
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Resolve Incident"
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => onConfirm(notes.trim() || 'Resolved')}
            loading={loading}
          >
            Mark Resolved
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Resolving <span className="mono">{incident?.id}</span>.
        </p>

        <div>
          <label
            htmlFor="resolution-notes-incident"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Resolution Notes <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="resolution-notes-incident"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What was done to resolve this incident?"
            className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
          />
        </div>
      </div>
    </Modal>
  );
}