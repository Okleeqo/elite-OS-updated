import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFinancial } from '../../../context/FinancialContext';
import { formatCurrency } from '../../../utils/formatters';

const ProfitChart: React.FC = () => {
  const { financials } = useFinancial();
  const { actual, lastPeriod, budget } = financials;

  // Calculate profits in real-time based on financial data
  const calculateProfits = (data: typeof actual) => {
    const revenue = (data.revenue || 0) + (data.serviceRevenue || 0);
    const grossProfit = revenue - (data.cogs || 0);
    const operatingExpenses = (data.operatingExpenses || 0) + 
      (data.marketingExpenses || 0) + 
      (data.adminExpenses || 0) + 
      (data.researchDevelopment || 0);
    const operatingProfit = grossProfit - operatingExpenses;
    const netIncome = operatingProfit - (data.interestExpense || 0) + 
      (data.otherIncome || 0) - (data.otherExpenses || 0);

    return { grossProfit, operatingProfit, netIncome };
  };

  const actualProfits = calculateProfits(actual);
  const lastPeriodProfits = calculateProfits(lastPeriod);
  const budgetProfits = calculateProfits(budget);

  const data = [
    {
      name: 'Gross Profit',
      actual: actualProfits.grossProfit,
      lastPeriod: lastPeriodProfits.grossProfit,
      budget: budgetProfits.grossProfit
    },
    {
      name: 'Operating Profit',
      actual: actualProfits.operatingProfit,
      lastPeriod: lastPeriodProfits.operatingProfit,
      budget: budgetProfits.operatingProfit
    },
    {
      name: 'Net Income',
      actual: actualProfits.netIncome,
      lastPeriod: lastPeriodProfits.netIncome,
      budget: budgetProfits.netIncome
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
          tickFormatter={(value) => formatCurrency(value)}
          className="dark:fill-gray-300"
        />
        <Tooltip
          formatter={(value: number) => formatCurrency(value)}
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

export default ProfitChart;