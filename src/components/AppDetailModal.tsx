import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

interface AppDetailModalProps {
  tool: Tool;
  onClose: () => void;
}

const AppDetailModal: React.FC<AppDetailModalProps> = ({ tool, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">{tool.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-auto p-6">
          <div className={`${tool.color} text-white rounded-xl p-6 mb-6`}>
            <div className="flex items-center mb-4">
              <div className="p-3 bg-white bg-opacity-30 rounded-full mr-4">
                {tool.icon}
              </div>
              <h3 className="text-2xl font-semibold">{tool.name}</h3>
            </div>
            <p className="text-white text-opacity-90 text-lg mb-4">{tool.description}</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">How to use this tool:</h4>
            <ol className="list-decimal list-inside space-y-2">
              {tool.id === 'goal-pilot' ? (
                <>
                  <li>Select a metric from the available options.</li>
                  <li>Input your financial data or upload a template.</li>
                  <li>Set target values and adjust variables.</li>
                  <li>Analyze the impact of changes on your financial metrics.</li>
                </>
              ) : (
                <>
                  <li>Click the "Open Tool" button to launch the external application.</li>
                  <li>Follow the instructions provided within the tool interface.</li>
                  <li>Input your data and analyze the results.</li>
                  <li>Use the insights gained to inform your business decisions.</li>
                </>
              )}
            </ol>
            {tool.id !== 'goal-pilot' && (
              <p className="text-gray-600">
                Note: This tool opens in a new tab to ensure full functionality and compatibility.
              </p>
            )}
          </div>
        </div>
        {tool.id !== 'goal-pilot' && (
          <div className="border-t p-4 flex justify-end">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              Open Tool
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppDetailModal;