import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', customers: 400 },
  { month: 'Feb', customers: 600 },
  { month: 'Mar', customers: 800 },
  { month: 'Apr', customers: 1000 },
  { month: 'May', customers: 1200 },
  { month: 'Jun', customers: 1500 },
  { month: 'Jul', customers: 1800 }
];

const CustomerChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="customers" 
          stroke="#8B5CF6" 
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomerChart;