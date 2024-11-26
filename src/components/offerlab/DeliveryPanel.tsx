import React from 'react';
import { Bell } from 'lucide-react';

const DeliveryPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Delivery</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <Bell className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Delivery</h3>
        <p className="text-gray-600">
          Track and manage the delivery of your offers to clients.
        </p>
      </div>
    </div>
  );
};

export default DeliveryPanel;