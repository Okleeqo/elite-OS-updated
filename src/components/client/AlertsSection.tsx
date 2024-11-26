import React from 'react';
import { AlertCircle, Bell, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotificationStore } from '../../stores/notificationStore';

const AlertsSection = () => {
  const notifications = useNotificationStore((state) => 
    state.notifications.filter(n => !n.isRead)
  );

  // Group notifications by type and status
  const pendingQuotes = notifications.filter(n => 
    n.type === 'deal' && 
    (n.metadata?.status === 'pending' || n.metadata?.stage === 'proposal')
  );
  
  const incompleteJobs = notifications.filter(n => 
    n.type === 'deal' && 
    !['won', 'lost'].includes(n.metadata?.stage || '')
  );
  
  const renewals = notifications.filter(n => 
    n.type === 'deal' && 
    n.metadata?.status === 'renewal'
  );

  const alerts = [
    {
      id: 'pending-quotes',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      title: 'Pending Job Quote',
      count: pendingQuotes.length,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      linkColor: 'text-red-600'
    },
    {
      id: 'incomplete-jobs',
      icon: <Bell className="w-5 h-5 text-blue-500" />,
      title: 'Incomplete Job',
      count: incompleteJobs.length,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      linkColor: 'text-blue-600'
    },
    {
      id: 'renewals',
      icon: <RefreshCw className="w-5 h-5 text-green-500" />,
      title: 'Automatic Job Renewal Pending',
      count: renewals.length,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      linkColor: 'text-green-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Alerts</h2>
        <Link 
          to="/client-management/notifications" 
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          alert.count > 0 && (
            <div
              key={alert.id}
              className={`${alert.bgColor} rounded-lg p-4`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {alert.icon}
                  <span className={`font-medium ${alert.textColor}`}>
                    {alert.title} ({alert.count})
                  </span>
                </div>
                <Link
                  to="/client-management/notifications"
                  className={`${alert.linkColor} hover:underline text-sm font-medium`}
                >
                  View Details
                </Link>
              </div>
            </div>
          )
        ))}

        {!notifications.length && (
          <div className="text-center py-6 text-gray-500">
            No active alerts
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsSection;