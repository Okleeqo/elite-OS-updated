import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BarChart2, Users, FileText, Calendar, DollarSign, TrendingUp, ArrowRight, Bell, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useClientStore } from '../stores/clientStore';
import { usePipelineStore } from '../stores/pipelineStore';
import { useNotificationStore } from '../stores/notificationStore';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

interface ActivityItemProps {
  color: string;
  text: string;
  time: string;
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.FC<{ size?: number }>;
}

interface GoalItemProps {
  title: string;
  progress: number;
  target: string;
  dueDate: string;
}

const Dashboard: React.FC = () => {
  const clients = useClientStore((state) => state.clients);
  const { leads, getTotalValue } = usePipelineStore();
  const notifications = useNotificationStore((state) => state.notifications);

  // Calculate real metrics
  const activeClients = clients.filter(client => client.status === 'active').length;
  const totalRevenue = getTotalValue();
  const newLeadsCount = leads.filter(lead => lead.stage === 'warm-lead').length;
  const avgClientValue = clients.length > 0 ? Math.round(totalRevenue / clients.length) : 0;

  // Get recent activities from notifications
  const recentActivities = notifications
    .slice(0, 3)
    .map(notification => ({
      color: notification.type === 'client' ? 'bg-blue-500' : 
             notification.type === 'deal' ? 'bg-emerald-500' : 'bg-indigo-500',
      text: notification.message,
      timestamp: new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Elite Advisor OS™️</h1>
        <p className="text-gray-300 text-lg">Your comprehensive financial advisory platform</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Active Clients" 
            value={activeClients.toString()} 
            change={"+3"}
            icon={Users}
          />
          <MetricCard 
            title="Total Revenue" 
            value={`$${totalRevenue.toLocaleString()}`} 
            change={"+12%"}
            icon={DollarSign}
          />
          <MetricCard 
            title="New Leads" 
            value={newLeadsCount.toString()} 
            change={newLeadsCount > 0 ? `+${newLeadsCount}` : "0"}
            icon={Target}
          />
          <MetricCard 
            title="Avg. Client Value" 
            value={`$${avgClientValue.toLocaleString()}`} 
            change={"+5%"}
            icon={TrendingUp}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Tools & Apps"
          description="Access integrated tools"
          icon={<BarChart2 size={24} />}
          color="from-orange-500 to-orange-600"
          link="/tools-apps"
        />
        <DashboardCard
          title="Offer Creation"
          description="Create client offers"
          icon={<FileText size={24} />}
          color="from-blue-500 to-blue-600"
          link="/offer-creation"
        />
        <DashboardCard
          title="Engage Hub"
          description="Manage your pipeline"
          icon={<Calendar size={24} />}
          color="from-teal-500 to-teal-600"
          link="/scheduling"
        />
        <DashboardCard
          title="Client Management"
          description="Track client relationships"
          icon={<Users size={24} />}
          color="from-rose-500 to-rose-600"
          link="/client-management"
        />
      </div>

      {/* Activity & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-blue-600" />
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            {recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <ActivityItem 
                    key={index} 
                    color={activity.color} 
                    text={activity.text}
                    time={activity.time}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No recent activities</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Target className="w-5 h-5 mr-2 text-emerald-600" />
              Active Goals
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <GoalItem 
              title="Increase Client Base"
              progress={75}
              target="50 clients"
              dueDate="Mar 31, 2024"
            />
            <GoalItem 
              title="Revenue Growth"
              progress={60}
              target="$500K"
              dueDate="Apr 15, 2024"
            />
            <GoalItem 
              title="Client Retention"
              progress={90}
              target="95%"
              dueDate="May 1, 2024"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, color, link }) => {
  return (
    <Link 
      to={link} 
      className={`bg-gradient-to-r ${color} text-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:scale-105`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white bg-opacity-20 rounded-lg">
          {icon}
        </div>
        <ArrowRight className="w-5 h-5 text-white opacity-75" />
      </div>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-sm text-white text-opacity-90">{description}</p>
    </Link>
  );
};

const ActivityItem: React.FC<ActivityItemProps> = ({ color, text, time }) => (
  <div className="flex items-start space-x-3">
    <div className={`w-2 h-2 ${color} rounded-full mt-2`}></div>
    <div className="flex-grow">
      <p className="text-gray-700 text-sm">{text}</p>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  </div>
);

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon }) => {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <Icon size={20} className="text-white opacity-80" />
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          isPositive ? 'bg-emerald-500 bg-opacity-25 text-emerald-100' : 'bg-red-500 bg-opacity-25 text-red-100'
        }`}>
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-sm text-gray-300">{title}</p>
    </div>
  );
};

const GoalItem: React.FC<GoalItemProps> = ({ title, progress, target, dueDate }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <h4 className="font-medium text-gray-900">{title}</h4>
    <p className="text-sm text-gray-500">Target: {target}</p>
    <div className="mt-2">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-600 mt-1">{progress}% completed</p>
    </div>
  </div>
);

export default Dashboard;