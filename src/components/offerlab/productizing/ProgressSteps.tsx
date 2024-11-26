import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
  steps: string[];
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index + 1 === currentStep
                ? 'bg-blue-600 text-white'
                : index + 1 < currentStep
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {index + 1}
            </div>
            <span className="ml-2 font-medium text-gray-900">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-4 bg-gray-200">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{
                  width: index + 1 < currentStep ? '100%' : '0%'
                }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressSteps;