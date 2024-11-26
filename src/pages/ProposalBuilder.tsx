import React, { useState } from 'react';
import GapInput from '../components/proposal/GapInput';
import ServiceParameters, { ServiceParams } from '../components/proposal/ServiceParameters';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ProposalBuilder: React.FC = () => {
  // Store gaps in local storage for persistence
  const [savedGaps, setSavedGaps] = useLocalStorage<string[]>('clientGaps', []);
  const [serviceParams, setServiceParams] = useLocalStorage<ServiceParams>('serviceParams', {
    frequency: 'monthly',
    deliveryMethod: 'video-call'
  });
  const [message, setMessage] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'gaps' | 'parameters'>('gaps');

  const handleSaveGaps = (gaps: string[]) => {
    setSavedGaps(gaps);
    setMessage('Gaps saved successfully!');
    setTimeout(() => {
      setMessage('');
      setCurrentStep('parameters');
    }, 1000);
  };

  const handleUpdateParams = (params: ServiceParams) => {
    setServiceParams(params);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Proposal Builder</h1>
        <p className="mt-2 text-gray-600">
          Create a customized proposal based on your client's needs.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center">
        <div className={`flex items-center ${currentStep === 'gaps' ? 'text-blue-600' : 'text-gray-500'}`}>
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
        <div className={`flex items-center ${currentStep === 'parameters' ? 'text-blue-600' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 'parameters' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}>
            2
          </div>
          <span className="ml-2 font-medium">Service Parameters</span>
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
          {message}
        </div>
      )}

      {currentStep === 'gaps' ? (
        <GapInput onSave={handleSaveGaps} />
      ) : (
        <ServiceParameters
          parameters={serviceParams}
          onUpdate={handleUpdateParams}
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

export default ProposalBuilder;