import React, { useState } from 'react';
import ServiceParameters, { ServiceParams } from './ServiceParameters';

interface ServiceParametersContainerProps {
  onComplete: (parameters: ServiceParams) => void;
}

const ServiceParametersContainer: React.FC<ServiceParametersContainerProps> = ({ onComplete }) => {
  const [parameters, setParameters] = useState<ServiceParams>({
    frequency: 'monthly',
    deliveryMethod: 'video-call'
  });

  const handleUpdate = (newParams: ServiceParams) => {
    setParameters(newParams);
    onComplete(newParams);
  };

  return (
    <ServiceParameters
      parameters={parameters}
      onUpdate={handleUpdate}
    />
  );
};

export default ServiceParametersContainer;