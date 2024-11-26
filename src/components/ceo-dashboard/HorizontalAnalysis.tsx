import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { formatCurrency } from '../../utils/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function HorizontalAnalysis() {
  const { financials } = useFinancial();
  const { actual, lastPeriod, budget } = financials;
  const [activeTab, setActiveTab] = useState<'income' | 'balance' | 'cash'>('income');

  // Rest of the HorizontalAnalysis component code...
}