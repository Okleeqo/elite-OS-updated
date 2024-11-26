import React from 'react';
import { BarChart3, Download, Upload, RefreshCw } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';

export function DashboardHeader() {
  const { openModal, exportData, importData } = useFinancial();

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            importData(data);
          } catch (err) {
            console.error('Error importing data:', err);
            alert('Error importing data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 border-b border-blue-700/20 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px)] bg-[size:3rem] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5"></div>
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-white/90" />
            <div>
              <h1 className="text-xl font-bold text-white">CEO Dashboard</h1>
              <p className="text-sm text-blue-100">Financial Analytics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={openModal}
              className="flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 backdrop-blur-sm shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:rounded-lg after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-transparent after:via-transparent after:to-white/10"
            >
              <RefreshCw className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Update Data</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-green-500/20 text-green-100 rounded-lg hover:bg-green-500/30 transition-all duration-200 backdrop-blur-sm shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:rounded-lg after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-transparent after:via-transparent after:to-white/10"
            >
              <Download className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Export</span>
            </button>
            <button
              onClick={handleImport}
              className="flex items-center px-4 py-2 bg-purple-500/20 text-purple-100 rounded-lg hover:bg-purple-500/30 transition-all duration-200 backdrop-blur-sm shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:rounded-lg after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-transparent after:via-transparent after:to-white/10"
            >
              <Upload className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Import</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}