import React from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { formatCurrency } from '../../utils/formatters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function TrendChart() {
  const { financials } = useFinancial();
  const { actual } = financials;

  // Generate sample data for the last 12 months
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const baseRevenue = (actual.revenue || 0) + (actual.serviceRevenue || 0);
    const baseProfit = baseRevenue - (actual.cogs || 0) - (actual.operatingExpenses || 0);
    
    return months.map((month, index) => ({
      name: month,
      revenue: Math.round(baseRevenue * (1 + (Math.sin(index) * 0.2))),
      profit: Math.round(baseProfit * (1 + (Math.sin(index) * 0.15))),
      expenses: Math.round((actual.operatingExpenses || 0) * (1 + (Math.cos(index) * 0.1)))
    }));
  };

  const data = generateMonthlyData();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Financial Trends</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
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
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Revenue"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#6366F1" 
              strokeWidth={2}
              name="Profit"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#EF4444" 
              strokeWidth={2}
              name="Expenses"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}