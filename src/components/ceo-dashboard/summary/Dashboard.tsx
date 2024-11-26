import React from 'react';
import { TopMetrics } from '../metrics/TopMetrics';
import { PeriodComparison } from '../comparison/PeriodComparison';
import { RevenueStructure } from '../charts/RevenueStructure';
import { OpexStructure } from '../charts/OpexStructure';
import { FinancialSummary } from './FinancialSummary';
import { InputModal } from '../InputModal';
import { useFinancial } from '../../../context/FinancialContext';

export function Dashboard() {
  const { openModal } = useFinancial();

  return (
    <div className="space-y-6">
      {/* Header with Update Data button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CEO Dashboard</h1>
          <p className="text-gray-600">Real-time Financial Analytics</p>
        </div>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Update Data
        </button>
      </div>

      {/* Top Metrics */}
      <TopMetrics />

      {/* Period Comparison */}
      <PeriodComparison />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueStructure />
        <OpexStructure />
      </div>

      {/* Financial Summary */}
      <FinancialSummary />

      {/* Input Modal */}
      <InputModal />
    </div>
  );
}