import React, { useState } from 'react';
import { useFinancial } from '../../../context/FinancialContext';
import { formatCurrency } from '../../../utils/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function HorizontalAnalysis() {
  const { financials } = useFinancial();
  const { actual, lastPeriod, budget } = financials;
  const [activeTab, setActiveTab] = useState<'income' | 'balance' | 'cash'>('income');

  const calculateGrowth = (current: number, previous: number) => {
    return previous !== 0 ? ((current - previous) / previous) * 100 : 0;
  };

  const AnalysisRow = ({ 
    label, 
    actual: value, 
    lastPeriod: lastValue,
    budget: budgetValue,
    reverseColors = false
  }: { 
    label: string;
    actual: number;
    lastPeriod: number;
    budget: number;
    reverseColors?: boolean;
  }) => {
    const periodGrowth = calculateGrowth(value, lastValue);
    const budgetVariance = calculateGrowth(value, budgetValue);

    return (
      <tr className="border-b border-gray-100 hover:bg-gray-50">
        <td className="py-3 pl-4">
          <span className="font-medium text-gray-900">{label}</span>
        </td>
        <td className="py-3 px-4 text-right">
          <div className="font-medium">{formatCurrency(value)}</div>
        </td>
        <td className={`py-3 px-4 text-right ${
          periodGrowth > 0 
            ? reverseColors ? 'text-red-600' : 'text-green-600'
            : reverseColors ? 'text-green-600' : 'text-red-600'
        }`}>
          <div className="flex items-center justify-end space-x-2">
            <div>{formatCurrency(lastValue)}</div>
            {periodGrowth !== 0 && (
              periodGrowth > 0 
                ? <TrendingUp className="h-4 w-4" />
                : <TrendingDown className="h-4 w-4" />
            )}
          </div>
          <div className="text-xs mt-1">
            {periodGrowth > 0 ? '+' : ''}{periodGrowth.toFixed(1)}%
          </div>
        </td>
        <td className={`py-3 px-4 text-right ${
          budgetVariance > 0
            ? reverseColors ? 'text-red-600' : 'text-green-600'
            : reverseColors ? 'text-green-600' : 'text-red-600'
        }`}>
          <div className="flex items-center justify-end space-x-2">
            <div>{formatCurrency(budgetValue)}</div>
            {budgetVariance !== 0 && (
              budgetVariance > 0
                ? <TrendingUp className="h-4 w-4" />
                : <TrendingDown className="h-4 w-4" />
            )}
          </div>
          <div className="text-xs mt-1">
            {budgetVariance > 0 ? '+' : ''}{budgetVariance.toFixed(1)}%
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 rounded-xl text-white">
        <h1 className="text-3xl font-bold">Horizontal Analysis</h1>
        <p className="text-lg opacity-90">Period-over-Period Growth & Budget Variances</p>
      </div>

      <div className="flex space-x-4 mb-6">
        {[
          { id: 'income', label: 'Income Statement' },
          { id: 'balance', label: 'Balance Sheet' },
          { id: 'cash', label: 'Cash Flow' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {activeTab === 'income' ? 'Income Statement Growth' :
               activeTab === 'balance' ? 'Balance Sheet Changes' :
               'Cash Flow Trends'}
            </h3>
            <div className="text-sm text-gray-500">
              Growth Rates & Variances
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 pl-4 font-medium text-gray-600">Item</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">
                  <div>Current Period</div>
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">
                  <div>vs Last Period</div>
                  <div className="text-xs font-normal">Amount & Growth %</div>
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">
                  <div>vs Budget</div>
                  <div className="text-xs font-normal">Amount & Variance %</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {activeTab === 'income' && (
                <>
                  <AnalysisRow
                    label="Revenue"
                    actual={(actual.revenue || 0) + (actual.serviceRevenue || 0)}
                    lastPeriod={(lastPeriod.revenue || 0) + (lastPeriod.serviceRevenue || 0)}
                    budget={(budget.revenue || 0) + (budget.serviceRevenue || 0)}
                  />
                  <AnalysisRow
                    label="Cost of Goods Sold"
                    actual={actual.cogs || 0}
                    lastPeriod={lastPeriod.cogs || 0}
                    budget={budget.cogs || 0}
                    reverseColors
                  />
                  <AnalysisRow
                    label="Operating Expenses"
                    actual={(actual.operatingExpenses || 0) + (actual.marketingExpenses || 0)}
                    lastPeriod={(lastPeriod.operatingExpenses || 0) + (lastPeriod.marketingExpenses || 0)}
                    budget={(budget.operatingExpenses || 0) + (budget.marketingExpenses || 0)}
                    reverseColors
                  />
                  <AnalysisRow
                    label="Net Income"
                    actual={(actual.revenue || 0) - (actual.cogs || 0) - (actual.operatingExpenses || 0)}
                    lastPeriod={(lastPeriod.revenue || 0) - (lastPeriod.cogs || 0) - (lastPeriod.operatingExpenses || 0)}
                    budget={(budget.revenue || 0) - (budget.cogs || 0) - (budget.operatingExpenses || 0)}
                  />
                </>
              )}

              {activeTab === 'balance' && (
                <>
                  <AnalysisRow
                    label="Total Assets"
                    actual={(actual.cash || 0) + (actual.accountsReceivable || 0) + (actual.inventory || 0)}
                    lastPeriod={(lastPeriod.cash || 0) + (lastPeriod.accountsReceivable || 0) + (lastPeriod.inventory || 0)}
                    budget={(budget.cash || 0) + (budget.accountsReceivable || 0) + (budget.inventory || 0)}
                  />
                  <AnalysisRow
                    label="Total Liabilities"
                    actual={(actual.accountsPayable || 0) + (actual.shortTermDebt || 0) + (actual.longTermDebt || 0)}
                    lastPeriod={(lastPeriod.accountsPayable || 0) + (lastPeriod.shortTermDebt || 0) + (lastPeriod.longTermDebt || 0)}
                    budget={(budget.accountsPayable || 0) + (budget.shortTermDebt || 0) + (budget.longTermDebt || 0)}
                    reverseColors
                  />
                  <AnalysisRow
                    label="Working Capital"
                    actual={(actual.cash || 0) + (actual.accountsReceivable || 0) - (actual.accountsPayable || 0)}
                    lastPeriod={(lastPeriod.cash || 0) + (lastPeriod.accountsReceivable || 0) - (lastPeriod.accountsPayable || 0)}
                    budget={(budget.cash || 0) + (budget.accountsReceivable || 0) - (budget.accountsPayable || 0)}
                  />
                </>
              )}

              {activeTab === 'cash' && (
                <>
                  <AnalysisRow
                    label="Operating Cash Flow"
                    actual={(actual.revenue || 0) - (actual.cogs || 0) - (actual.operatingExpenses || 0)}
                    lastPeriod={(lastPeriod.revenue || 0) - (lastPeriod.cogs || 0) - (lastPeriod.operatingExpenses || 0)}
                    budget={(budget.revenue || 0) - (budget.cogs || 0) - (budget.operatingExpenses || 0)}
                  />
                  <AnalysisRow
                    label="Investing Cash Flow"
                    actual={-(actual.assetPurchases || 0)}
                    lastPeriod={-(lastPeriod.assetPurchases || 0)}
                    budget={-(budget.assetPurchases || 0)}
                  />
                  <AnalysisRow
                    label="Financing Cash Flow"
                    actual={(actual.newDebt || 0) - (actual.debtRepayments || 0)}
                    lastPeriod={(lastPeriod.newDebt || 0) - (lastPeriod.debtRepayments || 0)}
                    budget={(budget.newDebt || 0) - (budget.debtRepayments || 0)}
                  />
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}