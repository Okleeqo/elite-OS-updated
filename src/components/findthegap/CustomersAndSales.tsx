import React from 'react';
import { Users, DollarSign, TrendingUp, Repeat } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';
import { formatCurrency } from '../../utils/formatters';
import RevenueChart from './charts/RevenueChart';
import CustomerChart from './charts/CustomerChart';

const CustomersAndSales: React.FC = () => {
  const { financials } = useFinancial();
  const { actual, lastPeriod } = financials;

  // Calculate real-time metrics
  const calculateMetrics = () => {
    const revenue = (actual.revenue || 0) + (actual.serviceRevenue || 0);
    const lastRevenue = (lastPeriod.revenue || 0) + (lastPeriod.serviceRevenue || 0);
    const revenueGrowth = lastRevenue ? ((revenue - lastRevenue) / lastRevenue) * 100 : 0;

    const avgTransactionValue = actual.revenue ? actual.revenue / (actual.customerCount || 1) : 0;
    const lastAvgTransactionValue = lastPeriod.revenue ? lastPeriod.revenue / (lastPeriod.customerCount || 1) : 0;
    const avgTransactionGrowth = lastAvgTransactionValue ? ((avgTransactionValue - lastAvgTransactionValue) / lastAvgTransactionValue) * 100 : 0;

    const retentionRate = actual.retentionRate || 0;
    const lastRetentionRate = lastPeriod.retentionRate || 0;
    const retentionChange = retentionRate - lastRetentionRate;

    const monthlyGrowthRate = revenueGrowth / 12;

    return {
      existingCustomers: {
        value: actual.customerCount || 0,
        change: `${actual.customerCount && lastPeriod.customerCount ? ((actual.customerCount - lastPeriod.customerCount) / lastPeriod.customerCount * 100).toFixed(1) : 0}%`
      },
      retentionRate: {
        value: `${retentionRate.toFixed(1)}%`,
        change: `${retentionChange >= 0 ? '+' : ''}${retentionChange.toFixed(1)}%`
      },
      avgTransactionValue: {
        value: avgTransactionValue,
        formattedValue: formatCurrency(avgTransactionValue),
        change: `${avgTransactionGrowth >= 0 ? '+' : ''}${avgTransactionGrowth.toFixed(1)}%`
      },
      monthlyGrowth: {
        value: `${monthlyGrowthRate.toFixed(1)}%`,
        change: `${revenueGrowth >= 0 ? '+' : ''}${revenueGrowth.toFixed(1)}%`
      }
    };
  };

  const metrics = calculateMetrics();

  const metricCards = [
    {
      title: 'Existing Customers',
      value: metrics.existingCustomers.value,
      change: metrics.existingCustomers.change,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Retention Rate',
      value: metrics.retentionRate.value,
      change: metrics.retentionRate.change,
      icon: Repeat,
      color: 'bg-green-500'
    },
    {
      title: 'Avg Transaction Value',
      value: metrics.avgTransactionValue.formattedValue,
      change: metrics.avgTransactionValue.change,
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      title: 'Monthly Growth Rate',
      value: metrics.monthlyGrowth.value,
      change: metrics.monthlyGrowth.change,
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} p-3 rounded-lg text-white`}>
                  <Icon size={24} />
                </div>
                <span className={`text-sm font-medium ${
                  metric.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{metric.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Revenue Trend</h3>
          <div className="h-64">
            <RevenueChart />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Customer Growth</h3>
          <div className="h-64">
            <CustomerChart />
          </div>
        </div>
      </div>

      {/* Customer Segments */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Customer Segments</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100">Premium Segment (25%)</h4>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              High-value customers with average transaction value greater than {formatCurrency(metrics.avgTransactionValue.value * 2)}
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/50 rounded-lg">
            <h4 className="font-medium text-green-900 dark:text-green-100">Regular Segment (55%)</h4>
            <p className="text-green-700 dark:text-green-300 mt-1">Core customer base with stable purchasing patterns</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/50 rounded-lg">
            <h4 className="font-medium text-orange-900 dark:text-orange-100">New Customers (20%)</h4>
            <p className="text-orange-700 dark:text-orange-300 mt-1">Recently acquired customers requiring nurturing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersAndSales;