import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '../../../utils/formatters';

interface ScenarioChartProps {
  scenarios: Array<{
    title: string;
    revenue: number;
    profit: number;
    margin: number;
  }>;
}

const ScenarioChart: React.FC<ScenarioChartProps> = ({ scenarios }) => {
  // Transform scenarios data for the chart
  const data = scenarios.map(scenario => ({
    name: scenario.title,
    revenue: scenario.revenue,
    profit: scenario.profit,
    margin: scenario.margin
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
        <XAxis 
          dataKey="name" 
          className="dark:fill-gray-300"
          height={60}
          tick={{ angle: 0 }}
          interval={0}
        />
        <YAxis 
          yAxisId="left"
          tickFormatter={(value) => formatCurrency(value)}
          className="dark:fill-gray-300"
          width={100}
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          tickFormatter={(value) => `${value}%`}
          className="dark:fill-gray-300"
          width={60}
        />
        <Tooltip
          formatter={(value: number, name: string) => {
            if (name === 'margin') {
              return [`${value.toFixed(1)}%`, 'Margin'];
            }
            return [formatCurrency(value), name];
          }}
          labelStyle={{ color: '#374151' }}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '0.5rem',
            padding: '10px'
          }}
        />
        <Legend 
          verticalAlign="top" 
          height={36}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ r: 6 }}
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="profit"
          name="Profit"
          stroke="#10B981"
          strokeWidth={2}
          dot={{ r: 6 }}
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="margin"
          name="Margin"
          stroke="#8B5CF6"
          strokeWidth={2}
          dot={{ r: 6 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ScenarioChart;