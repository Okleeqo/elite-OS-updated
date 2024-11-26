import React, { useState } from 'react';
import { Video, Mail, VideoOff, Calendar, ArrowRight } from 'lucide-react';

const OfferCreation: React.FC = () => {
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  const [showGapAnalysis, setShowGapAnalysis] = useState(false);

  const frequencies = [
    {
      title: 'Weekly',
      description: 'Regular weekly check-ins and updates',
      value: 'weekly'
    },
    {
      title: 'Monthly',
      description: 'Comprehensive monthly reviews',
      value: 'monthly'
    },
    {
      title: 'Quarterly',
      description: 'In-depth quarterly analysis',
      value: 'quarterly'
    }
  ];

  const deliveryMethods = [
    {
      title: 'Video Call',
      description: 'Live interactive sessions via video conference',
      icon: Video,
      value: 'video-call'
    },
    {
      title: 'Recorded Video',
      description: 'Pre-recorded video presentations and tutorials',
      icon: VideoOff,
      value: 'recorded-video'
    },
    {
      title: 'Email Report',
      description: 'Detailed written reports delivered via email',
      icon: Mail,
      value: 'email-report'
    }
  ];

  const handleContinue = () => {
    if (selectedFrequency && selectedDelivery) {
      setShowGapAnalysis(true);
    }
  };

  if (showGapAnalysis) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Gap Analysis</h2>
          {/* Gap Analysis content will be integrated here */}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Frequency Selection */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Service Frequency</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frequencies.map((freq) => (
            <button
              key={freq.value}
              onClick={() => setSelectedFrequency(freq.value)}
              className={`relative p-6 rounded-xl transition-all duration-300 ${
                selectedFrequency === freq.value
                  ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-900 shadow-md hover:shadow-lg hover:scale-105'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{freq.title}</h3>
              <p className={`text-sm ${
                selectedFrequency === freq.value ? 'text-purple-100' : 'text-gray-500'
              }`}>
                {freq.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Delivery Method Selection */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Delivery Method</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deliveryMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.value}
                onClick={() => setSelectedDelivery(method.value)}
                className={`relative p-6 rounded-xl transition-all duration-300 ${
                  selectedDelivery === method.value
                    ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-900 shadow-md hover:shadow-lg hover:scale-105'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <Icon className={`w-12 h-12 mb-4 ${
                    selectedDelivery === method.value ? 'text-white' : 'text-purple-600'
                  }`} />
                  <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                  <p className={`text-sm ${
                    selectedDelivery === method.value ? 'text-purple-100' : 'text-gray-500'
                  }`}>
                    {method.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!selectedFrequency || !selectedDelivery}
          className={`flex items-center px-6 py-3 rounded-lg text-white font-medium ${
            selectedFrequency && selectedDelivery
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to Gap Analysis
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default OfferCreation;