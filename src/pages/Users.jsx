import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';

export default function Users() {
  return (
    <>
      <PageHeader
        title="Users"
        description="Manage platform users and role assignments."
      />
      <Card title="Coming soon">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Phase 14 will implement user management (admin only).
        </p>
      </Card>
    </>
  );
}