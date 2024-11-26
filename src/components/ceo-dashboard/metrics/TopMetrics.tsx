import React from 'react';
import { DollarSign, Activity, TrendingUp, Wallet, CreditCard } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';

export function TopMetrics() {
  const { financials } = useFinancial();
  const { actual, lastPeriod, budget } = financials;

  const metrics = [
    {
      id: 'revenue',
      label: 'REVENUE',
      value: '$0',
      icon: DollarSign,
      iconBg: 'bg-blue-500',
      comparisons: {
        lastPeriod: '-100.0%',
        budget: '-100.0%'
      }
    },
    {
      id: 'gross-profit',
      label: 'GROSS PROFIT',
      value: '$0',
      icon: Activity,
      iconBg: 'bg-emerald-500',
      comparisons: {
        lastPeriod: '-100.0%',
        budget: '-100.0%'
      }
    },
    {
      id: 'net-income',
      label: 'NET INCOME',
      value: '$0',
      icon: TrendingUp,
      iconBg: 'bg-purple-500',
      comparisons: {
        lastPeriod: '-100.0%',
        budget: '-100.0%'
      }
    },
    {
      id: 'ebitda',
      label: 'EBITDA',
      value: '$0',
      icon: Activity,
      iconBg: 'bg-violet-500',
      comparisons: {
        lastPeriod: '-100.0%',
        budget: '-100.0%'
      }
    },
    {
      id: 'cash',
      label: 'CASH',
      value: '$0',
      icon: Wallet,
      iconBg: 'bg-green-500',
      comparisons: {
        lastPeriod: '-100.0%',
        budget: '-100.0%'
      }
    },
    {
      id: 'debt',
      label: 'DEBT',
      value: '$0',
      icon: CreditCard,
      iconBg: 'bg-red-500',
      comparisons: {
        lastPeriod: '-100.0%',
        budget: '-100.0%'
      }
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`p-2 rounded-lg ${metric.iconBg}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-500">{metric.label}</span>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">vs Last Period</p>
                  <p className="text-sm font-medium text-red-600">
                    {metric.comparisons.lastPeriod}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">vs Budget</p>
                  <p className="text-sm font-medium text-red-600">
                    {metric.comparisons.budget}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}