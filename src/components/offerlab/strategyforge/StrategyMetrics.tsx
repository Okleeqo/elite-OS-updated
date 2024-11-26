import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface StrategyMetricsProps {
  strategy: {
    objectives: string[];
    createdAt: string;
  };
}

interface Metric {
  id: string;
  name: string;
  target: string;
  timeline: string;
  objectiveIndex: number;
}

const StrategyMetrics: React.FC<StrategyMetricsProps> = ({ strategy }) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [newMetric, setNewMetric] = useState<Omit<Metric, 'id'>>({
    name: '',
    target: '',
    timeline: '',
    objectiveIndex: 0
  });

  const handleAddMetric = () => {
    if (newMetric.name && newMetric.target && newMetric.timeline) {
      setMetrics([
        ...metrics,
        {
          ...newMetric,
          id: Math.random().toString(36).substr(2, 9)
        }
      ]);
      setNewMetric({
        name: '',
        target: '',
        timeline: '',
        objectiveIndex: newMetric.objectiveIndex
      });
    }
  };

  const handleDeleteMetric = (id: string) => {
    setMetrics(metrics.filter(metric => metric.id !== id));
  };

  const handleSave = () => {
    // Save metrics logic here
    console.log('Saving metrics:', metrics);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Set Success Metrics</h2>
        <p className="text-gray-600">Define measurable outcomes for each objective</p>
      </div>

      <div className="space-y-6">
        {strategy.objectives.map((objective, index) => (
          <div key={index} className="space-y-4">
            <h3 className="font-medium text-gray-900">
              Objective {index + 1}: {objective}
            </h3>

            <div className="grid grid-cols-4 gap-4">
              <input
                type="text"
                value={newMetric.objectiveIndex === index ? newMetric.name : ''}
                onChange={(e) => setNewMetric({ ...newMetric, name: e.target.value, objectiveIndex: index })}
                placeholder="Metric name"
                className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                value={newMetric.objectiveIndex === index ? newMetric.target : ''}
                onChange={(e) => setNewMetric({ ...newMetric, target: e.target.value, objectiveIndex: index })}
                placeholder="Target value"
                className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                value={newMetric.objectiveIndex === index ? newMetric.timeline : ''}
                onChange={(e) => setNewMetric({ ...newMetric, timeline: e.target.value, objectiveIndex: index })}
                placeholder="Timeline"
                className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                onClick={handleAddMetric}
                disabled={!newMetric.name || !newMetric.target || !newMetric.timeline}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Metric
              </button>
            </div>

            <div className="space-y-2">
              {metrics
                .filter(metric => metric.objectiveIndex === index)
                .map(metric => (
                  <div
                    key={metric.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="grid grid-cols-3 gap-4 flex-1">
                      <div>
                        <span className="text-sm text-gray-500">Metric</span>
                        <p className="font-medium text-gray-900">{metric.name}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Target</span>
                        <p className="font-medium text-gray-900">{metric.target}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Timeline</span>
                        <p className="font-medium text-gray-900">{metric.timeline}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteMetric(metric.id)}
                      className="ml-4 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={metrics.length === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Strategy
        </button>
      </div>
    </div>
  );
};

export default StrategyMetrics;