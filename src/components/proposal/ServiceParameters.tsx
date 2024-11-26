import React from 'react';
import { Video, VideoOff, Mail, Clock, Calendar, FileText } from 'lucide-react';
import SelectableCard from './SelectableCard';

export interface ServiceParams {
  frequency: 'weekly' | 'monthly' | 'quarterly';
  deliveryMethod: 'video-call' | 'recorded-video' | 'email-report';
}

interface ServiceParametersProps {
  parameters: ServiceParams;
  onUpdate: (params: ServiceParams) => void;
}

const frequencies = [
  {
    value: 'weekly',
    title: 'Weekly',
    description: 'Regular weekly check-ins and updates',
    icon: Clock
  },
  {
    value: 'monthly',
    title: 'Monthly',
    description: 'Comprehensive monthly reviews',
    icon: Calendar
  },
  {
    value: 'quarterly',
    title: 'Quarterly',
    description: 'In-depth quarterly analysis',
    icon: FileText
  }
] as const;

const deliveryMethods = [
  {
    value: 'video-call',
    title: 'Live Video Call',
    description: 'Real-time interactive sessions',
    icon: Video
  },
  {
    value: 'recorded-video',
    title: 'Recorded Video',
    description: 'Pre-recorded presentations',
    icon: VideoOff
  },
  {
    value: 'email-report',
    title: 'Report via Email',
    description: 'Detailed written reports',
    icon: Mail
  }
] as const;

const ServiceParameters: React.FC<ServiceParametersProps> = ({
  parameters,
  onUpdate
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Frequency Selection */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How often would you like to deliver your service?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frequencies.map((freq) => (
            <SelectableCard
              key={freq.value}
              title={freq.title}
              description={freq.description}
              icon={freq.icon}
              selected={parameters.frequency === freq.value}
              onClick={() => onUpdate({ ...parameters, frequency: freq.value })}
            />
          ))}
        </div>
      </section>

      {/* Delivery Method Selection */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How would you like to deliver your service?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deliveryMethods.map((method) => (
            <SelectableCard
              key={method.value}
              title={method.title}
              description={method.description}
              icon={method.icon}
              selected={parameters.deliveryMethod === method.value}
              onClick={() => onUpdate({ ...parameters, deliveryMethod: method.value })}
            />
          ))}
        </div>
      </section>

      {/* Progress Indicator */}
      <div className="flex justify-between items-center pt-8 border-t">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        </div>
        <p className="text-sm text-gray-500">Step 2 of 3</p>
      </div>
    </div>
  );
};

export default ServiceParameters;