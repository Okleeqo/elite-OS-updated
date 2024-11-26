import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Upload } from 'lucide-react';
import { useGoalPilotStore } from '../../stores/goalPilotStore';
import { downloadTemplate, parseExcelFile } from '../../utils/excelUtils';

interface FinancialData {
  pricePerUnit: number;
  unitsSold: number;
  revenue: number;
  cogs: number;
  grossProfit: number;
  variableExpenses: number;
  fixedExpenses: number;
  operatingProfit: number;
  interestRatePaid: number;
  interestExpense: number;
  otherExpenses: number;
  otherIncomes: number;
  netIncome: number;
  payableDays: number;
  receivableDays: number;
  inventoryDays: number;
  fixedAssets: number;
}

interface FinancialStatementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  financialData: FinancialData;
}

const FinancialStatementsModal: React.FC<FinancialStatementsModalProps> = ({
  isOpen,
  onClose,
  financialData
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateFinancialData = useGoalPilotStore(state => state.updateFinancialData);

  // Initialize form data when financial data changes
  useEffect(() => {
    const initialFormData = Object.entries(financialData).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value.toString()
    }), {});
    setFormData(initialFormData);
  }, [financialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      return calculateDerivedValues(newData);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericData = Object.entries(formData).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value === '' ? 0 : Number(value)
    }), {}) as FinancialData;
    
    updateFinancialData(numericData);
    onClose();
  };

  const handleResetToZero = () => {
    const zeroData: FinancialData = {
      pricePerUnit: 0,
      unitsSold: 0,
      revenue: 0,
      cogs: 0,
      grossProfit: 0,
      variableExpenses: 0,
      fixedExpenses: 0,
      operatingProfit: 0,
      interestRatePaid: 0,
      interestExpense: 0,
      otherExpenses: 0,
      otherIncomes: 0,
      netIncome: 0,
      payableDays: 0,
      receivableDays: 0,
      inventoryDays: 0,
      fixedAssets: 0
    };

    const stringData = Object.entries(zeroData).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value.toString()
    }), {});
    
    setFormData(stringData);
    updateFinancialData(zeroData);
  };

  const handleDownloadTemplate = () => {
    downloadTemplate();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setError('');
      const data = await parseExcelFile(file);
      updateFinancialData(data);
      
      // Update form data with the new values
      const newFormData = Object.entries(data).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value.toString()
      }), {});
      setFormData(newFormData);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading file');
    }
  };

  const calculateDerivedValues = (data: Record<string, string>) => {
    const numericData = { ...data };
    
    Object.keys(data).forEach(key => {
      numericData[key] = data[key] === '' ? '0' : data[key];
    });

    const revenue = Number(numericData.pricePerUnit) * Number(numericData.unitsSold);
    const grossProfit = revenue - Number(numericData.cogs);
    const operatingProfit = grossProfit - Number(numericData.variableExpenses) - Number(numericData.fixedExpenses);
    const interestExpense = (revenue * Number(numericData.interestRatePaid)) / 100;
    const netIncome = operatingProfit - interestExpense - Number(numericData.otherExpenses) + Number(numericData.otherIncomes);

    return {
      ...numericData,
      revenue: revenue.toString(),
      grossProfit: grossProfit.toString(),
      operatingProfit: operatingProfit.toString(),
      interestExpense: interestExpense.toString(),
      netIncome: netIncome.toString()
    };
  };

  if (!isOpen) return null;

  const renderInput = (
    label: string,
    name: keyof FinancialData,
    readOnly: boolean = false
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        name={name}
        value={formData[name] || ''}
        onChange={handleChange}
        readOnly={readOnly}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
          readOnly ? 'bg-gray-100' : ''
        }`}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Financial Statements</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDownloadTemplate}
              className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700"
              title="Download Excel Template"
            >
              <Download className="w-5 h-5 mr-2" />
              Template
            </button>
            <button
              onClick={handleUploadClick}
              className="flex items-center px-4 py-2 text-green-600 hover:text-green-700"
              title="Upload Excel File"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".xlsx,.xls"
          className="hidden"
        />

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Income Statement</h3>
              <div className="space-y-4">
                {renderInput('Price per Unit', 'pricePerUnit')}
                {renderInput('Units Sold', 'unitsSold')}
                {renderInput('Revenue', 'revenue', true)}
                {renderInput('COGS', 'cogs')}
                {renderInput('Gross Profit', 'grossProfit', true)}
                {renderInput('Variable Expenses', 'variableExpenses')}
                {renderInput('Fixed Expenses', 'fixedExpenses')}
                {renderInput('Operating Profit', 'operatingProfit', true)}
                {renderInput('Interest Rate Paid (%)', 'interestRatePaid')}
                {renderInput('Interest Expense', 'interestExpense', true)}
                {renderInput('Other Expenses', 'otherExpenses')}
                {renderInput('Other Incomes', 'otherIncomes')}
                {renderInput('Net Income', 'netIncome', true)}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Balance Sheet</h3>
              <div className="space-y-4">
                {renderInput('Payable Days', 'payableDays')}
                {renderInput('Receivable Days', 'receivableDays')}
                {renderInput('Inventory Days', 'inventoryDays')}
                {renderInput('Fixed Assets', 'fixedAssets')}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleResetToZero}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reset to Zero
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinancialStatementsModal;