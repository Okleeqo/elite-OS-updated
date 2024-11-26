import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { DollarSign, Calendar, Building } from 'lucide-react';
import { Deal } from '../../types/pipeline';

interface DealCardProps {
  deal: Deal;
  index: number;
}

const DealCard = React.forwardRef<HTMLDivElement, DealCardProps>(({ deal, index }, ref) => {
  return (
    <Draggable draggableId={deal.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`bg-white p-4 rounded-lg shadow-sm ${
            snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''
          } hover:shadow-md transition-all duration-200`}
        >
          <h4 className="font-medium text-gray-900 mb-2">{deal.title}</h4>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Building className="w-4 h-4 mr-2" />
              <span className="truncate">{deal.client}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>${deal.value.toLocaleString()}</span>
            </div>
            {deal.dueDate && (
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(deal.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
});

DealCard.displayName = 'DealCard';

export default DealCard;