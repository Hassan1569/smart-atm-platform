import Card from '../common/Card.jsx';
import Skeleton from '../common/Skeleton.jsx';

export default function AtmDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-4">
        <Card padding="md">
          <Skeleton variant="line" height="12px" width="30%" />
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} variant="line" height="32px" />
            ))}
          </div>
        </Card>
        <Card padding="md">
          <Skeleton variant="line" height="12px" width="30%" />
          <div className="mt-4 space-y-3">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} variant="line" height="14px" />
            ))}
          </div>
        </Card>
      </div>
      <div>
        <Card padding="md">
          <Skeleton variant="line" height="12px" width="40%" />
          <div className="mt-4 space-y-3">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} variant="line" height="12px" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}