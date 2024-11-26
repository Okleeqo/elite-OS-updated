import React from 'react';
import { DollarSign } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import { DonutChart } from './DonutChart';

export function RevenueStructure() {
  const { financials } = useFinancial();
  const { actual } = financials;

  const data = [
    {
      name: 'Product Revenue',
      value: actual.revenue || 0,
      color: 'fill-blue-500',
      dotColor: 'bg-blue-500'
    },
    {
      name: 'Service Revenue',
      value: actual.serviceRevenue || 0,
      color: 'fill-emerald-500',
      dotColor: 'bg-emerald-500'
    }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-600 rounded-lg">
          <DollarSign className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Revenue Structure</h3>
      </div>

      <div className="flex flex-col items-center">
        <DonutChart data={data} total={total} />
        <div className="mt-6 space-y-3 w-full">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.dotColor}`} />
                <span className="text-gray-600">{item.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">
                  ${item.value.toLocaleString()}
                </span>
                <span className="text-gray-500 w-16 text-right">
                  {total === 0 ? 'NaN%' : `${((item.value / total) * 100).toFixed(1)}%`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}