import React from 'react';
import { Settings } from 'lucide-react';

const FrameworksPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Frameworks & Parameters</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <Settings className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Configure Your Frameworks</h3>
        <p className="text-gray-600">
          Set up delivery parameters and customize frameworks for your offers.
        </p>
      </div>
    </div>
  );
};

export default FrameworksPanel;