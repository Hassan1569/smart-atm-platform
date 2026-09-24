import { useParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';

export default function ATMDetails() {
  const { id } = useParams();
  return (
    <>
      <PageHeader
        title={`ATM ${id}`}
        description="Overview, system health, devices, and history."
      />
      <Card title="Coming soon">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Phase 6 will implement the ATM overview, system health grid, and device groups.
        </p>
      </Card>
    </>
  );
}