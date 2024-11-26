import React, { useState } from 'react';
import { Hammer, Plus, Save, ArrowRight } from 'lucide-react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import ServiceParameters, { ServiceParams } from './ServiceParameters';
import { generateStrategies } from '../../../lib/openai';

interface StrategyData {
  gaps: string[];
  parameters: ServiceParams;
  strategies?: any[];
}

const StrategyForge: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'gaps' | 'parameters'>('gaps');
  const [gaps, setGaps] = useState<string[]>(['']);
  const [savedGaps, setSavedGaps] = useLocalStorage<string[]>('strategyGaps', []);
  const [parameters, setParameters] = useState<ServiceParams>({
    frequency: 'monthly',
    deliveryMethod: 'video-call'
  });
  const [strategyData, setStrategyData] = useLocalStorage<StrategyData>('strategyData', {
    gaps: [],
    parameters: {
      frequency: 'monthly',
      deliveryMethod: 'video-call'
    }
  });
  const [message, setMessage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGapChange = (index: number, value: string) => {
    const newGaps = [...gaps];
    newGaps[index] = value;
    setGaps(newGaps);
  };

  const handleAddGap = () => {
    setGaps([...gaps, '']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validGaps = gaps.filter(gap => gap.trim());
    if (validGaps.length > 0) {
      setSavedGaps(validGaps);
      setStrategyData(prev => ({
        ...prev,
        gaps: validGaps
      }));
      setMessage('Gaps saved successfully!');
      setTimeout(() => {
        setMessage('');
        setCurrentStep('parameters');
      }, 1000);
    }
  };

  const handleUpdateParameters = async (newParams: ServiceParams) => {
    setParameters(newParams);
    setStrategyData(prev => ({
      ...prev,
      parameters: newParams
    }));

    try {
      setIsGenerating(true);
      setError(null);

      // Generate strategies based on gaps and parameters
      const strategies = await Promise.all(
        strategyData.gaps.map(gap => 
          generateStrategies(gap, {
            frequency: newParams.frequency,
            deliveryMethod: newParams.deliveryMethod,
            tools: [
              'GoalPilot',
              'ForecastIQ',
              'CEO dashboard',
              'MarketPulse',
              'ZenData',
              'Financial Health Check-Up',
              'Advisio',
              'FindtheGAP'
            ]
          })
        )
      );

      setStrategyData(prev => ({
        ...prev,
        strategies: strategies.flat()
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate strategies');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Hammer className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Strategy Forge</h1>
          <p className="text-gray-600">Craft powerful financial strategies</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center mb-8">
        <div className={`flex items-center ${
          currentStep === 'gaps' ? 'text-blue-600' : 'text-gray-500'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 'gaps' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}>
            1
          </div>
          <span className="ml-2 font-medium">Gap Analysis</span>
        </div>
        <div className="mx-4 flex-1 h-0.5 bg-gray-200">
          <div className={`h-full bg-blue-600 transition-all ${
            currentStep === 'parameters' ? 'w-full' : 'w-0'
          }`} />
        </div>
        <div className={`flex items-center ${
          currentStep === 'parameters' ? 'text-blue-600' : 'text-gray-500'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 'parameters' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}>
            2
          </div>
          <span className="ml-2 font-medium">Service Parameters</span>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg">
          {message}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {currentStep === 'gaps' ? (
        /* Gap Input Form */
        <form onSubmit={handleSubmit} className="space-y-6">
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
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </form>
      ) : (
        /* Service Parameters */
        <ServiceParameters
          parameters={parameters}
          onUpdateParameters={handleUpdateParameters}
          isGenerating={isGenerating}
        />
      )}

      {savedGaps.length > 0 && currentStep === 'gaps' && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved Gaps</h2>
          <div className="space-y-4">
            {savedGaps.map((gap, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{gap}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyForge;