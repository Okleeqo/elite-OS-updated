import React from 'react';
import { GeneratedAction } from '../../../lib/openai';

interface ActionSelectionProps {
  actions: GeneratedAction[];
  selectedActions: GeneratedAction[];
  onActionSelection: (action: GeneratedAction) => void;
}

const ActionSelection: React.FC<ActionSelectionProps> = ({
  actions,
  selectedActions,
  onActionSelection
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Select Actions</h3>
        <p className="text-gray-600 mb-6">
          Choose the actions to implement:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => onActionSelection(action)}
              className={`p-6 rounded-xl transition-all duration-300 ${
                selectedActions.some(a => a.id === action.id)
                  ? 'bg-purple-600 text-white ring-4 ring-purple-300'
                  : 'bg-white hover:shadow-lg'
              }`}
            >
              <h4 className="text-lg font-semibold mb-2">{action.action}</h4>
              <p className="text-sm mb-2">{action.description}</p>
              <div>
                <h5 className="text-sm font-medium text-opacity-90">Expected Outcome:</h5>
                <p className="text-sm">{action.expectedOutcome}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionSelection;