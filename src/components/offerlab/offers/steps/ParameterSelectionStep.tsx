import React from 'react';
import { Video, Mail, VideoOff, Wrench } from 'lucide-react';
import { OfferData } from '../OfferCreationWizard';

interface ParameterSelectionStepProps {
  parameters: OfferData['parameters'];
  onUpdateParameters: (parameters: OfferData['parameters']) => void;
}

const ParameterSelectionStep: React.FC<ParameterSelectionStepProps> = ({
  parameters,
  onUpdateParameters
}) => {
  const frequencies = [
    { value: 'weekly', label: 'Weekly', description: 'Regular weekly check-ins and updates' },
    { value: 'monthly', label: 'Monthly', description: 'Comprehensive monthly reviews' },
    { value: 'quarterly', label: 'Quarterly', description: 'In-depth quarterly analysis' }
  ];

  const deliveryMethods = [
    { 
      value: 'video-call', 
      label: 'Video Call', 
      icon: Video,
      description: 'Live interactive sessions via video conference'
    },
    { 
      value: 'recorded-video', 
      label: 'Recorded Video', 
      icon: VideoOff,
      description: 'Pre-recorded video presentations and tutorials'
    },
    { 
      value: 'email-report', 
      label: 'Email Report', 
      icon: Mail,
      description: 'Detailed written reports delivered via email'
    }
  ];

  const tools = [
    'Financial Planning Software',
    'Investment Analysis Tools',
    'Risk Assessment Platform',
    'Portfolio Management System',
    'Tax Planning Software',
    'Client Portal'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Set Delivery Parameters
        </h3>
        <p className="text-gray-600">
          Configure how you'll deliver your services to the client.
        </p>
      </div>

      {/* Frequency Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Service Frequency
        </label>
        <div className="grid grid-cols-3 gap-6">
          {frequencies.map((freq) => (
            <button
              key={freq.value}
              onClick={() => onUpdateParameters({
                ...parameters,
                frequency: freq.value as OfferData['parameters']['frequency']
              })}
              className={`relative p-6 rounded-xl transition-all duration-300 ${
                parameters.frequency === freq.value
                  ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-900 shadow-md hover:shadow-lg hover:scale-105'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{freq.label}</h3>
              <p className={`text-sm ${
                parameters.frequency === freq.value ? 'text-purple-100' : 'text-gray-500'
              }`}>
                {freq.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Delivery Method Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Delivery Method
        </label>
        <div className="grid grid-cols-3 gap-6">
          {deliveryMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.value}
                onClick={() => onUpdateParameters({
                  ...parameters,
                  deliveryMethod: method.value as OfferData['parameters']['deliveryMethod']
                })}
                className={`relative p-6 rounded-xl transition-all duration-300 ${
                  parameters.deliveryMethod === method.value
                    ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-900 shadow-md hover:shadow-lg hover:scale-105'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <Icon className={`w-12 h-12 mb-4 ${
                    parameters.deliveryMethod === method.value ? 'text-white' : 'text-purple-600'
                  }`} />
                  <h3 className="text-xl font-bold mb-2">{method.label}</h3>
                  <p className={`text-sm ${
                    parameters.deliveryMethod === method.value ? 'text-purple-100' : 'text-gray-500'
                  }`}>
                    {method.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Tools & Resources
        </label>
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool) => (
            <button
              key={tool}
              onClick={() => {
                const updatedTools = parameters.tools.includes(tool)
                  ? parameters.tools.filter(t => t !== tool)
                  : [...parameters.tools, tool];
                onUpdateParameters({
                  ...parameters,
                  tools: updatedTools
                });
              }}
              className={`p-4 rounded-xl transition-all duration-300 ${
                parameters.tools.includes(tool)
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-gray-900 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Wrench className={`w-5 h-5 ${
                  parameters.tools.includes(tool) ? 'text-white' : 'text-purple-600'
                }`} />
                <span className="font-medium">{tool}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParameterSelectionStep;