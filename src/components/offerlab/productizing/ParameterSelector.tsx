import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface ParameterSelectorProps {
  strategyId: string;
}

const ParameterSelector: React.FC<ParameterSelectorProps> = ({ strategyId }) => {
  const [frequency, setFrequency] = useState<string>('');
  const [deliveryMethod, setDeliveryMethod] = useState<string>('');

  const frequencies = [
    { id: 'weekly', label: 'Weekly', description: 'Regular weekly check-ins and updates' },
    { id: 'monthly', label: 'Monthly', description: 'Comprehensive monthly reviews' },
    { id: 'quarterly', label: 'Quarterly', description: 'In-depth quarterly analysis' }
  ];

  const deliveryMethods = [
    { id: 'video-call', label: 'Live Video Call', description: 'Real-time interactive sessions' },
    { id: 'recorded-video', label: 'Recorded Video', description: 'Pre-recorded presentations' },
    { id: 'email-report', label: 'Email Report', description: 'Detailed written reports' }
  ];

  return (
    <div className="space-y-6">
      {/* Frequency Selection */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Frequency</h4>
        <div className="grid grid-cols-3 gap-4">
          {frequencies.map((freq) => (
            <button
              key={freq.id}
              onClick={() => setFrequency(freq.id)}
              className={`p-4 rounded-lg text-left transition-all duration-200 ${
                frequency === freq.id
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-white border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{freq.label}</span>
                {frequency === freq.id && (
                  <Check className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <p className="text-sm text-gray-600">{freq.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Delivery Method Selection */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Delivery Method</h4>
        <div className="grid grid-cols-3 gap-4">
          {deliveryMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setDeliveryMethod(method.id)}
              className={`p-4 rounded-lg text-left transition-all duration-200 ${
                deliveryMethod === method.id
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-white border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{method.label}</span>
                {deliveryMethod === method.id && (
                  <Check className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <p className="text-sm text-gray-600">{method.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParameterSelector;