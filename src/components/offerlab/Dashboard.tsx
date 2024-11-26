import React from 'react';
import { Target, FileText, Settings, Workflow, Bell, TrendingUp, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Active Offers',
      value: '12',
      change: '+2',
      icon: FileText,
      color: 'bg-purple-500'
    },
    {
      title: 'Delivery Rate',
      value: '94%',
      change: '+3.2%',
      icon: Bell,
      color: 'bg-green-500'
    },
    {
      title: 'Client Satisfaction',
      value: '4.8/5',
      change: '+0.3',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Avg. Delivery Time',
      value: '14 days',
      change: '-2 days',
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  const quickActions = [
    {
      title: 'Create New Offer',
      description: 'Start building a new productized offer',
      icon: FileText,
      color: 'bg-blue-500',
      link: '/offers/new'
    },
    {
      title: 'Delivery Parameters',
      description: 'Configure service delivery settings',
      icon: Settings,
      color: 'bg-purple-500',
      link: '/parameters'
    },
    {
      title: 'Manage Workflows',
      description: 'Design and update delivery workflows',
      icon: Workflow,
      color: 'bg-green-500',
      link: '/workflows'
    },
    {
      title: 'View Analytics',
      description: 'Track offer performance metrics',
      icon: TrendingUp,
      color: 'bg-orange-500',
      link: '/analytics'
    }
  ];

  const recentOffers = [
    {
      title: 'Financial Advisory Package',
      type: 'Monthly',
      value: '$2,500/mo',
      status: 'Active'
    },
    {
      title: 'Wealth Management Service',
      type: 'Quarterly',
      value: '$5,000/qtr',
      status: 'Draft'
    },
    {
      title: 'Investment Strategy Review',
      type: 'Weekly',
      value: '$1,000/wk',
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} p-3 rounded-lg text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${
                  metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{metric.title}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.link}
              className={`${action.color} text-white rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105`}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
              <p className="text-sm text-white text-opacity-90">{action.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Offers */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Offers</h2>
        <div className="space-y-4">
          {recentOffers.map((offer, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{offer.title}</h3>
                <p className="text-sm text-gray-500">{offer.type}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{offer.value}</p>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  offer.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {offer.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;