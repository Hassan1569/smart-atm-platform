import { Users as UsersIcon, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';
import Table from '../components/common/Table.jsx';
import RoleBadge from '../components/common/RoleBadge.jsx';
import Badge from '../components/common/Badge.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

import { USERS } from '../data/users.js';
import { ROLE } from '../utils/constants.js';
import { formatNumber } from '../utils/formatters.js';

export default function Users() {
  const columns = [
    {
      key: 'name',
      header: 'User',
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              {u.initials}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm text-slate-800 dark:text-slate-200">{u.name}</p>
            <p className="text-xs mono text-slate-500 dark:text-slate-400 truncate">
              {u.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      width: 'w-[200px]',
      render: (u) => <RoleBadge role={u.role} />,
    },
    {
      key: 'assignedAtms',
      header: 'Assigned ATMs',
      align: 'right',
      width: 'w-[160px]',
      render: (u) =>
        u.role === ROLE.TECHNICIAN ? (
          <span className="text-xs tabular-nums text-slate-700 dark:text-slate-300">
            {formatNumber(u.assignedAtms.length)}
          </span>
        ) : (
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {u.role === ROLE.ADMIN || u.role === ROLE.OPS_MANAGER ? 'All' : '—'}
          </span>
        ),
    },
    {
      key: 'status',
      header: 'Status',
      width: 'w-[120px]',
      render: (u) =>
        u.active ? (
          <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-500/20">
            Active
          </Badge>
        ) : (
          <Badge className="bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-slate-500/20">
            Inactive
          </Badge>
        ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Users"
        description="Manage platform users and role assignments."
      />

      <div className="mb-4">
        <Card padding="md">
          <div className="flex items-start gap-3">
            <div className="shrink-0 p-2 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Simulated user management
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                This prototype uses preset mock accounts. User creation,
                editing, and role assignment will be added when a real backend
                is introduced.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card padding="none">
        {USERS.length === 0 ? (
          <EmptyState icon={UsersIcon} title="No users" />
        ) : (
          <Table
            columns={columns}
            rows={USERS}
            rowKey={(u) => u.id}
            emptyState="No users."
          />
        )}
      </Card>
    </>
  );
}