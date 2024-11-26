import React, { useState } from 'react';
import { Calculator, Target, BarChart2, RefreshCw, Save } from 'lucide-react';
import FinancialStatementsModal from '../components/goalpilot/FinancialStatementsModal';
import MetricSelector from '../components/goalpilot/MetricSelector';
import ProgressBar from '../components/goalpilot/ProgressBar';
import VariableSlider from '../components/goalpilot/VariableSlider';
import ScenarioTable from '../components/goalpilot/ScenarioTable';
import { useGoalPilotStore } from '../stores/goalPilotStore';
import { calculateMetricValue, getMetricConfig } from '../utils/metricCalculations';

const GoalPilot: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetValues, setTargetValues] = useState<Record<string, string>>({});
  
  const {
    selectedMetric,
    setSelectedMetric,
    financialData,
    variables,
    updateVariable,
    resetVariables,
    scenarios,
    saveScenario,
    deleteScenario,
    loadScenario
  } = useGoalPilotStore();

  const currentMetricValue = calculateMetricValue(selectedMetric, financialData, variables);
  const metricConfig = getMetricConfig(selectedMetric);

  const formatValue = (value: number) => {
    if (selectedMetric === 'Cash Conversion Cycle') {
      return `${Math.round(value)} days`;
    }
    return metricConfig.isPercentage ? `${Math.round(value)}%` : `$${Math.round(value).toLocaleString()}`;
  };

  const calculateDelta = (current: number, target: number) => {
    if (!target) return 0;
    return Math.round(current - target);
  };

  const formatDelta = (delta: number) => {
    if (selectedMetric === 'Cash Conversion Cycle') {
      return `${Math.round(delta)} days`;
    }
    return metricConfig.isPercentage ? `${Math.round(delta)}%` : `$${Math.round(delta).toLocaleString()}`;
  };

  const handleTargetValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
      setTargetValues(prev => ({
        ...prev,
        [selectedMetric]: value
      }));
    }
  };

  const handleSaveScenario = () => {
    const name = prompt('Enter a name for this scenario:');
    if (name) {
      saveScenario({
        name,
        metric: selectedMetric,
        variables: { ...variables },
        value: Math.round(currentMetricValue)
      });
    }
  };

  const currentTargetValue = targetValues[selectedMetric] || '';
  const deltaValue = calculateDelta(currentMetricValue, Number(currentTargetValue));
  const deltaClass = deltaValue >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-4 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold flex items-center">
            <Calculator className="mr-2" />
            GoalPilot
          </h1>
          <p className="mt-2 text-blue-100">Financial Analysis and Goal Setting Tool</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <MetricSelector
              selectedMetric={selectedMetric}
              onSelectMetric={setSelectedMetric}
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            {selectedMetric ? (
              <>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedMetric} Analysis
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <BarChart2 className="w-5 h-5 mr-2" />
                      Edit Financial Statements
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Value {selectedMetric === 'Cash Conversion Cycle' ? '(days)' : metricConfig.isPercentage ? '(%)' : '($)'}
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={currentTargetValue}
                          onChange={handleTargetValueChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder={`Enter target ${selectedMetric === 'Cash Conversion Cycle' ? 'days' : metricConfig.isPercentage ? 'percentage' : 'value'}`}
                        />
                        <Target className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <ProgressBar 
                      percentage={0}
                      metric={selectedMetric}
                      currentValue={currentMetricValue}
                      targetValue={Number(currentTargetValue)}
                      showProgress={currentTargetValue !== ''}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Current Value
                        </h3>
                        <p className="text-3xl font-bold text-blue-600">
                          {formatValue(currentMetricValue)}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Delta to Target
                        </h3>
                        <p className={`text-3xl font-bold ${deltaClass}`}>
                          {currentTargetValue ? formatDelta(deltaValue) : '-'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Variable Adjustments
                      </h3>
                      <div className="space-y-4">
                        {metricConfig.variables.map((variable) => (
                          <VariableSlider
                            key={variable.field}
                            field={variable.field}
                            metric={selectedMetric}
                            label={variable.label}
                            value={variables[variable.field] || 0}
                            onChange={(value) => updateVariable(variable.field, value)}
                            min={variable.min}
                            max={variable.max}
                            step={variable.step}
                            isPercentage={variable.isPercentage}
                            suffix={variable.suffix}
                            initialValue={financialData[variable.initialField]}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={resetVariables}
                        className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Reset to Initial Values
                      </button>
                      <button
                        onClick={handleSaveScenario}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Save className="w-5 h-5 mr-2" />
                        Save Scenario
                      </button>
                    </div>
                  </div>
                </div>

                <ScenarioTable
                  scenarios={scenarios}
                  onLoad={loadScenario}
                  onDelete={deleteScenario}
                />
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Welcome to GoalPilot
                </h2>
                <p className="text-gray-600">
                  Please select a metric from the left sidebar to begin your analysis.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <FinancialStatementsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        financialData={financialData}
      />
    </div>
  );
};

export default GoalPilot;