import { useEffect, useState } from 'react';
import Modal from '../common/Modal.jsx';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';

const SUGGESTIONS = [
  'Ahmed Khan',
  'Bilal Ahmad',
  'Sara Iqbal',
  'Hassan Raza',
  'Usman Malik',
];

export default function AssignAlertDialog({ open, onClose, onConfirm, alert, loading }) {
  const [assignee, setAssignee] = useState('');

  useEffect(() => {
    if (open) setAssignee(alert?.assignee ?? '');
  }, [open, alert]);

  const handleConfirm = () => {
    if (assignee.trim()) onConfirm(assignee.trim());
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Assign Alert"
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={!assignee.trim() || loading}
            loading={loading}
          >
            Assign
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Assigning <span className="mono">{alert?.id}</span> to a technician.
        </p>

        <Input
          label="Assignee"
          placeholder="Full name"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          autoFocus
        />

        <div>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
            Quick pick
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setAssignee(name)}
                className={[
                  'px-2 py-1 text-xs rounded-md border transition-colors',
                  assignee === name
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-700 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800',
                ].join(' ')}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}