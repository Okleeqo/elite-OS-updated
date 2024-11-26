import { create } from 'zustand';

interface Selection {
  gaps: string[];
  goals: string[];
  actions: string[];
  strategies: string[];
  parameters: {
    frequency: 'weekly' | 'monthly' | 'quarterly';
    deliveryMethod: 'video-call' | 'recorded-video' | 'email-report';
    tools: string[];
  };
}

interface SelectionStore {
  selections: Selection;
  updateGaps: (gaps: string[]) => void;
  updateGoals: (goals: string[]) => void;
  updateActions: (actions: string[]) => void;
  updateStrategies: (strategies: string[]) => void;
  updateParameters: (parameters: Selection['parameters']) => void;
  reset: () => void;
}

const initialState: Selection = {
  gaps: [],
  goals: [],
  actions: [],
  strategies: [],
  parameters: {
    frequency: 'monthly',
    deliveryMethod: 'video-call',
    tools: []
  }
};

export const useSelectionStore = create<SelectionStore>((set) => ({
  selections: initialState,
  
  updateGaps: (gaps) => set((state) => ({
    selections: { ...state.selections, gaps }
  })),
  
  updateGoals: (goals) => set((state) => ({
    selections: { ...state.selections, goals }
  })),
  
  updateActions: (actions) => set((state) => ({
    selections: { ...state.selections, actions }
  })),
  
  updateStrategies: (strategies) => set((state) => ({
    selections: { ...state.selections, strategies }
  })),
  
  updateParameters: (parameters) => set((state) => ({
    selections: { ...state.selections, parameters }
  })),
  
  reset: () => set({ selections: initialState })
}));