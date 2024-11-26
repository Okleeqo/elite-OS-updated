import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import ToolsApps from './pages/ToolsApps';
import OfferCreation from './pages/OfferCreation';
import OfferLab from './pages/OfferLab';
import Scheduling from './pages/Scheduling';
import ClientManagement from './pages/ClientManagement';
import UserProfile from './pages/UserProfile';
import GoalPilot from './pages/GoalPilot';
import FindtheGAP from './pages/FindtheGAP';
import ProposalBuilder from './pages/ProposalBuilder';
import CEODashboard from './pages/CEODashboard';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px] py-8">
        <div className="max-w-screen-xl mx-auto"> {/* Optimized for 1920x1080 */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tools-apps" element={<ToolsApps />} />
            <Route path="/offer-creation" element={<OfferCreation />} />
            <Route path="/offer-creation/offerlab" element={<OfferLab />} />
            <Route path="/scheduling" element={<Scheduling />} />
            <Route path="/client-management/*" element={<ClientManagement />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/goal-pilot" element={<GoalPilot />} />
            <Route path="/findthegap/*" element={<FindtheGAP />} />
            <Route path="/proposal-builder" element={<ProposalBuilder />} />
            <Route path="/ceo-dashboard/*" element={<CEODashboard />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;