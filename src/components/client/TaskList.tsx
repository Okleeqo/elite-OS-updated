import React, { useState } from 'react';
import { CheckSquare, Square, Clock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Follow up with Client A about proposal',
    completed: false,
    dueDate: '2024-03-20'
  },
  {
    id: '2',
    title: 'Send updated contract to Client B',
    completed: false,
    dueDate: '2024-03-21'
  },
  {
    id: '3',
    title: 'Schedule quarterly review with Client C',
    completed: true,
    dueDate: '2024-03-19'
  },
  {
    id: '4',
    title: 'Prepare presentation for Client D',
    completed: false,
    dueDate: '2024-03-22'
  }
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Client Follow-ups</h3>
      <div className="space-y-4">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`flex items-start p-3 rounded-lg transition-colors ${
              task.completed ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className="flex-shrink-0 mt-1"
            >
              {task.completed ? (
                <CheckSquare className="w-5 h-5 text-green-500" />
              ) : (
                <Square className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <div className="ml-3 flex-grow">
              <p className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                {task.title}
              </p>
              <div className="flex items-center mt-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="ml-1 text-xs text-gray-500">
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;