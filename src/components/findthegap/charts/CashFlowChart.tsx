import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFinancial } from '../../../context/FinancialContext';
import { formatCurrency } from '../../../utils/formatters';

const CashFlowChart: React.FC = () => {
  const { financials } = useFinancial();
  const { actual, lastPeriod, budget } = financials;

  // Calculate cash flows in real-time
  const calculateCashFlows = (data: typeof actual) => {
    const revenue = (data.revenue || 0) + (data.serviceRevenue || 0);
    const operatingExpenses = (data.operatingExpenses || 0) + 
      (data.marketingExpenses || 0) + 
      (data.adminExpenses || 0);
    
    const operatingCF = revenue - (data.cogs || 0) - operatingExpenses;
    const investingCF = -(data.assetPurchases || 0) + (data.assetSales || 0);
    const financingCF = (data.newDebt || 0) - (data.debtRepayments || 0);
    
    return { operatingCF, investingCF, financingCF };
  };

  // Generate monthly data
  const generateMonthlyData = () => {
    const actualFlows = calculateCashFlows(actual);
    const lastPeriodFlows = calculateCashFlows(lastPeriod);
    const budgetFlows = calculateCashFlows(budget);

    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
      const growthFactor = 1 + (index * 0.02); // 2% monthly growth
      
      return {
        name: month,
        operating: Math.round(actualFlows.operatingCF * growthFactor),
        investing: Math.round(actualFlows.investingCF * growthFactor),
        financing: Math.round(actualFlows.financingCF * growthFactor),
        lastPeriod: Math.round(lastPeriodFlows.operatingCF * growthFactor),
        budget: Math.round(budgetFlows.operatingCF * growthFactor)
      };
    });
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
        <Line 
          type="monotone" 
          dataKey="operating" 
          name="Operating CF"
          stroke="#3B82F6" 
          strokeWidth={2}
          dot={false}
        />
        <Line 
          type="monotone" 
          dataKey="investing" 
          name="Investing CF"
          stroke="#10B981" 
          strokeWidth={2}
          dot={false}
        />
        <Line 
          type="monotone" 
          dataKey="financing" 
          name="Financing CF"
          stroke="#9CA3AF" 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CashFlowChart;