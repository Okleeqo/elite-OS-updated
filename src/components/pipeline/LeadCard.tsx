import React from 'react';
import { DollarSign, Calendar, Building, Trash2 } from 'lucide-react';
import { Lead } from '../../types/pipeline';

interface LeadCardProps {
  lead: Lead;
  isDragging: boolean;
  onDelete: () => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, isDragging, onDelete }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-4 ${
        isDragging ? 'shadow-lg ring-2 ring-blue-300' : ''
      } hover:shadow-md transition-all duration-200`}
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-gray-900">{lead.title}</h4>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Building className="w-4 h-4 mr-2" />
          <span className="truncate">{lead.client}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <DollarSign className="w-4 h-4 mr-2" />
          <span>${lead.value.toLocaleString()}</span>
        </div>
        
        {lead.dueDate && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(lead.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadCard;