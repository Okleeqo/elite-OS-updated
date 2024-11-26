import { create } from 'zustand';
import { Lead, PipelineStore } from '../types/pipeline';
import { useNotificationStore } from './notificationStore';
import { useClientStore } from './clientStore';

export const usePipelineStore = create<PipelineStore>((set, get) => ({
  leads: [
    {
      id: 'lead-1',
      title: 'Enterprise Software Solution',
      client: 'Acme Corp',
      clientId: '1',
      value: 50000,
      stage: 'warm-lead',
      createdAt: new Date().toISOString()
    }
  ],
  
  addLead: (lead) => {
    set((state) => ({
      leads: [...state.leads, lead]
    }));

    // Add notification for new lead
    useNotificationStore.getState().addNotification({
      type: 'deal',
      title: 'New Lead Added',
      message: `New lead "${lead.title}" for ${lead.client} has been created.`,
      priority: 'medium',
      metadata: {
        dealId: lead.id,
        clientId: lead.clientId,
        status: 'pending',
        stage: 'warm-lead'
      }
    });
  },

  moveLead: (leadId, newStage) => {
    const lead = get().leads.find(l => l.id === leadId);
    const oldStage = lead?.stage;

    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === leadId ? { ...lead, stage: newStage } : lead
      )
    }));

    // Add notification for lead stage change
    if (lead) {
      let priority: 'low' | 'medium' | 'high' = 'medium';
      let status = 'pending';
      let message = `"${lead.title}" has moved from ${oldStage?.replace('-', ' ')} to ${newStage.replace('-', ' ')}.`;
      let title = 'Lead Stage Updated';

      // Determine notification priority and status based on stage
      if (newStage === 'won') {
        priority = 'high';
        status = 'won';
        title = 'Deal Won! 🎉';
        message = `Congratulations! "${lead.title}" for ${lead.client} has been won with a value of $${lead.value.toLocaleString()}.`;

        // Update client status if needed
        const clientStore = useClientStore.getState();
        const client = clientStore.getClientById(lead.clientId);
        if (client && client.type === 'prospect') {
          clientStore.updateClient(lead.clientId, { type: 'client' });
        }
      } else if (newStage === 'lost') {
        priority = 'high';
        status = 'lost';
        title = 'Deal Lost';
        message = `Deal "${lead.title}" for ${lead.client} has been marked as lost.`;
      } else if (newStage === 'contract') {
        priority = 'high';
        status = 'contract';
        title = 'Contract Stage Reached';
        message = `Deal "${lead.title}" has moved to contract stage. Value: $${lead.value.toLocaleString()}`;
      } else if (newStage === 'proposal') {
        status = 'pending';
        title = 'Proposal Stage Reached';
      }

      useNotificationStore.getState().addNotification({
        type: 'deal',
        title,
        message,
        priority,
        metadata: {
          dealId: leadId,
          clientId: lead.clientId,
          status,
          stage: newStage,
          oldStage,
          value: lead.value
        }
      });
    }
  },

  updateLead: (leadId, updates) => {
    const oldLead = get().leads.find(l => l.id === leadId);
    
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === leadId ? { ...lead, ...updates } : lead
      )
    }));

    // Add notification for lead update
    if (oldLead) {
      const valueChanged = updates.value && updates.value !== oldLead.value;
      const message = valueChanged 
        ? `Lead "${oldLead.title}" value updated from $${oldLead.value.toLocaleString()} to $${updates.value.toLocaleString()}`
        : `Lead "${oldLead.title}" has been updated.`;

      useNotificationStore.getState().addNotification({
        type: 'deal',
        title: 'Lead Updated',
        message,
        priority: valueChanged ? 'medium' : 'low',
        metadata: {
          dealId: leadId,
          clientId: oldLead.clientId,
          status: 'updated',
          stage: oldLead.stage,
          oldValue: oldLead.value,
          newValue: updates.value
        }
      });
    }
  },

  deleteLead: (leadId) => {
    const lead = get().leads.find(l => l.id === leadId);
    
    set((state) => ({
      leads: state.leads.filter((lead) => lead.id !== leadId)
    }));

    // Add notification for lead deletion
    if (lead) {
      useNotificationStore.getState().addNotification({
        type: 'deal',
        title: 'Lead Removed',
        message: `Lead "${lead.title}" for ${lead.client} has been removed.`,
        priority: 'high',
        metadata: {
          dealId: leadId,
          clientId: lead.clientId,
          status: 'deleted',
          stage: lead.stage,
          value: lead.value
        }
      });
    }
  },

  getLeadsByClientId: (clientId: string) => {
    return get().leads.filter(lead => lead.clientId === clientId);
  },

  getTotalValue: () => {
    return get().leads.reduce((total, lead) => total + lead.value, 0);
  },

  getLead: (id: string) => {
    return get().leads.find(lead => lead.id === id);
  }
}));