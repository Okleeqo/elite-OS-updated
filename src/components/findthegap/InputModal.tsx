import React, { useState } from 'react';
import { X } from 'lucide-react';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const InputModal: React.FC<InputModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    // Income Statement
    revenue: initialData?.revenue || '',
    serviceRevenue: initialData?.serviceRevenue || '',
    cogs: initialData?.cogs || '',
    operatingExpenses: initialData?.operatingExpenses || '',
    marketingExpenses: initialData?.marketingExpenses || '',
    adminExpenses: initialData?.adminExpenses || '',
    researchDevelopment: initialData?.researchDevelopment || '',
    interestExpense: initialData?.interestExpense || '',
    otherIncome: initialData?.otherIncome || '',
    otherExpenses: initialData?.otherExpenses || '',
    
    // Balance Sheet - Current Assets
    cash: initialData?.cash || '',
    accountsReceivable: initialData?.accountsReceivable || '',
    inventory: initialData?.inventory || '',
    prepaidExpenses: initialData?.prepaidExpenses || '',
    
    // Balance Sheet - Non-Current Assets
    buildings: initialData?.buildings || '',
    equipment: initialData?.equipment || '',
    land: initialData?.land || '',
    
    // Balance Sheet - Current Liabilities
    accountsPayable: initialData?.accountsPayable || '',
    shortTermDebt: initialData?.shortTermDebt || '',
    accruedLiabilities: initialData?.accruedLiabilities || '',
    
    // Balance Sheet - Non-Current Liabilities
    longTermDebt: initialData?.longTermDebt || '',
    leaseObligations: initialData?.leaseObligations || '',
    
    // Balance Sheet - Equity
    commonStock: initialData?.commonStock || '',
    retainedEarnings: initialData?.retainedEarnings || '',
    
    // Working Capital Metrics
    receivableDays: initialData?.receivableDays || '',
    inventoryDays: initialData?.inventoryDays || '',
    payableDays: initialData?.payableDays || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    onSubmit(numericData);
  };

  if (!isOpen) return null;

  const InputField: React.FC<{
    label: string;
    name: string;
    value: string;
  }> = ({ label, name, value }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Input Financial Data</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Income Statement */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Income Statement</h3>
              <div className="space-y-4">
                <InputField label="Revenue" name="revenue" value={formData.revenue} />
                <InputField label="Service Revenue" name="serviceRevenue" value={formData.serviceRevenue} />
                <InputField label="Cost of Goods Sold" name="cogs" value={formData.cogs} />
                <InputField label="Operating Expenses" name="operatingExpenses" value={formData.operatingExpenses} />
                <InputField label="Marketing Expenses" name="marketingExpenses" value={formData.marketingExpenses} />
                <InputField label="Admin Expenses" name="adminExpenses" value={formData.adminExpenses} />
                <InputField label="Research & Development" name="researchDevelopment" value={formData.researchDevelopment} />
                <InputField label="Interest Expense" name="interestExpense" value={formData.interestExpense} />
                <InputField label="Other Income" name="otherIncome" value={formData.otherIncome} />
                <InputField label="Other Expenses" name="otherExpenses" value={formData.otherExpenses} />
              </div>
            </div>

            {/* Balance Sheet */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Balance Sheet</h3>
              
              {/* Current Assets */}
              <h4 className="text-md font-medium text-gray-700 mb-3">Current Assets</h4>
              <div className="space-y-4 mb-6">
                <InputField label="Cash" name="cash" value={formData.cash} />
                <InputField label="Accounts Receivable" name="accountsReceivable" value={formData.accountsReceivable} />
                <InputField label="Inventory" name="inventory" value={formData.inventory} />
                <InputField label="Prepaid Expenses" name="prepaidExpenses" value={formData.prepaidExpenses} />
              </div>

              {/* Non-Current Assets */}
              <h4 className="text-md font-medium text-gray-700 mb-3">Non-Current Assets</h4>
              <div className="space-y-4 mb-6">
                <InputField label="Buildings" name="buildings" value={formData.buildings} />
                <InputField label="Equipment" name="equipment" value={formData.equipment} />
                <InputField label="Land" name="land" value={formData.land} />
              </div>

              {/* Current Liabilities */}
              <h4 className="text-md font-medium text-gray-700 mb-3">Current Liabilities</h4>
              <div className="space-y-4 mb-6">
                <InputField label="Accounts Payable" name="accountsPayable" value={formData.accountsPayable} />
                <InputField label="Short Term Debt" name="shortTermDebt" value={formData.shortTermDebt} />
                <InputField label="Accrued Liabilities" name="accruedLiabilities" value={formData.accruedLiabilities} />
              </div>

              {/* Non-Current Liabilities */}
              <h4 className="text-md font-medium text-gray-700 mb-3">Non-Current Liabilities</h4>
              <div className="space-y-4 mb-6">
                <InputField label="Long Term Debt" name="longTermDebt" value={formData.longTermDebt} />
                <InputField label="Lease Obligations" name="leaseObligations" value={formData.leaseObligations} />
              </div>

              {/* Equity */}
              <h4 className="text-md font-medium text-gray-700 mb-3">Equity</h4>
              <div className="space-y-4 mb-6">
                <InputField label="Common Stock" name="commonStock" value={formData.commonStock} />
                <InputField label="Retained Earnings" name="retainedEarnings" value={formData.retainedEarnings} />
              </div>
            </div>
          </div>

          {/* Working Capital Metrics */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Working Capital Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField label="Days Sales Outstanding (DSO)" name="receivableDays" value={formData.receivableDays} />
              <InputField label="Days Inventory Outstanding (DIO)" name="inventoryDays" value={formData.inventoryDays} />
              <InputField label="Days Payable Outstanding (DPO)" name="payableDays" value={formData.payableDays} />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputModal;