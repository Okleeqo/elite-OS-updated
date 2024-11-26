import React, { useState } from 'react';
import { CheckSquare, Square, Clock, Calendar, User, Tag, MoreVertical, Plus } from 'lucide-react';
import { useFollowUpStore } from '../../stores/followUpStore';
import AddFollowUpModal from './AddFollowUpModal';

const ClientFollowUps: React.FC = () => {
  const { followUps, toggleFollowUp, deleteFollowUp } = useFollowUpStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority'>('dueDate');
  const [isAddingFollowUp, setIsAddingFollowUp] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredAndSortedFollowUps = followUps
    .filter(followUp => {
      if (filter === 'pending') return !followUp.completed;
      if (filter === 'completed') return followUp.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
    });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Client Follow-ups</h2>
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border-gray-300 rounded-lg text-sm"
          >
            <option value="dueDate">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
          <button 
            onClick={() => setIsAddingFollowUp(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Follow-up
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredAndSortedFollowUps.map((followUp) => (
          <div
            key={followUp.id}
            className={`flex items-start justify-between p-4 rounded-lg ${
              followUp.completed ? 'bg-gray-50' : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-start space-x-4">
              <button
                onClick={() => toggleFollowUp(followUp.id)}
                className="mt-1 flex-shrink-0"
              >
                {followUp.completed ? (
                  <CheckSquare className="w-5 h-5 text-green-600" />
                ) : (
                  <Square className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              <div className="space-y-2">
                <div>
                  <h3 className={`font-medium ${followUp.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {followUp.title}
                  </h3>
                  <div className="flex items-center mt-1 space-x-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {followUp.clientName}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(followUp.dueDate).toLocaleDateString()}
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-xs ${getPriorityColor(followUp.priority)}`}>
                      {followUp.priority}
                    </div>
                  </div>
                </div>

                {followUp.tags.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <div className="flex flex-wrap gap-2">
                      {followUp.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {followUp.notes && (
                  <p className="text-sm text-gray-600">{followUp.notes}</p>
                )}
              </div>
            </div>

            <button 
              onClick={() => deleteFollowUp(followUp.id)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        ))}

        {filteredAndSortedFollowUps.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No follow-ups found</h3>
            <p className="text-gray-500 mt-1">
              {filter === 'completed' 
                ? 'No completed follow-ups yet'
                : filter === 'pending'
                ? 'No pending follow-ups'
                : 'Start by adding a new follow-up task'}
            </p>
          </div>
        )}
      </div>

      {isAddingFollowUp && (
        <AddFollowUpModal onClose={() => setIsAddingFollowUp(false)} />
      )}
    </div>
  );
};

export default ClientFollowUps;