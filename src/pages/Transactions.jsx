import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';

export default function Transactions() {
  return (
    <>
      <PageHeader
        title="Transactions"
        description="Volume, success rates, and type breakdown."
      />
      <Card title="Coming soon">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Phase 11 will implement transaction summary cards, hourly volume, and type breakdown.
        </p>
      </Card>
    </>
  );
}