import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFinancial } from '../../../context/FinancialContext';
import { formatCurrency } from '../../../utils/formatters';

const RevenueChart: React.FC = () => {
  const { financials } = useFinancial();
  const { actual, lastPeriod, budget } = financials;

  // Generate monthly data based on actual values and growth rates
  const generateMonthlyData = () => {
    const baseRevenue = (actual.revenue || 0) + (actual.serviceRevenue || 0);
    const lastBaseRevenue = (lastPeriod.revenue || 0) + (lastPeriod.serviceRevenue || 0);
    const budgetBaseRevenue = (budget.revenue || 0) + (budget.serviceRevenue || 0);
    
    // Calculate monthly growth rates
    const monthlyGrowthRate = 0.05; // 5% monthly growth
    
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => ({
      name: month,
      actual: Math.round(baseRevenue * (1 + monthlyGrowthRate * index)),
      lastPeriod: Math.round(lastBaseRevenue * (1 + monthlyGrowthRate * index)),
      budget: Math.round(budgetBaseRevenue * (1 + monthlyGrowthRate * index))
    }));
  };

  const data = generateMonthlyData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
          </linearGradient>
        </defs>
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
        <Area
          type="monotone"
          dataKey="actual"
          stroke="#3B82F6"
          fill="url(#actualGradient)"
          strokeWidth={2}
          name="Actual"
        />
        <Area
          type="monotone"
          dataKey="lastPeriod"
          stroke="#9CA3AF"
          fill="none"
          strokeDasharray="5 5"
          strokeWidth={2}
          name="Last Period"
        />
        <Area
          type="monotone"
          dataKey="budget"
          stroke="#10B981"
          fill="none"
          strokeDasharray="3 3"
          strokeWidth={2}
          name="Budget"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;