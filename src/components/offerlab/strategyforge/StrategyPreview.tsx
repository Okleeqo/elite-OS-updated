import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface StrategyPreviewProps {
  strategy: {
    objectives: string[];
    createdAt: string;
  };
  onNext: () => void;
}

const StrategyPreview: React.FC<StrategyPreviewProps> = ({ strategy, onNext }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Strategy Preview</h2>
        <p className="text-gray-600">Review your strategic objectives before setting metrics</p>
      </div>

      <div className="space-y-4">
        {strategy.objectives.map((objective, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Check className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Objective {index + 1}
                </h3>
                <p className="mt-1 text-gray-600">{objective}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          Set Metrics
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default StrategyPreview;