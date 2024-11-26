import React from 'react';
import { ArrowDown, ArrowUp, Activity } from 'lucide-react';

export function CashFlowSection() {
  return (
    <div className="bg-green-50 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Cash Flows</h2>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Operating Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Cash Inflows</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <ArrowUp className="h-4 w-4 mr-2 text-green-500" />
                  Net Income
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ArrowUp className="h-4 w-4 mr-2 text-green-500" />
                  Depreciation
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Working Capital</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Activity className="h-4 w-4 mr-2 text-blue-500" />
                  Change in Current Assets
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Activity className="h-4 w-4 mr-2 text-blue-500" />
                  Change in Current Liabilities
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Investing Activities</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <ArrowDown className="h-4 w-4 mr-2 text-red-500" />
                Purchase of Fixed Assets
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <ArrowUp className="h-4 w-4 mr-2 text-green-500" />
                Sale of Investments
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Financing Activities</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <ArrowUp className="h-4 w-4 mr-2 text-green-500" />
                New Debt / Equity
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <ArrowDown className="h-4 w-4 mr-2 text-red-500" />
                Debt Repayment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}