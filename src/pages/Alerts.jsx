import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';

export default function Alerts() {
  return (
    <>
      <PageHeader
        title="Alerts"
        description="Critical, warning, and informational alerts across the fleet."
      />
      <Card title="Coming soon">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Phase 8 will implement the alert lifecycle (detected → ack → assign → resolve).
        </p>
      </Card>
    </>
  );
}   