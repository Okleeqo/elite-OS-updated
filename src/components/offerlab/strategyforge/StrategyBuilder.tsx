import React, { useState } from 'react';
import { Plus, ArrowRight } from 'lucide-react';

interface StrategyBuilderProps {
  onComplete: (strategy: any) => void;
  onNext: () => void;
}

const StrategyBuilder: React.FC<StrategyBuilderProps> = ({ onComplete, onNext }) => {
  const [objectives, setObjectives] = useState<string[]>([]);
  const [newObjective, setNewObjective] = useState('');

  const handleAddObjective = () => {
    if (newObjective.trim()) {
      setObjectives([...objectives, newObjective.trim()]);
      setNewObjective('');
    }
  };

  const handleComplete = () => {
    if (objectives.length > 0) {
      onComplete({
        objectives,
        createdAt: new Date().toISOString()
      });
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Build Your Strategy</h2>
        <p className="text-gray-600">Define your strategic objectives and key results</p>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
            placeholder="Enter a strategic objective..."
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={handleAddObjective}
            disabled={!newObjective.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add
          </button>
        </div>

        <div className="space-y-3">
          {objectives.map((objective, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <p className="font-medium text-gray-900">{objective}</p>
            </div>
          ))}
        </div>

        {objectives.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">
              Add your first strategic objective to get started
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleComplete}
          disabled={objectives.length === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default StrategyBuilder;