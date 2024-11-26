import React from 'react';
import { Play, Trash2 } from 'lucide-react';

interface Scenario {
  name: string;
  metric: string;
  value: number;
  variables: Record<string, number>;
}

interface ScenarioTableProps {
  scenarios: Scenario[];
  onLoad: (scenario: Scenario) => void;
  onDelete: (scenarioName: string) => void;
}

const ScenarioTable: React.FC<ScenarioTableProps> = ({ scenarios, onLoad, onDelete }) => {
  if (scenarios.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-xl font-bold text-gray-800">Saved Scenarios</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scenario Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Metric
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scenarios.map((scenario) => (
              <tr key={scenario.name}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{scenario.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{scenario.metric}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${scenario.value.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onLoad(scenario)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(scenario.name)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScenarioTable;