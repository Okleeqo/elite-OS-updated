import React from 'react';
import { TrendingUp, DollarSign, Users, ShoppingCart } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';
import { formatCurrency } from '../../utils/formatters';
import ProfitChart from './charts/ProfitChart';
import CashFlowChart from './charts/CashFlowChart';

const ProfitOptimization: React.FC = () => {
  const { financials } = useFinancial();
  const { actual, lastPeriod, budget } = financials;

  // Calculate real-time metrics
  const calculateMetrics = () => {
    const revenue = (actual.revenue || 0) + (actual.serviceRevenue || 0);
    const lastRevenue = (lastPeriod.revenue || 0) + (lastPeriod.serviceRevenue || 0);
    const budgetRevenue = (budget.revenue || 0) + (budget.serviceRevenue || 0);
    
    const revenueGrowth = lastRevenue ? ((revenue - lastRevenue) / lastRevenue) * 100 : 0;
    const revenueBudgetVar = budgetRevenue ? ((revenue - budgetRevenue) / budgetRevenue) * 100 : 0;

    const costs = (actual.cogs || 0) + (actual.operatingExpenses || 0);
    const lastCosts = (lastPeriod.cogs || 0) + (lastPeriod.operatingExpenses || 0);
    const costReduction = lastCosts ? ((lastCosts - costs) / lastCosts) * 100 : 0;

    const retentionRate = actual.retentionRate || 0;
    const lastRetentionRate = lastPeriod.retentionRate || 0;
    const retentionChange = retentionRate - lastRetentionRate;

    const avgOrderValue = revenue / (actual.customerCount || 1);
    const lastAvgOrderValue = lastRevenue / (lastPeriod.customerCount || 1);
    const avgOrderChange = lastAvgOrderValue ? ((avgOrderValue - lastAvgOrderValue) / lastAvgOrderValue) * 100 : 0;

    return [
      {
        title: 'Revenue Growth',
        value: `+${revenueGrowth.toFixed(1)}%`,
        target: `+${(revenueBudgetVar + 5).toFixed(1)}%`,
        icon: TrendingUp,
        color: 'bg-blue-500'
      },
      {
        title: 'Cost Reduction',
        value: `${costReduction.toFixed(1)}%`,
        target: '-10%',
        icon: DollarSign,
        color: 'bg-green-500'
      },
      {
        title: 'Customer Retention',
        value: `${retentionRate.toFixed(1)}%`,
        target: '90%',
        icon: Users,
        color: 'bg-purple-500'
      },
      {
        title: 'Average Order Value',
        value: formatCurrency(avgOrderValue),
        target: formatCurrency(avgOrderValue * 1.1),
        icon: ShoppingCart,
        color: 'bg-orange-500'
      }
    ];
  };

  const strategies = calculateMetrics();

  return (
    <div className="space-y-6">
      {/* Strategy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {strategies.map((strategy, index) => {
          const Icon = strategy.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${strategy.color} p-3 rounded-lg text-white`}>
                  <Icon size={24} />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Target: {strategy.target}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{strategy.value}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{strategy.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Profit Drivers Analysis</h3>
          <div className="h-64">
            <ProfitChart />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Cash Flow Impact</h3>
          <div className="h-64">
            <CashFlowChart />
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recommended Actions</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100">Pricing Strategy</h4>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              {actual.revenue > lastPeriod.revenue
                ? 'Current pricing strategy is effective. Consider selective price increases for premium segments.'
                : 'Implement value-based pricing to increase margins by 5%'}
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/50 rounded-lg">
            <h4 className="font-medium text-green-900 dark:text-green-100">Cost Management</h4>
            <p className="text-green-700 dark:text-green-300 mt-1">
              {actual.cogs > budget.cogs
                ? 'Optimize supplier contracts to reduce COGS by 3%'
                : 'Cost management is effective. Focus on maintaining current efficiency.'}
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
            <h4 className="font-medium text-purple-900 dark:text-purple-100">Customer Experience</h4>
            <p className="text-purple-700 dark:text-purple-300 mt-1">
              {actual.retentionRate < 90
                ? 'Enhance customer service to improve retention rate'
                : 'Strong customer retention. Focus on upselling opportunities.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitOptimization;