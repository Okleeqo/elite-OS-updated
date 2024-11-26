export interface Lead {
  id: string;
  title: string;
  client: string;
  clientId: string;
  value: number;
  stage: string;
  dueDate?: string;
  createdAt: string;
}

export interface Stage {
  id: string;
  title: string;
  color: string;
}

export interface PipelineStore {
  leads: Lead[];
  addLead: (lead: Lead) => void;
  moveLead: (leadId: string, newStage: string) => void;
  updateLead: (leadId: string, updates: Partial<Lead>) => void;
  deleteLead: (leadId: string) => void;
  getLeadsByClientId: (clientId: string) => Lead[];
  getTotalValue: () => number;
}