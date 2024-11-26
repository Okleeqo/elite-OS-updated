import { useState, useEffect } from 'react';
import { useGoalPilotStore } from '../stores/goalPilotStore';

interface FinancialData {
  pricePerUnit: number;
  unitsSold: number;
  revenue: number;
  cogs: number;
  variableExpenses: number;
  fixedExpenses: number;
  otherExpenses: number;
  otherIncomes: number;
  
  // Balance Sheet
  payableDays: number;
  receivableDays: number;
  inventoryDays: number;
  fixedAssets: number;
  
  // Calculated fields
  grossProfit: number;
  operatingProfit: number;
  netIncome: number;
}

const defaultFinancialData: FinancialData = {
  // Income Statement
  pricePerUnit: 100,
  unitsSold: 1000,
  revenue: 100000,
  cogs: 50000,
  variableExpenses: 20000,
  fixedExpenses: 30000,
  otherExpenses: 5000,
  otherIncomes: 2000,
  
  // Balance Sheet
  payableDays: 30,
  receivableDays: 45,
  inventoryDays: 60,
  fixedAssets: 50000,
  
  // Calculated fields
  grossProfit: 50000,
  operatingProfit: 0,
  netIncome: 0
};

export const useFinancialData = () => {
  const [financialData, setFinancialData] = useState<FinancialData>(defaultFinancialData);
  const initializeVariables = useGoalPilotStore(state => state.initializeVariables);

  const calculateDerivedValues = (data: FinancialData): FinancialData => {
    const revenue = data.pricePerUnit * data.unitsSold;
    const grossProfit = revenue - data.cogs;
    const operatingProfit = grossProfit - data.variableExpenses - data.fixedExpenses;
    const netIncome = operatingProfit - data.otherExpenses + data.otherIncomes;

    return {
      ...data,
      revenue,
      grossProfit,
      operatingProfit,
      netIncome
    };
  };

  const updateFinancialData = (newData: Partial<FinancialData>) => {
    const updatedData = calculateDerivedValues({
      ...financialData,
      ...newData
    });
    setFinancialData(updatedData);
    initializeVariables(updatedData);
  };

  const resetFinancialData = () => {
    const resetData = calculateDerivedValues(defaultFinancialData);
    setFinancialData(resetData);
    initializeVariables(resetData);
  };

  return {
    financialData,
    updateFinancialData,
    resetFinancialData
  };
};