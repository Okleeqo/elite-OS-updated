import { useCallback } from 'react';
import { useSelectionStore } from '../stores/selectionStore';

export const useSelections = () => {
  const store = useSelectionStore();
  
  const getPromptContext = useCallback(() => {
    const { gaps, goals, actions, strategies, parameters } = store.selections;
    
    return {
      gaps: gaps.join('\n'),
      goals: goals.join('\n'),
      actions: actions.join('\n'),
      strategies: strategies.join('\n'),
      parameters: {
        frequency: parameters.frequency,
        deliveryMethod: parameters.deliveryMethod,
        tools: parameters.tools.join(', ')
      }
    };
  }, [store.selections]);

  return {
    ...store,
    getPromptContext
  };
};