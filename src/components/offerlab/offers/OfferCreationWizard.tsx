import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import GapInputStep from './steps/GapInputStep';
import ParameterSelectionStep from './steps/ParameterSelectionStep';
import OfferPreviewStep from './steps/OfferPreviewStep';

export interface OfferData {
  gaps: string[];
  parameters: {
    frequency: 'weekly' | 'monthly' | 'quarterly';
    deliveryMethod: 'video-call' | 'recorded-video' | 'email-report';
    tools: string[];
  };
  goals: any[];
  actions: any[];
  strategies: any[];
}

const OfferCreationWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [offerData, setOfferData] = useState<OfferData>({
    gaps: [],
    parameters: {
      frequency: 'monthly',
      deliveryMethod: 'video-call',
      tools: []
    },
    goals: [],
    actions: [],
    strategies: []
  });

  const steps = [
    {
      title: 'Identify Gaps',
      component: GapInputStep,
      props: {
        gaps: offerData.gaps,
        onUpdateGaps: (gaps: string[]) => 
          setOfferData(prev => ({ ...prev, gaps }))
      }
    },
    {
      title: 'Set Parameters',
      component: ParameterSelectionStep,
      props: {
        parameters: offerData.parameters,
        onUpdateParameters: (parameters: OfferData['parameters']) =>
          setOfferData(prev => ({ ...prev, parameters }))
      }
    },
    {
      title: 'Review & Generate',
      component: OfferPreviewStep,
      props: {
        offerData,
        onUpdateOffer: (data: Partial<OfferData>) =>
          setOfferData(prev => ({ ...prev, ...data }))
      }
    }
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Progress Steps */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <span className="ml-2 font-medium text-gray-900">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="mx-4 flex-1 h-0.5 bg-gray-200">
                  <div className={`h-full bg-purple-600 transition-all ${
                    index < currentStep ? 'w-full' : 'w-0'
                  }`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        <CurrentStepComponent {...steps[currentStep].props} />
      </div>

      {/* Navigation */}
      <div className="border-t px-6 py-4 flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`flex items-center px-4 py-2 rounded-lg ${
            currentStep === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className={`flex items-center px-4 py-2 rounded-lg ${
            currentStep === steps.length - 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default OfferCreationWizard;