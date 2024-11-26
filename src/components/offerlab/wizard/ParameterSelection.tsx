import React, { useState } from 'react';
import { Video, VideoOff, Mail, GripVertical, Clock, Calendar, FileText } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { WizardData } from '../OfferWizard';

interface ParameterSelectionProps {
  parameters: WizardData['parameters'];
  selectedStrategies: any[];
  onUpdateParameters: (parameters: WizardData['parameters']) => void;
}

const ParameterSelection: React.FC<ParameterSelectionProps> = ({
  parameters,
  selectedStrategies,
  onUpdateParameters
}) => {
  const [selectedStrategy, setSelectedStrategy] = useState<any | null>(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === 'available' && destination.droppableId === 'selected') {
      const item = availableItems[source.index];
      const newSelectedItems = [...selectedItems];
      newSelectedItems.splice(destination.index, 0, item);
      setSelectedItems(newSelectedItems);
    } else if (source.droppableId === 'selected' && destination.droppableId === 'available') {
      const [removed] = selectedItems.splice(source.index, 1);
      setSelectedItems(selectedItems.filter(item => item.id !== removed.id));
    }
  };

  const availableItems = [
    ...selectedStrategies.map(strategy => ({
      id: strategy.id,
      type: 'strategy',
      title: strategy.strategy,
      description: strategy.description,
      color: 'from-blue-500 to-blue-600',
      data: strategy
    })),
    {
      id: 'weekly',
      type: 'frequency',
      title: 'Weekly',
      description: 'Regular weekly check-ins and updates',
      color: 'from-green-500 to-green-600',
      icon: Clock
    },
    {
      id: 'monthly',
      type: 'frequency',
      title: 'Monthly',
      description: 'Comprehensive monthly reviews',
      color: 'from-indigo-500 to-indigo-600',
      icon: Calendar
    },
    {
      id: 'quarterly',
      type: 'frequency',
      title: 'Quarterly',
      description: 'In-depth quarterly analysis',
      color: 'from-purple-500 to-purple-600',
      icon: FileText
    },
    {
      id: 'video-call',
      type: 'delivery',
      title: 'Video Call',
      description: 'Live interactive sessions',
      color: 'from-orange-500 to-orange-600',
      icon: Video
    },
    {
      id: 'recorded-video',
      type: 'delivery',
      title: 'Recorded Video',
      description: 'Pre-recorded presentations',
      color: 'from-pink-500 to-pink-600',
      icon: VideoOff
    },
    {
      id: 'email-report',
      type: 'delivery',
      title: 'Email Report',
      description: 'Detailed written reports',
      color: 'from-red-500 to-red-600',
      icon: Mail
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Build Your Offer
        </h3>
        <p className="text-gray-600">
          Drag and drop components to build your offer. Click on a strategy to view its details.
        </p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-2 gap-6">
          {/* Available Components */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Available Components</h4>
            <Droppable droppableId="available">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-4"
                >
                  {availableItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => {
                        const Icon = item.icon;
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => item.type === 'strategy' && setSelectedStrategy(item.data)}
                            className={`bg-gradient-to-r ${item.color} text-white rounded-lg shadow-sm p-4 transition-all duration-300 ${
                              snapshot.isDragging ? 'scale-105 shadow-lg' : ''
                            } cursor-grab active:cursor-grabbing`}
                          >
                            <div className="flex items-center">
                              <GripVertical className="w-5 h-5 mr-3" />
                              {Icon && <Icon className="w-5 h-5 mr-3" />}
                              <div>
                                <h5 className="font-medium">{item.title}</h5>
                                <p className="text-sm text-white text-opacity-90">{item.description}</p>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Your Offer */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Your Offer</h4>
            <Droppable droppableId="selected">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[200px] rounded-lg p-4 ${
                    snapshot.isDraggingOver ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 border-2 border-dashed border-gray-300'
                  }`}
                >
                  {selectedItems.length === 0 ? (
                    <p className="text-center text-gray-500">
                      {snapshot.isDraggingOver ? 'Drop here to add' : 'Drag items here to build your offer'}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {selectedItems.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-gradient-to-r ${item.color} text-white rounded-lg shadow-sm p-4 ${
                                snapshot.isDragging ? 'scale-105 shadow-lg' : ''
                              }`}
                            >
                              <div className="flex items-center">
                                <GripVertical className="w-5 h-5 mr-3" />
                                {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                                <div>
                                  <h5 className="font-medium">{item.title}</h5>
                                  <p className="text-sm text-white text-opacity-90">{item.description}</p>
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

export default ParameterSelection;