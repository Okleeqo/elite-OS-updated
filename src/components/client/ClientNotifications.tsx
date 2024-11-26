import React, { useState } from 'react';
import { Bell, Mail, Calendar, DollarSign, Filter, Check, Trash2, RefreshCw } from 'lucide-react';
import { useNotificationStore } from '../../stores/notificationStore';
import { NotificationType } from '../../types/notification';

const ClientNotifications: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotificationStore();
  const [filter, setFilter] = useState<'all' | 'unread' | 'client' | 'deal'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');

  const getFilteredNotifications = () => {
    let filtered = [...notifications];
    
    // Apply filters
    if (filter === 'unread') {
      filtered = filtered.filter(n => !n.isRead);
    } else if (filter === 'client') {
      filtered = filtered.filter(n => n.type === 'client');
    } else if (filter === 'deal') {
      filtered = filtered.filter(n => n.type === 'deal');
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
    });

    return filtered;
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'client':
        return <Mail className="w-5 h-5" />;
      case 'deal':
        return <DollarSign className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Bell className="w-6 h-6 mr-2" />
          Notifications
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow px-3 py-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border-none focus:ring-0 text-sm"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
              <option value="client">Client Updates</option>
              <option value="deal">Deal Updates</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow px-3 py-2">
            <RefreshCw className="w-5 h-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border-none focus:ring-0 text-sm"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>
          <button
            onClick={() => markAllAsRead()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Notifications List */}
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
                <div className={`p-2 rounded-lg ${getPriorityColor(notification.priority)}`}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{notification.title}</h3>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(notification.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Mark as read"
                  >
                    <Check className="w-5 h-5 text-blue-600" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  title="Delete notification"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No notifications found</h3>
            <p className="text-gray-500 mt-1">
              {filter === 'unread'
                ? "You're all caught up!"
                : 'No notifications match your current filters.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientNotifications;