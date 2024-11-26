import React from 'react';
import { MinusCircle, PlusCircle } from 'lucide-react';

export function ProfitLossSection() {
  return (
    <div className="bg-red-50 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profit & Loss</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Revenue</h3>
          <p className="text-sm text-gray-600">Income generated through sales</p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center text-sm text-gray-700">
              <PlusCircle className="h-4 w-4 mr-2 text-green-500" />
              Product Revenue
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <PlusCircle className="h-4 w-4 mr-2 text-green-500" />
              Service Revenue
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Cost of Goods Sold</h3>
          <p className="text-sm text-gray-600">Direct costs to deliver product/service</p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center text-sm text-gray-700">
              <MinusCircle className="h-4 w-4 mr-2 text-red-500" />
              Direct Materials
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <MinusCircle className="h-4 w-4 mr-2 text-red-500" />
              Direct Labor
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Operating Expenses</h3>
          <p className="text-sm text-gray-600">Costs of running the business</p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center text-sm text-gray-700">
              <MinusCircle className="h-4 w-4 mr-2 text-red-500" />
              Office Supplies
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <MinusCircle className="h-4 w-4 mr-2 text-red-500" />
              Marketing
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Other Items</h3>
          <p className="text-sm text-gray-600">Non-primary activities</p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center text-sm text-gray-700">
              <PlusCircle className="h-4 w-4 mr-2 text-green-500" />
              Interest Income
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <MinusCircle className="h-4 w-4 mr-2 text-red-500" />
              Interest Expense
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}