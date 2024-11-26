import React, { useState } from 'react';
import { Plus, X, Loader } from 'lucide-react';
import { analyzeGap, type GapAnalysisResult } from '../../../../lib/openai';

interface GapInputStepProps {
  gaps: string[];
  onUpdateGaps: (gaps: string[]) => void;
}

const GapInputStep: React.FC<GapInputStepProps> = ({ gaps, onUpdateGaps }) => {
  const [newGap, setNewGap] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<GapAnalysisResult | null>(null);

  const handleAddGap = async () => {
    if (!newGap.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);

    try {
      const gapAnalysis = await analyzeGap(newGap.trim());
      setAnalysis(gapAnalysis);
      onUpdateGaps([...gaps, newGap.trim()]);
      setNewGap('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze gap');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRemoveGap = (index: number) => {
    onUpdateGaps(gaps.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddGap();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Identify Client Gaps
        </h3>
        <p className="text-gray-600">
          Enter the gaps you've identified in your client's business or financial situation.
          Each gap will be analyzed by AI to generate targeted solutions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newGap}
            onChange={(e) => setNewGap(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a gap..."
            className="flex-1 border-gray-300 rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500"
            disabled={isAnalyzing}
          />
          <button
            onClick={handleAddGap}
            disabled={isAnalyzing || !newGap.trim()}
            className={`px-4 py-2 rounded-lg text-white font-medium flex items-center ${
              isAnalyzing || !newGap.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Add Gap
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {gaps.map((gap, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{gap}</h4>
                  {analysis && index === gaps.length - 1 && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700">Problem Statement</h5>
                        <p className="text-sm text-gray-600">{analysis.problemStatement}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700">Key Insights</h5>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {analysis.keyInsights.map((insight, i) => (
                            <li key={i}>{insight}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700">Impact Areas</h5>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {analysis.impactAreas.map((area, i) => (
                            <li key={i}>{area}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveGap(index)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {gaps.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">
              No gaps added yet. Start by adding your first gap above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GapInputStep;