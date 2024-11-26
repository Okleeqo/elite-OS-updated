import React from 'react';
import { Beaker } from 'lucide-react';

export function IntroSection() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-start space-x-6">
        <div className="bg-emerald-100 p-4 rounded-lg">
          <Beaker className="h-8 w-8 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What are financial statements?</h2>
          <p className="text-gray-600 leading-relaxed">
            Think of financial statements as a lab result, but for your business's financial health. 
            It consists of three main components:
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center text-gray-700">
              <span className="w-3 h-3 bg-red-400 rounded-full mr-3"></span>
              Profit & Loss
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-3 h-3 bg-blue-400 rounded-full mr-3"></span>
              Balance Sheet
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
              Statement of Cash Flows
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}