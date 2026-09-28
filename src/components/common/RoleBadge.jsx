import Badge from './Badge.jsx';
import { roleBadge } from '../../utils/statusColors.js';
import { ROLE_LABEL } from '../../utils/constants.js';

export default function RoleBadge({ role }) {
  return <Badge className={roleBadge(role)}>{ROLE_LABEL[role] ?? role}</Badge>;
}