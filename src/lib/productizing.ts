export interface MacroGap {
  id: string;
  title: string;
  description: string;
  color: string;
}

export const macroGaps: MacroGap[] = [
  {
    id: 'profitability',
    title: 'Profitability Increase',
    description: 'Optimize revenue streams and cost structures to enhance overall profitability',
    color: 'bg-gradient-to-r from-blue-500 to-blue-600'
  },
  {
    id: 'cash-flow',
    title: 'Operating Cash Flow Management',
    description: 'Improve cash flow cycles and working capital efficiency',
    color: 'bg-gradient-to-r from-green-500 to-green-600'
  },
  {
    id: 'pricing',
    title: 'Pricing Optimization',
    description: 'Develop and implement effective pricing strategies',
    color: 'bg-gradient-to-r from-purple-500 to-purple-600'
  },
  {
    id: 'costs',
    title: 'COGS and Operating Expenses Optimization',
    description: 'Streamline costs while maintaining operational efficiency',
    color: 'bg-gradient-to-r from-orange-500 to-orange-600'
  },
  {
    id: 'working-capital',
    title: 'Working Capital Optimization',
    description: 'Enhance inventory, receivables, and payables management',
    color: 'bg-gradient-to-r from-red-500 to-red-600'
  }
];