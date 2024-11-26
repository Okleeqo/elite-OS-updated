import { utils, write } from 'xlsx';

interface MetricVariable {
  field: string;
  label: string;
  min: number;
  max: number;
  step: number;
  isPercentage: boolean;
  suffix?: string;
  initialField: string;
}

interface MetricConfig {
  variables: MetricVariable[];
  isPercentage: boolean;
}

const metricConfigs: Record<string, MetricConfig> = {
  'Gross Profit': {
    variables: [
      {
        field: 'price',
        label: 'Price',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'pricePerUnit'
      },
      {
        field: 'volume',
        label: 'Volume',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'unitsSold'
      },
      {
        field: 'cogs',
        label: 'COGS',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'cogs'
      }
    ],
    isPercentage: false
  },
  'Operating Profit': {
    variables: [
      {
        field: 'price',
        label: 'Price',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'pricePerUnit'
      },
      {
        field: 'volume',
        label: 'Volume',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'unitsSold'
      },
      {
        field: 'cogs',
        label: 'COGS',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'cogs'
      },
      {
        field: 'variableExpenses',
        label: 'Variable Expenses',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'variableExpenses'
      },
      {
        field: 'fixedExpenses',
        label: 'Fixed Expenses',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'fixedExpenses'
      }
    ],
    isPercentage: false
  },
  'Gross Profit Margin': {
    variables: [
      {
        field: 'price',
        label: 'Price',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'pricePerUnit'
      },
      {
        field: 'cogs',
        label: 'COGS',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'cogs'
      }
    ],
    isPercentage: true
  },
  'Operating Profit Margin': {
    variables: [
      {
        field: 'price',
        label: 'Price',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'pricePerUnit'
      },
      {
        field: 'cogs',
        label: 'COGS',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'cogs'
      },
      {
        field: 'variableExpenses',
        label: 'Variable Expenses',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'variableExpenses'
      },
      {
        field: 'fixedExpenses',
        label: 'Fixed Expenses',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'fixedExpenses'
      }
    ],
    isPercentage: true
  },
  'Profitability Ratio': {
    variables: [
      {
        field: 'price',
        label: 'Price',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'pricePerUnit'
      },
      {
        field: 'cogs',
        label: 'COGS',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'cogs'
      },
      {
        field: 'variableExpenses',
        label: 'Variable Expenses',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'variableExpenses'
      },
      {
        field: 'fixedExpenses',
        label: 'Fixed Expenses',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'fixedExpenses'
      }
    ],
    isPercentage: true
  },
  'Net Profit Margin': {
    variables: [
      {
        field: 'price',
        label: 'Price',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'pricePerUnit'
      },
      {
        field: 'cogs',
        label: 'COGS',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'cogs'
      },
      {
        field: 'variableExpenses',
        label: 'Variable Expenses',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'variableExpenses'
      },
      {
        field: 'fixedExpenses',
        label: 'Fixed Expenses',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'fixedExpenses'
      },
      {
        field: 'interestRate',
        label: 'Interest Rate',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'interestRatePaid'
      }
    ],
    isPercentage: true
  },
  'Cash Conversion Cycle': {
    variables: [
      {
        field: 'receivableDays',
        label: 'Receivable Days',
        min: 0,
        max: 365,
        step: 1,
        isPercentage: false,
        suffix: 'days',
        initialField: 'receivableDays'
      },
      {
        field: 'inventoryDays',
        label: 'Inventory Days',
        min: 0,
        max: 365,
        step: 1,
        isPercentage: false,
        suffix: 'days',
        initialField: 'inventoryDays'
      },
      {
        field: 'payableDays',
        label: 'Payable Days',
        min: 0,
        max: 365,
        step: 1,
        isPercentage: false,
        suffix: 'days',
        initialField: 'payableDays'
      }
    ],
    isPercentage: false
  },
  'Operating Cash Flow': {
    variables: [
      {
        field: 'price',
        label: 'Price',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'pricePerUnit'
      },
      {
        field: 'volume',
        label: 'Volume',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'unitsSold'
      },
      {
        field: 'cogs',
        label: 'COGS',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'cogs'
      },
      {
        field: 'variableExpenses',
        label: 'Variable Expenses',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'variableExpenses'
      },
      {
        field: 'fixedExpenses',
        label: 'Fixed Expenses',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'fixedExpenses'
      }
    ],
    isPercentage: false
  },
  'Free Cash Flow': {
    variables: [
      {
        field: 'price',
        label: 'Price',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'pricePerUnit'
      },
      {
        field: 'volume',
        label: 'Volume',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'unitsSold'
      },
      {
        field: 'cogs',
        label: 'COGS',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'cogs'
      },
      {
        field: 'variableExpenses',
        label: 'Variable Expenses',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'variableExpenses'
      },
      {
        field: 'fixedExpenses',
        label: 'Fixed Expenses',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'fixedExpenses'
      },
      {
        field: 'fixedAssets',
        label: 'Fixed Assets',
        min: -1000,
        max: 1000,
        step: 10,
        isPercentage: true,
        initialField: 'fixedAssets'
      }
    ],
    isPercentage: false
  }
};

export const getMetricConfig = (metric: string): MetricConfig => {
  return metricConfigs[metric] || {
    variables: [],
    isPercentage: false
  };
};

export const mapFinancialDataToVariables = (metric: string, financialData: any): Record<string, number> => {
  const config = getMetricConfig(metric);
  const variables: Record<string, number> = {};
  
  if (metric === 'Cash Conversion Cycle') {
    // For CCC, use absolute values from financial data
    config.variables.forEach(variable => {
      variables[variable.field] = financialData[variable.initialField] || 0;
    });
  } else {
    // For other metrics, start with 0% change
    config.variables.forEach(variable => {
      variables[variable.field] = 0;
    });
  }
  
  return variables;
};

export const calculateMetricValue = (
  metric: string,
  financialData: any,
  variables: any
): number => {
  if (!financialData || !variables) return 0;

  const basePrice = financialData.pricePerUnit * (1 + (variables.price || 0) / 100);
  const baseVolume = financialData.unitsSold * (1 + (variables.volume || 0) / 100);
  const baseCogs = financialData.cogs * (1 + (variables.cogs || 0) / 100);
  const baseVarExp = financialData.variableExpenses * (1 + (variables.variableExpenses || 0) / 100);
  const baseFixExp = financialData.fixedExpenses * (1 + (variables.fixedExpenses || 0) / 100);
  const revenue = basePrice * baseVolume;

  switch (metric) {
    case 'Gross Profit':
      return revenue - baseCogs;

    case 'Operating Profit':
      return revenue - baseCogs - baseVarExp - baseFixExp;

    case 'Gross Profit Margin':
      return revenue > 0 ? ((revenue - baseCogs) / revenue) * 100 : 0;

    case 'Operating Profit Margin':
      return revenue > 0 ? ((revenue - baseCogs - baseVarExp - baseFixExp) / revenue) * 100 : 0;

    case 'Profitability Ratio':
      const operatingProfit = revenue - baseCogs - baseVarExp - baseFixExp;
      return revenue > 0 ? (operatingProfit / revenue) * 100 : 0;

    case 'Net Profit Margin': {
      const operatingProfit = revenue - baseCogs - baseVarExp - baseFixExp;
      const interestRate = financialData.interestRatePaid * (1 + (variables.interestRate || 0) / 100);
      const interest = revenue * (interestRate / 100);
      const netProfit = operatingProfit - interest - financialData.otherExpenses + financialData.otherIncomes;
      return revenue > 0 ? (netProfit / revenue) * 100 : 0;
    }

    case 'Cash Conversion Cycle':
      return variables.receivableDays + variables.inventoryDays - variables.payableDays;

    case 'Operating Cash Flow':
      return revenue - baseCogs - baseVarExp - baseFixExp;

    case 'Free Cash Flow': {
      const operatingCashFlow = revenue - baseCogs - baseVarExp - baseFixExp;
      const baseFixedAssets = financialData.fixedAssets * (1 + (variables.fixedAssets || 0) / 100);
      const capex = baseFixedAssets * 0.1; // Assuming 10% of fixed assets as annual capex
      return operatingCashFlow - capex;
    }

    default:
      return 0;
  }
};