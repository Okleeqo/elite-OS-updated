import React from 'react';
import { X, Building, Mail, Phone, Calendar, DollarSign } from 'lucide-react';
import { Client } from '../../types/client';
import { usePipelineStore } from '../../stores/pipelineStore';

interface ClientDetailsViewProps {
  client: Client;
  onClose: () => void;
}

const ClientDetailsView: React.FC<ClientDetailsViewProps> = ({ client, onClose }) => {
  const clientLeads = usePipelineStore((state) => state.getLeadsByClientId(client.id));
  
  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-xl text-blue-600">{client.name.charAt(0)}</span>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
            <p className="text-gray-500">{client.company}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Contact Info Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">CONTACT INFO</h3>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Mail className="w-5 h-5 mr-3" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="w-5 h-5 mr-3" />
              <span>{client.phone}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Building className="w-5 h-5 mr-3" />
              <span>{client.company}</span>
            </div>
          </div>
        </div>

        {/* Status & Type Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">STATUS & TYPE</h3>
          <div className="flex space-x-3">
            <span className={`px-4 py-2 rounded-full text-sm ${
              client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {client.status}
            </span>
            <span className="px-4 py-2 rounded-full text-sm bg-purple-100 text-purple-800">
              {client.type}
            </span>
          </div>
        </div>

        {/* Activity Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">ACTIVITY</h3>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-3" />
              <span>Last Contact: {new Date(client.lastContact).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign className="w-5 h-5 mr-3" />
              <span>Active Deals: {clientLeads.length}</span>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">NOTES</h3>
          <p className="text-gray-600">{client.notes}</p>
        </div>

        {/* Active Deals Section */}
        {clientLeads.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">ACTIVE DEALS</h3>
            <div className="space-y-3">
              {clientLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{lead.title}</h4>
                  <div className="text-gray-600">Stage: {lead.stage}</div>
                  <div className="text-2xl font-bold mt-2">${lead.value.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetailsView;