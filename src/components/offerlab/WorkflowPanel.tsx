import React from 'react';
import { Workflow } from 'lucide-react';

const WorkflowPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Workflows</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <Workflow className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Design Your Workflows</h3>
        <p className="text-gray-600">
          Create and manage delivery workflows for your offers.
        </p>
      </div>
    </div>
  );
};

export default WorkflowPanel;