import React, { useState } from 'react';
import { X, Upload, Download, Save } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';

export function InputModal() {
  const { 
    isModalOpen, 
    closeModal, 
    financials,
    updateFinancials,
    selectedPeriod,
    setSelectedPeriod,
    resetFinancials,
    uploadedFiles,
    setUploadedFile
  } = useFinancial();

  const [formData, setFormData] = useState({
    revenue: '',
    serviceRevenue: '',
    cogs: '',
    operatingExpenses: '',
    marketingExpenses: '',
    adminExpenses: '',
    researchDevelopment: '',
    interestExpense: '',
    otherIncome: '',
    otherExpenses: '',
    depreciation: '',
    amortization: '',
    cash: '',
    accountsReceivable: '',
    inventory: '',
    prepaidExpenses: '',
    buildings: '',
    equipment: '',
    land: '',
    accountsPayable: '',
    shortTermDebt: '',
    longTermDebt: '',
    commonStock: '',
    retainedEarnings: ''
  });

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(selectedPeriod, file);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Update Financial Data</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {/* Download template logic */}}
              className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700"
              title="Download Excel Template"
            >
              <Download className="w-5 h-5 mr-2" />
              Template
            </button>
            <label className="flex items-center px-4 py-2 text-green-600 hover:text-green-700 cursor-pointer">
              <Upload className="w-5 h-5 mr-2" />
              Upload
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".xlsx,.xls"
                className="hidden"
              />
            </label>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Income Statement Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Income Statement</h3>
              <div className="space-y-4">
                {/* Add form fields for income statement */}
              </div>
            </div>

            {/* Balance Sheet Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Balance Sheet</h3>
              <div className="space-y-4">
                {/* Add form fields for balance sheet */}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reset to Zero
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}