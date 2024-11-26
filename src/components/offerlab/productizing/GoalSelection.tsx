import React from 'react';
import { GeneratedGoal } from '../../../lib/openai';

interface GoalSelectionProps {
  goals: GeneratedGoal[];
  selectedGoals: GeneratedGoal[];
  onGoalSelection: (goal: GeneratedGoal) => void;
}

const GoalSelection: React.FC<GoalSelectionProps> = ({
  goals,
  selectedGoals,
  onGoalSelection
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Select Goals</h3>
        <p className="text-gray-600 mb-6">
          Choose the most relevant goals for your client:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => onGoalSelection(goal)}
              className={`p-6 rounded-xl transition-all duration-300 ${
                selectedGoals.some(g => g.id === goal.id)
                  ? 'bg-purple-600 text-white ring-4 ring-purple-300'
                  : 'bg-white hover:shadow-lg'
              }`}
            >
              <h4 className="text-lg font-semibold mb-2">{goal.goal}</h4>
              <div className="space-y-2">
                <div>
                  <h5 className="text-sm font-medium text-opacity-90">Success Metrics:</h5>
                  <ul className="list-disc list-inside text-sm">
                    {goal.metrics.map((metric, index) => (
                      <li key={index}>{metric}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-opacity-90">Timeline:</h5>
                  <p className="text-sm">{goal.timeline}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalSelection;