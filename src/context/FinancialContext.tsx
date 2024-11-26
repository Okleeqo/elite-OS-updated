import React, { createContext, useContext, useState } from 'react';

interface FinancialMetrics {
  revenue?: number;
  serviceRevenue?: number;
  cogs?: number;
  operatingExpenses?: number;
  marketingExpenses?: number;
  adminExpenses?: number;
  researchDevelopment?: number;
  interestExpense?: number;
  otherIncome?: number;
  otherExpenses?: number;
  depreciation?: number;
  amortization?: number;
  cash?: number;
  accountsReceivable?: number;
  inventory?: number;
  prepaidExpenses?: number;
  buildings?: number;
  equipment?: number;
  land?: number;
  accountsPayable?: number;
  shortTermDebt?: number;
  longTermDebt?: number;
  commonStock?: number;
  retainedEarnings?: number;
  taxRate?: number;
  assetPurchases?: number;
  assetSales?: number;
  debtRepayments?: number;
  newDebt?: number;
  accountsReceivableChange?: number;
  inventoryChange?: number;
  accountsPayableChange?: number;
  prepaidExpensesChange?: number;
  accruedLiabilitiesChange?: number;
  customerCount?: number;
  retentionRate?: number;
  receivableDays?: number;
  inventoryDays?: number;
  payableDays?: number;
}

interface FinancialData {
  actual: FinancialMetrics;
  lastPeriod: FinancialMetrics;
  budget: FinancialMetrics;
}

interface UploadedFile {
  file: File;
  name: string;
  size: number;
  lastModified: number;
}

interface FinancialContextType {
  financials: FinancialData;
  updateFinancials: (period: keyof FinancialData, updates: Partial<FinancialMetrics>) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  selectedPeriod: keyof FinancialData;
  setSelectedPeriod: (period: keyof FinancialData) => void;
  resetFinancials: (period: keyof FinancialData) => void;
  uploadedFiles: Record<keyof FinancialData, UploadedFile | null>;
  setUploadedFile: (period: keyof FinancialData, file: File | null) => void;
  aiReport: string | null;
  setAIReport: (report: string | null) => void;
  exportData: () => FinancialData;
  importData: (data: FinancialData) => void;
}

const defaultMetrics: FinancialMetrics = {
  revenue: 0,
  serviceRevenue: 0,
  cogs: 0,
  operatingExpenses: 0,
  marketingExpenses: 0,
  adminExpenses: 0,
  researchDevelopment: 0,
  interestExpense: 0,
  otherIncome: 0,
  otherExpenses: 0,
  depreciation: 0,
  amortization: 0,
  cash: 0,
  accountsReceivable: 0,
  inventory: 0,
  prepaidExpenses: 0,
  buildings: 0,
  equipment: 0,
  land: 0,
  accountsPayable: 0,
  shortTermDebt: 0,
  longTermDebt: 0,
  commonStock: 0,
  retainedEarnings: 0,
  taxRate: 0,
  assetPurchases: 0,
  assetSales: 0,
  debtRepayments: 0,
  newDebt: 0,
  accountsReceivableChange: 0,
  inventoryChange: 0,
  accountsPayableChange: 0,
  prepaidExpensesChange: 0,
  accruedLiabilitiesChange: 0,
  customerCount: 0,
  retentionRate: 0,
  receivableDays: 0,
  inventoryDays: 0,
  payableDays: 0
};

const defaultFinancials: FinancialData = {
  actual: { ...defaultMetrics },
  lastPeriod: { ...defaultMetrics },
  budget: { ...defaultMetrics }
};

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export function FinancialProvider({ children }: { children: React.ReactNode }) {
  const [financials, setFinancials] = useState<FinancialData>(defaultFinancials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<keyof FinancialData>('actual');
  const [uploadedFiles, setUploadedFiles] = useState<Record<keyof FinancialData, UploadedFile | null>>({
    actual: null,
    lastPeriod: null,
    budget: null
  });
  const [aiReport, setAIReport] = useState<string | null>(null);

  const updateFinancials = (period: keyof FinancialData, updates: Partial<FinancialMetrics>) => {
    setFinancials(prev => ({
      ...prev,
      [period]: { ...prev[period], ...updates }
    }));
  };

  const resetFinancials = (period: keyof FinancialData) => {
    setFinancials(prev => ({
      ...prev,
      [period]: { ...defaultMetrics }
    }));

    setUploadedFiles(prev => ({
      ...prev,
      [period]: null
    }));

    if (period === 'actual') {
      setAIReport(null);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const setUploadedFile = (period: keyof FinancialData, file: File | null) => {
    setUploadedFiles(prev => ({
      ...prev,
      [period]: file ? {
        file,
        name: file.name,
        size: file.size,
        lastModified: file.lastModified
      } : null
    }));
  };

  const exportData = () => financials;
  const importData = (data: FinancialData) => setFinancials(data);

  const value = {
    financials,
    updateFinancials,
    isModalOpen,
    openModal,
    closeModal,
    selectedPeriod,
    setSelectedPeriod,
    resetFinancials,
    uploadedFiles,
    setUploadedFile,
    aiReport,
    setAIReport,
    exportData,
    importData
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
}