import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useClientStore } from '../../stores/clientStore';
import { 
  LayoutDashboard, 
  Users, 
  List, 
  LineChart, 
  Bell,
  FolderKanban,
  ChevronRight,
  Building,
  Mail,
  Phone,
  Calendar,
  DollarSign
} from 'lucide-react';

const menuItems = [
  {
    path: '/client-management',
    icon: LayoutDashboard,
    label: 'Dashboard'
  },
  {
    path: '/client-management/profiles',
    icon: Users,
    label: 'Client Profiles'
  },
  {
    path: '/client-management/list',
    icon: List,
    label: 'Client List'
  },
  {
    path: '/client-management/pipeline',
    icon: FolderKanban,
    label: 'Pipeline'
  },
  {
    path: '/client-management/performance',
    icon: LineChart,
    label: 'Performance'
  },
  {
    path: '/client-management/notifications',
    icon: Bell,
    label: 'Notifications'
  }
];

const ClientSidebar = () => {
  const location = useLocation();
  const clients = useClientStore((state) => state.clients);
  const [selectedClient, setSelectedClient] = React.useState<string | null>(null);

  return (
    <div className="w-80 bg-gray-50 min-h-screen border-r border-gray-200 flex-shrink-0 overflow-auto">
      <div className="p-4 sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Client Management</h2>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="flex-1">{item.label}</span>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Recent Clients
        </h3>
        <div className="space-y-3">
          {clients.map((client) => (
            <div
              key={client.id}
              className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all ${
                selectedClient === client.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedClient(client.id === selectedClient ? null : client.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">{client.name}</h4>
                    <p className="text-xs text-gray-500">{client.company}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  client.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {client.status}
                </span>
              </div>

              {selectedClient === client.id && (
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    <span>{client.company}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Last Contact: {new Date(client.lastContact).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>Deals: {client.deals.length}</span>
                  </div>
                  <button 
                    className="w-full mt-3 text-blue-600 hover:text-blue-700 text-xs font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Navigate to full profile
                    }}
                  >
                    View Full Profile
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSidebar;