import React from 'react';
import { FileText, Download } from 'lucide-react';
import { GeneratedGoal, GeneratedAction, Strategy } from '../../../lib/openai';
import OfferBuilder from './OfferBuilder';

interface ReviewStepProps {
  selectedGaps: string[];
  selectedGoals: GeneratedGoal[];
  selectedActions: GeneratedAction[];
  strategies: Strategy[];
  onFinish: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  selectedGaps,
  selectedGoals,
  selectedActions,
  strategies,
  onFinish
}) => {
  const [selectedStrategies, setSelectedStrategies] = React.useState<Strategy[]>([]);

  const handleStrategySelect = (strategy: Strategy) => {
    if (!selectedStrategies.find(s => s.id === strategy.id)) {
      setSelectedStrategies([...selectedStrategies, strategy]);
    }
  };

  const handleExport = () => {
    // Implement export functionality
    const offerData = {
      gaps: selectedGaps,
      goals: selectedGoals,
      actions: selectedActions,
      strategies: selectedStrategies
    };

    const blob = new Blob([JSON.stringify(offerData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'productized-offer.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Build Your Offer</h3>
        <p className="text-gray-600">
          Review your selections and build your productized offer by dragging strategies and configuring parameters.
        </p>
      </div>

      {/* Offer Builder */}
      <OfferBuilder
        strategies={strategies}
        selectedStrategies={selectedStrategies}
        onStrategySelect={handleStrategySelect}
      />

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleExport}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 flex items-center"
        >
          <FileText className="w-5 h-5 mr-2" />
          Export Offer
        </button>
        <button
          onClick={onFinish}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;