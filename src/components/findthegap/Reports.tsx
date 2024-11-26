import React from 'react';
import { FileText, Download, Filter } from 'lucide-react';

const Reports: React.FC = () => {
  const reports = [
    {
      title: 'Financial Performance Summary',
      description: 'Complete overview of financial metrics and KPIs',
      lastGenerated: '2024-03-15',
      type: 'PDF'
    },
    {
      title: 'Cash Flow Analysis',
      description: 'Detailed analysis of cash flow components',
      lastGenerated: '2024-03-14',
      type: 'Excel'
    },
    {
      title: 'Customer Metrics Report',
      description: 'Customer acquisition and retention metrics',
      lastGenerated: '2024-03-13',
      type: 'PDF'
    },
    {
      title: 'Profit Optimization Report',
      description: 'Analysis of profit drivers and recommendations',
      lastGenerated: '2024-03-12',
      type: 'PDF'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">All Reports</option>
                <option value="financial">Financial</option>
                <option value="operational">Operational</option>
                <option value="customer">Customer</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Generate New Report
            </button>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-sm divide-y">
        {reports.map((report, index) => (
          <div key={index} className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-500">{report.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded-full ${
                report.type === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {report.type}
              </span>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Automated Reports</h4>
              <p className="text-sm text-gray-500">Generate reports automatically on schedule</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-500">Receive email when new reports are generated</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;