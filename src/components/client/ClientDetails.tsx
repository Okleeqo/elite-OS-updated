import React, { useState } from 'react';
import { ArrowLeft, Edit, Save, X, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Client } from '../../types/client';
import { useClientStore } from '../../stores/clientStore';
import { usePipelineStore } from '../../stores/pipelineStore';
import AddLeadModal from '../pipeline/AddLeadModal';

interface ClientDetailsProps {
  client: Client;
  onBack: () => void;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ client, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [editedClient, setEditedClient] = useState(client);
  const updateClient = useClientStore((state) => state.updateClient);
  const clientLeads = usePipelineStore((state) => state.getLeadsByClientId(client.id));

  const handleSave = () => {
    updateClient(client.id, editedClient);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Clients
        </button>
        {isEditing ? (
          <div className="space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
          >
            <Edit className="w-5 h-5 mr-2" />
            Edit
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Client Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedClient.name}
                  onChange={(e) => setEditedClient({ ...editedClient, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{client.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedClient.email}
                  onChange={(e) => setEditedClient({ ...editedClient, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{client.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedClient.phone}
                  onChange={(e) => setEditedClient({ ...editedClient, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{client.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedClient.company}
                  onChange={(e) => setEditedClient({ ...editedClient, company: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{client.company}</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Deals</h3>
            <button
              onClick={() => setIsAddingLead(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Deal
            </button>
          </div>
          <div className="space-y-4">
            {clientLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{lead.title}</h4>
                  <p className="text-sm text-gray-500">
                    Stage: {lead.stage} | Value: ${lead.value.toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isAddingLead && (
        <AddLeadModal 
          onClose={() => setIsAddingLead(false)}
          clientId={client.id}
          clientName={client.name}
        />
      )}
    </div>
  );
};

export default ClientDetails;