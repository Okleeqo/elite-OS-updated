import React, { useState, useEffect } from 'react';
import { Loader, Check } from 'lucide-react';
import { generateActions } from '../../../lib/openai';

interface ActionGenerationProps {
  goals: any[];
  selectedActions: any[];
  onUpdateActions: (actions: any[]) => void;
}

const ActionGeneration: React.FC<ActionGenerationProps> = ({
  goals,
  selectedActions,
  onUpdateActions
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedActions, setGeneratedActions] = useState<any[]>([]);

  useEffect(() => {
    const generateActionsForGoals = async () => {
      if (goals.length === 0) return;
      
      setIsLoading(true);
      setError(null);

      try {
        const goalDescriptions = goals.map(goal => goal.goal).join(', ');
        const actions = await generateActions(goalDescriptions);
        setGeneratedActions(Array.isArray(actions) ? actions : [actions]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate actions');
      } finally {
        setIsLoading(false);
      }
    };

    generateActionsForGoals();
  }, [goals]);

  const handleActionSelection = (actionId: string) => {
    const action = generatedActions.find(a => a.id === actionId);
    if (!action) return;

    const newSelectedActions = selectedActions.some(a => a.id === actionId)
      ? selectedActions.filter(a => a.id !== actionId)
      : [...selectedActions, action];
    
    onUpdateActions(newSelectedActions);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600">Generating strategic actions based on selected goals...</p>
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
          Select the actions that will help achieve the selected goals.
        </p>
      </div>

      <div className="space-y-4">
        {generatedActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionSelection(action.id)}
            className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
              selectedActions.some(a => a.id === action.id)
                ? 'bg-blue-600 text-white transform scale-105 shadow-lg'
                : 'bg-white hover:shadow-md border border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <h4 className="text-xl font-bold">{action.action}</h4>
                <p className="text-sm opacity-90">{action.description}</p>
                <div>
                  <h5 className="font-medium">Expected Outcome:</h5>
                  <p className="text-sm opacity-90 mt-1">{action.expectedOutcome}</p>
                </div>
              </div>
              {selectedActions.some(a => a.id === action.id) && (
                <Check className="w-6 h-6" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionGeneration;