import React, { useState } from 'react';
import { Search, Bell, MessageSquare, User, Menu } from 'lucide-react';

interface ClientTopbarProps {
  onToggleSidebar: () => void;
}

const ClientTopbar: React.FC<ClientTopbarProps> = ({ onToggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative text-gray-500 hover:text-gray-700">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          <button className="relative text-gray-500 hover:text-gray-700">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              5
            </span>
          </button>

          <button className="flex items-center text-gray-700 hover:text-gray-900">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-purple-700" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientTopbar;