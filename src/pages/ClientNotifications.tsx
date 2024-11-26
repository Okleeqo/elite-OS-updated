import React, { useState } from 'react';
import { 
  Bell, 
  Users, 
  DollarSign, 
  AlertTriangle,
  Check,
  Trash2,
  Filter,
  CheckSquare
} from 'lucide-react';
import { useNotificationStore } from '../stores/notificationStore';
import { NotificationType } from '../types/notification';
import { format } from 'date-fns';

const ClientNotifications = () => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAll 
  } = useNotificationStore();

  const [selectedTypes, setSelectedTypes] = useState<NotificationType[]>([]);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredNotifications = notifications
    .filter(notification => 
      (selectedTypes.length === 0 || selectedTypes.includes(notification.type)) &&
      (!showUnreadOnly || !notification.isRead)
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'client':
        return <Users className="w-5 h-5" />;
      case 'deal':
        return <DollarSign className="w-5 h-5" />;
      case 'system':
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: NotificationType, priority: string) => {
    if (priority === 'high') return 'bg-red-100 text-red-800';
    switch (type) {
      case 'client':
        return 'bg-blue-100 text-blue-800';
      case 'deal':
        return 'bg-green-100 text-green-800';
      case 'system':
        return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Show unread only</label>
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              multiple
              value={selectedTypes}
              onChange={(e) => setSelectedTypes(Array.from(e.target.selectedOptions, option => option.value as NotificationType))}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="client">Client Updates</option>
              <option value="deal">Deal Updates</option>
              <option value="system">System Alerts</option>
            </select>
          </div>
          <button
            onClick={markAllAsRead}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <CheckSquare className="w-5 h-5 mr-2" />
            Mark All Read
          </button>
          <button
            onClick={clearAll}
            className="flex items-center px-4 py-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Clear All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-sm p-4 ${
              !notification.isRead ? 'border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getNotificationColor(notification.type, notification.priority)}`}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {format(new Date(notification.timestamp), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-blue-600 hover:text-blue-700"
                    title="Mark as read"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="text-gray-400 hover:text-red-600"
                  title="Delete notification"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No notifications found</h3>
            <p className="text-gray-500 mt-1">
              {showUnreadOnly
                ? 'You have no unread notifications'
                : 'You have no notifications at this time'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientNotifications;