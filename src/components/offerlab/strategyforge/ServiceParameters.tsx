import React from 'react';
import { Video, VideoOff, Mail, Clock, Calendar, FileText, Loader } from 'lucide-react';

export interface ServiceParams {
  frequency: 'weekly' | 'monthly' | 'quarterly';
  deliveryMethod: 'video-call' | 'recorded-video' | 'email-report';
}

interface ServiceParametersProps {
  parameters: ServiceParams;
  onUpdateParameters: (params: ServiceParams) => void;
  isGenerating: boolean;
}

const ServiceParameters: React.FC<ServiceParametersProps> = ({
  parameters,
  onUpdateParameters,
  isGenerating
}) => {
  const frequencies = [
    {
      id: 'weekly',
      title: 'Weekly',
      description: 'Regular weekly check-ins and updates',
      icon: Clock,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'monthly',
      title: 'Monthly',
      description: 'Comprehensive monthly reviews',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'quarterly',
      title: 'Quarterly',
      description: 'In-depth quarterly analysis',
      icon: FileText,
      color: 'from-green-500 to-green-600'
    }
  ];

  const deliveryMethods = [
    {
      id: 'video-call',
      title: 'Live Video Call',
      description: 'Real-time interactive sessions',
      icon: Video,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'recorded-video',
      title: 'Recorded Video',
      description: 'Pre-recorded presentations',
      icon: VideoOff,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'email-report',
      title: 'Report via Email',
      description: 'Detailed written reports',
      icon: Mail,
      color: 'from-red-500 to-red-600'
    }
  ];

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600">Generating strategies based on your parameters...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Service Parameters
        </h3>
        <p className="text-gray-600">
          Configure how you'll deliver your financial advisory services
        </p>
      </div>

      {/* Frequency Selection */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-4">
          How often will you deliver your service?
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frequencies.map((freq) => {
            const Icon = freq.icon;
            return (
              <button
                key={freq.id}
                onClick={() => onUpdateParameters({
                  ...parameters,
                  frequency: freq.id as ServiceParams['frequency']
                })}
                className={`p-6 rounded-xl text-left transition-all duration-300 ${
                  parameters.frequency === freq.id
                    ? `bg-gradient-to-r ${freq.color} text-white transform scale-105 shadow-lg`
                    : 'bg-white hover:shadow-md border border-gray-200'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${
                    parameters.frequency === freq.id
                      ? 'bg-white bg-opacity-20'
                      : 'bg-blue-50'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      parameters.frequency === freq.id
                        ? 'text-white'
                        : 'text-blue-600'
                    }`} />
                  </div>
                </div>
                <h4 className={`text-lg font-semibold ${
                  parameters.frequency === freq.id
                    ? 'text-white'
                    : 'text-gray-900'
                }`}>
                  {freq.title}
                </h4>
                <p className={parameters.frequency === freq.id
                  ? 'text-white text-opacity-90'
                  : 'text-gray-600'
                }>
                  {freq.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Delivery Method Selection */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-4">
          How would you like to deliver your service?
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deliveryMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => onUpdateParameters({
                  ...parameters,
                  deliveryMethod: method.id as ServiceParams['deliveryMethod']
                })}
                className={`p-6 rounded-xl text-left transition-all duration-300 ${
                  parameters.deliveryMethod === method.id
                    ? `bg-gradient-to-r ${method.color} text-white transform scale-105 shadow-lg`
                    : 'bg-white hover:shadow-md border border-gray-200'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${
                    parameters.deliveryMethod === method.id
                      ? 'bg-white bg-opacity-20'
                      : 'bg-blue-50'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      parameters.deliveryMethod === method.id
                        ? 'text-white'
                        : 'text-blue-600'
                    }`} />
                  </div>
                </div>
                <h4 className={`text-lg font-semibold ${
                  parameters.deliveryMethod === method.id
                    ? 'text-white'
                    : 'text-gray-900'
                }`}>
                  {method.title}
                </h4>
                <p className={parameters.deliveryMethod === method.id
                  ? 'text-white text-opacity-90'
                  : 'text-gray-600'
                }>
                  {method.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceParameters;