import React, { useState } from 'react';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { generateGoal, generateActions, generateStrategies, type Strategy } from '../../lib/openai';
import OfferBuilder from './productizing/OfferBuilder';

interface Gap {
  id: string;
  title: string;
  description: string;
  color: string;
}

const macroGaps: Gap[] = [
  {
    id: 'profitability',
    title: 'Profitability Increase',
    description: 'Optimize revenue streams and cost structures to enhance overall profitability',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    id: 'cash-flow',
    title: 'Operating Cash Flow Management',
    description: 'Improve cash flow cycles and working capital efficiency',
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    id: 'pricing',
    title: 'Pricing Optimization',
    description: 'Develop and implement effective pricing strategies',
    color: 'bg-purple-500 hover:bg-purple-600'
  },
  {
    id: 'cogs',
    title: 'COGS and Operating Expenses Optimization',
    description: 'Streamline costs while maintaining operational efficiency',
    color: 'bg-orange-500 hover:bg-orange-600'
  },
  {
    id: 'working-capital',
    title: 'Working Capital Optimization',
    description: 'Enhance inventory, receivables, and payables management',
    color: 'bg-red-500 hover:bg-red-600'
  }
];

const ProductizingPanel: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGaps, setSelectedGaps] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [selectedStrategies, setSelectedStrategies] = useState<Strategy[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [actions, setActions] = useState<any[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    { number: 1, label: 'Select Gaps' },
    { number: 2, label: 'Set Goals' },
    { number: 3, label: 'Define Actions' },
    { number: 4, label: 'Build Offer' }
  ];

  const handleGapSelect = (gapId: string) => {
    setSelectedGaps(prev => 
      prev.includes(gapId) 
        ? prev.filter(id => id !== gapId)
        : [...prev, gapId]
    );
  };

  const handleGoalSelect = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleActionSelect = (action: string) => {
    setSelectedActions(prev =>
      prev.includes(action)
        ? prev.filter(a => a !== action)
        : [...prev, action]
    );
  };

  const handleStrategySelect = (strategy: Strategy) => {
    setSelectedStrategies(prev => {
      const exists = prev.some(s => s.id === strategy.id);
      if (exists) {
        return prev.filter(s => s.id !== strategy.id);
      }
      return [...prev, strategy];
    });
  };

  const handleNextStep = async () => {
    setError(null);
    setIsLoading(true);

    try {
      if (currentStep === 1 && selectedGaps.length > 0) {
        const selectedGapTitles = selectedGaps.map(id => 
          macroGaps.find(gap => gap.id === id)?.title
        ).filter(Boolean);

        const generatedGoals = await generateGoal(selectedGapTitles.join(', '));
        setGoals(Array.isArray(generatedGoals) ? generatedGoals : [generatedGoals]);
        setCurrentStep(2);
      } else if (currentStep === 2 && selectedGoals.length > 0) {
        const generatedActions = await Promise.all(
          selectedGoals.map(goal => generateActions(goal))
        );
        setActions(generatedActions.flat());
        setCurrentStep(3);
      } else if (currentStep === 3 && selectedActions.length > 0) {
        const generatedStrategies = await Promise.all(
          selectedActions.map(action => generateStrategies(action))
        );
        setStrategies(generatedStrategies.flat());
        setCurrentStep(4);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {macroGaps.map(gap => (
              <button
                key={gap.id}
                onClick={() => handleGapSelect(gap.id)}
                className={`p-6 rounded-xl text-white transition-all duration-300 ${
                  gap.color
                } ${
                  selectedGaps.includes(gap.id)
                    ? 'ring-4 ring-blue-500 ring-opacity-50 transform scale-105'
                    : 'hover:scale-105'
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{gap.title}</h3>
                <p className="text-white text-opacity-90">{gap.description}</p>
              </button>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <div
                key={index}
                onClick={() => handleGoalSelect(goal.goal)}
                className={`p-6 rounded-xl bg-white shadow-sm cursor-pointer transition-all duration-200 ${
                  selectedGoals.includes(goal.goal)
                    ? 'ring-2 ring-blue-500'
                    : 'hover:shadow-md'
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-900">{goal.goal}</h3>
                <div className="mt-2 space-y-2">
                  {goal.metrics?.map((metric: string, idx: number) => (
                    <p key={idx} className="text-gray-600 flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {metric}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {actions.map((action, index) => (
              <div
                key={index}
                onClick={() => handleActionSelect(action.action)}
                className={`p-6 rounded-xl bg-white shadow-sm cursor-pointer transition-all duration-200 ${
                  selectedActions.includes(action.action)
                    ? 'ring-2 ring-blue-500'
                    : 'hover:shadow-md'
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-900">{action.action}</h3>
                <p className="mt-2 text-gray-600">{action.description}</p>
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <OfferBuilder
            strategies={strategies}
            selectedStrategies={selectedStrategies}
            onStrategySelect={handleStrategySelect}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`flex items-center ${index !== steps.length - 1 ? 'flex-1' : ''}`}
          >
            <div className="flex items-center">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                  step.number <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.number}
              </div>
              <span
                className={`ml-2 font-medium text-sm md:text-base transition-colors duration-200 ${
                  step.number === currentStep
                    ? 'text-blue-600'
                    : step.number < currentStep
                    ? 'text-gray-900'
                    : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-grow mx-4">
                <div className="h-0.5 bg-gray-200 relative">
                  <div
                    className="absolute inset-0 bg-blue-600 transition-all duration-300"
                    style={{
                      transform: `scaleX(${step.number < currentStep ? 1 : 0})`,
                      transformOrigin: 'left'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {renderStepContent()}

      <div className="flex justify-between pt-6">
        <button
          onClick={handlePreviousStep}
          disabled={currentStep === 1 || isLoading}
          className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
            currentStep === 1 || isLoading
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <button
          onClick={handleNextStep}
          disabled={
            isLoading ||
            (currentStep === 1 && selectedGaps.length === 0) ||
            (currentStep === 2 && selectedGoals.length === 0) ||
            (currentStep === 3 && selectedActions.length === 0) ||
            currentStep === 4
          }
          className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
            isLoading ||
            (currentStep === 1 && selectedGaps.length === 0) ||
            (currentStep === 2 && selectedGoals.length === 0) ||
            (currentStep === 3 && selectedActions.length === 0) ||
            currentStep === 4
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Processing...' : 'Next'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ProductizingPanel;