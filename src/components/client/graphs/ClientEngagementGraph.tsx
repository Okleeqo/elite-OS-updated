import React from 'react';
import { Line } from 'recharts';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { month: 'Jan', engagement: 65 },
  { month: 'Feb', engagement: 59 },
  { month: 'Mar', engagement: 80 },
  { month: 'Apr', engagement: 81 },
  { month: 'May', engagement: 56 },
  { month: 'Jun', engagement: 55 },
  { month: 'Jul', engagement: 40 }
];

const ClientEngagementGraph: React.FC = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#66BB6A"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClientEngagementGraph;