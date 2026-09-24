import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';

export default function Maintenance() {
  return (
    <>
      <PageHeader
        title="Maintenance"
        description="Scheduled maintenance and historical service records."
      />
      <Card title="Coming soon">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Phase 9 will implement the maintenance schedule and history.
        </p>
      </Card>
    </>
  );
}