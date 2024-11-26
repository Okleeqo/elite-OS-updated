import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OfferLabSidebar from '../components/offerlab/OfferLabSidebar';
import OfferLabHeader from '../components/offerlab/OfferLabHeader';
import Dashboard from '../components/offerlab/Dashboard';
import ActionPlanPanel from '../components/offerlab/ActionPlanPanel';
import WorkflowPanel from '../components/offerlab/WorkflowPanel';
import DeliveryPanel from '../components/offerlab/DeliveryPanel';
import FrameworksPanel from '../components/offerlab/FrameworksPanel';
import StrategyForge from '../components/offerlab/strategyforge/StrategyForge';

const OfferLab: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'strategy-forge':
        return <StrategyForge />;
      case 'action-plan':
        return <ActionPlanPanel />;
      case 'workflows':
        return <WorkflowPanel />;
      case 'delivery':
        return <DeliveryPanel />;
      case 'frameworks':
        return <FrameworksPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-1 h-full">
        {/* Sidebar */}
        <OfferLabSidebar 
          isOpen={isSidebarOpen}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <OfferLabHeader 
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onBack={() => navigate('/offer-creation')}
          />
          
          <main className="flex-1 overflow-auto p-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
              <div className="max-w-screen-xl mx-auto">
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default OfferLab;