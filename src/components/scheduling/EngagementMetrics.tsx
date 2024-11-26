import React from 'react';
import { BarChart2, TrendingUp, Users, Calendar } from 'lucide-react';

const EngagementMetrics: React.FC = () => {
  const metrics = [
    {
      label: 'Total Interactions',
      value: '127',
      change: '+12%',
      icon: BarChart2,
      color: 'text-blue-600'
    },
    {
      label: 'Active Clients',
      value: '45',
      change: '+5%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      label: 'Upcoming Meetings',
      value: '8',
      change: '-2',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      label: 'Response Rate',
      value: '94%',
      change: '+3%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Engagement Metrics</h2>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${metric.color}`} />
                <span className={`text-sm ${
                  metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EngagementMetrics;