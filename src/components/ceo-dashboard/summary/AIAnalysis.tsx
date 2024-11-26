import React from 'react';
import { GPTReport } from '../GPTReport';
import { ExecutiveInsights } from '../ExecutiveInsights';

export function AIAnalysis() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-xl text-white">
        <h1 className="text-3xl font-bold">AI Financial Analysis</h1>
        <p className="text-lg opacity-90">Powered by advanced AI models</p>
      </div>

      <ExecutiveInsights />
      <GPTReport />
    </div>
  );
}