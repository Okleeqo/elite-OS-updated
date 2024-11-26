import React from 'react';
import { Check } from 'lucide-react';

interface GapSelectionProps {
  selectedGaps: string[];
  onUpdateGaps: (gaps: string[]) => void;
}

const gaps = [
  {
    id: 'profitability',
    title: 'Profitability Increase',
    description: 'Optimize revenue streams and cost structures to enhance overall profitability',
    color: 'bg-gradient-to-r from-blue-500 to-blue-600'
  },
  {
    id: 'cash-flow',
    title: 'Operating Cash Flow Management',
    description: 'Improve cash flow cycles and working capital efficiency',
    color: 'bg-gradient-to-r from-green-500 to-green-600'
  },
  {
    id: 'pricing',
    title: 'Pricing Optimization',
    description: 'Develop and implement effective pricing strategies',
    color: 'bg-gradient-to-r from-purple-500 to-purple-600'
  },
  {
    id: 'cogs',
    title: 'COGS and Operating Expenses Optimization',
    description: 'Streamline costs while maintaining operational efficiency',
    color: 'bg-gradient-to-r from-orange-500 to-orange-600'
  },
  {
    id: 'working-capital',
    title: 'Working Capital Optimization',
    description: 'Enhance inventory, receivables, and payables management',
    color: 'bg-gradient-to-r from-red-500 to-red-600'
  }
];

const GapSelection: React.FC<GapSelectionProps> = ({ selectedGaps, onUpdateGaps }) => {
  const toggleGap = (gapId: string) => {
    const newSelectedGaps = selectedGaps.includes(gapId)
      ? selectedGaps.filter(id => id !== gapId)
      : [...selectedGaps, gapId];
    onUpdateGaps(newSelectedGaps);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Identify Client Gaps
        </h3>
        <p className="text-gray-600">
          Select the key areas where your client needs improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gaps.map((gap) => (
          <button
            key={gap.id}
            onClick={() => toggleGap(gap.id)}
            className={`p-6 rounded-xl text-left transition-all duration-300 ${gap.color} text-white ${
              selectedGaps.includes(gap.id)
                ? 'ring-4 ring-blue-500 ring-opacity-50 transform scale-105'
                : 'hover:shadow-lg hover:scale-105'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xl font-bold mb-2">{gap.title}</h4>
                <p className="text-white text-opacity-90">{gap.description}</p>
              </div>
              {selectedGaps.includes(gap.id) && (
                <Check className="w-6 h-6" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GapSelection;