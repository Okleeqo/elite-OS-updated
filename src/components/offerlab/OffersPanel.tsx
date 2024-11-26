import React, { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import OfferCreationWizard from './offers/OfferCreationWizard';

const OffersPanel: React.FC = () => {
  const [isCreatingOffer, setIsCreatingOffer] = useState(false);

  if (isCreatingOffer) {
    return <OfferCreationWizard />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Offers</h2>
        <button
          onClick={() => setIsCreatingOffer(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Offer
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <FileText className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Create Your First Offer</h3>
        <p className="text-gray-600 mb-6">
          Start building your productized service offerings by creating your first offer.
        </p>
        <button
          onClick={() => setIsCreatingOffer(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Offer
        </button>
      </div>
    </div>
  );
};

export default OffersPanel;