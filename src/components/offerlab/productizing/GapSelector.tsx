import React from 'react';
import { Check } from 'lucide-react';
import { macroGaps } from '../../../lib/productizing';

interface GapSelectorProps {
  selectedGaps: string[];
  onGapSelection: (gaps: string[]) => void;
  onContinue: () => void;
}

const GapSelector: React.FC<GapSelectorProps> = ({
  selectedGaps,
  onGapSelection,
  onContinue
}) => {
  const toggleGap = (gapId: string) => {
    const newSelectedGaps = selectedGaps.includes(gapId)
      ? selectedGaps.filter(id => id !== gapId)
      : [...selectedGaps, gapId];
    onGapSelection(newSelectedGaps);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Select Business Gaps
        </h3>
        <p className="text-gray-600">
          Choose the key areas where your client needs improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {macroGaps.map((gap) => (
          <button
            key={gap.id}
            onClick={() => toggleGap(gap.id)}
            className={`p-6 rounded-xl text-left transition-all duration-300 ${
              selectedGaps.includes(gap.id)
                ? `bg-gradient-to-r ${gap.color} text-white transform scale-105 shadow-lg`
                : 'bg-white hover:shadow-md border border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className={`text-xl font-bold ${
                  selectedGaps.includes(gap.id) ? 'text-white' : 'text-gray-900'
                }`}>
                  {gap.title}
                </h4>
                <p className={selectedGaps.includes(gap.id) ? 'text-white text-opacity-90' : 'text-gray-600'}>
                  {gap.description}
                </p>
              </div>
              {selectedGaps.includes(gap.id) && (
                <Check className="w-6 h-6 text-white" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onContinue}
          disabled={selectedGaps.length === 0}
          className={`px-6 py-3 rounded-xl font-medium text-lg transition-all duration-300 ${
            selectedGaps.length === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg transform hover:scale-105'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default GapSelector;