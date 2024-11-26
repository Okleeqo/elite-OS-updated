import React, { useState, useEffect } from 'react';
import { Loader, Check } from 'lucide-react';
import { GeneratedGoal, macroGaps } from '../../../lib/productizing';
import { generateGoals } from '../../../lib/openai';

interface GoalGeneratorProps {
  selectedGaps: string[];
  selectedGoals: string[];
  onGoalSelection: (goalIds: string[], goals: GeneratedGoal[]) => void;
  onContinue: () => void;
}

const GoalGenerator: React.FC<GoalGeneratorProps> = ({
  selectedGaps,
  selectedGoals,
  onGoalSelection,
  onContinue
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [goals, setGoals] = useState<GeneratedGoal[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      if (goals.length > 0 || selectedGaps.length === 0) return;
      
      setIsLoading(true);
      setError(null);

      try {
        const generatedGoals = await generateGoals(
          selectedGaps.map(id => {
            const gap = macroGaps.find(g => g.id === id);
            return gap?.title || id;
          })
        );
        setGoals(generatedGoals);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate goals');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, [selectedGaps, goals.length]);

  const toggleGoal = (goalId: string) => {
    const newSelectedGoals = selectedGoals.includes(goalId)
      ? selectedGoals.filter(id => id !== goalId)
      : [...selectedGoals, goalId];
    
    onGoalSelection(newSelectedGoals, goals);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600">Generating goals based on selected gaps...</p>
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
          onClick={() => {
            setGoals([]);
            setError(null);
          }}
          className="text-blue-600 hover:text-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const gradients = [
    'from-blue-500 via-blue-600 to-blue-700',
    'from-purple-500 via-purple-600 to-purple-700',
    'from-green-500 via-green-600 to-green-700',
    'from-red-500 via-red-600 to-red-700',
    'from-orange-500 via-orange-600 to-orange-700'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Select Financial Goals
        </h3>
        <p className="text-gray-600">
          Review and select the generated goals that align with your client's needs.
        </p>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => (
          <button
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
              selectedGoals.includes(goal.id)
                ? `bg-gradient-to-r ${gradients[index % gradients.length]} text-white transform scale-105 shadow-lg`
                : 'bg-white hover:shadow-md border border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <h4 className={`text-xl font-bold ${
                  selectedGoals.includes(goal.id) ? 'text-white' : 'text-gray-900'
                }`}>
                  {goal.goal}
                </h4>
                {goal.metrics.length > 0 && (
                  <div className="space-y-1">
                    <p className={selectedGoals.includes(goal.id) ? 'text-white text-opacity-90' : 'text-gray-600'}>
                      Success Metrics:
                    </p>
                    <ul className="list-disc list-inside">
                      {goal.metrics.map((metric, i) => (
                        <li
                          key={i}
                          className={selectedGoals.includes(goal.id) ? 'text-white text-opacity-80' : 'text-gray-500'}
                        >
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className={selectedGoals.includes(goal.id) ? 'text-white text-opacity-90' : 'text-gray-600'}>
                  Timeline: {goal.timeline}
                </p>
              </div>
              {selectedGoals.includes(goal.id) && (
                <Check className="w-6 h-6 text-white" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onContinue}
          disabled={selectedGoals.length === 0}
          className={`px-6 py-3 rounded-xl font-medium text-lg transition-all duration-300 ${
            selectedGoals.length === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg transform hover:scale-105'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default GoalGenerator;