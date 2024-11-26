import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Calculator, Search, BarChart2 } from 'lucide-react';
import AppDetailModal from '../components/AppDetailModal';

interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  isBuiltIn?: boolean;
}

const tools: Tool[] = [
  {
    id: 'goal-pilot',
    name: 'GoalPilot',
    description: 'Advanced what-if analysis and goal-seeking tool for financial planning.',
    url: '/goal-pilot',
    icon: <Calculator size={24} />,
    color: 'bg-blue-500',
    isBuiltIn: true
  },
  {
    id: 'findthegap',
    name: 'FindtheGAP',
    description: 'Comprehensive financial analysis and optimization tool for identifying and closing financial gaps.',
    url: '/findthegap',
    icon: <Search size={24} />,
    color: 'bg-indigo-500',
    isBuiltIn: true
  },
  {
    id: 'ceo-dashboard',
    name: 'CEO Dashboard',
    description: 'Real-time financial insights and KPI tracking for executive decision-making.',
    url: '/ceo-dashboard',
    icon: <BarChart2 size={24} />,
    color: 'bg-emerald-500',
    isBuiltIn: true
  }
];

const ToolsApps: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const handleOpenInApp = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const handleCloseModal = () => {
    setSelectedTool(null);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Tools & Apps</h1>
      
      {/* Built-in Apps Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Built-in Apps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`${tool.color} text-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105`}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white bg-opacity-30 rounded-full mr-3">
                    {tool.icon}
                  </div>
                  <h2 className="text-xl font-semibold">{tool.name}</h2>
                </div>
                <p className="text-white text-opacity-90 mb-4">{tool.description}</p>
                <div className="flex space-x-2">
                  <Link
                    to={tool.url}
                    className="flex-1 bg-white text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300 flex items-center justify-center"
                  >
                    Open App
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleOpenInApp(tool)}
                    className="flex-1 bg-white text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300 flex items-center justify-center"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTool && (
        <AppDetailModal tool={selectedTool} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ToolsApps;