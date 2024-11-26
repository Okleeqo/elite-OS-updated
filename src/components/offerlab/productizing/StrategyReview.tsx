import React from 'react';
import { GeneratedStrategy } from '../../../lib/openai';

interface StrategyReviewProps {
  strategies: GeneratedStrategy[];
}

const StrategyReview: React.FC<StrategyReviewProps> = ({ strategies }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Review Strategies</h3>
        <p className="text-gray-600 mb-6">
          Review the generated strategies for your offer:
        </p>
        <div className="space-y-6">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h4 className="text-lg font-semibold mb-2">{strategy.strategy}</h4>
              <p className="text-gray-600 mb-4">{strategy.description}</p>
              <div className="space-y-2">
                <div>
                  <h5 className="text-sm font-medium text-gray-700">Recommended Tools:</h5>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {strategy.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-700">Implementation:</h5>
                  <p className="text-sm text-gray-600">{strategy.implementation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategyReview;