import React, { useState } from 'react';
import { ChevronRight, ChevronDown, X } from 'lucide-react';

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
  color: string;
  goals: Goal[];
}

interface KanbanBoardProps {
  gaps: Gap[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ gaps }) => {
  const [selectedGap, setSelectedGap] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleGapClick = (gapId: string) => {
    setSelectedGap(gapId === selectedGap ? null : gapId);
    setSelectedGoal(null);
    setSelectedAction(null);
  };

  const handleGoalClick = (goalId: string) => {
    setSelectedGoal(goalId === selectedGoal ? null : goalId);
    setSelectedAction(null);
  };

  const handleActionClick = (actionId: string) => {
    setSelectedAction(actionId === selectedAction ? null : actionId);
  };

  const selectedGapData = gaps.find((gap) => gap.id === selectedGap);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {gaps.map((gap) => (
          <button
            key={gap.id}
            className={`px-6 py-3 rounded-full text-white font-semibold transition-all ${
              selectedGap === gap.id
                ? `${gap.color} ring-4 ring-opacity-50 ring-${gap.color.split('-')[1]}-300`
                : gap.color
            }`}
            onClick={() => handleGapClick(gap.id)}
          >
            {gap.name}
          </button>
        ))}
      </div>

      {selectedGapData && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {selectedGapData.goals.map((goal) => (
            <div
              key={goal.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all ${
                selectedGoal === goal.id ? 'ring-4 ring-blue-300' : ''
              }`}
            >
              <button
                className="w-full p-4 text-left focus:outline-none"
                onClick={() => handleGoalClick(goal.id)}
              >
                <h3 className="font-semibold text-lg mb-2">{goal.name}</h3>
                <p className="text-sm text-gray-600">{goal.description}</p>
              </button>
              {selectedGoal === goal.id && (
                <div className="p-4 bg-gray-50 border-t">
                  {goal.actions.map((action) => (
                    <div key={action.id} className="mb-3 last:mb-0">
                      <button
                        className="w-full text-left focus:outline-none flex items-center justify-between"
                        onClick={() => handleActionClick(action.id)}
                      >
                        <span className="font-medium">{action.name}</span>
                        {selectedAction === action.id ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </button>
                      {selectedAction === action.id && (
                        <div className="mt-2 pl-4 border-l-2 border-blue-300">
                          {action.strategies.map((strategy, index) => (
                            <div key={index} className="mb-2 last:mb-0">
                              <p className="text-sm font-medium">{strategy.name}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {strategy.toolsAndResources.map((tool, toolIndex) => (
                                  <span
                                    key={toolIndex}
                                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;