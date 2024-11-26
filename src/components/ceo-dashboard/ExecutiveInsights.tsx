import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';

export function ExecutiveInsights() {
  const { financials } = useFinancial();
  const { actual, lastPeriod, budget } = financials;
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate key metrics and variances
  const calculateInsights = () => {
    // Revenue Analysis
    const revenue = (actual.revenue || 0) + (actual.serviceRevenue || 0);
    const lastRevenue = (lastPeriod.revenue || 0) + (lastPeriod.serviceRevenue || 0);
    const budgetRevenue = (budget.revenue || 0) + (budget.serviceRevenue || 0);
    const revenueGrowth = ((revenue - lastRevenue) / lastRevenue) * 100;
    const revenueBudgetVar = ((revenue - budgetRevenue) / budgetRevenue) * 100;

    // Profitability
    const grossProfit = revenue - (actual.cogs || 0);
    const lastGrossProfit = lastRevenue - (lastPeriod.cogs || 0);
    const grossMargin = (grossProfit / revenue) * 100;
    const lastGrossMargin = (lastGrossProfit / lastRevenue) * 100;
    
    const operatingExpenses = (actual.operatingExpenses || 0) + 
      (actual.marketingExpenses || 0) + 
      (actual.adminExpenses || 0) + 
      (actual.researchDevelopment || 0);
    const netIncome = grossProfit - operatingExpenses;
    const netMargin = (netIncome / revenue) * 100;

    // Working Capital
    const currentAssets = (actual.cash || 0) + 
      (actual.accountsReceivable || 0) + 
      (actual.inventory || 0);
    const currentLiabilities = (actual.accountsPayable || 0) + 
      (actual.shortTermDebt || 0);
    const workingCapital = currentAssets - currentLiabilities;
    const currentRatio = currentAssets / currentLiabilities;

    // Debt and Leverage
    const totalDebt = (actual.shortTermDebt || 0) + (actual.longTermDebt || 0);
    const totalAssets = currentAssets + 
      (actual.buildings || 0) + 
      (actual.equipment || 0);
    const debtToAssets = (totalDebt / totalAssets) * 100;

    return {
      performance: [
        {
          title: "Revenue Growth",
          value: revenueGrowth,
          status: revenueGrowth >= 0 ? "positive" : "negative",
          insight: revenueGrowth >= 0 
            ? "Showing healthy top-line growth"
            : "Revenue decline needs attention",
          recommendation: revenueGrowth >= 0
            ? "Consider expanding into new markets or products"
            : "Review pricing strategy and sales effectiveness"
        },
        {
          title: "Gross Margin Trend",
          value: grossMargin - lastGrossMargin,
          status: grossMargin >= lastGrossMargin ? "positive" : "warning",
          insight: `Gross margin ${grossMargin >= lastGrossMargin ? "improved" : "declined"} by ${Math.abs(grossMargin - lastGrossMargin).toFixed(1)}%`,
          recommendation: grossMargin >= lastGrossMargin
            ? "Maintain cost control measures"
            : "Review cost structure and supplier relationships"
        }
      ],
      operations: [
        {
          title: "Working Capital Management",
          value: currentRatio,
          status: currentRatio >= 1.5 ? "positive" : currentRatio >= 1 ? "warning" : "negative",
          insight: `Current ratio of ${currentRatio.toFixed(2)} indicates ${
            currentRatio >= 1.5 ? "strong" : currentRatio >= 1 ? "adequate" : "weak"
          } liquidity`,
          recommendation: currentRatio < 1.5
            ? "Consider improving working capital management"
            : "Maintain current working capital efficiency"
        },
        {
          title: "Operating Efficiency",
          value: (operatingExpenses / revenue) * 100,
          status: (operatingExpenses / revenue) <= 0.7 ? "positive" : "warning",
          insight: `Operating expenses at ${((operatingExpenses / revenue) * 100).toFixed(1)}% of revenue`,
          recommendation: (operatingExpenses / revenue) > 0.7
            ? "Identify areas for cost optimization"
            : "Continue monitoring operational efficiency"
        }
      ],
      financial: [
        {
          title: "Debt Management",
          value: debtToAssets,
          status: debtToAssets <= 40 ? "positive" : debtToAssets <= 60 ? "warning" : "negative",
          insight: `Debt-to-assets ratio at ${debtToAssets.toFixed(1)}%`,
          recommendation: debtToAssets > 60
            ? "Consider debt reduction strategies"
            : "Maintain current debt levels"
        },
        {
          title: "Budget Performance",
          value: revenueBudgetVar,
          status: revenueBudgetVar >= 0 ? "positive" : "negative",
          insight: `${Math.abs(revenueBudgetVar).toFixed(1)}% ${revenueBudgetVar >= 0 ? "above" : "below"} budget`,
          recommendation: revenueBudgetVar < 0
            ? "Review budget assumptions and adjust forecasts"
            : "Update budget targets based on performance"
        }
      ]
    };
  };

  const insights = calculateInsights();

  const InsightCard = ({ 
    title, 
    value, 
    status, 
    insight,
    recommendation 
  }: { 
    title: string;
    value: number;
    status: "positive" | "negative" | "warning";
    insight: string;
    recommendation: string;
  }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-700">{title}</h4>
        {status === "positive" && <CheckCircle className="h-5 w-5 text-green-500" />}
        {status === "negative" && <AlertTriangle className="h-5 w-5 text-red-500" />}
        {status === "warning" && <AlertTriangle className="h-5 w-5 text-amber-500" />}
      </div>
      <div className="flex items-center space-x-2 mb-3">
        <span className={`text-lg font-bold ${
          status === "positive" ? "text-green-600" :
          status === "negative" ? "text-red-600" :
          "text-amber-600"
        }`}>
          {value >= 0 ? "+" : ""}{value.toFixed(1)}%
        </span>
        {value > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
      </div>
      <p className="text-sm text-gray-600 mb-2">{insight}</p>
      <p className="text-sm font-medium text-indigo-600">{recommendation}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Brain className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI-Driven Insights</h2>
              <p className="text-sm text-gray-500">Executive analysis and recommendations</p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.performance.map((insight, index) => (
                  <InsightCard key={index} {...insight} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Operational Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.operations.map((insight, index) => (
                  <InsightCard key={index} {...insight} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Strategy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.financial.map((insight, index) => (
                  <InsightCard key={index} {...insight} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}