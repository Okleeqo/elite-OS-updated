import React from 'react';
import { Bell, Check, Clock, X } from 'lucide-react';

const UpcomingReminders: React.FC = () => {
  const reminders = [
    {
      id: 1,
      clientName: 'John Smith',
      type: 'Follow-up Call',
      dueDate: '2024-03-20',
      priority: 'high'
    },
    {
      id: 2,
      clientName: 'Jane Doe',
      type: 'Quarterly Review',
      dueDate: '2024-03-22',
      priority: 'medium'
    },
    {
      id: 3,
      clientName: 'Bob Johnson',
      type: 'Document Review',
      dueDate: '2024-03-25',
      priority: 'low'
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Upcoming Reminders
        </h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-2 h-2 rounded-full ${
                reminder.priority === 'high' ? 'bg-red-500' :
                reminder.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`} />
              <div>
                <h3 className="font-medium text-gray-900">{reminder.clientName}</h3>
                <p className="text-sm text-gray-600">{reminder.type}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">
                  {new Date(reminder.dueDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-gray-200 rounded">
                  <Check className="w-5 h-5 text-green-600" />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <X className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingReminders;