import React, { useState } from 'react';
import { useFinancial } from '../../../context/FinancialContext';
import { formatCurrency } from '../../../utils/formatters';
import { 
  TrendingUp, TrendingDown, DollarSign, Percent, 
  Scale, Activity, BarChart2, Clock, Wallet,
  RefreshCw, CreditCard, ArrowUpRight
} from 'lucide-react';

export function KPIDashboard() {
  const { financials } = useFinancial();
  const { actual, lastPeriod } = financials;
  const [selectedCategory, setSelectedCategory] = useState<'profitability' | 'efficiency' | 'liquidity' | 'leverage'>('profitability');

  const calculateKPIs = (data: typeof actual) => {
    // Revenue and Income metrics
    const revenue = (data.revenue || 0) + (data.serviceRevenue || 0);
    const cogs = data.cogs || 0;
    const operatingExpenses = (data.operatingExpenses || 0) + 
      (data.marketingExpenses || 0) + 
      (data.adminExpenses || 0) + 
      (data.researchDevelopment || 0);
    const operatingIncome = revenue - cogs - operatingExpenses;
    const netIncome = operatingIncome - (data.interestExpense || 0);
    const ebitda = operatingIncome + (data.depreciation || 0) + (data.amortization || 0);

    // Balance Sheet items
    const currentAssets = (data.cash || 0) + 
      (data.accountsReceivable || 0) + 
      (data.inventory || 0) + 
      (data.prepaidExpenses || 0);
    const totalAssets = currentAssets + 
      (data.buildings || 0) + 
      (data.equipment || 0) + 
      (data.land || 0);
    const currentLiabilities = (data.accountsPayable || 0) + 
      (data.shortTermDebt || 0);
    const totalLiabilities = currentLiabilities + (data.longTermDebt || 0);
    const equity = totalAssets - totalLiabilities;

    return {
      // Profitability
      ebitda,
      ebitdaMargin: revenue > 0 ? (ebitda / revenue) * 100 : 0,
      roi: totalAssets > 0 ? (netIncome / totalAssets) * 100 : 0,
      roe: equity > 0 ? (netIncome / equity) * 100 : 0,
      netProfitMargin: revenue > 0 ? (netIncome / revenue) * 100 : 0,
      grossProfitMargin: revenue > 0 ? ((revenue - cogs) / revenue) * 100 : 0,

      // Efficiency
      inventoryTurnover: (data.inventory || 1) > 0 ? cogs / (data.inventory || 1) : 0,
      arTurnover: (data.accountsReceivable || 1) > 0 ? revenue / (data.accountsReceivable || 1) : 0,
      apTurnover: (data.accountsPayable || 1) > 0 ? cogs / (data.accountsPayable || 1) : 0,
      assetTurnover: totalAssets > 0 ? revenue / totalAssets : 0,
      workingCapital: currentAssets - currentLiabilities,
      burnRate: operatingExpenses > 0 ? (data.cash || 0) / (operatingExpenses / 12) : 0,

      // Liquidity
      currentRatio: currentLiabilities > 0 ? currentAssets / currentLiabilities : 0,
      quickRatio: currentLiabilities > 0 ? (currentAssets - (data.inventory || 0)) / currentLiabilities : 0,
      cashRatio: currentLiabilities > 0 ? (data.cash || 0) / currentLiabilities : 0,
      operatingCashFlow: netIncome + (data.depreciation || 0) + (data.amortization || 0),

      // Leverage
      debtToEquity: equity > 0 ? totalLiabilities / equity : 0,
      dscr: (data.debtRepayments || 1) > 0 ? operatingIncome / (data.debtRepayments || 1) : 0,
      netFinancialPosition: totalLiabilities - (data.cash || 0),
      fixedChargeCoverage: ((data.debtRepayments || 0) + (data.leaseObligations || 0)) > 0 
        ? ebitda / ((data.debtRepayments || 0) + (data.leaseObligations || 0)) 
        : 0
    };
  };

  const currentKPIs = calculateKPIs(actual);
  const previousKPIs = calculateKPIs(lastPeriod);

  const KPICard = ({ 
    title, 
    value, 
    previousValue, 
    format = 'number',
    icon: Icon,
    description
  }: { 
    title: string;
    value: number;
    previousValue: number;
    format?: 'currency' | 'percent' | 'number' | 'ratio';
    icon: any;
    description: string;
  }) => {
    const change = previousValue !== 0 ? ((value - previousValue) / previousValue) * 100 : 0;
    const isPositive = change >= 0;
    const formattedValue = format === 'currency' ? formatCurrency(value) :
                          format === 'percent' ? `${value.toFixed(1)}%` :
                          format === 'ratio' ? value.toFixed(2) :
                          value.toLocaleString();

    return (
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                isPositive ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <Icon className={`h-5 w-5 ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
              <h3 className="font-medium text-gray-900">{title}</h3>
            </div>
            <button 
              className="text-gray-400 hover:text-gray-600"
              title={description}
            >
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900">
              {formattedValue}
            </div>
            <div className="flex items-center space-x-2">
              <span className={`flex items-center ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositive ? <TrendingUp className="h-4 w-4" /> : 
                             <TrendingDown className="h-4 w-4" />}
                <span className="ml-1 text-sm">
                  {isPositive ? '+' : ''}{change.toFixed(1)}%
                </span>
              </span>
              <span className="text-gray-500 text-sm">vs last period</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-8 rounded-xl text-white">
        <h1 className="text-3xl font-bold">Key Performance Indicators</h1>
        <p className="text-lg opacity-90 mt-2">Comprehensive Financial Analysis</p>
      </div>

      {/* Navigation Section */}
      <div className="mt-8">
        <div className="flex space-x-3">
          {[
            { id: 'profitability', label: 'Profitability', icon: DollarSign },
            { id: 'efficiency', label: 'Efficiency', icon: RefreshCw },
            { id: 'liquidity', label: 'Liquidity', icon: Wallet },
            { id: 'leverage', label: 'Leverage', icon: Scale }
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as typeof selectedCategory)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700 relative overflow-hidden before:absolute before:inset-0 before:bg-white before:opacity-20 before:rounded-lg after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-transparent after:via-transparent after:to-white/10'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <category.icon className={`h-5 w-5 ${selectedCategory === category.id ? 'relative z-10' : ''}`} />
              <span className={`font-medium ${selectedCategory === category.id ? 'relative z-10' : ''}`}>
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {selectedCategory === 'profitability' && (
          <>
            <KPICard
              title="EBITDA"
              value={currentKPIs.ebitda}
              previousValue={previousKPIs.ebitda}
              format="currency"
              icon={DollarSign}
              description="Earnings Before Interest, Taxes, Depreciation, and Amortization"
            />
            <KPICard
              title="ROI"
              value={currentKPIs.roi}
              previousValue={previousKPIs.roi}
              format="percent"
              icon={BarChart2}
              description="Return on Investment"
            />
            <KPICard
              title="ROE"
              value={currentKPIs.roe}
              previousValue={previousKPIs.roe}
              format="percent"
              icon={BarChart2}
              description="Return on Equity"
            />
            <KPICard
              title="Net Profit Margin"
              value={currentKPIs.netProfitMargin}
              previousValue={previousKPIs.netProfitMargin}
              format="percent"
              icon={Percent}
              description="Net Income as a percentage of Revenue"
            />
            <KPICard
              title="Gross Profit Margin"
              value={currentKPIs.grossProfitMargin}
              previousValue={previousKPIs.grossProfitMargin}
              format="percent"
              icon={Percent}
              description="Gross Profit as a percentage of Revenue"
            />
          </>
        )}

        {selectedCategory === 'efficiency' && (
          <>
            <KPICard
              title="Inventory Turnover"
              value={currentKPIs.inventoryTurnover}
              previousValue={previousKPIs.inventoryTurnover}
              format="ratio"
              icon={RefreshCw}
              description="How many times inventory is sold and replaced"
            />
            <KPICard
              title="AR Turnover"
              value={currentKPIs.arTurnover}
              previousValue={previousKPIs.arTurnover}
              format="ratio"
              icon={RefreshCw}
              description="How efficiently company collects receivables"
            />
            <KPICard
              title="AP Turnover"
              value={currentKPIs.apTurnover}
              previousValue={previousKPIs.apTurnover}
              format="ratio"
              icon={RefreshCw}
              description="How quickly company pays its suppliers"
            />
            <KPICard
              title="Asset Turnover"
              value={currentKPIs.assetTurnover}
              previousValue={previousKPIs.assetTurnover}
              format="ratio"
              icon={RefreshCw}
              description="How efficiently company uses assets to generate sales"
            />
            <KPICard
              title="Working Capital"
              value={currentKPIs.workingCapital}
              previousValue={previousKPIs.workingCapital}
              format="currency"
              icon={Activity}
              description="Current Assets minus Current Liabilities"
            />
            <KPICard
              title="Burn Rate (Months)"
              value={currentKPIs.burnRate}
              previousValue={previousKPIs.burnRate}
              format="number"
              icon={Clock}
              description="How many months until cash runs out at current spend rate"
            />
          </>
        )}

        {selectedCategory === 'liquidity' && (
          <>
            <KPICard
              title="Current Ratio"
              value={currentKPIs.currentRatio}
              previousValue={previousKPIs.currentRatio}
              format="ratio"
              icon={Scale}
              description="Current Assets divided by Current Liabilities"
            />
            <KPICard
              title="Quick Ratio"
              value={currentKPIs.quickRatio}
              previousValue={previousKPIs.quickRatio}
              format="ratio"
              icon={Scale}
              description="Current Assets (minus Inventory) divided by Current Liabilities"
            />
            <KPICard
              title="Cash Ratio"
              value={currentKPIs.cashRatio}
              previousValue={previousKPIs.cashRatio}
              format="ratio"
              icon={Scale}
              description="Cash divided by Current Liabilities"
            />
            <KPICard
              title="Operating Cash Flow"
              value={currentKPIs.operatingCashFlow}
              previousValue={previousKPIs.operatingCashFlow}
              format="currency"
              icon={Wallet}
              description="Cash generated from core business operations"
            />
          </>
        )}

        {selectedCategory === 'leverage' && (
          <>
            <KPICard
              title="Debt to Equity"
              value={currentKPIs.debtToEquity}
              previousValue={previousKPIs.debtToEquity}
              format="ratio"
              icon={Scale}
              description="Total Debt divided by Total Equity"
            />
            <KPICard
              title="DSCR"
              value={currentKPIs.dscr}
              previousValue={previousKPIs.dscr}
              format="ratio"
              icon={Scale}
              description="Debt Service Coverage Ratio"
            />
            <KPICard
              title="Net Financial Position"
              value={currentKPIs.netFinancialPosition}
              previousValue={previousKPIs.netFinancialPosition}
              format="currency"
              icon={CreditCard}
              description="Total Financial Debts minus Liquid Assets"
            />
            <KPICard
              title="Fixed Charge Coverage"
              value={currentKPIs.fixedChargeCoverage}
              previousValue={previousKPIs.fixedChargeCoverage}
              format="ratio"
              icon={Scale}
              description="EBITDA divided by Fixed Charges"
            />
          </>
        )}
      </div>
    </div>
  );
}