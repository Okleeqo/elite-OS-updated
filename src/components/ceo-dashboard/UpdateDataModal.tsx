import React, { useState } from 'react';
import { X, Download, Upload, RefreshCw } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';
import { downloadTemplate } from '../../utils/excelUtils';

interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
);

export function UpdateDataModal() {
  const { 
    isModalOpen, 
    closeModal, 
    updateFinancials,
    selectedPeriod,
    setSelectedPeriod,
    resetFinancials
  } = useFinancial();

  const [formData, setFormData] = useState({
    // Revenue & Income
    productRevenue: '0',
    serviceRevenue: '0',
    otherIncome: '0',

    // Costs & Expenses
    costOfGoodsSold: '0',
    marketingExpenses: '0',
    adminExpenses: '0',
    operatingExpenses: '0',
    researchDevelopment: '0',

    // Assets
    cash: '0',
    accountsReceivable: '0',
    inventory: '0',
    buildings: '0',
    equipment: '0',

    // Liabilities
    accountsPayable: '0',
    shortTermDebt: '0',
    longTermDebt: '0',

    // Equity & Other
    commonStock: '0',
    retainedEarnings: '0',
    taxRate: '0',
    depreciation: '0'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericData = Object.entries(formData).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value === '' ? 0 : Number(value)
    }), {});
    
    updateFinancials(selectedPeriod, numericData);
    closeModal();
  };

  const handleReset = () => {
    resetFinancials(selectedPeriod);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Update Financial Data</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleReset}
              className="flex items-center px-4 py-2 text-red-600 hover:text-red-700"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Reset {selectedPeriod}
            </button>
            <button
              onClick={() => downloadTemplate()}
              className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700"
            >
              <Download className="w-5 h-5 mr-2" />
              Template
            </button>
            <label className="flex items-center px-4 py-2 text-green-600 hover:text-green-700 cursor-pointer">
              <Upload className="w-5 h-5 mr-2" />
              Upload
              <input
                type="file"
                onChange={() => {}}
                accept=".xlsx,.xls"
                className="hidden"
              />
            </label>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Period Selection */}
          <div className="flex space-x-2 mb-6">
            <Tab
              label="Actual"
              active={selectedPeriod === 'actual'}
              onClick={() => setSelectedPeriod('actual')}
            />
            <Tab
              label="Last Period"
              active={selectedPeriod === 'lastPeriod'}
              onClick={() => setSelectedPeriod('lastPeriod')}
            />
            <Tab
              label="Budget"
              active={selectedPeriod === 'budget'}
              onClick={() => setSelectedPeriod('budget')}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              {/* Revenue & Income */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue & Income</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Product Revenue</label>
                    <input
                      type="number"
                      name="productRevenue"
                      value={formData.productRevenue}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Service Revenue</label>
                    <input
                      type="number"
                      name="serviceRevenue"
                      value={formData.serviceRevenue}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Other Income</label>
                    <input
                      type="number"
                      name="otherIncome"
                      value={formData.otherIncome}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Costs & Expenses */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Costs & Expenses</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cost of Goods Sold</label>
                    <input
                      type="number"
                      name="costOfGoodsSold"
                      value={formData.costOfGoodsSold}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Marketing Expenses</label>
                    <input
                      type="number"
                      name="marketingExpenses"
                      value={formData.marketingExpenses}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Operating Expenses</label>
                    <input
                      type="number"
                      name="operatingExpenses"
                      value={formData.operatingExpenses}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Assets */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Assets</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cash</label>
                    <input
                      type="number"
                      name="cash"
                      value={formData.cash}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Accounts Receivable</label>
                    <input
                      type="number"
                      name="accountsReceivable"
                      value={formData.accountsReceivable}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Inventory</label>
                    <input
                      type="number"
                      name="inventory"
                      value={formData.inventory}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Liabilities & Equity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Liabilities & Equity</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Accounts Payable</label>
                    <input
                      type="number"
                      name="accountsPayable"
                      value={formData.accountsPayable}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Short-term Debt</label>
                    <input
                      type="number"
                      name="shortTermDebt"
                      value={formData.shortTermDebt}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Long-term Debt</label>
                    <input
                      type="number"
                      name="longTermDebt"
                      value={formData.longTermDebt}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update {selectedPeriod} Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}