import React from 'react';
import { MacroGap } from '../../../lib/productizing';

interface GapSelectionProps {
  gaps: MacroGap[];
  selectedGaps: MacroGap[];
  onGapSelection: (gap: MacroGap) => void;
}

const GapSelection: React.FC<GapSelectionProps> = ({
  gaps,
  selectedGaps,
  onGapSelection
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Select Business Gaps</h3>
        <p className="text-gray-600 mb-6">
          Choose the key areas where your client needs improvement:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gaps.map((gap) => (
            <button
              key={gap.id}
              onClick={() => onGapSelection(gap)}
              className={`p-6 rounded-xl transition-all duration-300 ${gap.color} ${
                selectedGaps.some(g => g.id === gap.id)
                  ? 'ring-4 ring-blue-300 transform scale-105'
                  : 'hover:shadow-lg hover:scale-105'
              }`}
            >
              <h3 className="text-xl font-bold text-white mb-2">{gap.title}</h3>
              <p className="text-white text-opacity-90">{gap.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GapSelection;