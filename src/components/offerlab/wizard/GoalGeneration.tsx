import React, { useState, useEffect } from 'react';
import { Loader, Check } from 'lucide-react';
import { generateGoal } from '../../../lib/openai';

interface GoalGenerationProps {
  gaps: string[];
  selectedGoals: any[];
  onUpdateGoals: (goals: any[]) => void;
}

const GoalGeneration: React.FC<GoalGenerationProps> = ({
  gaps,
  selectedGoals,
  onUpdateGoals
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedGoals, setGeneratedGoals] = useState<any[]>([]);

  useEffect(() => {
    const generateGoals = async () => {
      if (gaps.length === 0) return;
      
      setIsLoading(true);
      setError(null);

      try {
        const gapDescriptions = gaps.map(gapId => {
          const gap = gaps.find(g => g === gapId);
          return gap || gapId;
        }).join(', ');

        const goals = await generateGoal(gapDescriptions);
        setGeneratedGoals(Array.isArray(goals) ? goals : [goals]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate goals');
      } finally {
        setIsLoading(false);
      }
    };

    generateGoals();
  }, [gaps]);

  const handleGoalSelection = (goalId: string) => {
    const goal = generatedGoals.find(g => g.id === goalId);
    if (!goal) return;

    const newSelectedGoals = selectedGoals.some(g => g.id === goalId)
      ? selectedGoals.filter(g => g.id !== goalId)
      : [...selectedGoals, goal];
    
    onUpdateGoals(newSelectedGoals);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600">Generating financial goals based on selected gaps...</p>
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
          Select Financial Goals
        </h3>
        <p className="text-gray-600">
          Review and select the AI-generated goals that align with your client's needs.
        </p>
      </div>

      <div className="space-y-4">
        {generatedGoals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => handleGoalSelection(goal.id)}
            className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
              selectedGoals.some(g => g.id === goal.id)
                ? 'bg-blue-600 text-white transform scale-105 shadow-lg'
                : 'bg-white hover:shadow-md border border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <h4 className="text-xl font-bold">{goal.goal}</h4>
                <div className="space-y-2">
                  <h5 className="font-medium">Success Metrics:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {goal.metrics.map((metric: string, index: number) => (
                      <li key={index} className="text-sm">{metric}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm">Timeline: {goal.timeline}</p>
              </div>
              {selectedGoals.some(g => g.id === goal.id) && (
                <Check className="w-6 h-6" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GoalGeneration;