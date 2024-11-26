import React from 'react';

interface ProgressBarProps {
  percentage: number;
  metric?: string;
  currentValue?: number;
  targetValue?: number;
  showProgress: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percentage, 
  metric,
  currentValue,
  targetValue,
  showProgress
}) => {
  const isCCC = metric === 'Cash Conversion Cycle';
  const isPercentageMetric = metric?.includes('Margin') || metric?.includes('Ratio');
  
  const calculateProgress = () => {
    if (!showProgress || currentValue === undefined || targetValue === undefined) return 0;
    
    if (isCCC) {
      // For CCC, lower is better
      return Math.min(100, Math.max(0, (targetValue / currentValue) * 100));
    } else {
      // For all other metrics, calculate progress towards target
      return Math.min(100, Math.max(0, (currentValue / targetValue) * 100));
    }
  };

  const progressPercentage = calculateProgress();

  const getGradient = () => {
    if (!showProgress) return 'bg-gray-300';
    
    if (isCCC) {
      if (currentValue !== undefined && targetValue !== undefined) {
        if (currentValue <= targetValue) return 'bg-green-500';
        if (currentValue <= targetValue * 1.5) return 'bg-yellow-500';
        return 'bg-red-500';
      }
    } else {
      if (progressPercentage >= 95) return 'bg-green-500';
      if (progressPercentage >= 75) return 'bg-yellow-500';
      return 'bg-red-500';
    }
    
    return 'bg-gray-300';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Progress Towards Target</span>
        {showProgress ? (
          <span>{Math.round(progressPercentage)}%</span>
        ) : (
          <span>Set a target value</span>
        )}
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-200 ${getGradient()}`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>0%</span>
        <span>{showProgress ? '100%' : 'No target set'}</span>
      </div>
    </div>
  );
};

export default ProgressBar;