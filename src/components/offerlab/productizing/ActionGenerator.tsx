import React, { useState, useEffect } from 'react';
import { Loader, Check } from 'lucide-react';
import { generateActions, type GeneratedAction } from '../../../lib/openai';
import type { DeliveryParameters } from '../../../lib/openai';

interface ActionGeneratorProps {
  selectedGoals: string[];
  onActionSelection: (actionIds: string[]) => void;
}

const ActionGenerator: React.FC<ActionGeneratorProps> = ({
  selectedGoals,
  onActionSelection
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [actions, setActions] = useState<GeneratedAction[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Define delivery parameters with proper typing
  const parameters: DeliveryParameters = {
    frequency: 'monthly',
    deliveryMethod: 'video-call',
    tools: [
      'GoalPilot (goal seek analysis)',
      'ForecastIQ (foracasting for SaaS and tech and e-commerce)',
      'CEO dashboard (for comprehensive financial analysis)',
      'CEO dashboard (for budget to actual and KPIs track and measure)',
      'MarketPulse (for e-commerce and SaaS performance track and measure and scenario planning)',
      'MarketPulse (for Sales analysis)',
      'ZenData (for comprehensive financial analysis)',
      'ForecastIQ (for churn track and measure)',
      'Financial Health Check-Up (for financial health check up and ratio analysis)',
      'ZenData (for Unit economics track and measure)',
      'Advisio (for a comprehensive GAP analysis)',
      'FindtheGAP (for a thourough business GAP analysis and scenario analysis)',
      'Advisio (for ROI calculations)'
    ]
  };

  useEffect(() => {
    const generateActionsForGoals = async () => {
      if (selectedGoals.length === 0) return;
      
      setIsLoading(true);
      setError(null);

      try {
        const generatedActions = await generateActions(selectedGoals.join(', '));
        setActions(generatedActions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate actions');
      } finally {
        setIsLoading(false);
      }
    };

    generateActionsForGoals();
  }, [selectedGoals]);

  const handleActionToggle = (actionId: string) => {
    setSelectedActions(prev => {
      const newSelection = prev.includes(actionId)
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId];
      onActionSelection(newSelection);
      return newSelection;
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600">Generating strategic actions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Define Strategic Actions
        </h3>
        <p className="text-gray-600">
          Select the strategic actions to implement for achieving the selected goals.
          Each action is generated based on Fortune 500 CFO-level expertise.
        </p>
      </div>

      <div className="space-y-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionToggle(action.id)}
            className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
              selectedActions.includes(action.id)
                ? 'bg-blue-600 text-white transform scale-105 shadow-lg'
                : 'bg-white hover:shadow-md border border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <h4 className="text-xl font-bold">{action.action}</h4>
                <p className="text-sm opacity-90">{action.description}</p>
                <div>
                  <span className="font-medium">Expected Outcome:</span>
                  <p className="text-sm opacity-90 mt-1">{action.expectedOutcome}</p>
                </div>
              </div>
              {selectedActions.includes(action.id) && (
                <Check className="w-6 h-6" />
              )}
            </div>
          </button>
        ))}

        {actions.length === 0 && !isLoading && !error && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">
              Select goals to generate strategic actions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionGenerator;