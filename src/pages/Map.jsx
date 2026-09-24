import PageHeader from '../components/common/PageHeader.jsx';
import Card from '../components/common/Card.jsx';

export default function Map() {
  return (
    <>
      <PageHeader
        title="ATM Map"
        description="Geographic distribution with status-colored markers."
      />
      <Card title="Coming soon">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Phase 12 will implement the Leaflet + OpenStreetMap view with popups.
        </p>
      </Card>
    </>
  );
}