import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import Badge from '../common/Badge.jsx';
import { statusBadge } from '../../utils/statusColors.js';
import { SEVERITY } from '../../utils/constants.js';

const ICONS = {
  [SEVERITY.CRITICAL]: AlertCircle,
  [SEVERITY.WARNING]: AlertTriangle,
  [SEVERITY.INFO]: Info,
};

const LABELS = {
  [SEVERITY.CRITICAL]: 'Critical',
  [SEVERITY.WARNING]: 'Warning',
  [SEVERITY.INFO]: 'Info',
};

export default function AlertSeverityBadge({ severity }) {
  const Icon = ICONS[severity] ?? Info;
  return (
    <Badge className={statusBadge(severity)}>
      <Icon className="h-3 w-3" aria-hidden="true" />
      {LABELS[severity] ?? severity}
    </Badge>
  );
}