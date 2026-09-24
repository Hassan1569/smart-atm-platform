import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';

export default function CashManagement() {
  return (
    <>
      <PageHeader
        title="Cash Management"
        description="Fleet cash utilization, cassette levels, and replenishment."
      />
      <Card title="Coming soon">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Phase 10 will implement cash summary, cassette levels, and replenishment history.
        </p>
      </Card>
    </>
  );
}