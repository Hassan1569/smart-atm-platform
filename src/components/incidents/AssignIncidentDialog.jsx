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

export default function AssignIncidentDialog({ open, onClose, onConfirm, incident, loading }) {
  const [technician, setTechnician] = useState('');

  useEffect(() => {
    if (open) {
      setTechnician(
        incident?.technician && incident.technician !== 'Unassigned'
          ? incident.technician
          : ''
      );
    }
  }, [open, incident]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Assign Technician"
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => onConfirm(technician.trim())}
            disabled={!technician.trim() || loading}
            loading={loading}
          >
            Assign
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Assigning <span className="mono">{incident?.id}</span>.
        </p>

        <Input
          label="Technician"
          placeholder="Full name"
          value={technician}
          onChange={(e) => setTechnician(e.target.value)}
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
                onClick={() => setTechnician(name)}
                className={[
                  'px-2 py-1 text-xs rounded-md border transition-colors',
                  technician === name
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