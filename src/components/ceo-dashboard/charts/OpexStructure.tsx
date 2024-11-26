import React from 'react';
import { Clock } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import { DonutChart } from './DonutChart';

export function OpexStructure() {
  const { financials } = useFinancial();
  const { actual } = financials;

  const data = [
    {
      name: 'Marketing',
      value: actual.marketingExpenses || 0,
      color: 'fill-purple-500',
      dotColor: 'bg-purple-500'
    },
    {
      name: 'Admin',
      value: actual.adminExpenses || 0,
      color: 'fill-amber-500',
      dotColor: 'bg-amber-500'
    },
    {
      name: 'R&D',
      value: actual.researchDevelopment || 0,
      color: 'fill-rose-500',
      dotColor: 'bg-rose-500'
    },
    {
      name: 'Other',
      value: actual.operatingExpenses || 0,
      color: 'fill-slate-500',
      dotColor: 'bg-slate-500'
    }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-600 rounded-lg">
          <Clock className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">OPEX Structure</h3>
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