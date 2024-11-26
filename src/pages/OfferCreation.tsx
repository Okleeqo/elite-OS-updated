import React from 'react';
import { Navigate } from 'react-router-dom';

const OfferCreation: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px] py-8">
        <div className="max-w-screen-xl mx-auto">
          <Navigate to="/offer-creation/offerlab" replace />
        </div>
      </div>
    </div>
  );
};

export default OfferCreation;