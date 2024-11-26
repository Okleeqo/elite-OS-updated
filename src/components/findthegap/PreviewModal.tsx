import React from 'react';
import { X } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  onConfirm: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, data, onConfirm }) => {
  if (!isOpen) return null;

  const PreviewSection = ({ title, items }: { title: string; items: Array<{ label: string; value: number }> }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium">{formatCurrency(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Preview Financial Data</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <PreviewSection 
            title="Income Statement Summary"
            items={[
              { label: 'Total Revenue', value: (data.revenue || 0) + (data.serviceRevenue || 0) },
              { label: 'Gross Profit', value: (data.revenue || 0) + (data.serviceRevenue || 0) - (data.cogs || 0) },
              { label: 'Operating Income', value: (data.revenue || 0) + (data.serviceRevenue || 0) - (data.cogs || 0) - (data.operatingExpenses || 0) },
              { label: 'Net Income', value: (data.revenue || 0) + (data.serviceRevenue || 0) - (data.cogs || 0) - (data.operatingExpenses || 0) - (data.interestExpense || 0) }
            ]}
          />

          <PreviewSection 
            title="Balance Sheet Summary"
            items={[
              { label: 'Total Assets', value: (data.cash || 0) + (data.accountsReceivable || 0) + (data.inventory || 0) + (data.buildings || 0) + (data.equipment || 0) },
              { label: 'Total Liabilities', value: (data.accountsPayable || 0) + (data.shortTermDebt || 0) + (data.longTermDebt || 0) },
              { label: 'Total Equity', value: (data.commonStock || 0) + (data.retainedEarnings || 0) }
            ]}
          />

          <PreviewSection 
            title="Working Capital Metrics"
            items={[
              { label: 'Working Capital', value: ((data.cash || 0) + (data.accountsReceivable || 0) + (data.inventory || 0)) - ((data.accountsPayable || 0) + (data.shortTermDebt || 0)) },
              { label: 'Current Ratio', value: ((data.cash || 0) + (data.accountsReceivable || 0) + (data.inventory || 0)) / ((data.accountsPayable || 0) + (data.shortTermDebt || 0)) }
            ]}
          />

          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Confirm & Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;