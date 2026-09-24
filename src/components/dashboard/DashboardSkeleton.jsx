import Card from '../common/Card.jsx';
import Skeleton from '../common/Skeleton.jsx';

export default function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} padding="md">
            <Skeleton variant="line" height="10px" width="40%" />
            <div className="mt-3">
              <Skeleton variant="line" height="24px" width="60%" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card padding="md">
          <Skeleton variant="line" height="12px" width="30%" />
          <div className="mt-4 h-48 flex items-center justify-center">
            <Skeleton variant="circle" width={140} height={140} />
          </div>
        </Card>
        <Card padding="md">
          <Skeleton variant="line" height="12px" width="30%" />
          <div className="mt-5 space-y-5">
            <Skeleton variant="line" height="10px" />
            <Skeleton variant="line" height="10px" />
          </div>
        </Card>
        <Card padding="md">
          <Skeleton variant="line" height="12px" width="30%" />
          <div className="mt-5">
            <Skeleton variant="block" height="150px" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card padding="md">
          <Skeleton variant="line" height="12px" width="30%" />
          <div className="mt-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} variant="line" height="14px" />
            ))}
          </div>
        </Card>
        <Card padding="md">
          <Skeleton variant="line" height="12px" width="30%" />
          <div className="mt-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} variant="line" height="14px" />
            ))}
          </div>
        </Card>
        <Card padding="md">
          <Skeleton variant="line" height="12px" width="30%" />
          <div className="mt-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} variant="line" height="14px" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}