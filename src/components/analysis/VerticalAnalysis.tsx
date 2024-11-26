import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { formatCurrency } from '../../utils/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function VerticalAnalysis() {
  const { financials } = useFinancial();
  const { actual, lastPeriod, budget } = financials;
  const [activeTab, setActiveTab] = useState<'income' | 'balance' | 'cash'>('income');

  // Income Statement Analysis
  const calculateIncomeAnalysis = (data: typeof actual) => {
    const revenue = (data.revenue || 0) + (data.serviceRevenue || 0);
    const cogs = data.cogs || 0;
    const grossProfit = revenue - cogs;
    const operatingExpenses = (data.operatingExpenses || 0) + 
      (data.marketingExpenses || 0) + 
      (data.adminExpenses || 0) + 
      (data.researchDevelopment || 0);
    const operatingIncome = grossProfit - operatingExpenses;
    const netIncome = operatingIncome - (data.interestExpense || 0);

    return {
      values: {
        revenue,
        cogs,
        grossProfit,
        operatingExpenses,
        operatingIncome,
        netIncome
      },
      vertical: {
        revenue: 100,
        cogs: (cogs / revenue) * 100,
        grossProfit: (grossProfit / revenue) * 100,
        operatingExpenses: (operatingExpenses / revenue) * 100,
        operatingIncome: (operatingIncome / revenue) * 100,
        netIncome: (netIncome / revenue) * 100
      }
    };
  };

  // Balance Sheet Analysis
  const calculateBalanceAnalysis = (data: typeof actual) => {
    const currentAssets = (data.cash || 0) + 
      (data.accountsReceivable || 0) + 
      (data.inventory || 0);
    const fixedAssets = (data.buildings || 0) + 
      (data.equipment || 0) + 
      (data.land || 0);
    const totalAssets = currentAssets + fixedAssets;
    
    const currentLiabilities = (data.accountsPayable || 0) + 
      (data.shortTermDebt || 0);
    const longTermLiabilities = data.longTermDebt || 0;
    const totalLiabilities = currentLiabilities + longTermLiabilities;
    
    const equity = totalAssets - totalLiabilities;

    return {
      values: {
        currentAssets,
        fixedAssets,
        totalAssets,
        currentLiabilities,
        longTermLiabilities,
        totalLiabilities,
        equity
      },
      vertical: {
        currentAssets: (currentAssets / totalAssets) * 100,
        fixedAssets: (fixedAssets / totalAssets) * 100,
        totalAssets: 100,
        currentLiabilities: (currentLiabilities / totalAssets) * 100,
        longTermLiabilities: (longTermLiabilities / totalAssets) * 100,
        totalLiabilities: (totalLiabilities / totalAssets) * 100,
        equity: (equity / totalAssets) * 100
      }
    };
  };

  // Cash Flow Analysis
  const calculateCashFlowAnalysis = (data: typeof actual) => {
    const operatingCF = ((data.revenue || 0) - (data.cogs || 0) - 
      (data.operatingExpenses || 0) + (data.depreciation || 0));
    const investingCF = -(data.assetPurchases || 0) + (data.assetSales || 0);
    const financingCF = (data.newDebt || 0) - (data.debtRepayments || 0);
    const totalCF = operatingCF + investingCF + financingCF;

    return {
      values: {
        operatingCF,
        investingCF,
        financingCF,
        totalCF
      },
      vertical: {
        operatingCF: (operatingCF / Math.abs(totalCF)) * 100,
        investingCF: (investingCF / Math.abs(totalCF)) * 100,
        financingCF: (financingCF / Math.abs(totalCF)) * 100,
        totalCF: 100
      }
    };
  };

  const actualAnalysis = {
    income: calculateIncomeAnalysis(actual),
    balance: calculateBalanceAnalysis(actual),
    cash: calculateCashFlowAnalysis(actual)
  };

  const lastPeriodAnalysis = {
    income: calculateIncomeAnalysis(lastPeriod),
    balance: calculateBalanceAnalysis(lastPeriod),
    cash: calculateCashFlowAnalysis(lastPeriod)
  };

  const budgetAnalysis = {
    income: calculateIncomeAnalysis(budget),
    balance: calculateBalanceAnalysis(budget),
    cash: calculateCashFlowAnalysis(budget)
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
                    value={actualAnalysis.income.values.revenue}
                    percentage={actualAnalysis.income.vertical.revenue}
                    lastValue={lastPeriodAnalysis.income.values.revenue}
                    lastPercentage={lastPeriodAnalysis.income.vertical.revenue}
                    budgetValue={budgetAnalysis.income.values.revenue}
                    budgetPercentage={budgetAnalysis.income.vertical.revenue}
                  />
                  <AnalysisRow
                    label="Cost of Goods Sold"
                    value={actualAnalysis.income.values.cogs}
                    percentage={actualAnalysis.income.vertical.cogs}
                    lastValue={lastPeriodAnalysis.income.values.cogs}
                    lastPercentage={lastPeriodAnalysis.income.vertical.cogs}
                    budgetValue={budgetAnalysis.income.values.cogs}
                    budgetPercentage={budgetAnalysis.income.vertical.cogs}
                    reverseColors
                  />
                  <AnalysisRow
                    label="Gross Profit"
                    value={actualAnalysis.income.values.grossProfit}
                    percentage={actualAnalysis.income.vertical.grossProfit}
                    lastValue={lastPeriodAnalysis.income.values.grossProfit}
                    lastPercentage={lastPeriodAnalysis.income.vertical.grossProfit}
                    budgetValue={budgetAnalysis.income.values.grossProfit}
                    budgetPercentage={budgetAnalysis.income.vertical.grossProfit}
                  />
                  <AnalysisRow
                    label="Operating Expenses"
                    value={actualAnalysis.income.values.operatingExpenses}
                    percentage={actualAnalysis.income.vertical.operatingExpenses}
                    lastValue={lastPeriodAnalysis.income.values.operatingExpenses}
                    lastPercentage={lastPeriodAnalysis.income.vertical.operatingExpenses}
                    budgetValue={budgetAnalysis.income.values.operatingExpenses}
                    budgetPercentage={budgetAnalysis.income.vertical.operatingExpenses}
                    reverseColors
                  />
                  <AnalysisRow
                    label="Net Income"
                    value={actualAnalysis.income.values.netIncome}
                    percentage={actualAnalysis.income.vertical.netIncome}
                    lastValue={lastPeriodAnalysis.income.values.netIncome}
                    lastPercentage={lastPeriodAnalysis.income.vertical.netIncome}
                    budgetValue={budgetAnalysis.income.values.netIncome}
                    budgetPercentage={budgetAnalysis.income.vertical.netIncome}
                  />
                </>
              )}

              {activeTab === 'balance' && (
                <>
                  <AnalysisRow
                    label="Current Assets"
                    value={actualAnalysis.balance.values.currentAssets}
                    percentage={actualAnalysis.balance.vertical.currentAssets}
                    lastValue={lastPeriodAnalysis.balance.values.currentAssets}
                    lastPercentage={lastPeriodAnalysis.balance.vertical.currentAssets}
                    budgetValue={budgetAnalysis.balance.values.currentAssets}
                    budgetPercentage={budgetAnalysis.balance.vertical.currentAssets}
                  />
                  <AnalysisRow
                    label="Fixed Assets"
                    value={actualAnalysis.balance.values.fixedAssets}
                    percentage={actualAnalysis.balance.vertical.fixedAssets}
                    lastValue={lastPeriodAnalysis.balance.values.fixedAssets}
                    lastPercentage={lastPeriodAnalysis.balance.vertical.fixedAssets}
                    budgetValue={budgetAnalysis.balance.values.fixedAssets}
                    budgetPercentage={budgetAnalysis.balance.vertical.fixedAssets}
                  />
                  <AnalysisRow
                    label="Total Assets"
                    value={actualAnalysis.balance.values.totalAssets}
                    percentage={actualAnalysis.balance.vertical.totalAssets}
                    lastValue={lastPeriodAnalysis.balance.values.totalAssets}
                    lastPercentage={lastPeriodAnalysis.balance.vertical.totalAssets}
                    budgetValue={budgetAnalysis.balance.values.totalAssets}
                    budgetPercentage={budgetAnalysis.balance.vertical.totalAssets}
                  />
                  <AnalysisRow
                    label="Current Liabilities"
                    value={actualAnalysis.balance.values.currentLiabilities}
                    percentage={actualAnalysis.balance.vertical.currentLiabilities}
                    lastValue={lastPeriodAnalysis.balance.values.currentLiabilities}
                    lastPercentage={lastPeriodAnalysis.balance.vertical.currentLiabilities}
                    budgetValue={budgetAnalysis.balance.values.currentLiabilities}
                    budgetPercentage={budgetAnalysis.balance.vertical.currentLiabilities}
                    reverseColors
                  />
                  <AnalysisRow
                    label="Long-term Liabilities"
                    value={actualAnalysis.balance.values.longTermLiabilities}
                    percentage={actualAnalysis.balance.vertical.longTermLiabilities}
                    lastValue={lastPeriodAnalysis.balance.values.longTermLiabilities}
                    lastPercentage={lastPeriodAnalysis.balance.vertical.longTermLiabilities}
                    budgetValue={budgetAnalysis.balance.values.longTermLiabilities}
                    budgetPercentage={budgetAnalysis.balance.vertical.longTermLiabilities}
                    reverseColors
                  />
                  <AnalysisRow
                    label="Total Equity"
                    value={actualAnalysis.balance.values.equity}
                    percentage={actualAnalysis.balance.vertical.equity}
                    lastValue={lastPeriodAnalysis.balance.values.equity}
                    lastPercentage={lastPeriodAnalysis.balance.vertical.equity}
                    budgetValue={budgetAnalysis.balance.values.equity}
                    budgetPercentage={budgetAnalysis.balance.vertical.equity}
                  />
                </>
              )}

              {activeTab === 'cash' && (
                <>
                  <AnalysisRow
                    label="Operating Cash Flow"
                    value={actualAnalysis.cash.values.operatingCF}
                    percentage={actualAnalysis.cash.vertical.operatingCF}
                    lastValue={lastPeriodAnalysis.cash.values.operatingCF}
                    lastPercentage={lastPeriodAnalysis.cash.vertical.operatingCF}
                    budgetValue={budgetAnalysis.cash.values.operatingCF}
                    budgetPercentage={budgetAnalysis.cash.vertical.operatingCF}
                  />
                  <AnalysisRow
                    label="Investing Cash Flow"
                    value={actualAnalysis.cash.values.investingCF}
                    percentage={actualAnalysis.cash.vertical.investingCF}
                    lastValue={lastPeriodAnalysis.cash.values.investingCF}
                    lastPercentage={lastPeriodAnalysis.cash.vertical.investingCF}
                    budgetValue={budgetAnalysis.cash.values.investingCF}
                    budgetPercentage={budgetAnalysis.cash.vertical.investingCF}
                  />
                  <AnalysisRow
                    label="Financing Cash Flow"
                    value={actualAnalysis.cash.values.financingCF}
                    percentage={actualAnalysis.cash.vertical.financingCF}
                    lastValue={lastPeriodAnalysis.cash.values.financingCF}
                    lastPercentage={lastPeriodAnalysis.cash.vertical.financingCF}
                    budgetValue={budgetAnalysis.cash.values.financingCF}
                    budgetPercentage={budgetAnalysis.cash.vertical.financingCF}
                  />
                  <AnalysisRow
                    label="Total Cash Flow"
                    value={actualAnalysis.cash.values.totalCF}
                    percentage={actualAnalysis.cash.vertical.totalCF}
                    lastValue={lastPeriodAnalysis.cash.values.totalCF}
                    lastPercentage={lastPeriodAnalysis.cash.vertical.totalCF}
                    budgetValue={budgetAnalysis.cash.values.totalCF}
                    budgetPercentage={budgetAnalysis.cash.vertical.totalCF}
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

export default VerticalAnalysis;