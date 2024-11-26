import { useEffect } from 'react';
import { useGoalPilotStore } from '../stores/goalPilotStore';

export const useFinancialSync = () => {
  const { 
    financialData, 
    updateVariables, 
    selectedMetric 
  } = useGoalPilotStore();

  useEffect(() => {
    if (financialData && selectedMetric) {
      // Map financial data to corresponding variables based on metric
      const variableMap = {
        'Gross Profit': {
          price: financialData.pricePerUnit,
          volume: financialData.unitsSold,
          cogs: financialData.cogs
        },
        'Operating Profit': {
          price: financialData.pricePerUnit,
          volume: financialData.unitsSold,
          cogs: financialData.cogs,
          variableExpenses: financialData.variableExpenses,
          fixedExpenses: financialData.fixedExpenses
        },
        'Gross Profit Margin': {
          price: financialData.pricePerUnit,
          volume: financialData.unitsSold,
          cogs: financialData.cogs
        },
        'Operating Profit Margin': {
          price: financialData.pricePerUnit,
          volume: financialData.unitsSold,
          cogs: financialData.cogs,
          variableExpenses: financialData.variableExpenses,
          fixedExpenses: financialData.fixedExpenses
        }
      };

      const newVariables = variableMap[selectedMetric as keyof typeof variableMap] || {};
      updateVariables(newVariables);
    }
  }, [financialData, selectedMetric, updateVariables]);
};