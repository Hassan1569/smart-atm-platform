import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { SimulationProvider } from './context/SimulationContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import NotificationsPanel from './components/layout/NotificationsPanel.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <SimulationProvider>
            <NotificationProvider>
              <ToastProvider>
                <BrowserRouter>
                  <AppRoutes />
                  <NotificationsPanel />
                </BrowserRouter>
              </ToastProvider>
            </NotificationProvider>
          </SimulationProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}