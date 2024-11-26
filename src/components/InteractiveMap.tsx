import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Strategy {
  name: string;
  toolsAndResources: string[];
}

interface Action {
  id: string;
  name: string;
  description: string;
  strategies: Strategy[];
}

interface Goal {
  id: string;
  name: string;
  description: string;
  actions: Action[];
}

interface Gap {
  id: string;
  name: string;
  description: string;
  color: string;
  goals: Goal[];
}

interface InteractiveMapProps {
  gaps: Gap[];
  selectedGap: string | null;
  selectedGoal: string | null;
  selectedAction: string | null;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  gaps,
  selectedGap,
  selectedGoal,
  selectedAction,
}) => {
  const selectedGapData = gaps.find((gap) => gap.id === selectedGap);
  const selectedGoalData = selectedGapData?.goals.find((goal) => goal.id === selectedGoal);
  const selectedActionData = selectedGoalData?.actions.find((action) => action.id === selectedAction);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-center space-x-4 mb-8">
        {gaps.map((gap) => (
          <React.Fragment key={gap.id}>
            <div
              className={`${gap.color} text-white p-4 rounded-lg ${
                selectedGap === gap.id ? 'ring-4 ring-blue-300' : ''
              }`}
            >
              <h2 className="text-lg font-semibold">{gap.name}</h2>
            </div>
            {gap.id !== gaps[gaps.length - 1].id && <ArrowRight className="w-6 h-6 text-gray-400" />}
          </React.Fragment>
        ))}
      </div>
      {selectedGapData && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Goals for {selectedGapData.name}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {selectedGapData.goals.map((goal) => (
              <div
                key={goal.id}
                className={`bg-gray-100 p-4 rounded-lg ${
                  selectedGoal === goal.id ? 'ring-4 ring-blue-300' : ''
                }`}
              >
                <h4 className="font-semibold">{goal.name}</h4>
                <p className="text-sm text-gray-600 mt-2">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedGoalData && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Actions for {selectedGoalData.name}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {selectedGoalData.actions.map((action) => (
              <div
                key={action.id}
                className={`bg-gray-200 p-4 rounded-lg ${
                  selectedAction === action.id ? 'ring-4 ring-blue-300' : ''
                }`}
              >
                <h4 className="font-semibold">{action.name}</h4>
                <p className="text-sm text-gray-600 mt-2">{action.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedActionData && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Strategies for {selectedActionData.name}</h3>
          <ul className="space-y-4">
            {selectedActionData.strategies.map((strategy, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg">
                <p className="font-semibold">{strategy.name}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {strategy.toolsAndResources.map((tool, toolIndex) => (
                    <span key={toolIndex} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;