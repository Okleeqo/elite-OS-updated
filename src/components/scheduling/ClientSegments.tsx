import React from 'react';
import { Users, Star, Clock } from 'lucide-react';

interface ClientSegmentsProps {
  onSegmentChange: (segment: string) => void;
}

const ClientSegments: React.FC<ClientSegmentsProps> = ({ onSegmentChange }) => {
  const segments = [
    {
      id: 'high-priority',
      name: 'High Priority',
      count: 5,
      icon: Star,
      color: 'text-red-600 bg-red-100'
    },
    {
      id: 'medium-priority',
      name: 'Medium Priority',
      count: 8,
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 'low-priority',
      name: 'Low Priority',
      count: 12,
      icon: Users,
      color: 'text-green-600 bg-green-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Client Segments</h2>
      <div className="space-y-3">
        {segments.map((segment) => {
          const Icon = segment.icon;
          return (
            <button
              key={segment.id}
              onClick={() => onSegmentChange(segment.id)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${segment.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="ml-3 font-medium">{segment.name}</span>
              </div>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {segment.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ClientSegments;