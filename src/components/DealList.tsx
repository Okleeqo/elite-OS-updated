import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Deal } from '../types/pipeline';
import DealCard from './DealCard';

interface DealListProps {
  deals: Deal[];
}

const DealList: React.FC<DealListProps> = ({ deals }) => {
  return (
    <>
      {deals.map((deal, index) => (
        <Draggable key={deal.id} draggableId={deal.id} index={index}>
          {(provided) => (
            <DealCard
              deal={deal}
              innerRef={provided.innerRef}
              draggableProps={provided.draggableProps}
              dragHandleProps={provided.dragHandleProps}
            />
          )}
        </Draggable>
      ))}
    </>
  );
};

export default DealList;