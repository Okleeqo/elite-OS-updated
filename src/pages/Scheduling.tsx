import React, { useState } from 'react';
import { Calendar, Clock, Users, Bell, Filter, Plus } from 'lucide-react';
import ScheduleCalendar from '../components/scheduling/ScheduleCalendar';
import InteractionForm from '../components/scheduling/InteractionForm';
import UpcomingReminders from '../components/scheduling/UpcomingReminders';
import ClientSegments from '../components/scheduling/ClientSegments';
import EngagementMetrics from '../components/scheduling/EngagementMetrics';
import ClientFollowUps from '../components/scheduling/ClientFollowUps';

const Scheduling: React.FC = () => {
  const [isAddingInteraction, setIsAddingInteraction] = useState(false);
  const [selectedView, setSelectedView] = useState<'calendar' | 'list'>('calendar');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Client Engagement Scheduler</h1>
          <p className="text-gray-600 mt-1">Manage your client interactions and follow-ups</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow px-3 py-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select 
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              className="border-none focus:ring-0 text-sm"
            >
              <option value="all">All Segments</option>
              <option value="high-priority">High Priority</option>
              <option value="medium-priority">Medium Priority</option>
              <option value="low-priority">Low Priority</option>
            </select>
          </div>
          <div className="flex bg-white rounded-lg shadow">
            <button
              onClick={() => setSelectedView('calendar')}
              className={`px-4 py-2 flex items-center ${
                selectedView === 'calendar' ? 'text-blue-600 bg-blue-50 rounded-l-lg' : 'text-gray-600'
              }`}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Calendar
            </button>
            <button
              onClick={() => setSelectedView('list')}
              className={`px-4 py-2 flex items-center ${
                selectedView === 'list' ? 'text-blue-600 bg-blue-50 rounded-r-lg' : 'text-gray-600'
              }`}
            >
              <Clock className="w-5 h-5 mr-2" />
              List
            </button>
          </div>
          <button
            onClick={() => setIsAddingInteraction(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Interaction
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Sidebar - Client Segments & Metrics */}
        <div className="space-y-6">
          <ClientSegments onSegmentChange={setSelectedSegment} />
          <EngagementMetrics />
        </div>

        {/* Main Calendar/List View */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <ScheduleCalendar view={selectedView} segment={selectedSegment} />
          </div>
        </div>
      </div>

      {/* Client Follow-ups Section */}
      <ClientFollowUps />

      {/* Upcoming Reminders */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <UpcomingReminders />
      </div>

      {/* Add Interaction Modal */}
      {isAddingInteraction && (
        <InteractionForm onClose={() => setIsAddingInteraction(false)} />
      )}
    </div>
  );
};

export default Scheduling;