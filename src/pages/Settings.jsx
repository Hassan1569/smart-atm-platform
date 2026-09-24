import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';

export default function Settings() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Theme, simulation interval, and session preferences."
      />
      <Card title="Coming soon">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Phase 14 will implement settings (theme, session clear, simulation interval).
        </p>
      </Card>
    </>
  );
}