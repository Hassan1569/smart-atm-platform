import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';

export default function Devices() {
  return (
    <>
      <PageHeader
        title="Devices"
        description="Fleet-wide device health across ATM, cash recycler, and network groups."
      />
      <Card title="Coming soon">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Phase 6 will implement the fleet-wide device view.
        </p>
      </Card>
    </>
  );
}