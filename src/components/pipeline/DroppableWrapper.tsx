import React from 'react';
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';

interface DroppableWrapperProps {
  droppableId: string;
  type?: string;
  className?: string;
  children: (
    provided: DroppableProvided,
    snapshot: DroppableStateSnapshot
  ) => React.ReactNode;
}

const DroppableWrapper: React.FC<DroppableWrapperProps> = ({
  droppableId,
  type = 'DEFAULT',
  className,
  children
}) => {
  return (
    <Droppable droppableId={droppableId} type={type}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={className}
        >
          {children(provided, snapshot)}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableWrapper;