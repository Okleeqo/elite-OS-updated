import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFinancial } from '../../../context/FinancialContext';

const CustomerChart: React.FC = () => {
  const { financials } = useFinancial();
  const { actual, lastPeriod } = financials;

  // Generate monthly customer data based on actual values
  const generateMonthlyData = () => {
    const baseCustomers = actual.customerCount || 0;
    const lastCustomers = lastPeriod.customerCount || 0;
    const monthlyGrowthRate = 0.03; // 3% monthly growth

    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => ({
      name: month,
      current: Math.round(baseCustomers * (1 + monthlyGrowthRate * index)),
      previous: Math.round(lastCustomers * (1 + monthlyGrowthRate * index))
    }));
  };

  const data = generateMonthlyData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
        <XAxis 
          dataKey="name" 
          className="dark:fill-gray-300"
        />
        <YAxis 
          className="dark:fill-gray-300"
        />
        <Tooltip
          formatter={(value: number) => value.toLocaleString()}
          labelStyle={{ color: '#374151' }}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '0.5rem'
          }}
        />
        <Line
          type="monotone"
          dataKey="current"
          name="Current Year"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="previous"
          name="Previous Year"
          stroke="#9CA3AF"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomerChart;