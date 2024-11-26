import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NotificationStore, Notification } from '../types/notification';

const generateUniqueId = () => {
  return `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      
      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            id: generateUniqueId(),
            timestamp: new Date().toISOString(),
            isRead: false,
            ...notification
          },
          ...state.notifications
        ]
      })),

      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id ? { ...notification, isRead: true } : notification
        )
      })),

      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map((notification) => ({
          ...notification,
          isRead: true
        }))
      })),

      deleteNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((notification) => notification.id !== id)
      })),

      clearAll: () => set({ notifications: [] }),

      getUnreadCount: () => get().notifications.filter((n) => !n.isRead).length
    }),
    {
      name: 'notifications-storage'
    }
  )
);