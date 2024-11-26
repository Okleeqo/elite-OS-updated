import React from 'react';
import { Users, DollarSign, TrendingUp, Clock, Star, Calendar, Download, PieChart } from 'lucide-react';

const FinancialOverview: React.FC = () => {
  const metrics = [
    {
      title: 'Active Clients',
      value: '48',
      change: '+5',
      isPositive: true,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Average Client Value',
      value: '$10,925',
      change: '+15.2%',
      isPositive: true,
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Client Retention Rate',
      value: '95%',
      change: '+2.4%',
      isPositive: true,
      icon: Star,
      color: 'bg-purple-500'
    },
    {
      title: 'Revenue per Hour',
      value: '$450',
      change: '+8.5%',
      isPositive: true,
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  const recentActivities = [
    {
      client: 'John Smith',
      activity: 'Portfolio Review',
      revenue: 2500,
      date: '2024-03-15'
    },
    {
      client: 'Sarah Johnson',
      activity: 'Financial Planning Session',
      revenue: 1800,
      date: '2024-03-14'
    },
    {
      client: 'Michael Brown',
      activity: 'Investment Strategy',
      revenue: 3000,
      date: '2024-03-13'
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Practice Overview</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5 mr-2" />
          Export Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.color} p-3 rounded-lg text-white`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-medium ${
                metric.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
            <p className="text-sm text-gray-500 mt-1">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Client Growth & Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Client Growth</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Client growth chart will be implemented here
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trends</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Revenue trends chart will be implemented here
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-500">Client</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Activity</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Revenue</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-0">
                  <td className="py-3">{activity.client}</td>
                  <td className="py-3">{activity.activity}</td>
                  <td className="py-3">${activity.revenue.toLocaleString()}</td>
                  <td className="py-3 flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(activity.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Practice Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Service Mix</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Service distribution pie chart will be implemented here
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Time Allocation</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Time allocation chart will be implemented here
          </div>
        </div>
      </div>

      {/* Client Segments */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Client Segments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900">High-Value Clients</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">12</p>
            <p className="text-sm text-blue-700 mt-1">45% of Revenue</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-900">Core Clients</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">28</p>
            <p className="text-sm text-green-700 mt-1">40% of Revenue</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium text-purple-900">Growth Potential</h3>
            <p className="text-2xl font-bold text-purple-600 mt-2">8</p>
            <p className="text-sm text-purple-700 mt-1">15% of Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;