import React from 'react';
import { Percent, Scale, Activity, TrendingUp } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';

export function PerformanceMetrics() {
  const metrics = [
    {
      id: 'gross-margin',
      label: 'GROSS MARGIN',
      icon: Percent,
      iconBg: 'bg-blue-500',
      value: 'NaN%',
      comparisons: {
        lastPeriod: 'NaN%',
        budget: 'NaN%'
      }
    },
    {
      id: 'net-margin',
      label: 'NET MARGIN',
      icon: TrendingUp,
      iconBg: 'bg-indigo-500',
      value: 'NaN%',
      comparisons: {
        lastPeriod: 'NaN%',
        budget: 'NaN%'
      }
    },
    {
      id: 'ebitda-margin',
      label: 'EBITDA MARGIN',
      icon: Activity,
      iconBg: 'bg-violet-500',
      value: 'NaN%',
      comparisons: {
        lastPeriod: 'NaN%',
        budget: 'NaN%'
      }
    },
    {
      id: 'return-on-assets',
      label: 'RETURN ON ASSETS',
      icon: Scale,
      iconBg: 'bg-emerald-500',
      value: 'NaN%',
      comparisons: {
        lastPeriod: 'NaN%',
        budget: 'NaN%'
      }
    },
    {
      id: 'return-on-equity',
      label: 'RETURN ON EQUITY',
      icon: TrendingUp,
      iconBg: 'bg-green-500',
      value: 'NaN%',
      comparisons: {
        lastPeriod: 'NaN%',
        budget: 'NaN%'
      }
    },
    {
      id: 'working-capital',
      label: 'WORKING CAPITAL',
      icon: Activity,
      iconBg: 'bg-orange-500',
      value: '$0',
      comparisons: {
        lastPeriod: '-100.0%',
        budget: '-100.0%'
      }
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Profitability & Efficiency</h2>
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
    </div>
  );
}