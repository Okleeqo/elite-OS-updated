import React from 'react';
import { Bar } from 'recharts';
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { campaign: 'Campaign 1', opens: 65, clicks: 45 },
  { campaign: 'Campaign 2', opens: 59, clicks: 39 },
  { campaign: 'Campaign 3', opens: 80, clicks: 60 },
  { campaign: 'Campaign 4', opens: 81, clicks: 61 },
  { campaign: 'Campaign 5', opens: 56, clicks: 36 }
];

const EmailCampaignGraph: React.FC = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="campaign" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="opens" fill="#FFA726" />
          <Bar dataKey="clicks" fill="#FF7043" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmailCampaignGraph;