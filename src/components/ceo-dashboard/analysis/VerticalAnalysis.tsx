import React, { useState } from 'react';
import { useFinancial } from '../../../context/FinancialContext';
import { formatCurrency } from '../../../utils/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function VerticalAnalysis() {
  const { financials } = useFinancial();
  const { actual, lastPeriod, budget } = financials;
  const [activeTab, setActiveTab] = useState<'income' | 'balance' | 'cash'>('income');

  const calculatePercentage = (value: number, total: number) => {
    return total === 0 ? 0 : (value / total) * 100;
  };

  const AnalysisRow = ({ 
    label, 
    value, 
    percentage, 
    lastValue, 
    lastPercentage,
    budgetValue,
    budgetPercentage,
    reverseColors = false
  }: { 
    label: string;
    value: number;
    percentage: number;
    lastValue: number;
    lastPercentage: number;
    budgetValue: number;
    budgetPercentage: number;
    reverseColors?: boolean;
  }) => {
    const horizontalChange = ((value - lastValue) / lastValue) * 100;
    const horizontalBudgetVar = ((value - budgetValue) / budgetValue) * 100;

    return (
      <tr className="border-b border-gray-100 hover:bg-gray-50">
        <td className="py-3 pl-4">
          <span className="font-medium text-gray-900">{label}</span>
        </td>
        <td className="py-3 px-4 text-right">
          <div className="font-medium">{formatCurrency(value)}</div>
          <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
        </td>
        <td className={`py-3 px-4 text-right ${
          horizontalChange > 0 
            ? reverseColors ? 'text-red-600' : 'text-green-600'
            : reverseColors ? 'text-green-600' : 'text-red-600'
        }`}>
          <div className="flex items-center justify-end space-x-1">
            <div>
              <div>{formatCurrency(lastValue)}</div>
              <div className="text-sm">{lastPercentage.toFixed(1)}%</div>
            </div>
            {horizontalChange !== 0 && (
              horizontalChange > 0 
                ? <TrendingUp className="h-4 w-4" />
                : <TrendingDown className="h-4 w-4" />
            )}
          </div>
          <div className="text-xs mt-1">
            {horizontalChange > 0 ? '+' : ''}{horizontalChange.toFixed(1)}%
          </div>
        </td>
        <td className={`py-3 px-4 text-right ${
          horizontalBudgetVar > 0
            ? reverseColors ? 'text-red-600' : 'text-green-600'
            : reverseColors ? 'text-green-600' : 'text-red-600'
        }`}>
          <div className="flex items-center justify-end space-x-1">
            <div>
              <div>{formatCurrency(budgetValue)}</div>
              <div className="text-sm">{budgetPercentage.toFixed(1)}%</div>
            </div>
            {horizontalBudgetVar !== 0 && (
              horizontalBudgetVar > 0
                ? <TrendingUp className="h-4 w-4" />
                : <TrendingDown className="h-4 w-4" />
            )}
          </div>
          <div className="text-xs mt-1">
            {horizontalBudgetVar > 0 ? '+' : ''}{horizontalBudgetVar.toFixed(1)}%
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-xl text-white">
        <h1 className="text-3xl font-bold">Financial Analysis</h1>
        <p className="text-lg opacity-90">Vertical & Horizontal Analysis</p>
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
                ? 'bg-blue-600 text-white'
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
              {activeTab === 'income' ? 'Income Statement Analysis' :
               activeTab === 'balance' ? 'Balance Sheet Analysis' :
               'Cash Flow Analysis'}
            </h3>
            <div className="text-sm text-gray-500">
              Vertical % and Horizontal Analysis
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 pl-4 font-medium text-gray-600">Item</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">
                  <div>Actual</div>
                  <div className="text-xs font-normal">Amount & % of Total</div>
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">
                  <div>vs Last Period</div>
                  <div className="text-xs font-normal">Amount, % & Change</div>
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">
                  <div>vs Budget</div>
                  <div className="text-xs font-normal">Amount, % & Variance</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {activeTab === 'income' && (
                <>
                  <AnalysisRow
                    label="Revenue"
                    value={(actual.revenue || 0) + (actual.serviceRevenue || 0)}
                    percentage={100}
                    lastValue={(lastPeriod.revenue || 0) + (lastPeriod.serviceRevenue || 0)}
                    lastPercentage={100}
                    budgetValue={(budget.revenue || 0) + (budget.serviceRevenue || 0)}
                    budgetPercentage={100}
                  />
                  <AnalysisRow
                    label="Cost of Goods Sold"
                    value={actual.cogs || 0}
                    percentage={calculatePercentage(actual.cogs || 0, (actual.revenue || 0) + (actual.serviceRevenue || 0))}
                    lastValue={lastPeriod.cogs || 0}
                    lastPercentage={calculatePercentage(lastPeriod.cogs || 0, (lastPeriod.revenue || 0) + (lastPeriod.serviceRevenue || 0))}
                    budgetValue={budget.cogs || 0}
                    budgetPercentage={calculatePercentage(budget.cogs || 0, (budget.revenue || 0) + (budget.serviceRevenue || 0))}
                    reverseColors
                  />
                  <AnalysisRow
                    label="Operating Expenses"
                    value={(actual.operatingExpenses || 0) + (actual.marketingExpenses || 0)}
                    percentage={calculatePercentage((actual.operatingExpenses || 0) + (actual.marketingExpenses || 0), (actual.revenue || 0) + (actual.serviceRevenue || 0))}
                    lastValue={(lastPeriod.operatingExpenses || 0) + (lastPeriod.marketingExpenses || 0)}
                    lastPercentage={calculatePercentage((lastPeriod.operatingExpenses || 0) + (lastPeriod.marketingExpenses || 0), (lastPeriod.revenue || 0) + (lastPeriod.serviceRevenue || 0))}
                    budgetValue={(budget.operatingExpenses || 0) + (budget.marketingExpenses || 0)}
                    budgetPercentage={calculatePercentage((budget.operatingExpenses || 0) + (budget.marketingExpenses || 0), (budget.revenue || 0) + (budget.serviceRevenue || 0))}
                    reverseColors
                  />
                </>
              )}

              {activeTab === 'balance' && (
                <>
                  <AnalysisRow
                    label="Total Assets"
                    value={(actual.cash || 0) + (actual.accountsReceivable || 0) + (actual.inventory || 0)}
                    percentage={100}
                    lastValue={(lastPeriod.cash || 0) + (lastPeriod.accountsReceivable || 0) + (lastPeriod.inventory || 0)}
                    lastPercentage={100}
                    budgetValue={(budget.cash || 0) + (budget.accountsReceivable || 0) + (budget.inventory || 0)}
                    budgetPercentage={100}
                  />
                  <AnalysisRow
                    label="Total Liabilities"
                    value={(actual.accountsPayable || 0) + (actual.shortTermDebt || 0) + (actual.longTermDebt || 0)}
                    percentage={calculatePercentage((actual.accountsPayable || 0) + (actual.shortTermDebt || 0) + (actual.longTermDebt || 0), (actual.cash || 0) + (actual.accountsReceivable || 0) + (actual.inventory || 0))}
                    lastValue={(lastPeriod.accountsPayable || 0) + (lastPeriod.shortTermDebt || 0) + (lastPeriod.longTermDebt || 0)}
                    lastPercentage={calculatePercentage((lastPeriod.accountsPayable || 0) + (lastPeriod.shortTermDebt || 0) + (lastPeriod.longTermDebt || 0), (lastPeriod.cash || 0) + (lastPeriod.accountsReceivable || 0) + (lastPeriod.inventory || 0))}
                    budgetValue={(budget.accountsPayable || 0) + (budget.shortTermDebt || 0) + (budget.longTermDebt || 0)}
                    budgetPercentage={calculatePercentage((budget.accountsPayable || 0) + (budget.shortTermDebt || 0) + (budget.longTermDebt || 0), (budget.cash || 0) + (budget.accountsReceivable || 0) + (budget.inventory || 0))}
                    reverseColors
                  />
                </>
              )}

              {activeTab === 'cash' && (
                <>
                  <AnalysisRow
                    label="Operating Cash Flow"
                    value={(actual.revenue || 0) - (actual.cogs || 0) - (actual.operatingExpenses || 0)}
                    percentage={100}
                    lastValue={(lastPeriod.revenue || 0) - (lastPeriod.cogs || 0) - (lastPeriod.operatingExpenses || 0)}
                    lastPercentage={100}
                    budgetValue={(budget.revenue || 0) - (budget.cogs || 0) - (budget.operatingExpenses || 0)}
                    budgetPercentage={100}
                  />
                  <AnalysisRow
                    label="Investing Cash Flow"
                    value={-(actual.assetPurchases || 0)}
                    percentage={calculatePercentage(-(actual.assetPurchases || 0), (actual.revenue || 0) - (actual.cogs || 0) - (actual.operatingExpenses || 0))}
                    lastValue={-(lastPeriod.assetPurchases || 0)}
                    lastPercentage={calculatePercentage(-(lastPeriod.assetPurchases || 0), (lastPeriod.revenue || 0) - (lastPeriod.cogs || 0) - (lastPeriod.operatingExpenses || 0))}
                    budgetValue={-(budget.assetPurchases || 0)}
                    budgetPercentage={calculatePercentage(-(budget.assetPurchases || 0), (budget.revenue || 0) - (budget.cogs || 0) - (budget.operatingExpenses || 0))}
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