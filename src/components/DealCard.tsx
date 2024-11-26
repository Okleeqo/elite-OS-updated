import React from 'react';
import { DollarSign, Calendar } from 'lucide-react';
import { Deal } from '../types/pipeline';

interface DealCardProps {
  deal: Deal;
  dragHandleProps: any;
  draggableProps: any;
  innerRef: (element: HTMLElement | null) => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, dragHandleProps, draggableProps, innerRef }) => {
  return (
    <div
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className="bg-white p-3 rounded shadow-sm"
    >
      <h4 className="font-medium text-gray-800">{deal.title}</h4>
      <p className="text-sm text-gray-600">{deal.company}</p>
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <DollarSign className="w-4 h-4 mr-1" />
        {deal.value}
      </div>
      <div className="mt-1 flex items-center text-sm text-gray-500">
        <Calendar className="w-4 h-4 mr-1" />
        {new Date(deal.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default DealCard;