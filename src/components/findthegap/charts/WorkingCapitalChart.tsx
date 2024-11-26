import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFinancial } from '../../../context/FinancialContext';

const WorkingCapitalChart: React.FC = () => {
  const { financials } = useFinancial();
  const { actual, lastPeriod, budget } = financials;

  // Calculate working capital metrics in real-time
  const calculateMetrics = (data: typeof actual) => {
    return {
      receivableDays: data.receivableDays || 0,
      inventoryDays: data.inventoryDays || 0,
      payableDays: data.payableDays || 0
    };
  };

  const actualMetrics = calculateMetrics(actual);
  const lastPeriodMetrics = calculateMetrics(lastPeriod);
  const budgetMetrics = calculateMetrics(budget);

  const data = [
    {
      name: 'Days Sales Outstanding',
      actual: actualMetrics.receivableDays,
      lastPeriod: lastPeriodMetrics.receivableDays,
      budget: budgetMetrics.receivableDays
    },
    {
      name: 'Days Inventory Outstanding',
      actual: actualMetrics.inventoryDays,
      lastPeriod: lastPeriodMetrics.inventoryDays,
      budget: budgetMetrics.inventoryDays
    },
    {
      name: 'Days Payable Outstanding',
      actual: actualMetrics.payableDays,
      lastPeriod: lastPeriodMetrics.payableDays,
      budget: budgetMetrics.payableDays
    }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
        <XAxis 
          dataKey="name" 
          className="dark:fill-gray-300"
        />
        <YAxis 
          label={{ value: 'Days', angle: -90, position: 'insideLeft' }}
          className="dark:fill-gray-300"
        />
        <Tooltip
          formatter={(value: number) => `${value} days`}
          labelStyle={{ color: '#374151' }}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '0.5rem'
          }}
        />
        <Bar 
          dataKey="actual" 
          name="Actual" 
          fill="#3B82F6"
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          dataKey="lastPeriod" 
          name="Last Period" 
          fill="#9CA3AF"
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          dataKey="budget" 
          name="Budget" 
          fill="#10B981"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WorkingCapitalChart;