import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Clock, 
  TrendingUp,
  Layers,
  FileBarChart,
  Settings,
  Menu,
  X,
  Brain,
  ArrowUpRight
} from 'lucide-react';
import { FinancialProvider } from '../context/FinancialContext';
import Dashboard from '../components/findthegap/Dashboard';
import FinancialStatements from '../components/findthegap/FinancialStatements';
import CustomersAndSales from '../components/findthegap/CustomersAndSales';
import CashConversionCycle from '../components/findthegap/CashConversionCycle';
import ProfitOptimization from '../components/findthegap/ProfitOptimization';
import Scenarios from '../components/findthegap/Scenarios';
import Reports from '../components/findthegap/Reports';
import AppSettings from '../components/findthegap/AppSettings';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'financial-statements', label: 'Financial Statements', icon: FileText },
  { id: 'customers-sales', label: 'Customers & Sales', icon: Users },
  { id: 'cash-conversion', label: 'Cash Conversion Cycle', icon: Clock },
  { id: 'profit-optimization', label: 'Profit Optimization', icon: TrendingUp },
  { id: 'scenarios', label: 'Scenarios', icon: Layers },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const FindtheGAP: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'financial-statements':
        return <FinancialStatements />;
      case 'customers-sales':
        return <CustomersAndSales />;
      case 'cash-conversion':
        return <CashConversionCycle />;
      case 'profit-optimization':
        return <ProfitOptimization />;
      case 'scenarios':
        return <Scenarios />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <AppSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <FinancialProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        {/* Sidebar */}
        <div className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            {isSidebarOpen ? (
              <h1 className="text-xl font-bold text-blue-900 dark:text-blue-100">FindtheGAP</h1>
            ) : (
              <span className="text-xl font-bold text-blue-900 dark:text-blue-100">FG</span>
            )}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          
          <nav className="flex-1 py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors ${
                    activeSection === item.id ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-200' : ''
                  }`}
                >
                  <Icon size={20} />
                  {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {menuItems.find(item => item.id === activeSection)?.label}
                </h2>
              </div>
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowUpRight size={20} className="mr-1" />
                {isSidebarOpen && <span>Exit to Tools</span>}
              </button>
            </div>
          </header>

          {/* Content Area */}
          <main className="p-6 overflow-auto" style={{ height: 'calc(100vh - 73px)' }}>
            {renderContent()}
          </main>
        </div>
      </div>
    </FinancialProvider>
  );
};

export default FindtheGAP;