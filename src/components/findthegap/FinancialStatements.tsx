import React, { useState, useRef, useEffect } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { formatCurrency } from '../../utils/formatters';
import { ChevronDown, ChevronUp, DollarSign, TrendingUp, TrendingDown, Download, Upload, RefreshCw, Save, X } from 'lucide-react';
import { downloadTemplate, parseExcelFile } from '../../utils/excelUtils';
import InputModal from './InputModal';
import PreviewModal from './PreviewModal';

interface StatementRowProps {
  label: string;
  value: number;
  previousValue?: number;
  indent?: boolean;
  isTotal?: boolean;
  isDays?: boolean;
}

interface SectionHeaderProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const StatementRow: React.FC<StatementRowProps> = ({ 
  label, 
  value, 
  previousValue, 
  indent = false, 
  isTotal = false,
  isDays = false
}) => {
  const change = previousValue ? ((value - previousValue) / previousValue) * 100 : 0;
  const isPositive = change > 0;

  return (
    <div className={`
      flex items-center justify-between py-3 
      ${indent ? 'pl-6' : ''} 
      ${isTotal ? 'font-semibold border-t border-gray-200 dark:border-gray-700' : ''}
    `}>
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
      <div className="flex items-center space-x-4">
        <span className="text-gray-900 dark:text-gray-100">
          {isDays ? `${value} days` : formatCurrency(value)}
        </span>
        {previousValue !== undefined && (
          <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{change.toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, isExpanded, onToggle }) => (
  <button
    onClick={onToggle}
    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
  >
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
    {isExpanded ? (
      <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-500" />
    ) : (
      <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
    )}
  </button>
);

const FinancialStatements: React.FC = () => {
  const { financials, updateFinancials, resetFinancials } = useFinancial();
  const { actual, lastPeriod } = financials;
  const [expandedSections, setExpandedSections] = useState({
    income: true,
    balance: true,
    metrics: true
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const data = await parseExcelFile(file);
      setPreviewData(data);
      setShowPreviewModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading file');
    } finally {
      setIsUploading(false);
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const handlePreviewConfirm = () => {
    if (previewData) {
      updateFinancials('actual', previewData);
      setShowPreviewModal(false);
      setPreviewData(null);
    }
  };

  const handleInputSubmit = (data: any) => {
    updateFinancials('actual', data);
    setShowInputModal(false);
  };

  const handleReset = () => {
    try {
      resetFinancials('actual');
      setError(null);
    } catch (err) {
      setError('Failed to reset financial data');
    }
  };

  // Calculate totals
  const revenue = (actual.revenue || 0) + (actual.serviceRevenue || 0);
  const grossProfit = revenue - (actual.cogs || 0);
  const operatingExpenses = (actual.operatingExpenses || 0) + 
    (actual.marketingExpenses || 0) + 
    (actual.adminExpenses || 0) + 
    (actual.researchDevelopment || 0);
  const operatingIncome = grossProfit - operatingExpenses;
  const netIncome = operatingIncome - (actual.interestExpense || 0) + 
    (actual.otherIncome || 0) - (actual.otherExpenses || 0);

  const currentAssets = (actual.cash || 0) + 
    (actual.accountsReceivable || 0) + 
    (actual.inventory || 0) + 
    (actual.prepaidExpenses || 0);
  const nonCurrentAssets = (actual.buildings || 0) + 
    (actual.equipment || 0) + 
    (actual.land || 0);
  const totalAssets = currentAssets + nonCurrentAssets;

  const currentLiabilities = (actual.accountsPayable || 0) + 
    (actual.shortTermDebt || 0) + 
    (actual.accruedLiabilities || 0);
  const nonCurrentLiabilities = (actual.longTermDebt || 0) + 
    (actual.leaseObligations || 0);
  const totalLiabilities = currentLiabilities + nonCurrentLiabilities;

  const totalEquity = (actual.commonStock || 0) + (actual.retainedEarnings || 0);

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
        <button
          onClick={() => setShowInputModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-5 h-5 mr-2" />
          Input Data
        </button>
        
        <button
          onClick={() => downloadTemplate()}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Template
        </button>

        <label className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors">
          <Upload className="w-5 h-5 mr-2" />
          Upload Data
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".xlsx,.xls"
            className="hidden"
          />
        </label>

        <button
          onClick={handleReset}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Reset Data
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
          <div className="flex items-center">
            <X className="w-5 h-5 mr-2" />
            {error}
          </div>
        </div>
      )}

      {/* Income Statement */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <SectionHeader 
          title="Income Statement" 
          isExpanded={expandedSections.income}
          onToggle={() => toggleSection('income')}
        />
        {expandedSections.income && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <StatementRow label="Revenue" value={actual.revenue || 0} previousValue={lastPeriod.revenue} />
            <StatementRow label="Service Revenue" value={actual.serviceRevenue || 0} previousValue={lastPeriod.serviceRevenue} />
            <StatementRow label="Total Revenue" value={revenue} previousValue={(lastPeriod.revenue || 0) + (lastPeriod.serviceRevenue || 0)} isTotal />
            <StatementRow label="Cost of Goods Sold" value={actual.cogs || 0} previousValue={lastPeriod.cogs} />
            <StatementRow label="Gross Profit" value={grossProfit} previousValue={(lastPeriod.revenue || 0) + (lastPeriod.serviceRevenue || 0) - (lastPeriod.cogs || 0)} isTotal />
            <StatementRow label="Operating Expenses" value={actual.operatingExpenses || 0} previousValue={lastPeriod.operatingExpenses} />
            <StatementRow label="Marketing Expenses" value={actual.marketingExpenses || 0} previousValue={lastPeriod.marketingExpenses} />
            <StatementRow label="Admin Expenses" value={actual.adminExpenses || 0} previousValue={lastPeriod.adminExpenses} />
            <StatementRow label="Research & Development" value={actual.researchDevelopment || 0} previousValue={lastPeriod.researchDevelopment} />
            <StatementRow label="Total Operating Expenses" value={operatingExpenses} previousValue={(lastPeriod.operatingExpenses || 0) + (lastPeriod.marketingExpenses || 0) + (lastPeriod.adminExpenses || 0) + (lastPeriod.researchDevelopment || 0)} isTotal />
            <StatementRow label="Operating Income" value={operatingIncome} previousValue={(lastPeriod.revenue || 0) + (lastPeriod.serviceRevenue || 0) - (lastPeriod.cogs || 0) - ((lastPeriod.operatingExpenses || 0) + (lastPeriod.marketingExpenses || 0) + (lastPeriod.adminExpenses || 0) + (lastPeriod.researchDevelopment || 0))} isTotal />
            <StatementRow label="Interest Expense" value={actual.interestExpense || 0} previousValue={lastPeriod.interestExpense} />
            <StatementRow label="Other Income" value={actual.otherIncome || 0} previousValue={lastPeriod.otherIncome} />
            <StatementRow label="Other Expenses" value={actual.otherExpenses || 0} previousValue={lastPeriod.otherExpenses} />
            <StatementRow label="Net Income" value={netIncome} previousValue={(lastPeriod.revenue || 0) + (lastPeriod.serviceRevenue || 0) - (lastPeriod.cogs || 0) - ((lastPeriod.operatingExpenses || 0) + (lastPeriod.marketingExpenses || 0) + (lastPeriod.adminExpenses || 0) + (lastPeriod.researchDevelopment || 0)) - (lastPeriod.interestExpense || 0) + (lastPeriod.otherIncome || 0) - (lastPeriod.otherExpenses || 0)} isTotal />
          </div>
        )}
      </div>

      {/* Balance Sheet */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <SectionHeader 
          title="Balance Sheet" 
          isExpanded={expandedSections.balance}
          onToggle={() => toggleSection('balance')}
        />
        {expandedSections.balance && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Assets</h4>
            
            {/* Current Assets */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Current Assets</h5>
              <StatementRow label="Cash" value={actual.cash || 0} previousValue={lastPeriod.cash} indent />
              <StatementRow label="Accounts Receivable" value={actual.accountsReceivable || 0} previousValue={lastPeriod.accountsReceivable} indent />
              <StatementRow label="Inventory" value={actual.inventory || 0} previousValue={lastPeriod.inventory} indent />
              <StatementRow label="Prepaid Expenses" value={actual.prepaidExpenses || 0} previousValue={lastPeriod.prepaidExpenses} indent />
              <StatementRow label="Total Current Assets" value={currentAssets} previousValue={(lastPeriod.cash || 0) + (lastPeriod.accountsReceivable || 0) + (lastPeriod.inventory || 0) + (lastPeriod.prepaidExpenses || 0)} isTotal />
            </div>

            {/* Non-Current Assets */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Non-Current Assets</h5>
              <StatementRow label="Buildings" value={actual.buildings || 0} previousValue={lastPeriod.buildings} indent />
              <StatementRow label="Equipment" value={actual.equipment || 0} previousValue={lastPeriod.equipment} indent />
              <StatementRow label="Land" value={actual.land || 0} previousValue={lastPeriod.land} indent />
              <StatementRow label="Total Non-Current Assets" value={nonCurrentAssets} previousValue={(lastPeriod.buildings || 0) + (lastPeriod.equipment || 0) + (lastPeriod.land || 0)} isTotal />
            </div>

            <StatementRow label="Total Assets" value={totalAssets} previousValue={(lastPeriod.cash || 0) + (lastPeriod.accountsReceivable || 0) + (lastPeriod.inventory || 0) + (lastPeriod.buildings || 0) + (lastPeriod.equipment || 0) + (lastPeriod.land || 0)} isTotal />

            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 mt-8">Liabilities & Equity</h4>
            
            {/* Current Liabilities */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Current Liabilities</h5>
              <StatementRow label="Accounts Payable" value={actual.accountsPayable || 0} previousValue={lastPeriod.accountsPayable} indent />
              <StatementRow label="Short Term Debt" value={actual.shortTermDebt || 0} previousValue={lastPeriod.shortTermDebt} indent />
              <StatementRow label="Accrued Liabilities" value={actual.accruedLiabilities || 0} previousValue={lastPeriod.accruedLiabilities} indent />
              <StatementRow label="Total Current Liabilities" value={currentLiabilities} previousValue={(lastPeriod.accountsPayable || 0) + (lastPeriod.shortTermDebt || 0) + (lastPeriod.accruedLiabilities || 0)} isTotal />
            </div>

            {/* Non-Current Liabilities */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Non-Current Liabilities</h5>
              <StatementRow label="Long Term Debt" value={actual.longTermDebt || 0} previousValue={lastPeriod.longTermDebt} indent />
              <StatementRow label="Lease Obligations" value={actual.leaseObligations || 0} previousValue={lastPeriod.leaseObligations} indent />
              <StatementRow label="Total Non-Current Liabilities" value={nonCurrentLiabilities} previousValue={(lastPeriod.longTermDebt || 0) + (lastPeriod.leaseObligations || 0)} isTotal />
            </div>

            <StatementRow label="Total Liabilities" value={totalLiabilities} previousValue={(lastPeriod.accountsPayable || 0) + (lastPeriod.shortTermDebt || 0) + (lastPeriod.longTermDebt || 0) + (lastPeriod.leaseObligations || 0)} isTotal />

            {/* Equity */}
            <div className="mt-6">
              <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Equity</h5>
              <StatementRow label="Common Stock" value={actual.commonStock || 0} previousValue={lastPeriod.commonStock} indent />
              <StatementRow label="Retained Earnings" value={actual.retainedEarnings || 0} previousValue={lastPeriod.retainedEarnings} indent />
              <StatementRow label="Total Equity" value={totalEquity} previousValue={(lastPeriod.commonStock || 0) + (lastPeriod.retainedEarnings || 0)} isTotal />
            </div>

            <StatementRow label="Total Liabilities & Equity" value={totalLiabilities + totalEquity} previousValue={(lastPeriod.accountsPayable || 0) + (lastPeriod.shortTermDebt || 0) + (lastPeriod.longTermDebt || 0) + (lastPeriod.commonStock || 0) + (lastPeriod.retainedEarnings || 0)} isTotal />
          </div>
        )}
      </div>

      {/* Working Capital & CCC Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <SectionHeader 
          title="Working Capital & Cash Conversion Cycle" 
          isExpanded={expandedSections.metrics}
          onToggle={() => toggleSection('metrics')}
        />
        {expandedSections.metrics && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Working Capital Metrics</h5>
            <StatementRow label="Working Capital" value={currentAssets - currentLiabilities} previousValue={(lastPeriod.cash || 0) + (lastPeriod.accountsReceivable || 0) + (lastPeriod.inventory || 0) - (lastPeriod.accountsPayable || 0) - (lastPeriod.shortTermDebt || 0)} />
            <StatementRow label="Current Ratio" value={currentAssets / (currentLiabilities || 1)} previousValue={((lastPeriod.cash || 0) + (lastPeriod.accountsReceivable || 0) + (lastPeriod.inventory || 0)) / ((lastPeriod.accountsPayable || 0) + (lastPeriod.shortTermDebt || 0) || 1)} />
            <StatementRow label="Quick Ratio" value={(currentAssets - (actual.inventory || 0)) / (currentLiabilities || 1)} previousValue={((lastPeriod.cash || 0) + (lastPeriod.accountsReceivable || 0)) / ((lastPeriod.accountsPayable || 0) + (lastPeriod.shortTermDebt || 0) || 1)} />
            
            <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 mt-6">Cash Conversion Cycle</h5>
            <StatementRow label="Days Sales Outstanding (DSO)" value={actual.receivableDays || 0} previousValue={lastPeriod.receivableDays} isDays />
            <StatementRow label="Days Inventory Outstanding (DIO)" value={actual.inventoryDays || 0} previousValue={lastPeriod.inventoryDays} isDays />
            <StatementRow label="Days Payable Outstanding (DPO)" value={actual.payableDays || 0} previousValue={lastPeriod.payableDays} isDays />
            <StatementRow label="Cash Conversion Cycle" value={(actual.receivableDays || 0) + (actual.inventoryDays || 0) - (actual.payableDays || 0)} previousValue={(lastPeriod.receivableDays || 0) + (lastPeriod.inventoryDays || 0) - (lastPeriod.payableDays || 0)} isTotal isDays />
          </div>
        )}
      </div>

      {/* Modals */}
      <InputModal
        isOpen={showInputModal}
        onClose={() => setShowInputModal(false)}
        onSubmit={handleInputSubmit}
        initialData={actual}
      />

      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        data={previewData}
        onConfirm={handlePreviewConfirm}
      />
    </div>
  );
};

export default FinancialStatements;