import React from 'react';
import { Clock, ArrowRight, DollarSign, Package } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';
import WorkingCapitalChart from './charts/WorkingCapitalChart';
import CashFlowChart from './charts/CashFlowChart';

const CashConversionCycle: React.FC = () => {
  const { financials } = useFinancial();
  const { actual, lastPeriod } = financials;

  // Calculate real-time metrics
  const calculateMetrics = () => {
    const dso = actual.receivableDays || 0;
    const lastDso = lastPeriod.receivableDays || 0;
    const dsoChange = dso - lastDso;

    const dio = actual.inventoryDays || 0;
    const lastDio = lastPeriod.inventoryDays || 0;
    const dioChange = dio - lastDio;

    const dpo = actual.payableDays || 0;
    const lastDpo = lastPeriod.payableDays || 0;
    const dpoChange = dpo - lastDpo;

    const ccc = dso + dio - dpo;
    const lastCcc = lastDso + lastDio - lastDpo;
    const cccChange = ccc - lastCcc;

    return [
      {
        title: 'Days Sales Outstanding',
        value: `${dso} days`,
        change: `${dsoChange <= 0 ? '-' : '+'}${Math.abs(dsoChange)} days`,
        icon: Clock,
        color: 'bg-blue-500'
      },
      {
        title: 'Days Inventory Outstanding',
        value: `${dio} days`,
        change: `${dioChange <= 0 ? '-' : '+'}${Math.abs(dioChange)} days`,
        icon: Package,
        color: 'bg-green-500'
      },
      {
        title: 'Days Payable Outstanding',
        value: `${dpo} days`,
        change: `${dpoChange >= 0 ? '+' : '-'}${Math.abs(dpoChange)} days`,
        icon: DollarSign,
        color: 'bg-purple-500'
      },
      {
        title: 'Cash Conversion Cycle',
        value: `${ccc} days`,
        change: `${cccChange <= 0 ? '-' : '+'}${Math.abs(cccChange)} days`,
        icon: ArrowRight,
        color: 'bg-orange-500'
      }
    ];
  };

  const metrics = calculateMetrics();

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} p-3 rounded-lg text-white`}>
                  <Icon size={24} />
                </div>
                <span className={`text-sm font-medium ${
                  (metric.title === 'Days Payable Outstanding' && metric.change.startsWith('+')) ||
                  (metric.title !== 'Days Payable Outstanding' && metric.change.startsWith('-'))
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Working Capital Metrics</h3>
          <div className="h-64">
            <WorkingCapitalChart />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Cash Flow Impact</h3>
          <div className="h-64">
            <CashFlowChart />
          </div>
        </div>
      </div>

      {/* Optimization Opportunities */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Optimization Opportunities</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100">Receivables Management</h4>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              {actual.receivableDays > 45 
                ? 'Implement early payment discounts to reduce DSO by 5 days'
                : 'Current DSO is within optimal range'}
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/50 rounded-lg">
            <h4 className="font-medium text-green-900 dark:text-green-100">Inventory Optimization</h4>
            <p className="text-green-700 dark:text-green-300 mt-1">
              {actual.inventoryDays > 60
                ? 'Adopt JIT inventory management to reduce holding costs'
                : 'Current inventory turnover is efficient'}
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
            <h4 className="font-medium text-purple-900 dark:text-purple-100">Payables Strategy</h4>
            <p className="text-purple-700 dark:text-purple-300 mt-1">
              {actual.payableDays < 30
                ? 'Negotiate extended payment terms with key suppliers'
                : 'Current DPO is well-managed'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashConversionCycle;