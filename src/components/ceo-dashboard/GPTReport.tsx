import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { Brain, Loader2, RefreshCw, ChevronDown, ChevronRight, AlertCircle, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export function GPTReport() {
  const { financials } = useFinancial();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [aiReport, setAIReport] = useState<string | null>(null);

  const generateReport = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAIReport("Sample AI Report Content");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate report');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!aiReport) return;

    const reportElement = document.getElementById('ai-report');
    if (!reportElement) return;

    const opt = {
      margin: 1,
      filename: 'executive-report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(reportElement).save();
  };

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="px-6 py-4 border-b border-gray-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">GPT Executive Report</h2>
              <p className="text-sm text-gray-500">AI-powered comprehensive analysis</p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Powered by GPT-4
            </div>
            <div className="flex space-x-4">
              {aiReport && (
                <button
                  onClick={downloadPDF}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </button>
              )}
              <button
                onClick={generateReport}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                <span>{isLoading ? 'Analyzing...' : 'Generate Report'}</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-800">Error</h4>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
            </div>
          )}

          {aiReport && !error && (
            <div id="ai-report" className="prose max-w-none">
              {aiReport}
            </div>
          )}

          {!aiReport && !error && !isLoading && (
            <div className="text-center py-12">
              <Brain className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                Click generate to create an AI-powered analysis
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}