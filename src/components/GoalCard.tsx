import React from 'react';
import { Goal } from '../types/goals';
import { ChevronRight } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  onClick: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-gradient-to-r ${goal.gradient} p-6 rounded-xl shadow-lg text-white text-left transition-all duration-300 hover:scale-105 hover:shadow-xl`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{goal.name}</h3>
        <ChevronRight className="w-6 h-6" />
      </div>
    </button>
  );
};

export default GoalCard;