import React from 'react';
import { Calculator, FileText, TrendingUp, Lightbulb, Flag, DollarSign } from 'lucide-react';
import { IntroSection } from '../sections/IntroSection';
import { ProfitLossSection } from '../sections/ProfitLossSection';
import { CashFlowSection } from '../sections/CashFlowSection';
import { BalanceSheetSection } from '../sections/BalanceSheetSection';

export function FinancialEducation() {
  const resources = [
    {
      title: 'Financial Basics',
      description: 'Learn fundamental financial concepts',
      icon: Calculator,
      color: 'bg-blue-500'
    },
    {
      title: 'Statement Analysis',
      description: 'How to read financial statements',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Performance Metrics',
      description: 'Understanding KPIs and ratios',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Best Practices',
      description: 'Industry standards and benchmarks',
      icon: Flag,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-xl text-white">
        <h1 className="text-3xl font-bold">Financial Education</h1>
        <p className="text-lg opacity-90">Learn about financial statements and analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${resource.color} p-3 rounded-lg text-white`}>
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{resource.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
            </div>
          );
        })}
      </div>

      <IntroSection />
      <ProfitLossSection />
      <BalanceSheetSection />
      <CashFlowSection />
    </div>
  );
}