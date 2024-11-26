import React from 'react';

interface VariableSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  isPercentage?: boolean;
  suffix?: string;
  initialValue?: number;
  field: string;
  metric: string;
}

const VariableSlider: React.FC<VariableSliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 10,
  isPercentage = false,
  suffix = '',
  initialValue = 0,
  field,
  metric
}) => {
  const isCCC = metric === 'Cash Conversion Cycle';
  const isCostField = field === 'cogs' || field === 'variableExpenses' || field === 'fixedExpenses' || 
                      field === 'interestRate' || field === 'fixedAssets';
  
  // For CCC use direct values, for others calculate based on percentage change
  const displayValue = isCCC ? 
    value : 
    initialValue * (1 + (value / 100));
  
  // For percentage display, show the actual slider value
  const changePercentage = !isCCC && initialValue ? value : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      if (isCCC) {
        onChange(Math.round(newValue));
      } else {
        // Calculate percentage change based on initial value
        const percentageChange = ((newValue - initialValue) / initialValue) * 100;
        onChange(Math.round(percentageChange));
      }
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={Math.round(displayValue)}
            onChange={handleInputChange}
            className="w-24 px-2 py-1 text-right border border-gray-300 rounded-md"
          />
          {suffix && <span className="text-sm text-gray-500">{suffix}</span>}
          {!isCCC && initialValue > 0 && (
            <span className={`text-sm ${
              isCostField ? 
                (value <= 0 ? 'text-green-600' : 'text-red-600') :
                (value >= 0 ? 'text-green-600' : 'text-red-600')
            }`}>
              ({value >= 0 ? '+' : ''}{Math.round(value)}%)
            </span>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{Math.round(min)}{suffix}</span>
        <span>{Math.round(max)}{suffix}</span>
      </div>
    </div>
  );
};

export default VariableSlider;