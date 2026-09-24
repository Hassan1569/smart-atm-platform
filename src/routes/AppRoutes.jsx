import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

import Dashboard from '../pages/Dashboard.jsx';
import ATMs from '../pages/ATMs.jsx';
import ATMDetails from '../pages/ATMDetails.jsx';
import Devices from '../pages/Devices.jsx';
import Alerts from '../pages/Alerts.jsx';
import Incidents from '../pages/Incidents.jsx';
import Maintenance from '../pages/Maintenance.jsx';
import CashManagement from '../pages/CashManagement.jsx';
import Transactions from '../pages/Transactions.jsx';
import MapPage from '../pages/Map.jsx';
import Reports from '../pages/Reports.jsx';
import Users from '../pages/Users.jsx';
import Settings from '../pages/Settings.jsx';
import NotFound from '../pages/NotFound.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/atms" element={<ATMs />} />
        <Route path="/atms/:id" element={<ATMDetails />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/cash" element={<CashManagement />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}