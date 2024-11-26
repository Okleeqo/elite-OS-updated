import React from 'react';
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';

interface ScheduleCalendarProps {
  view: 'calendar' | 'list';
  segment: string;
}

const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ view, segment }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  
  const generateCalendarDays = () => {
    const days = [];
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i);
    }
    
    return days;
  };

  return (
    <div>
      {/* Calendar Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-4">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {view === 'calendar' ? (
        <div className="p-4">
          {/* Days of Week */}
          <div className="grid grid-cols-7 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((day, index) => (
              <div
                key={index}
                className={`aspect-square p-2 border rounded-lg ${
                  day ? 'hover:bg-gray-50 cursor-pointer' : ''
                } ${
                  day === currentDate.getDate() ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                {day && (
                  <>
                    <span className={`text-sm ${
                      day === currentDate.getDate() ? 'font-semibold text-blue-600' : ''
                    }`}>
                      {day}
                    </span>
                    {/* Example event indicators */}
                    {day % 3 === 0 && (
                      <div className="mt-1">
                        <div className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 mb-1">
                          Client Meeting
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="divide-y">
          {/* List View */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Client Strategy Meeting</h3>
                  <p className="text-sm text-gray-600">John Smith - ABC Corp</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(currentDate.setDate(currentDate.getDate() + index)).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleCalendar;