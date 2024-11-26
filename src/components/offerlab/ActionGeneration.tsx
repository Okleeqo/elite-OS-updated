import React, { useState } from 'react';
import { AlertCircle, Loader, CheckCircle } from 'lucide-react';
import { generateActions, type GeneratedAction } from '../../lib/openai';

interface ActionGenerationProps {
  goal: string;
  onActionsGenerated: (actions: GeneratedAction[]) => void;
}

const ActionGeneration: React.FC<ActionGenerationProps> = ({ goal, onActionsGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneration = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const actions = await generateActions(goal);
      onActionsGenerated(actions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate actions');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Action Generation</h2>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Goal</h3>
        <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{goal}</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <button
        onClick={handleGeneration}
        disabled={isGenerating}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center ${
          isGenerating
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isGenerating ? (
          <>
            <Loader className="w-5 h-5 mr-2 animate-spin" />
            Generating Actions...
          </>
        ) : (
          'Generate Actions'
        )}
      </button>
    </div>
  );
};

export default ActionGeneration;