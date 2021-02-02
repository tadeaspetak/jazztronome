// src/common/providers/APIErrorProvider/index.js
import React, { useState, useCallback, ReactNode, useContext } from "react";
import { nanoid } from "nanoid";

export interface Notification {
  id: string;
  message: string;
}

type NotificationContextProps = {
  notifications: Notification[];
  add: (message: string, id?: string) => void;
  remove: (id: string) => void;
};

export const NotificationContext = React.createContext<
  Partial<NotificationContextProps>
>({});

const rem = (notifications: Notification[], id: string) => {
  const index = notifications.findIndex((n) => n.id === id);
  if (index < 0) return notifications;

  const next = [...notifications];
  next.splice(index, 1);
  return next;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const remove = (id: string) => {
    setNotifications(rem(notifications, id));
  };

  const add = (message: string, id?: string) => {
    const next = id ? rem(notifications, id) : notifications;
    setNotifications([...next, { id: id || nanoid(6), message }]);
  };

  const contextValue: NotificationContextProps = {
    notifications,
    add: useCallback(add, [notifications]),
    remove: useCallback(remove, [notifications]),
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
export function useNotifications() {
  const { notifications, add, remove } = useContext(NotificationContext);
  if (!notifications || !add || !remove) {
    throw new Error("Using notificaitons outside of the notification context.");
  }
  return { notifications, add, remove };
}
