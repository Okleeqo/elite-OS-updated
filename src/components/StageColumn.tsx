import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Stage, Deal } from '../types/pipeline';
import DealList from './DealList';

interface StageColumnProps {
  stage: Stage;
  deals: Deal[];
}

const StageColumn: React.FC<StageColumnProps> = ({ stage, deals }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-700 mb-3">{stage.name}</h3>
      <Droppable droppableId={stage.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3 min-h-[200px]"
          >
            <DealList deals={deals} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default StageColumn;