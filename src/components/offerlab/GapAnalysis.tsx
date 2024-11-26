import React, { useState } from 'react';
import { AlertCircle, Loader } from 'lucide-react';
import { analyzeGap, type GapAnalysisResult } from '../../lib/openai';

interface GapAnalysisProps {
  onAnalysisComplete: (analysis: GapAnalysisResult) => void;
}

const GapAnalysis: React.FC<GapAnalysisProps> = ({ onAnalysisComplete }) => {
  const [gap, setGap] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gap.trim()) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const analysis = await analyzeGap(gap);
      onAnalysisComplete(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze gap');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Gap Analysis</h2>
      
      <form onSubmit={handleAnalysis} className="space-y-4">
        <div>
          <label 
            htmlFor="gap-description" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Describe the client's gap or challenge
          </label>
          <textarea
            id="gap-description"
            value={gap}
            onChange={(e) => setGap(e.target.value)}
            className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the specific gap or challenge in the client's business..."
            disabled={isAnalyzing}
          />
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isAnalyzing || !gap.trim()}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center ${
            isAnalyzing || !gap.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Gap'
          )}
        </button>
      </form>
    </div>
  );
};

export default GapAnalysis;