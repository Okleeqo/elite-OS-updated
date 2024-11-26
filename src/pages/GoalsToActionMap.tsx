import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { gapsData } from '../data/gapsData';
import ActionCard from '../components/ActionCard';
import GoalCard from '../components/GoalCard';
import { Gap, Goal } from '../types/goals';

const GoalsToActionMap: React.FC = () => {
  const [selectedGap, setSelectedGap] = useState<Gap | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const renderActionStrategies = (goal: Goal) => {
    return (
      <div className="space-y-8">
        <button
          onClick={() => setSelectedGoal(null)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back to Goals
        </button>
        <h2 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${goal.gradient} text-white p-4 rounded-lg`}>
          {goal.name}
        </h2>
        <div className="space-y-6">
          {goal.actions.map((action, index) => (
            <ActionCard key={action.id} action={action} index={index} />
          ))}
        </div>
      </div>
    );
  };

  if (selectedGoal) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        {renderActionStrategies(selectedGoal)}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {selectedGap ? (
        <>
          <button
            onClick={() => setSelectedGap(null)}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back to Gaps
          </button>
          <h2 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${selectedGap.gradient} text-white p-4 rounded-lg`}>
            {selectedGap.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedGap.goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onClick={() => setSelectedGoal(goal)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gapsData.map((gap) => (
            <button
              key={gap.id}
              onClick={() => setSelectedGap(gap)}
              className={`bg-gradient-to-r ${gap.gradient} p-6 rounded-xl shadow-lg text-white text-left transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{gap.name}</h2>
                <ArrowLeft className="w-6 h-6 transform rotate-180" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalsToActionMap;