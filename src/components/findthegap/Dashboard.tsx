import React from 'react';
import { DollarSign, TrendingUp, Clock, Users } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';
import { formatCurrency } from '../../utils/formatters';
import RevenueChart from './charts/RevenueChart';
import ProfitChart from './charts/ProfitChart';

interface MetricCardProps {
  icon: React.ElementType;
  iconBgColor: string;
  iconColor: string;
  value: string;
  label: string;
  change: string;
  changeColor: string;
  subtitle?: string;
  bgGradient: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  iconBgColor,
  iconColor,
  value,
  label,
  change,
  changeColor,
  subtitle,
  bgGradient
}) => (
  <div className={`relative overflow-hidden rounded-xl p-4 ${bgGradient} shadow-md hover:shadow-lg transition-shadow duration-300`}>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px)] bg-[size:3rem] opacity-10"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5"></div>
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <div className={`${iconBgColor} p-2 rounded-lg shadow-md`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${changeColor}`}>
          {change}
        </span>
      </div>
      <div className="space-y-0.5">
        <h3 className="text-xl font-bold text-white">{value}</h3>
        <p className="text-sm text-white/90 font-medium">{label}</p>
        {subtitle && (
          <p className="text-xs text-white/70">{subtitle}</p>
        )}
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { financials } = useFinancial();
  const { actual, lastPeriod } = financials;

  // Calculate metrics
  const revenue = (actual.revenue || 0) + (actual.serviceRevenue || 0);
  const lastRevenue = (lastPeriod.revenue || 0) + (lastPeriod.serviceRevenue || 0);
  const revenueChange = lastRevenue ? ((revenue - lastRevenue) / lastRevenue) * 100 : 0;

  const grossProfit = revenue - (actual.cogs || 0);
  const lastGrossProfit = lastRevenue - (lastPeriod.cogs || 0);
  const grossProfitChange = lastGrossProfit ? ((grossProfit - lastGrossProfit) / lastGrossProfit) * 100 : 0;

  const netIncome = grossProfit - (actual.operatingExpenses || 0);
  const lastNetIncome = lastGrossProfit - (lastPeriod.operatingExpenses || 0);
  const netMargin = revenue ? (netIncome / revenue) * 100 : 0;
  const lastNetMargin = lastRevenue ? (lastNetIncome / lastRevenue) * 100 : 0;
  const netMarginChange = lastNetMargin ? netMargin - lastNetMargin : 0;

  const ccc = (actual.receivableDays || 0) + (actual.inventoryDays || 0) - (actual.payableDays || 0);
  const lastCcc = (lastPeriod.receivableDays || 0) + (lastPeriod.inventoryDays || 0) - (lastPeriod.payableDays || 0);
  const cccChange = lastCcc ? ccc - lastCcc : 0;

  const metrics = [
    {
      icon: DollarSign,
      iconBgColor: 'bg-blue-600/20',
      iconColor: 'text-blue-600',
      value: formatCurrency(revenue),
      label: 'Revenue',
      change: `${revenueChange >= 0 ? '+' : ''}${revenueChange.toFixed(1)}%`,
      changeColor: revenueChange >= 0 ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800',
      bgGradient: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      icon: TrendingUp,
      iconBgColor: 'bg-green-600/20',
      iconColor: 'text-green-600',
      value: `${netMargin.toFixed(1)}%`,
      label: 'Net Profit Margin',
      change: `${netMarginChange >= 0 ? '+' : ''}${netMarginChange.toFixed(1)}%`,
      changeColor: netMarginChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
      bgGradient: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      icon: Clock,
      iconBgColor: 'bg-purple-600/20',
      iconColor: 'text-purple-600',
      value: `${ccc} days`,
      label: 'Cash Conversion Cycle',
      change: `${cccChange <= 0 ? '-' : '+'}${Math.abs(cccChange)} days`,
      changeColor: cccChange <= 0 ? 'bg-purple-100 text-purple-800' : 'bg-red-100 text-red-800',
      subtitle: 'Days to convert investments into cash flows',
      bgGradient: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      iconBgColor: 'bg-orange-600/20',
      iconColor: 'text-orange-600',
      value: formatCurrency(grossProfit),
      label: 'Gross Profit',
      change: `${grossProfitChange >= 0 ? '+' : ''}${grossProfitChange.toFixed(1)}%`,
      changeColor: grossProfitChange >= 0 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800',
      bgGradient: 'bg-gradient-to-br from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Revenue Trend</h3>
          <div className="h-64">
            <RevenueChart />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Profit Analysis</h3>
          <div className="h-64">
            <ProfitChart />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recommendations</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100">Revenue Strategy</h4>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              {revenue > lastRevenue
                ? 'Current revenue growth is positive. Consider expanding into new markets.'
                : 'Focus on revenue growth through increased sales and marketing efforts.'}
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/50 rounded-lg">
            <h4 className="font-medium text-green-900 dark:text-green-100">Profitability</h4>
            <p className="text-green-700 dark:text-green-300 mt-1">
              {netMargin > lastNetMargin
                ? 'Margin improvement shows effective cost management.'
                : 'Review cost structure and pricing strategy to improve margins.'}
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
            <h4 className="font-medium text-purple-900 dark:text-purple-100">Working Capital</h4>
            <p className="text-purple-700 dark:text-purple-300 mt-1">
              {ccc < lastCcc
                ? 'Working capital efficiency has improved.'
                : 'Focus on optimizing inventory and receivables management.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;