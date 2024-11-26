import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface Strategy {
  name: string;
  description: string;
}

interface Action {
  name: string;
  strategies: Strategy[];
}

interface ActionStrategiesProps {
  goalName: string;
  goalDescription: string;
  actions: Action[];
  onBack: () => void;
}

const ActionStrategies: React.FC<ActionStrategiesProps> = ({
  goalName,
  goalDescription,
  actions,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Goals
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-2">{goalName}</h2>
        {goalDescription && <p className="text-blue-100">{goalDescription}</p>}
      </div>

      <div className="grid gap-6">
        {actions.map((action, actionIndex) => (
          <div
            key={actionIndex}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Action {actionIndex + 1}: {action.name}
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {action.strategies.map((strategy, strategyIndex) => (
                <div
                  key={strategyIndex}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Strategy {strategyIndex + 1}: {strategy.name}
                  </h4>
                  {strategy.description && (
                    <p className="text-gray-600 text-sm">{strategy.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionStrategies;