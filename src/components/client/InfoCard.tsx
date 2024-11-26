import React from 'react';
import { ArrowRight } from 'lucide-react';

interface InfoCardProps {
  title: string;
  value: string;
  color: string;
  icon: React.ReactNode;
  buttonText: string;
  onClick: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  color,
  icon,
  buttonText,
  onClick
}) => {
  return (
    <div className={`${color} rounded-xl shadow-lg p-6 text-white`}>
      <div className="flex items-center mb-4">
        <div className="p-2 bg-white bg-opacity-20 rounded-lg">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-3xl font-bold mb-4">{value}</p>
      <button
        onClick={onClick}
        className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center"
      >
        {buttonText}
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
};

export default InfoCard;