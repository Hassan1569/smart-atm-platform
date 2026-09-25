import DeviceCard from './DeviceCard.jsx';

export default function DeviceGroupSection({ title, devices }) {
  if (!devices || devices.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {devices.length} device{devices.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {devices.map((d) => (
          <DeviceCard key={d.id} device={d} />
        ))}
      </div>
    </section>
  );
}   