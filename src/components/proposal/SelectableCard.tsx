import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SelectableCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

const SelectableCard: React.FC<SelectableCardProps> = ({
  title,
  description,
  icon: Icon,
  selected,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
        selected
          ? 'bg-blue-600 text-white ring-2 ring-blue-500 ring-offset-2 transform scale-105'
          : 'bg-white hover:bg-gray-50 ring-1 ring-gray-200'
      }`}
    >
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-lg ${
          selected ? 'bg-white/20' : 'bg-blue-50'
        }`}>
          <Icon className={`w-6 h-6 ${
            selected ? 'text-white' : 'text-blue-600'
          }`} />
        </div>
      </div>
      <h4 className={`text-lg font-semibold mb-2 ${
        selected ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h4>
      <p className={`text-sm ${
        selected ? 'text-white/90' : 'text-gray-500'
      }`}>
        {description}
      </p>
    </button>
  );
};

export default SelectableCard;