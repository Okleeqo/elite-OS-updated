import React, { useState, useEffect } from 'react';
import { Loader, Check, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { generateStrategies } from '../../../lib/openai';

interface StrategyGenerationProps {
  actions: any[];
  selectedStrategies: any[];
  onUpdateStrategies: (strategies: any[]) => void;
}

const StrategyGeneration: React.FC<StrategyGenerationProps> = ({
  actions,
  selectedStrategies,
  onUpdateStrategies
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedStrategies, setGeneratedStrategies] = useState<any[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<any | null>(null);

  useEffect(() => {
    const generateStrategiesForActions = async () => {
      if (actions.length === 0) return;
      
      setIsLoading(true);
      setError(null);

      try {
        const strategies = await Promise.all(
          actions.map(action => 
            generateStrategies(action.action, {
              frequency: 'monthly',
              deliveryMethod: 'video-call',
              tools: [
                'GoalPilot',
                'ForecastIQ',
                'CEO dashboard',
                'MarketPulse',
                'ZenData',
                'Financial Health Check-Up',
                'Advisio',
                'FindtheGAP'
              ]
            })
          )
        );

        setGeneratedStrategies(strategies.flat());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate strategies');
      } finally {
        setIsLoading(false);
      }
    };

    generateStrategiesForActions();
  }, [actions]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const newStrategies = Array.from(selectedStrategies);
    const [removed] = newStrategies.splice(source.index, 1);
    newStrategies.splice(destination.index, 0, removed);
    onUpdateStrategies(newStrategies);
  };

  const handleStrategyClick = (strategy: any) => {
    setSelectedStrategy(selectedStrategy?.id === strategy.id ? null : strategy);
  };

  const handleStrategySelection = (strategyId: string) => {
    const strategy = generatedStrategies.find(s => s.id === strategyId);
    if (!strategy) return;

    const newSelectedStrategies = selectedStrategies.some(s => s.id === strategyId)
      ? selectedStrategies.filter(s => s.id !== strategyId)
      : [...selectedStrategies, strategy];
    
    onUpdateStrategies(newSelectedStrategies);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600">Generating implementation strategies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Select Implementation Strategies
        </h3>
        <p className="text-gray-600">
          Choose the strategies that will be used to implement the selected actions.
          Click on a strategy to view its details.
        </p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Available Strategies */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Available Strategies</h4>
            <Droppable droppableId="available">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-4"
                >
                  {generatedStrategies.map((strategy, index) => (
                    <Draggable key={strategy.id} draggableId={strategy.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => handleStrategyClick(strategy)}
                          className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-sm p-4 transition-all duration-300 ${
                            snapshot.isDragging ? 'scale-105 shadow-lg' : ''
                          } cursor-grab active:cursor-grabbing`}
                        >
                          <div className="flex items-center">
                            <GripVertical className="w-5 h-5 mr-3" />
                            <div>
                              <h5 className="font-medium">{strategy.strategy}</h5>
                              <p className="text-sm text-white text-opacity-90">{strategy.description}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Selected Strategies */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Selected Strategies</h4>
            <Droppable droppableId="selected">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[200px] rounded-lg p-4 ${
                    snapshot.isDraggingOver ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 border-2 border-dashed border-gray-300'
                  }`}
                >
                  {selectedStrategies.length === 0 ? (
                    <p className="text-center text-gray-500">
                      {snapshot.isDraggingOver ? 'Drop here to add' : 'Drag strategies here to select them'}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {selectedStrategies.map((strategy, index) => (
                        <Draggable key={strategy.id} draggableId={strategy.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-sm p-4 ${
                                snapshot.isDragging ? 'scale-105 shadow-lg' : ''
                              }`}
                            >
                              <div className="flex items-center">
                                <GripVertical className="w-5 h-5 mr-3" />
                                <div>
                                  <h5 className="font-medium">{strategy.strategy}</h5>
                                  <p className="text-sm text-white text-opacity-90">{strategy.description}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>

      {/* Strategy Details Panel */}
      {selectedStrategy && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Strategy Details</h4>
          <div className="space-y-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">{selectedStrategy.strategy}</h5>
              <p className="text-gray-600">{selectedStrategy.description}</p>
            </div>

            <div>
              <h6 className="font-medium text-gray-800 mb-2">Implementation Steps:</h6>
              <ul className="list-disc list-inside space-y-2">
                {selectedStrategy.implementation.map((step: string, index: number) => (
                  <li key={index} className="text-gray-600">{step}</li>
                ))}
              </ul>
            </div>

            <div>
              <h6 className="font-medium text-gray-800 mb-2">Required Tools:</h6>
              <div className="flex flex-wrap gap-2">
                {selectedStrategy.tools.map((tool: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyGeneration;