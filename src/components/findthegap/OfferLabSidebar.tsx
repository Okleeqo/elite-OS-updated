import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Clock, 
  TrendingUp, 
  Layers,
  FileBarChart,
  Settings,
  X,
  Brain
} from 'lucide-react';

interface OfferLabSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const OfferLabSidebar: React.FC<OfferLabSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/findthegap' },
    { id: 'financial-statements', label: 'Financial Statements', icon: FileText, path: '/findthegap/financial-statements' },
    { id: 'customers-sales', label: 'Customers & Sales', icon: Users, path: '/findthegap/customers-sales' },
    { id: 'cash-conversion', label: 'Cash Conversion Cycle', icon: Clock, path: '/findthegap/cash-conversion' },
    { id: 'profit-optimization', label: 'Profit Optimization', icon: TrendingUp, path: '/findthegap/profit-optimization' },
    { id: 'scenarios', label: 'Scenarios', icon: Layers, path: '/findthegap/scenarios' },
    { id: 'reports', label: 'Reports', icon: FileBarChart, path: '/findthegap/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/findthegap/settings' }
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:relative lg:translate-x-0`}>
      <div className="flex flex-col h-full bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              FindtheGAP
            </h1>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                <span className={`font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-8 bg-blue-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Brain className="w-4 h-4 text-blue-600" />
              <span>AI-Powered Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferLabSidebar;