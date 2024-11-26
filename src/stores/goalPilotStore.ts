import { create } from 'zustand';
import { mapFinancialDataToVariables } from '../utils/metricCalculations';

interface Variables {
  [key: string]: number;
}

interface Scenario {
  name: string;
  metric: string;
  variables: Variables;
  value: number;
}

interface GoalPilotStore {
  selectedMetric: string;
  setSelectedMetric: (metric: string) => void;
  variables: Variables;
  updateVariable: (key: string, value: number) => void;
  resetVariables: () => void;
  financialData: any;
  updateFinancialData: (data: any) => void;
  scenarios: Scenario[];
  saveScenario: (scenario: Scenario) => void;
  deleteScenario: (name: string) => void;
  loadScenario: (scenario: Scenario) => void;
}

const defaultFinancialData = {
  pricePerUnit: 100,
  unitsSold: 1000,
  revenue: 100000,
  cogs: 50000,
  grossProfit: 50000,
  variableExpenses: 20000,
  fixedExpenses: 30000,
  operatingProfit: 0,
  interestRatePaid: 5,
  interestExpense: 5000,
  otherExpenses: 5000,
  otherIncomes: 2000,
  netIncome: 0,
  payableDays: 30,
  receivableDays: 45,
  inventoryDays: 60,
  fixedAssets: 50000
};

export const useGoalPilotStore = create<GoalPilotStore>((set, get) => ({
  selectedMetric: '',
  setSelectedMetric: (metric) => {
    set({ selectedMetric: metric });
    const { financialData } = get();
    const newVariables = mapFinancialDataToVariables(metric, financialData);
    set({ variables: newVariables });
  },
  
  variables: {},
  updateVariable: (key, value) => set((state) => ({
    variables: { ...state.variables, [key]: value }
  })),
  
  resetVariables: () => {
    const { selectedMetric, financialData } = get();
    const newVariables = mapFinancialDataToVariables(selectedMetric, financialData);
    set({ variables: newVariables });
  },
  
  financialData: defaultFinancialData,
  updateFinancialData: (data) => {
    set({ financialData: data });
    const { selectedMetric } = get();
    const newVariables = mapFinancialDataToVariables(selectedMetric, data);
    set({ variables: newVariables });
  },
  
  scenarios: [],
  saveScenario: (scenario) => set((state) => ({
    scenarios: [...state.scenarios, scenario]
  })),
  deleteScenario: (name) => set((state) => ({
    scenarios: state.scenarios.filter((s) => s.name !== name)
  })),
  loadScenario: (scenario) => set({
    selectedMetric: scenario.metric,
    variables: scenario.variables
  })
}));