import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Lead } from '../../types/pipeline';
import LeadCard from './LeadCard';

interface StageColumnProps {
  id: string;
  title: string;
  color: string;
  leads: Lead[];
  onDeleteLead: (id: string) => void;
}

const StageColumn: React.FC<StageColumnProps> = ({ id, title, color, leads, onDeleteLead }) => {
  return (
    <div className="flex-shrink-0 w-80">
      <div className={`bg-gradient-to-r ${color} text-white p-3 rounded-t-lg`}>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{title}</h3>
          <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-sm">
            {leads.length}
          </span>
        </div>
      </div>
      
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`bg-gray-50 p-4 min-h-[500px] rounded-b-lg space-y-3 ${
              snapshot.isDraggingOver ? 'bg-blue-50 ring-2 ring-blue-300' : ''
            }`}
          >
            {leads.map((lead, index) => (
              <Draggable key={lead.id} draggableId={lead.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <LeadCard
                      lead={lead}
                      isDragging={snapshot.isDragging}
                      onDelete={() => onDeleteLead(lead.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default StageColumn;