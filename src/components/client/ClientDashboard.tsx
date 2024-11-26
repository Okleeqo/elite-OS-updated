import React from 'react';
import { Users, AlertTriangle, DollarSign, UserPlus } from 'lucide-react';
import { useClientStore } from '../../stores/clientStore';
import { usePipelineStore } from '../../stores/pipelineStore';
import InfoCard from './InfoCard';
import TaskList from './TaskList';
import AlertsSection from './AlertsSection';
import JobManagementTable from './JobManagementTable';
import ClientStats from './ClientStats';

const ClientDashboard: React.FC = () => {
  const clients = useClientStore((state) => state.clients);
  const { leads, getTotalValue } = usePipelineStore();

  // Calculate real metrics
  const activeClients = clients.filter(client => client.status === 'active').length;
  const incompleteJobs = leads.filter(lead => !['won', 'lost'].includes(lead.stage)).length;
  const currentRevenue = getTotalValue();
  const newLeads = leads.filter(lead => lead.stage === 'warm-lead').length;

  return (
    <div className="p-6 space-y-6">
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard
          title="Active Clients"
          value={activeClients.toString()}
          color="bg-red-500"
          icon={<Users className="w-6 h-6" />}
          buttonText="View Clients"
          onClick={() => {}}
        />
        <InfoCard
          title="Incomplete Jobs"
          value={incompleteJobs.toString()}
          color="bg-orange-500"
          icon={<AlertTriangle className="w-6 h-6" />}
          buttonText="View Jobs"
          onClick={() => {}}
        />
        <InfoCard
          title="Current Revenue"
          value={`$${currentRevenue.toLocaleString()}`}
          color="bg-blue-500"
          icon={<DollarSign className="w-6 h-6" />}
          buttonText="View Details"
          onClick={() => {}}
        />
        <InfoCard
          title="New Leads"
          value={newLeads.toString()}
          color="bg-green-500"
          icon={<UserPlus className="w-6 h-6" />}
          buttonText="View Leads"
          onClick={() => {}}
        />
      </div>

      {/* Alerts and Tasks Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsSection />
        <TaskList />
      </div>

      {/* Client Stats */}
      <ClientStats />

      {/* Job Management Table */}
      <JobManagementTable />
    </div>
  );
};

export default ClientDashboard;