export interface FollowUp {
  id: string;
  title: string;
  clientName: string;
  clientId: string;
  dueDate: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  notes?: string;
  createdAt: string;
  lastUpdated: string;
}

export interface FollowUpStore {
  followUps: FollowUp[];
  addFollowUp: (followUp: Omit<FollowUp, 'id' | 'createdAt' | 'lastUpdated'>) => void;
  updateFollowUp: (id: string, updates: Partial<FollowUp>) => void;
  deleteFollowUp: (id: string) => void;
  toggleFollowUp: (id: string) => void;
  getFollowUpsByClientId: (clientId: string) => FollowUp[];
  getPendingFollowUps: () => FollowUp[];
  getCompletedFollowUps: () => FollowUp[];
}