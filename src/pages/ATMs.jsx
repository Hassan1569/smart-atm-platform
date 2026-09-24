import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';

export default function ATMs() {
  return (
    <>
      <PageHeader
        title="ATM Management"
        description="Search, filter, and inspect the ATM fleet."
      />
      <Card title="Coming soon">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Phase 5 will implement the ATM table with filters, sorting, and pagination.
        </p>
      </Card>
    </>
  );
}