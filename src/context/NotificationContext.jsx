import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { on } from '../services/simulationService.js';
import { uid } from '../utils/helpers.js';

export const NotificationContext = createContext(null);

const MAX_NOTIFICATIONS = 30;

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const push = useCallback((notif) => {
    const entry = {
      id: notif.id ?? uid('notif'),
      type: notif.type ?? 'info',
      title: notif.title ?? 'Notification',
      message: notif.message ?? '',
      createdAt: notif.createdAt ?? new Date().toISOString(),
      read: false,
      meta: notif.meta ?? {},
    };
    setNotifications((prev) => [entry, ...prev].slice(0, MAX_NOTIFICATIONS));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clear = useCallback(() => setNotifications([]), []);

  const dismiss = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Subscribe to simulation events → push a notification per new alert
  useEffect(() => {
    const off = on('alert:new', (alert) => {
      push({
        type: alert.severity, // critical | warning | info
        title: `${alert.severity.toUpperCase()} · ${alert.atmId}`,
        message: alert.message,
        meta: { atmId: alert.atmId, alertId: alert.id },
        createdAt: alert.createdAt,
      });
    });
    return () => off();
  }, [push]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      open,
      setOpen,
      push,
      markAllRead,
      clear,
      dismiss,
    }),
    [notifications, unreadCount, open, push, markAllRead, clear, dismiss]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}