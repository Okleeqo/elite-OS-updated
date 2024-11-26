import React, { useState } from 'react';
import { BarChart3, TrendingUp, LineChart, Brain, BookOpen } from 'lucide-react';
import { Dashboard } from './Dashboard';
import { KPIDashboard } from './KPIDashboard';
import { VerticalAnalysis } from '../analysis/VerticalAnalysis';
import { HorizontalAnalysis } from '../analysis/HorizontalAnalysis';
import { FinancialEducation } from './FinancialEducation';
import { AIAnalysis } from './AIAnalysis';

export function Layout() {
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
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">CEO Dashboard</h1>
              <p className="text-sm text-gray-500">Financial Analytics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    activeView === item.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {item.label}
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
    </div>
  );
}