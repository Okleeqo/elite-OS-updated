import React, { useState } from 'react';
import { BarChart3, TrendingUp, LineChart, Brain, BookOpen } from 'lucide-react';
import { FinancialProvider } from '../context/FinancialContext';
import { Dashboard } from '../components/ceo-dashboard/summary/Dashboard';
import { KPIDashboard } from '../components/ceo-dashboard/summary/KPIDashboard';
import { VerticalAnalysis } from '../components/ceo-dashboard/analysis/VerticalAnalysis';
import { HorizontalAnalysis } from '../components/ceo-dashboard/analysis/HorizontalAnalysis';
import { AIAnalysis } from '../components/ceo-dashboard/summary/AIAnalysis';
import { FinancialEducation } from '../components/ceo-dashboard/summary/FinancialEducation';
import { UpdateDataModal } from '../components/ceo-dashboard/UpdateDataModal';
import { DashboardHeader } from '../components/ceo-dashboard/DashboardHeader';

const CEODashboardContent: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const navigation = [
    { id: 'dashboard', label: 'Live Dashboard', icon: BarChart3 },
    { id: 'kpis', label: 'KPIs', icon: TrendingUp },
    { id: 'vertical', label: 'Vertical Analysis', icon: LineChart },
    { id: 'horizontal', label: 'Horizontal Analysis', icon: LineChart },
    { id: 'ai', label: 'AI Analysis', icon: Brain },
    { id: 'learn', label: 'Learn', icon: BookOpen }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'kpis':
        return <KPIDashboard />;
      case 'vertical':
        return <VerticalAnalysis />;
      case 'horizontal':
        return <HorizontalAnalysis />;
      case 'ai':
        return <AIAnalysis />;
      case 'learn':
        return <FinancialEducation />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      {/* Navigation */}
      <div className="bg-white border-b mt-4">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium transition-all duration-200 ${
                    activeView === item.id
                      ? 'relative bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 text-white shadow-lg before:absolute before:inset-0 before:bg-white before:opacity-20 before:rounded-lg after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-transparent after:via-transparent after:to-white/10 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  } rounded-lg relative overflow-hidden`}
                >
                  <Icon className={`w-5 h-5 mr-2 ${
                    activeView === item.id ? 'relative z-10' : ''
                  }`} />
                  <span className={activeView === item.id ? 'relative z-10' : ''}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>

      {/* Update Data Modal */}
      <UpdateDataModal />
    </div>
  );
};

const CEODashboard: React.FC = () => {
  return (
    <FinancialProvider>
      <CEODashboardContent />
    </FinancialProvider>
  );
};

export default CEODashboard;