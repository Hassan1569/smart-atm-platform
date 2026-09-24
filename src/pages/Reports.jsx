import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';

export default function Reports() {
  return (
    <>
      <PageHeader
        title="Reports"
        description="Daily, availability, device health, alert, incident, cash, and transaction reports."
      />
      <Card title="Coming soon">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Phase 13 will implement filters and export-ready layouts for 8 report types.
        </p>
      </Card>
    </>
  );
}