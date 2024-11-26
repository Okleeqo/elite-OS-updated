import React, { useState } from 'react';
import { Plus, Save } from 'lucide-react';

interface GapInputProps {
  onSave: (gaps: string[]) => void;
}

const GapInput: React.FC<GapInputProps> = ({ onSave }) => {
  const [gaps, setGaps] = useState<string[]>(['']);

  const handleAddGap = () => {
    setGaps([...gaps, '']);
  };

  const handleGapChange = (index: number, value: string) => {
    const updatedGaps = [...gaps];
    updatedGaps[index] = value;
    setGaps(updatedGaps);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const validGaps = gaps.filter(gap => gap.trim());
    if (validGaps.length > 0) {
      onSave(validGaps);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="space-y-4">
        {gaps.map((gap, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Client Gap Description {gaps.length > 1 ? `#${index + 1}` : ''}
            </label>
            <textarea
              value={gap}
              onChange={(e) => handleGapChange(index, e.target.value)}
              placeholder="Describe your client's financial gap or challenge..."
              rows={4}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={handleAddGap}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Another Gap Description
        </button>

        <button
          type="submit"
          className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Gaps
        </button>
      </div>
    </form>
  );
};

export default GapInput;