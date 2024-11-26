import { create } from 'zustand';
import { FollowUp, FollowUpStore } from '../types/followUp';
import { useNotificationStore } from './notificationStore';

const initialFollowUps: FollowUp[] = [
  {
    id: '1',
    title: 'Quarterly Portfolio Review',
    clientName: 'John Smith',
    clientId: '1',
    dueDate: '2024-03-20',
    completed: false,
    priority: 'high',
    tags: ['Review', 'Portfolio'],
    notes: 'Prepare performance analysis for Q1 2024',
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Investment Strategy Update',
    clientName: 'Sarah Johnson',
    clientId: '2',
    dueDate: '2024-03-21',
    completed: false,
    priority: 'medium',
    tags: ['Strategy', 'Investment'],
    notes: 'Discuss market changes and portfolio adjustments',
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  }
];

export const useFollowUpStore = create<FollowUpStore>((set, get) => ({
  followUps: initialFollowUps,

  addFollowUp: (followUpData) => {
    const newFollowUp = {
      id: Date.now().toString(),
      ...followUpData,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    set((state) => ({
      followUps: [...state.followUps, newFollowUp]
    }));

    // Add notification
    useNotificationStore.getState().addNotification({
      type: 'client',
      title: 'New Follow-up Added',
      message: `New follow-up task "${newFollowUp.title}" has been created for ${newFollowUp.clientName}.`,
      priority: 'medium',
      metadata: {
        clientId: newFollowUp.clientId,
        followUpId: newFollowUp.id
      }
    });
  },

  updateFollowUp: (id, updates) => {
    set((state) => ({
      followUps: state.followUps.map((followUp) =>
        followUp.id === id
          ? { 
              ...followUp, 
              ...updates, 
              lastUpdated: new Date().toISOString() 
            }
          : followUp
      )
    }));

    const followUp = get().followUps.find(f => f.id === id);
    if (followUp) {
      useNotificationStore.getState().addNotification({
        type: 'client',
        title: 'Follow-up Updated',
        message: `Follow-up task "${followUp.title}" has been updated.`,
        priority: 'low',
        metadata: {
          clientId: followUp.clientId,
          followUpId: followUp.id
        }
      });
    }
  },

  deleteFollowUp: (id) => {
    const followUp = get().followUps.find(f => f.id === id);
    
    set((state) => ({
      followUps: state.followUps.filter((followUp) => followUp.id !== id)
    }));

    if (followUp) {
      useNotificationStore.getState().addNotification({
        type: 'client',
        title: 'Follow-up Deleted',
        message: `Follow-up task "${followUp.title}" has been deleted.`,
        priority: 'medium',
        metadata: {
          clientId: followUp.clientId,
          followUpId: followUp.id
        }
      });
    }
  },

  toggleFollowUp: (id) => {
    set((state) => ({
      followUps: state.followUps.map((followUp) =>
        followUp.id === id
          ? { 
              ...followUp, 
              completed: !followUp.completed,
              lastUpdated: new Date().toISOString()
            }
          : followUp
      )
    }));

    const followUp = get().followUps.find(f => f.id === id);
    if (followUp) {
      useNotificationStore.getState().addNotification({
        type: 'client',
        title: followUp.completed ? 'Follow-up Reopened' : 'Follow-up Completed',
        message: `Follow-up task "${followUp.title}" has been ${followUp.completed ? 'reopened' : 'marked as complete'}.`,
        priority: 'low',
        metadata: {
          clientId: followUp.clientId,
          followUpId: followUp.id
        }
      });
    }
  },

  getFollowUpsByClientId: (clientId) => {
    return get().followUps.filter((followUp) => followUp.clientId === clientId);
  },

  getPendingFollowUps: () => {
    return get().followUps.filter((followUp) => !followUp.completed);
  },

  getCompletedFollowUps: () => {
    return get().followUps.filter((followUp) => followUp.completed);
  }
}));