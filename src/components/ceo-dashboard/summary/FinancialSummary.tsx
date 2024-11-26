import React, { useState } from 'react';
import { useFinancial } from '../../../context/FinancialContext';
import { formatCurrency } from '../../../utils/formatters';
import { ChevronDown, ChevronRight } from 'lucide-react';

export function FinancialSummary() {
  const { financials } = useFinancial();
  const { actual, lastPeriod, budget } = financials;
  const [expandedSections, setExpandedSections] = useState({
    income: true,
    balance: true,
    cash: true
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

  const SummaryRow = ({ 
    label, 
    actual, 
    lastPeriod, 
    budget 
  }: { 
    label: string;
    actual: number;
    lastPeriod: number;
    budget: number;
  }) => (
    <div className="grid grid-cols-4 gap-4 py-4">
      <div className="text-gray-900">{label}</div>
      <div className="text-right">
        <div className="font-medium">{formatCurrency(actual)}</div>
      </div>
      <div className="text-right">
        <div className="font-medium">{formatCurrency(lastPeriod)}</div>
        <div className="text-sm text-red-600">-100.0%</div>
      </div>
      <div className="text-right">
        <div className="font-medium">{formatCurrency(budget)}</div>
        <div className="text-sm text-red-600">-100.0%</div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Financial Summary</h2>
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
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {expandedSections.income && (
              <div className="p-4 border-t">
                <SummaryRow
                  label="Revenues"
                  actual={0}
                  lastPeriod={6000000}
                  budget={6000000}
                />
                <SummaryRow
                  label="Gross Profit"
                  actual={0}
                  lastPeriod={4000000}
                  budget={4000000}
                />
                <SummaryRow
                  label="Net Income"
                  actual={0}
                  lastPeriod={2000000}
                  budget={2000000}
                />
                <SummaryRow
                  label="EBITDA"
                  actual={0}
                  lastPeriod={2250000}
                  budget={2250000}
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
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {expandedSections.balance && (
              <div className="p-4 border-t">
                <SummaryRow
                  label="Assets"
                  actual={0}
                  lastPeriod={6200000}
                  budget={6200000}
                />
                <SummaryRow
                  label="Debt"
                  actual={0}
                  lastPeriod={1800000}
                  budget={1800000}
                />
                <SummaryRow
                  label="Liabilities"
                  actual={0}
                  lastPeriod={2200000}
                  budget={2200000}
                />
                <SummaryRow
                  label="Equity"
                  actual={0}
                  lastPeriod={4000000}
                  budget={4000000}
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
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {expandedSections.cash && (
              <div className="p-4 border-t">
                <SummaryRow
                  label="Operating CF"
                  actual={0}
                  lastPeriod={2140000}
                  budget={2140000}
                />
                <SummaryRow
                  label="Investing CF"
                  actual={-0}
                  lastPeriod={-300000}
                  budget={-300000}
                />
                <SummaryRow
                  label="Financing CF"
                  actual={0}
                  lastPeriod={300000}
                  budget={300000}
                />
                <SummaryRow
                  label="Total CF"
                  actual={0}
                  lastPeriod={2140000}
                  budget={2140000}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}