import { Gap } from '../types/goals';
import { pricingStrategiesActions } from './pricingStrategiesData';
import { profitMarginsActions } from './profitMarginsData';
import { operationalEfficiencyActions } from './operationalEfficiencyData';
import { marketShareActions } from './marketShareData';
import { overheadCostsActions } from './overheadCostsData';
import { productMixActions } from './productMixData';
import { salesVolumeActions } from './salesVolumeData';
import { supplyChainActions } from './supplyChainData';
import { customerSatisfactionActions } from './customerSatisfactionData';
import { technologyActions } from './technologyData';
import { inventoryDaysActions } from './inventoryDaysData';
import { receivableDaysActions } from './receivableDaysData';
import { payableDaysActions } from './payableDaysData';
import { workingCapitalActions } from './workingCapitalData';
import { seasonalFluctuationsActions } from './seasonalFluctuationsData';
import { cashFlowForecastingActions } from './cashFlowForecastingData';
import { capitalExpendituresActions } from './capitalExpendituresData';
import { debtManagementActions } from './debtManagementData';
import { shortTermFinancingActions } from './shortTermFinancingData';
import { cashManagementActions } from './cashManagementData';

export const gapsData: Gap[] = [
  {
    id: 'profitability',
    name: 'Profitability Increase',
    gradient: 'from-blue-500 via-blue-600 to-blue-700',
    goals: [
      {
        id: 'pricing-strategies',
        name: 'Optimize Pricing Strategies',
        gradient: 'from-blue-400 via-blue-500 to-blue-600',
        actions: pricingStrategiesActions
      },
      {
        id: 'profit-margins',
        name: 'Improve Net Profit Margins',
        gradient: 'from-indigo-400 via-indigo-500 to-indigo-600',
        actions: profitMarginsActions
      },
      {
        id: 'operational-efficiency',
        name: 'Enhance Operational Efficiency',
        gradient: 'from-violet-400 via-violet-500 to-violet-600',
        actions: operationalEfficiencyActions
      },
      {
        id: 'market-share',
        name: 'Expand Market Share',
        gradient: 'from-purple-400 via-purple-500 to-purple-600',
        actions: marketShareActions
      },
      {
        id: 'overhead-costs',
        name: 'Reduce Overhead Costs',
        gradient: 'from-fuchsia-400 via-fuchsia-500 to-fuchsia-600',
        actions: overheadCostsActions
      },
      {
        id: 'product-mix',
        name: 'Optimize Product/Service Mix',
        gradient: 'from-pink-400 via-pink-500 to-pink-600',
        actions: productMixActions
      },
      {
        id: 'sales-volume',
        name: 'Increase Sales Volume',
        gradient: 'from-rose-400 via-rose-500 to-rose-600',
        actions: salesVolumeActions
      },
      {
        id: 'supply-chain',
        name: 'Improve Supply Chain Management',
        gradient: 'from-orange-400 via-orange-500 to-orange-600',
        actions: supplyChainActions
      },
      {
        id: 'customer-satisfaction',
        name: 'Enhance Customer Satisfaction and Retention',
        gradient: 'from-amber-400 via-amber-500 to-amber-600',
        actions: customerSatisfactionActions
      },
      {
        id: 'technology',
        name: 'Leverage Technology to Drive Profitability',
        gradient: 'from-yellow-400 via-yellow-500 to-yellow-600',
        actions: technologyActions
      }
    ]
  },
  {
    id: 'cash-flow',
    name: 'Cash Flow Management',
    gradient: 'from-green-500 via-green-600 to-green-700',
    goals: [
      {
        id: 'inventory-days',
        name: 'Reduce Inventory Days',
        gradient: 'from-emerald-400 via-emerald-500 to-emerald-600',
        actions: inventoryDaysActions
      },
      {
        id: 'receivable-days',
        name: 'Reduce Receivable Days',
        gradient: 'from-lime-400 via-lime-500 to-lime-600',
        actions: receivableDaysActions
      },
      {
        id: 'payable-days',
        name: 'Increase Payable Days',
        gradient: 'from-green-400 via-green-500 to-green-600',
        actions: payableDaysActions
      },
      {
        id: 'working-capital',
        name: 'Increase Working Capital Availability',
        gradient: 'from-teal-400 via-teal-500 to-teal-600',
        actions: workingCapitalActions
      },
      {
        id: 'seasonal-fluctuations',
        name: 'Stabilize Seasonal Cash Flow Fluctuations',
        gradient: 'from-cyan-400 via-cyan-500 to-cyan-600',
        actions: seasonalFluctuationsActions
      },
      {
        id: 'cash-flow-forecasting',
        name: 'Improve Cash Flow Forecasting',
        gradient: 'from-sky-400 via-sky-500 to-sky-600',
        actions: cashFlowForecastingActions
      },
      {
        id: 'capital-expenditures',
        name: 'Optimize Capital Expenditures',
        gradient: 'from-blue-400 via-blue-500 to-blue-600',
        actions: capitalExpendituresActions
      },
      {
        id: 'debt-management',
        name: 'Manage Debt Levels and Covenants',
        gradient: 'from-indigo-400 via-indigo-500 to-indigo-600',
        actions: debtManagementActions
      },
      {
        id: 'short-term-financing',
        name: 'Enhance Short-Term Financing Options',
        gradient: 'from-violet-400 via-violet-500 to-violet-600',
        actions: shortTermFinancingActions
      },
      {
        id: 'cash-management',
        name: 'Implement Cash Management Policies',
        gradient: 'from-purple-400 via-purple-500 to-purple-600',
        actions: cashManagementActions
      }
    ]
  },
  {
    id: 'pricing-cost',
    name: 'Pricing & Cost Optimization',
    gradient: 'from-purple-500 via-purple-600 to-purple-700',
    goals: [
      {
        id: 'increase-price',
        name: 'Increase Price',
        gradient: 'from-fuchsia-400 via-fuchsia-500 to-fuchsia-600',
        actions: []
      },
      {
        id: 'reduce-variable-costs',
        name: 'Reduce Variable COGS and Other Expenses',
        gradient: 'from-pink-400 via-pink-500 to-pink-600',
        actions: []
      },
      {
        id: 'reduce-fixed-expenses',
        name: 'Reduce Fixed Expenses',
        gradient: 'from-rose-400 via-rose-500 to-rose-600',
        actions: []
      },
      {
        id: 'activity-based-costing',
        name: 'Implement Activity-Based Costing (ABC)',
        gradient: 'from-orange-400 via-orange-500 to-orange-600',
        actions: []
      },
      {
        id: 'expense-management',
        name: 'Streamline Expense Management',
        gradient: 'from-amber-400 via-amber-500 to-amber-600',
        actions: []
      },
      {
        id: 'financial-modeling',
        name: 'Enhance Financial Modeling and Forecasting',
        gradient: 'from-yellow-400 via-yellow-500 to-yellow-600',
        actions: []
      },
      {
        id: 'expense-streamlining',
        name: 'Streamline Expense Management',
        gradient: 'from-lime-400 via-lime-500 to-lime-600',
        actions: []
      }
    ]
  }
];