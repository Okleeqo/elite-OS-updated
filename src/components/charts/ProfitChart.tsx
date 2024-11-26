import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', profit: 2400 },
  { month: 'Feb', profit: 1398 },
  { month: 'Mar', profit: 9800 },
  { month: 'Apr', profit: 3908 },
  { month: 'May', profit: 4800 },
  { month: 'Jun', profit: 3800 },
  { month: 'Jul', profit: 4300 }
];

const ProfitChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="profit" fill="#10B981" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProfitChart;