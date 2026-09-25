import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Button from '../common/Button.jsx';
import { formatRelative } from '../../utils/formatters.js';

export default function IncidentComments({ comments = [], onAdd, disabled }) {
  const [text, setText] = useState('');

  const submit = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    await onAdd(trimmed);
    setText('');
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Comments
      </h3>

      {comments.length === 0 ? (
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          No comments yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {comments.map((c, i) => (
            <li
              key={i}
              className="rounded-md bg-slate-50 dark:bg-slate-800/50 p-3"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {c.author}
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  {formatRelative(c.ts)}
                </span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300">{c.text}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <textarea
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment…"
          disabled={disabled}
          className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 disabled:opacity-50"
        />
        <div className="mt-2 flex justify-end">
          <Button
            size="sm"
            variant="secondary"
            icon={MessageSquare}
            onClick={submit}
            disabled={!text.trim() || disabled}
          >
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
}