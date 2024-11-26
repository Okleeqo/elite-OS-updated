import React, { useState } from 'react';
import { AlertCircle, Loader } from 'lucide-react';
import { generateStrategies, type GeneratedStrategy } from '../../lib/openai';

interface StrategyGenerationProps {
  action: string;
  parameters: {
    frequency: string;
    deliveryMethod: string;
    tools: string[];
  };
  onStrategiesGenerated: (strategies: GeneratedStrategy[]) => void;
}

const StrategyGeneration: React.FC<StrategyGenerationProps> = ({
  action,
  parameters,
  onStrategiesGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneration = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const strategies = await generateStrategies(action, parameters);
      onStrategiesGenerated(strategies);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate strategies');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Strategy Generation</h2>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Action</h3>
        <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{action}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Parameters</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p className="text-gray-600">Frequency: {parameters.frequency}</p>
          <p className="text-gray-600">Delivery Method: {parameters.deliveryMethod}</p>
          <p className="text-gray-600">Tools: {parameters.tools.join(', ')}</p>
        </div>
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
            Generating Strategies...
          </>
        ) : (
          'Generate Strategies'
        )}
      </button>
    </div>
  );
};

export default StrategyGeneration;