import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';

export default function Incidents() {
  return (
    <>
      <PageHeader
        title="Incidents"
        description="Track incident lifecycle, priorities, and technician assignments."
      />
      <Card title="Coming soon">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Phase 9 will implement incident timeline, comments, and resolution notes.
        </p>
      </Card>
    </>
  );
}