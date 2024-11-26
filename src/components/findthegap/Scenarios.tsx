import React, { useState, useEffect } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { ChevronDown, ChevronUp, Brain } from 'lucide-react';
import ScenarioChart from './charts/ScenarioChart';

interface ScenarioType {
  title: string;
  revenue: number;
  profit: number;
  margin: number;
  color: string;
}

interface Insights {
  summary: string;
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

const Scenarios: React.FC = () => {
  const { financials } = useFinancial();
  const { actual } = financials;

  const [assumptions, setAssumptions] = useState({
    marketGrowth: 0,
    priceIncrease: 0,
    costIncrease: 0,
    efficiencyGain: 0
  });

  const [scenarios, setScenarios] = useState<ScenarioType[]>([]);
  const [insights, setInsights] = useState<Insights>({
    summary: '',
    recommendations: [],
    riskLevel: 'medium'
  });

  const calculateScenarios = () => {
    const baseRevenue = actual.revenue || 0;
    const baseProfit = baseRevenue - (actual.cogs || 0);
    const baseMargin = baseRevenue ? (baseProfit / baseRevenue) * 100 : 0;

    // Optimistic scenario applies full positive impact
    const optimisticRevenue = baseRevenue * (1 + Math.max(0, assumptions.marketGrowth) / 100) * (1 + Math.max(0, assumptions.priceIncrease) / 100);
    const optimisticCosts = (actual.cogs || 0) * (1 - Math.max(0, assumptions.efficiencyGain) / 100) * (1 - Math.max(0, -assumptions.costIncrease) / 100);
    const optimisticProfit = optimisticRevenue - optimisticCosts;
    const optimisticMargin = optimisticRevenue ? (optimisticProfit / optimisticRevenue) * 100 : 0;

    // Conservative scenario applies half the impact
    const conservativeRevenue = baseRevenue * (1 + Math.max(0, assumptions.marketGrowth) / 200) * (1 + Math.max(0, assumptions.priceIncrease) / 200);
    const conservativeCosts = (actual.cogs || 0) * (1 - Math.max(0, assumptions.efficiencyGain) / 200) * (1 - Math.max(0, -assumptions.costIncrease) / 200);
    const conservativeProfit = conservativeRevenue - conservativeCosts;
    const conservativeMargin = conservativeRevenue ? (conservativeProfit / conservativeRevenue) * 100 : 0;

    // Pessimistic scenario applies full negative impact
    const pessimisticRevenue = baseRevenue * (1 + Math.min(0, assumptions.marketGrowth) / 100) * (1 + Math.min(0, assumptions.priceIncrease) / 100);
    const pessimisticCosts = (actual.cogs || 0) * (1 + Math.min(0, -assumptions.efficiencyGain) / 100) * (1 + Math.max(0, assumptions.costIncrease) / 100);
    const pessimisticProfit = pessimisticRevenue - pessimisticCosts;
    const pessimisticMargin = pessimisticRevenue ? (pessimisticProfit / pessimisticRevenue) * 100 : 0;

    const newScenarios: ScenarioType[] = [
      {
        title: 'Base Case',
        revenue: baseRevenue,
        profit: baseProfit,
        margin: baseMargin,
        color: 'bg-blue-500'
      },
      {
        title: 'Optimistic',
        revenue: optimisticRevenue,
        profit: optimisticProfit,
        margin: optimisticMargin,
        color: 'bg-green-500'
      },
      {
        title: 'Conservative',
        revenue: conservativeRevenue,
        profit: conservativeProfit,
        margin: conservativeMargin,
        color: 'bg-orange-500'
      },
      {
        title: 'Pessimistic',
        revenue: pessimisticRevenue,
        profit: pessimisticProfit,
        margin: pessimisticMargin,
        color: 'bg-red-500'
      }
    ];

    setScenarios(newScenarios);
    generateInsights(newScenarios);
  };

  const generateInsights = (scenarios: ScenarioType[]) => {
    const baseCase = scenarios[0];
    const optimistic = scenarios[1];
    const conservative = scenarios[2];
    const pessimistic = scenarios[3];

    const profitRange = optimistic.profit - pessimistic.profit;
    const profitUpside = ((optimistic.profit - baseCase.profit) / baseCase.profit) * 100;
    const profitDownside = ((pessimistic.profit - baseCase.profit) / baseCase.profit) * 100;
    const marginChange = optimistic.margin - baseCase.margin;

    const riskLevel = Math.abs(profitDownside) > Math.abs(profitUpside) ? 'high' : 
                     Math.abs(profitDownside) === Math.abs(profitUpside) ? 'medium' : 'low';

    const recommendations = [];

    if (assumptions.marketGrowth !== 0) {
      recommendations.push(
        `${assumptions.marketGrowth > 0 ? 'Capitalize on' : 'Mitigate'} market growth impact through ${
          assumptions.marketGrowth > 0 ? 'expanded marketing efforts' : 'focused customer retention'
        }`
      );
    }

    if (assumptions.priceIncrease !== 0) {
      recommendations.push(
        `${assumptions.priceIncrease > 0 ? 'Implement' : 'Review'} pricing strategy with ${
          Math.abs(assumptions.priceIncrease)
        }% ${assumptions.priceIncrease > 0 ? 'increase' : 'adjustment'}`
      );
    }

    if (assumptions.costIncrease !== 0) {
      recommendations.push(
        `${assumptions.costIncrease > 0 ? 'Implement cost control measures' : 'Maintain cost efficiency'} to manage ${
          Math.abs(assumptions.costIncrease)
        }% cost ${assumptions.costIncrease > 0 ? 'increase' : 'reduction'}`
      );
    }

    if (assumptions.efficiencyGain !== 0) {
      recommendations.push(
        `${assumptions.efficiencyGain > 0 ? 'Leverage' : 'Address'} operational efficiency ${
          assumptions.efficiencyGain > 0 ? 'improvements' : 'challenges'
        }`
      );
    }

    setInsights({
      summary: `The ${profitUpside > 0 ? 'optimistic' : 'conservative'} scenario shows a ${
        Math.abs(profitUpside).toFixed(1)
      }% profit ${profitUpside > 0 ? 'improvement' : 'decline'} potential, while the downside risk is ${
        Math.abs(profitDownside).toFixed(1)
      }%. Margin could ${marginChange > 0 ? 'improve' : 'decline'} by ${
        Math.abs(marginChange).toFixed(1)
      } percentage points under ${marginChange > 0 ? 'optimal' : 'adverse'} conditions.`,
      recommendations,
      riskLevel
    });
  };

  useEffect(() => {
    calculateScenarios();
  }, [assumptions, actual]);

  const handleAssumptionChange = (key: keyof typeof assumptions, value: number) => {
    setAssumptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    setAssumptions({
      marketGrowth: 0,
      priceIncrease: 0,
      costIncrease: 0,
      efficiencyGain: 0
    });
  };

  return (
    <div className="space-y-6">
      {/* Key Assumptions */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Key Assumptions</h3>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reset to Zero
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Market Growth Rate</label>
              <input
                type="range"
                min="-100"
                max="100"
                step="1"
                value={assumptions.marketGrowth}
                onChange={(e) => handleAssumptionChange('marketGrowth', Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>-100%</span>
                <span>{assumptions.marketGrowth}%</span>
                <span>+100%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price Increase Rate</label>
              <input
                type="range"
                min="-100"
                max="100"
                step="1"
                value={assumptions.priceIncrease}
                onChange={(e) => handleAssumptionChange('priceIncrease', Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>-100%</span>
                <span>{assumptions.priceIncrease}%</span>
                <span>+100%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cost Increase Rate</label>
              <input
                type="range"
                min="-100"
                max="100"
                step="1"
                value={assumptions.costIncrease}
                onChange={(e) => handleAssumptionChange('costIncrease', Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>-100%</span>
                <span>{assumptions.costIncrease}%</span>
                <span>+100%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Efficiency Gain</label>
              <input
                type="range"
                min="-100"
                max="100"
                step="1"
                value={assumptions.efficiencyGain}
                onChange={(e) => handleAssumptionChange('efficiencyGain', Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>-100%</span>
                <span>{assumptions.efficiencyGain}%</span>
                <span>+100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario.title}
            className={`${scenario.color} p-6 rounded-xl text-white`}
          >
            <h3 className="text-xl font-bold mb-4">{scenario.title}</h3>
            <div className="space-y-2">
              <p>Revenue: ${scenario.revenue.toLocaleString()}</p>
              <p>Profit: ${scenario.profit.toLocaleString()}</p>
              <p>Margin: {scenario.margin.toFixed(1)}%</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI-Driven Insights */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 flex items-center space-x-2">
          <Brain className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold">AI-Driven Insights</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">Summary Analysis</h4>
            <p className="text-purple-800">{insights.summary}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Strategic Recommendations</h4>
            <div className="space-y-2">
              {insights.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    index % 2 === 0 ? 'bg-blue-50 text-blue-800' : 'bg-green-50 text-green-800'
                  }`}
                >
                  {recommendation}
                </div>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-lg ${
            insights.riskLevel === 'high' ? 'bg-red-50 text-red-800' :
            insights.riskLevel === 'medium' ? 'bg-yellow-50 text-yellow-800' :
            'bg-green-50 text-green-800'
          }`}>
            <h4 className="font-semibold mb-2">Risk Assessment</h4>
            <p>Current risk level is <span className="font-semibold">{insights.riskLevel}</span></p>
          </div>
        </div>
      </div>

      {/* Scenario Chart */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-xl font-bold">Scenario Comparison</h3>
        </div>
        <div className="p-6">
          <div className="h-96">
            <ScenarioChart scenarios={scenarios} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scenarios;