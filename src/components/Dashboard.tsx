import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Gap {
  id: string;
  name: string;
  description: string;
  color: string;
  goals: { id: string; name: string; actions: { id: string; name: string; strategies: { name: string; toolsAndResources: string[] }[] }[] }[];
}

interface DashboardProps {
  gaps: Gap[];
}

const Dashboard: React.FC<DashboardProps> = ({ gaps }) => {
  const gapData = gaps.map((gap) => ({
    name: gap.name,
    goals: gap.goals.length,
    actions: gap.goals.reduce((sum, goal) => sum + goal.actions.length, 0),
    strategies: gap.goals.reduce(
      (sum, goal) => sum + goal.actions.reduce((sum, action) => sum + action.strategies.length, 0),
      0
    ),
  }));

  const totalGoals = gaps.reduce((sum, gap) => sum + gap.goals.length, 0);
  const totalActions = gaps.reduce((sum, gap) => sum + gap.goals.reduce((sum, goal) => sum + goal.actions.length, 0), 0);
  const totalStrategies = gaps.reduce(
    (sum, gap) =>
      sum +
      gap.goals.reduce((sum, goal) => sum + goal.actions.reduce((sum, action) => sum + action.strategies.length, 0), 0),
    0
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Goals-to-Action Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Total Gaps" value={gaps.length} />
        <MetricCard title="Total Goals" value={totalGoals} />
        <MetricCard title="Total Actions" value={totalActions} />
        <MetricCard title="Total Strategies" value={totalStrategies} />
      </div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={gapData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="goals" fill="#8884d8" name="Goals" />
            <Bar dataKey="actions" fill="#82ca9d" name="Actions" />
            <Bar dataKey="strategies" fill="#ffc658" name="Strategies" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default Dashboard;