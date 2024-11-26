import React from 'react';
import { Building2, Briefcase, CreditCard } from 'lucide-react';

export function BalanceSheetSection() {
  return (
    <div className="bg-blue-50 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Balance Sheet</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Assets</h3>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-800 mb-3">Current Assets</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
                Cash
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                Inventory
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
                Accounts Receivable
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-800 mb-3">Fixed Assets</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="h-4 w-4 mr-2 text-blue-500" />
                Buildings
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="h-4 w-4 mr-2 text-blue-500" />
                Equipment
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Liabilities</h3>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-800 mb-3">Current Liabilities</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CreditCard className="h-4 w-4 mr-2 text-red-500" />
                Accounts Payable
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CreditCard className="h-4 w-4 mr-2 text-red-500" />
                Short-term Debt
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-800 mb-3">Long-term Liabilities</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="h-4 w-4 mr-2 text-red-500" />
                Long-term Debt
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="h-4 w-4 mr-2 text-red-500" />
                Bonds Payable
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Owner's Equity</h3>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-800 mb-3">Contributed Capital</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CreditCard className="h-4 w-4 mr-2 text-purple-500" />
                Common Stock
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CreditCard className="h-4 w-4 mr-2 text-purple-500" />
                Preferred Stock
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-800 mb-3">Retained Earnings</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="h-4 w-4 mr-2 text-purple-500" />
                Accumulated Profits
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="h-4 w-4 mr-2 text-purple-500" />
                Dividends Paid
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}