import { create } from 'zustand';
import { Client, ClientStore } from '../types/client';
import { useNotificationStore } from './notificationStore';

const initialClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@acmecorp.com',
    phone: '(555) 123-4567',
    company: 'Acme Corporation',
    status: 'active',
    type: 'client',
    lastContact: new Date('2024-03-15').toISOString(),
    notes: 'Key decision maker for enterprise solutions. Regular quarterly reviews.',
    deals: ['deal-1', 'deal-2']
  },
  // ... other initial clients
];

export const useClientStore = create<ClientStore>((set, get) => ({
  clients: initialClients,
  
  addClient: (clientData) => {
    const newClient = {
      id: Date.now().toString(),
      ...clientData
    };

    set((state) => ({
      clients: [...state.clients, newClient]
    }));

    // Add notification for new client
    useNotificationStore.getState().addNotification({
      type: 'client',
      title: 'New Client Added',
      message: `${newClient.name} from ${newClient.company} has been added as a new client.`,
      priority: 'medium',
      metadata: {
        clientId: newClient.id
      }
    });
  },

  updateClient: (id, updates) => {
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id ? { ...client, ...updates } : client
      )
    }));

    // Add notification for client update
    const client = get().clients.find(c => c.id === id);
    if (client) {
      useNotificationStore.getState().addNotification({
        type: 'client',
        title: 'Client Updated',
        message: `${client.name}'s profile has been updated.`,
        priority: 'low',
        metadata: {
          clientId: id
        }
      });
    }
  },

  deleteClient: (id) => {
    const client = get().clients.find(c => c.id === id);
    
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id)
    }));

    // Add notification for client deletion
    if (client) {
      useNotificationStore.getState().addNotification({
        type: 'client',
        title: 'Client Removed',
        message: `${client.name} from ${client.company} has been removed.`,
        priority: 'high',
        metadata: {
          clientId: id
        }
      });
    }
  },

  getClientById: (id) => {
    return get().clients.find((client) => client.id === id);
  }
}));