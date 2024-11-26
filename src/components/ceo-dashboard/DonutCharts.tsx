import React from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { formatCurrency } from '../../utils/formatters';
import { PieChart, DollarSign } from 'lucide-react';

export function DonutCharts() {
  const { financials } = useFinancial();
  const { actual } = financials;

  // Calculate revenue structure
  const totalRevenue = (actual.revenue || 0) + (actual.serviceRevenue || 0);
  const revenueStructure = [
    { label: 'Product Revenue', value: (actual.revenue || 0), color: 'fill-blue-500', dotColor: 'bg-blue-500' },
    { label: 'Service Revenue', value: (actual.serviceRevenue || 0), color: 'fill-emerald-500', dotColor: 'bg-emerald-500' },
  ];

  // Calculate operating expenses structure
  const totalOpex = (actual.operatingExpenses || 0) + 
    (actual.marketingExpenses || 0) + 
    (actual.adminExpenses || 0) + 
    (actual.researchDevelopment || 0);
  const opexStructure = [
    { label: 'Marketing', value: (actual.marketingExpenses || 0), color: 'fill-purple-500', dotColor: 'bg-purple-500' },
    { label: 'Admin', value: (actual.adminExpenses || 0), color: 'fill-amber-500', dotColor: 'bg-amber-500' },
    { label: 'R&D', value: (actual.researchDevelopment || 0), color: 'fill-rose-500', dotColor: 'bg-rose-500' },
    { label: 'Other', value: (actual.operatingExpenses || 0), color: 'fill-slate-500', dotColor: 'bg-slate-500' },
  ];

  const DonutChart = ({ 
    data, 
    total 
  }: { 
    data: { label: string; value: number; color: string; dotColor: string; }[]; 
    total: number; 
  }) => {
    let cumulativePercent = 0;

    return (
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {data.map((item, i) => {
            if (total === 0) return null;
            
            const percent = (item.value / total) * 100;
            const startAngle = (cumulativePercent * 3.6) * (Math.PI / 180);
            const endAngle = ((cumulativePercent + percent) * 3.6) * (Math.PI / 180);
            
            const x1 = 50 + 40 * Math.cos(startAngle);
            const y1 = 50 + 40 * Math.sin(startAngle);
            const x2 = 50 + 40 * Math.cos(endAngle);
            const y2 = 50 + 40 * Math.sin(endAngle);
            
            const largeArcFlag = percent > 50 ? 1 : 0;
            
            const pathData = [
              `M 50 50`,
              `L ${x1} ${y1}`,
              `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `Z`
            ].join(' ');
            
            cumulativePercent += percent;
            
            return (
              <path
                key={i}
                d={pathData}
                className={`${item.color} hover:opacity-90 transition-opacity`}
                stroke="white"
                strokeWidth="1"
              />
            );
          })}
          <circle cx="50" cy="50" r="25" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl font-bold">{formatCompactNumber(total)}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
        </div>
      </div>
    );
  };

  // Helper function to format numbers in a compact way
  const formatCompactNumber = (num: number) => {
    if (num >= 1e6) return `${Math.round(num / 1e6)}M`;
    if (num >= 1e3) return `${Math.round(num / 1e3)}K`;
    return Math.round(num).toString();
  };

  const StructureCard = ({
    title,
    icon: Icon,
    data,
    total,
    iconColor
  }: {
    title: string;
    icon: any;
    data: typeof revenueStructure;
    total: number;
    iconColor: string;
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-2 rounded-lg ${iconColor}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>

      <div className="flex flex-col items-center">
        <DonutChart data={data} total={total} />
        <div className="mt-6 space-y-3 w-full">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.dotColor}`} />
                <span className="text-gray-600">{item.label}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">
                  {formatCurrency(item.value)}
                </span>
                <span className="text-gray-500 w-16 text-right">
                  {((item.value / total) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <StructureCard
        title="Revenue Structure"
        icon={DollarSign}
        data={revenueStructure}
        total={totalRevenue}
        iconColor="bg-blue-600"
      />
      <StructureCard
        title="OPEX Structure"
        icon={PieChart}
        data={opexStructure}
        total={totalOpex}
        iconColor="bg-purple-600"
      />
    </div>
  );
}