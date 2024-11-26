import React from 'react';
import { TrendingUp, Users, DollarSign, Clock } from 'lucide-react';
import { usePipelineStore } from '../../stores/pipelineStore';

const PipelineStats: React.FC = () => {
  const { leads, getTotalValue } = usePipelineStore();

  const stats = [
    {
      label: 'Total Pipeline Value',
      value: `$${getTotalValue().toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-blue-500'
    },
    {
      label: 'Active Leads',
      value: leads.filter(l => !['won', 'lost'].includes(l.stage)).length.toString(),
      icon: Users,
      color: 'bg-green-500'
    },
    {
      label: 'Win Rate',
      value: `${Math.round((leads.filter(l => l.stage === 'won').length / leads.length) * 100)}%`,
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      label: 'Avg. Deal Size',
      value: `$${Math.round(getTotalValue() / leads.length).toLocaleString()}`,
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className={`${stat.color} p-3 rounded-lg text-white mr-4`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-xl font-semibold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PipelineStats;