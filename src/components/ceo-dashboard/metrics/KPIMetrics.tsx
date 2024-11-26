import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Percent, Activity, Scale } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import { formatCurrency } from '../../../utils/formatters';

export function KPIMetrics() {
  const { financials } = useFinancial();
  const { actual } = financials;
  
  // Calculate KPIs
  const totalRevenue = (actual.revenue || 0) + (actual.serviceRevenue || 0);
  const grossProfit = totalRevenue - (actual.cogs || 0);
  const grossMargin = (grossProfit / totalRevenue) * 100;
  const operatingExpenses = (actual.operatingExpenses || 0) + 
    (actual.marketingExpenses || 0) + 
    (actual.adminExpenses || 0) + 
    (actual.researchDevelopment || 0);
  const operatingIncome = grossProfit - operatingExpenses;
  const operatingMargin = (operatingIncome / totalRevenue) * 100;
  
  const currentAssets = (actual.cash || 0) + 
    (actual.accountsReceivable || 0) + 
    (actual.inventory || 0);
  const currentLiabilities = (actual.accountsPayable || 0) + 
    (actual.shortTermDebt || 0);
  const currentRatio = currentAssets / currentLiabilities;

  const KPICard = ({ title, value, icon: Icon, trend, subtitle }: {
    title: string;
    value: string;
    icon: any;
    trend?: 'up' | 'down';
    subtitle?: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">{title}</span>
            {trend && (
              <span className={`flex items-center text-sm ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </span>
            )}
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {subtitle && (
              <p className="ml-2 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
        </div>
        <div className={`p-2 rounded-lg ${
          trend === 'up' ? 'bg-green-50' : trend === 'down' ? 'bg-red-50' : 'bg-gray-50'
        }`}>
          <Icon className={`h-6 w-6 ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <KPICard
        title="Total Revenue"
        value={formatCurrency(totalRevenue)}
        icon={DollarSign}
        trend={totalRevenue > 0 ? 'up' : 'down'}
      />
      <KPICard
        title="Operating Margin"
        value={`${operatingMargin.toFixed(1)}%`}
        icon={Percent}
        trend={operatingMargin > 20 ? 'up' : 'down'}
      />
      <KPICard
        title="Current Ratio"
        value={currentRatio.toFixed(2)}
        icon={Scale}
        trend={currentRatio > 1 ? 'up' : 'down'}
        subtitle="Liquidity"
      />
      <KPICard
        title="Operating Cash Flow"
        value={formatCurrency(operatingIncome)}
        icon={Activity}
        trend={operatingIncome > 0 ? 'up' : 'down'}
      />
    </div>
  );
}