import { useState, useCallback } from "react";
import NotificationContext from "./NotificationContext";

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    setNotifications((prev) => {
      const exists = prev.some(
        (n) => n.medicationId === notification.medicationId && n.type === notification.type
      );
      if (exists) return prev;
      return [...prev, { ...notification, id: Date.now() + Math.random() }];
    });
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}