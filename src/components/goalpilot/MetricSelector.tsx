import React from 'react';
import { PieChart, TrendingUp, DollarSign, Clock, ChevronRight } from 'lucide-react';

interface MetricSelectorProps {
  selectedMetric: string;
  onSelectMetric: (metric: string) => void;
}

const metrics = [
  {
    name: 'Gross Profit',
    icon: DollarSign,
    description: 'Revenue minus cost of goods sold'
  },
  {
    name: 'Gross Profit Margin',
    icon: TrendingUp,
    description: 'Gross profit as a percentage of revenue'
  },
  {
    name: 'Operating Profit',
    icon: DollarSign,
    description: 'Profit from core business operations'
  },
  {
    name: 'Operating Profit Margin',
    icon: TrendingUp,
    description: 'Operating profit as a percentage of revenue'
  },
  {
    name: 'Profitability Ratio',
    icon: PieChart,
    description: 'Net income as a percentage of revenue'
  },
  {
    name: 'Net Profit Margin',
    icon: TrendingUp,
    description: 'Net profit as a percentage of revenue'
  },
  {
    name: 'Cash Conversion Cycle',
    icon: Clock,
    description: 'Time to convert investments into cash flows'
  },
  {
    name: 'Operating Cash Flow',
    icon: DollarSign,
    description: 'Cash generated from core business operations'
  },
  {
    name: 'Free Cash Flow',
    icon: DollarSign,
    description: 'Operating cash flow minus capital expenditures'
  }
];

const MetricSelector: React.FC<MetricSelectorProps> = ({ selectedMetric, onSelectMetric }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Select a Metric</h2>
      <div className="space-y-2">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <button
              key={metric.name}
              onClick={() => onSelectMetric(metric.name)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedMetric === metric.name
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Icon className="w-5 h-5 mr-3" />
                <div className="flex-grow">
                  <div className="font-medium">{metric.name}</div>
                  <div className="text-sm text-gray-500">{metric.description}</div>
                </div>
                {selectedMetric === metric.name && (
                  <ChevronRight className="w-5 h-5 text-blue-500" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MetricSelector;