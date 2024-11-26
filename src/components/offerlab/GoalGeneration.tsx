import React, { useState } from 'react';
import { AlertCircle, Loader } from 'lucide-react';
import { generateGoal, type GeneratedGoal } from '../../lib/openai';

interface GoalGenerationProps {
  gap: string;
  onGoalGenerated: (goal: GeneratedGoal) => void;
}

const GoalGeneration: React.FC<GoalGenerationProps> = ({ gap, onGoalGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneration = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const goal = await generateGoal(gap);
      onGoalGenerated(goal);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate goal');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Goal Generation</h2>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Client Gap</h3>
        <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{gap}</p>
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
            Generating Goal...
          </>
        ) : (
          'Generate SMART Goal'
        )}
      </button>
    </div>
  );
};

export default GoalGeneration;