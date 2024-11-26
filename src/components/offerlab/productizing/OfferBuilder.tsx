import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Loader, Check, GripVertical } from 'lucide-react';
import { generateStrategies, type Strategy, type DeliveryParameters } from '../../../lib/openai';
import type { GeneratedAction } from '../../../lib/openai';

interface OfferBuilderProps {
  selectedActions: GeneratedAction[];
  selectedStrategies: string[];
  onStrategySelection: (strategyIds: string[]) => void;
  parameters: DeliveryParameters;
}

const OfferBuilder: React.FC<OfferBuilderProps> = ({
  selectedActions,
  selectedStrategies,
  onStrategySelection,
  parameters
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [availableStrategies, setAvailableStrategies] = useState<Strategy[]>([]);
  const [selectedStrategyList, setSelectedStrategyList] = useState<Strategy[]>([]);

  useEffect(() => {
    const generateStrategiesForActions = async () => {
      if (selectedActions.length === 0) return;
      
      setIsLoading(true);
      setError(null);

      try {
        const generatedStrategies = await Promise.all(
          selectedActions.map(action => 
            generateStrategies(action.action, parameters)
          )
        );

        const allStrategies = generatedStrategies.flat();
        setStrategies(allStrategies);
        setAvailableStrategies(allStrategies.filter(s => !selectedStrategies.includes(s.id)));
        setSelectedStrategyList(allStrategies.filter(s => selectedStrategies.includes(s.id)));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate strategies');
      } finally {
        setIsLoading(false);
      }
    };

    generateStrategiesForActions();
  }, [selectedActions, parameters, selectedStrategies]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    // Create new arrays to avoid mutating state directly
    const newAvailable = Array.from(availableStrategies);
    const newSelected = Array.from(selectedStrategyList);

    // Remove from source list
    const [movedStrategy] = source.droppableId === 'available' 
      ? newAvailable.splice(source.index, 1)
      : newSelected.splice(source.index, 1);

    // Add to destination list
    if (destination.droppableId === 'available') {
      newAvailable.splice(destination.index, 0, movedStrategy);
    } else {
      newSelected.splice(destination.index, 0, movedStrategy);
    }

    setAvailableStrategies(newAvailable);
    setSelectedStrategyList(newSelected);
    onStrategySelection(newSelected.map(s => s.id));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600">Generating strategies...</p>
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
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-2 gap-6">
        {/* Available Strategies */}
        <Droppable droppableId="available">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Strategies</h3>
              <div className="space-y-4">
                {availableStrategies.map((strategy, index) => (
                  <Draggable key={strategy.id} draggableId={strategy.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          snapshot.isDragging
                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-start">
                          <div {...provided.dragHandleProps} className="mt-1 mr-3">
                            <GripVertical className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-900">{strategy.strategy}</h4>
                            <p className="text-sm text-gray-600 mt-1">{strategy.description}</p>
                            <div className="mt-3 space-y-2">
                              <div>
                                <h5 className="text-sm font-medium text-gray-700">Success Metrics:</h5>
                                <ul className="mt-1 space-y-1">
                                  {strategy.metrics.map((metric, i) => (
                                    <li key={i} className="text-sm text-gray-600">• {metric}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-gray-700">Implementation:</h5>
                                <ul className="mt-1 space-y-1">
                                  {strategy.implementation.map((step, i) => (
                                    <li key={i} className="text-sm text-gray-600">{i + 1}. {step}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-gray-700">Tools:</h5>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {strategy.tools.map((tool, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                                    >
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>

        {/* Selected Strategies */}
        <Droppable droppableId="selected">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Strategies</h3>
              <div className="space-y-4">
                {selectedStrategyList.map((strategy, index) => (
                  <Draggable key={strategy.id} draggableId={strategy.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`p-4 rounded-lg transition-all duration-200 ${
                          snapshot.isDragging
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-blue-50 text-gray-900'
                        }`}
                      >
                        <div className="flex items-start">
                          <div {...provided.dragHandleProps} className="mt-1 mr-3">
                            <GripVertical className={`w-5 h-5 ${
                              snapshot.isDragging ? 'text-white' : 'text-gray-400'
                            }`} />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{strategy.strategy}</h4>
                            <p className={`text-sm mt-1 ${
                              snapshot.isDragging ? 'text-white' : 'text-gray-600'
                            }`}>
                              {strategy.description}
                            </p>
                            <div className="mt-3 space-y-2">
                              <div>
                                <h5 className={`text-sm font-medium ${
                                  snapshot.isDragging ? 'text-white' : 'text-gray-700'
                                }`}>
                                  Success Metrics:
                                </h5>
                                <ul className="mt-1 space-y-1">
                                  {strategy.metrics.map((metric, i) => (
                                    <li key={i} className={`text-sm ${
                                      snapshot.isDragging ? 'text-white' : 'text-gray-600'
                                    }`}>
                                      • {metric}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className={`text-sm font-medium ${
                                  snapshot.isDragging ? 'text-white' : 'text-gray-700'
                                }`}>
                                  Implementation:
                                </h5>
                                <ul className="mt-1 space-y-1">
                                  {strategy.implementation.map((step, i) => (
                                    <li key={i} className={`text-sm ${
                                      snapshot.isDragging ? 'text-white' : 'text-gray-600'
                                    }`}>
                                      {i + 1}. {step}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className={`text-sm font-medium ${
                                  snapshot.isDragging ? 'text-white' : 'text-gray-700'
                                }`}>
                                  Tools:
                                </h5>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {strategy.tools.map((tool, i) => (
                                    <span
                                      key={i}
                                      className={`px-2 py-1 rounded-full text-xs ${
                                        snapshot.isDragging
                                          ? 'bg-white bg-opacity-20 text-white'
                                          : 'bg-blue-100 text-blue-800'
                                      }`}
                                    >
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default OfferBuilder;