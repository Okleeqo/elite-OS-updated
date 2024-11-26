import React, { useState } from 'react';
import { Action } from '../types/goals';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ActionCardProps {
  action: Action;
  index: number;
}

const ActionCard: React.FC<ActionCardProps> = ({ action, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const gradients = [
    'from-blue-400 via-blue-500 to-blue-600',
    'from-purple-400 via-purple-500 to-purple-600',
    'from-green-400 via-green-500 to-green-600',
    'from-red-400 via-red-500 to-red-600',
    'from-yellow-400 via-yellow-500 to-yellow-600'
  ];

  const getGradient = (index: number) => {
    return gradients[index % gradients.length];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full bg-gradient-to-r ${getGradient(index)} p-6 text-white transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Action {index + 1}: {action.name}</h3>
          {isExpanded ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </div>
      </button>
      {isExpanded && (
        <div className="p-6">
          <div className="divide-y divide-gray-100">
            {action.strategies.map((strategy, strategyIndex) => (
              <div
                key={strategy.id}
                className="py-4 first:pt-0 last:pb-0"
              >
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  Strategy {strategyIndex + 1}: {strategy.name}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {strategy.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionCard;