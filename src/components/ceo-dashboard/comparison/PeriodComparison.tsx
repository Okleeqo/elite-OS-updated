import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BarChart2 } from 'lucide-react';

interface ComparisonRowProps {
  title: string;
  actual: number;
  lastPeriod: { value: number; change: number };
  budget: { value: number; change: number };
}

const ComparisonRow: React.FC<ComparisonRowProps> = ({
  title,
  actual,
  lastPeriod,
  budget
}) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h4 className="text-sm font-medium text-gray-700 mb-3">{title}</h4>
    <div className="space-y-4">
      {/* Actual */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-600">Actual</span>
          <span className="font-medium">${actual.toLocaleString()}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div className="h-full bg-gray-300 rounded-full" style={{ width: '100%' }} />
        </div>
      </div>

      {/* Last Period */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-600">Last Period</span>
          <div>
            <span className="font-medium">${lastPeriod.value.toLocaleString()}</span>
            <span className="ml-2 text-red-600">({lastPeriod.change}%)</span>
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div className="h-full bg-[#E5F3FF] rounded-full" style={{ width: '100%' }} />
        </div>
      </div>

      {/* Budget */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-600">Budget</span>
          <div>
            <span className="font-medium">${budget.value.toLocaleString()}</span>
            <span className="ml-2 text-red-600">({budget.change}%)</span>
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div className="h-full bg-[#E5F3FF] rounded-full" style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  </div>
);

export function PeriodComparison() {
  const [expandedSections, setExpandedSections] = useState({
    income: true,
    balance: false,
    cash: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const expandAll = () => {
    setExpandedSections({
      income: true,
      balance: true,
      cash: true
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      income: false,
      balance: false,
      cash: false
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-bold text-gray-900">Period Comparison</h2>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={expandAll}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Expand All
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={collapseAll}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Collapse All
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Income Statement */}
          <div className="border rounded-lg">
            <button
              onClick={() => toggleSection('income')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <h3 className="text-lg font-medium text-gray-900">Income Statement</h3>
              {expandedSections.income ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {expandedSections.income && (
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ComparisonRow
                  title="Revenues"
                  actual={0}
                  lastPeriod={{ value: 6000000, change: -100.0 }}
                  budget={{ value: 6000000, change: -100.0 }}
                />
                <ComparisonRow
                  title="Gross Profit"
                  actual={0}
                  lastPeriod={{ value: 4000000, change: -100.0 }}
                  budget={{ value: 4000000, change: -100.0 }}
                />
                <ComparisonRow
                  title="Net Income"
                  actual={0}
                  lastPeriod={{ value: 2000000, change: -100.0 }}
                  budget={{ value: 2000000, change: -100.0 }}
                />
                <ComparisonRow
                  title="EBITDA"
                  actual={0}
                  lastPeriod={{ value: 2250000, change: -100.0 }}
                  budget={{ value: 2250000, change: -100.0 }}
                />
              </div>
            )}
          </div>

          {/* Balance Sheet */}
          <div className="border rounded-lg">
            <button
              onClick={() => toggleSection('balance')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <h3 className="text-lg font-medium text-gray-900">Balance Sheet</h3>
              {expandedSections.balance ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {expandedSections.balance && (
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ComparisonRow
                  title="Assets"
                  actual={0}
                  lastPeriod={{ value: 6200000, change: -100.0 }}
                  budget={{ value: 6200000, change: -100.0 }}
                />
                <ComparisonRow
                  title="Debt"
                  actual={0}
                  lastPeriod={{ value: 1800000, change: -100.0 }}
                  budget={{ value: 1800000, change: -100.0 }}
                />
                <ComparisonRow
                  title="Liabilities"
                  actual={0}
                  lastPeriod={{ value: 2200000, change: -100.0 }}
                  budget={{ value: 2200000, change: -100.0 }}
                />
                <ComparisonRow
                  title="Equity"
                  actual={0}
                  lastPeriod={{ value: 4000000, change: -100.0 }}
                  budget={{ value: 4000000, change: -100.0 }}
                />
              </div>
            )}
          </div>

          {/* Cash Flow */}
          <div className="border rounded-lg">
            <button
              onClick={() => toggleSection('cash')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <h3 className="text-lg font-medium text-gray-900">Cash Flow</h3>
              {expandedSections.cash ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {expandedSections.cash && (
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ComparisonRow
                  title="Operating CF"
                  actual={0}
                  lastPeriod={{ value: 2140000, change: -100.0 }}
                  budget={{ value: 2140000, change: -100.0 }}
                />
                <ComparisonRow
                  title="Investing CF"
                  actual={0}
                  lastPeriod={{ value: -300000, change: -100.0 }}
                  budget={{ value: -300000, change: -100.0 }}
                />
                <ComparisonRow
                  title="Financing CF"
                  actual={0}
                  lastPeriod={{ value: 300000, change: -100.0 }}
                  budget={{ value: 300000, change: -100.0 }}
                />
                <ComparisonRow
                  title="Total CF"
                  actual={0}
                  lastPeriod={{ value: 2140000, change: -100.0 }}
                  budget={{ value: 2140000, change: -100.0 }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}