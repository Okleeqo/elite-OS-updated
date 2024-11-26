import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientSidebar from '../components/client/ClientSidebar';
import ClientTopbar from '../components/client/ClientTopbar';
import ClientDashboard from '../components/client/ClientDashboard';
import ClientList from '../components/client/ClientList';
import ClientProfile from '../components/client/ClientProfile';
import ClientPerformance from '../components/client/ClientPerformance';
import ClientNotifications from '../components/client/ClientNotifications';
import Pipeline from '../components/pipeline/Pipeline';

const ClientManagement: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
        <ClientSidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <ClientTopbar 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<ClientDashboard />} />
            <Route path="/list" element={<ClientList />} />
            <Route path="/profiles" element={<ClientProfile />} />
            <Route path="/performance" element={<ClientPerformance />} />
            <Route path="/notifications" element={<ClientNotifications />} />
            <Route path="/pipeline" element={<Pipeline />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;