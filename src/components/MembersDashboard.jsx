import React, { useState } from 'react';
import { Calendar, X, ExternalLink } from 'lucide-react';
import { format, eachDayOfInterval, parseISO } from 'date-fns';

const mockMembers = [
  {
    id: 1,
    name: 'Karen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    tasks: [
      {
        id: 1,
        title: 'Review',
        subtitle: 'Main page',
        start: '2024-03-11',
        end: '2024-03-12',
        color: 'bg-amber-100 text-amber-800',
      },
      {
        id: 2,
        title: 'Profile',
        start: '2024-03-18',
        end: '2024-03-19',
        color: 'bg-blue-100 text-blue-800',
      },
      {
        id: 3,
        title: 'Profile',
        subtitle: 'Main page',
        start: '2024-03-20',
        end: '2024-03-25',
        color: 'bg-blue-100 text-blue-800',
      },
    ],
  },
  {
    id: 2,
    name: 'Jake',
    avatar: 'https://i.pravatar.cc/150?img=2',
    tasks: [
      {
        id: 3,
        title: 'New feature QA',
        start: '2024-03-11',
        end: '2024-03-13',
        color: 'bg-green-100 text-green-800',
      },
      {
        id: 4,
        title: 'Analytics',
        start: '2024-03-14',
        end: '2024-03-17',
        color: 'bg-amber-100 text-amber-800',
      },
    ],
  },
  {
    id: 3,
    name: 'Brad',
    avatar: 'https://i.pravatar.cc/150?img=3',
    tasks: [
      {
        id: 5,
        title: 'Specs',
        subtitle: 'Workspaces',
        start: '2024-03-13',
        end: '2024-03-16',
        color: 'bg-blue-100 text-blue-800',
      },
      {
        id: 6,
        title: 'Optimization',
        start: '2024-03-13',
        end: '2024-03-15',
        color: 'bg-blue-100 text-blue-800',
      },
      {
        id: 7,
        title: 'Refactoring',
        start: '2024-03-15',
        end: '2024-03-18',
        color: 'bg-blue-100 text-blue-800',
      },
    ],
  },
  {
    id: 4,
    name: 'Molly',
    avatar: 'https://i.pravatar.cc/150?img=4',
    tasks: [
      {
        id: 8,
        title: 'Main page update',
        start: '2024-03-13',
        end: '2024-03-16',
        color: 'bg-purple-100 text-purple-800',
      },
      {
        id: 9,
        title: 'Images',
        subtitle: 'Blog post',
        start: '2024-03-15',
        end: '2024-03-17',
        color: 'bg-green-100 text-green-800',
      },
    ],
  },
];

// Extract all task dates
const taskDates = mockMembers.flatMap(member =>
  member.tasks.flatMap(task => [task.start, task.end])
);

// Find the minimum and maximum dates
const minDate = new Date(Math.min(...taskDates.map(date => new Date(date))));
const maxDate = new Date(Math.max(...taskDates.map(date => new Date(date))));

// Generate the days array
const days = eachDayOfInterval({ start: minDate, end: maxDate }).map(date =>
  format(date, 'yyyy-MM-dd')
);

function MembersDashboard() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleDays = days.slice(startIndex, startIndex + 9);

  const handleScrollRight = () => {
    if (startIndex + 9 < days.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleScrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-7xl mx-auto my-8 p-4">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              <span className="text-base md:text-lg font-medium">Timeline</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-1 md:space-x-2">
              <span className="text-gray-600 text-sm md:text-base">
                Group by:
              </span>
              <select className="border rounded-md px-1 py-0.5 md:px-2 md:py-1 text-sm md:text-base">
                <option>Member</option>
              </select>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px] grid grid-cols-[150px_repeat(9,1fr)] gap-4">
          {/* Days Header */}
          <div className="col-span-1"></div>
          {visibleDays.map(day => (
            <div key={day} className="text-sm text-gray-600 text-center">
              {format(parseISO(day), 'EEE dd')}
            </div>
          ))}

          {/* Members and Tasks */}
          {mockMembers.map(member => (
            <React.Fragment key={member.id}>
              {/* Member Info */}
              <div className="flex items-center space-x-2">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium">{member.name}</span>
              </div>

              {/* Task Timeline */}
              <div className="col-span-9 relative">
                <div
                  className="grid grid-cols-9 gap-1"
                  style={{ height: `${member.tasks.length * 2.5}rem` }}
                >
                  {member.tasks
                    .filter(task => {
                      const taskStart = new Date(task.start);
                      const taskEnd = new Date(task.end);
                      const visibleStart = new Date(visibleDays[0]);
                      const visibleEnd = new Date(
                        visibleDays[visibleDays.length - 1]
                      );
                      return (
                        (taskStart >= visibleStart &&
                          taskStart <= visibleEnd) ||
                        (taskEnd >= visibleStart && taskEnd <= visibleEnd) ||
                        (taskStart <= visibleStart && taskEnd >= visibleEnd)
                      );
                    })
                    .map((task, index) => {
                      const startDay = days.findIndex(
                        day => day === task.start
                      );
                      const endDay = days.findIndex(day => day === task.end);
                      const span = endDay - startDay + 1;

                      return (
                        <React.Fragment key={task.id}>
                          <div
                            className={`absolute ${task.color} rounded-md p-2 text-sm hover:shadow-lg transition-shadow`}
                            style={{
                              top: `${index * 2.5}rem`,
                              left: `${((startDay - startIndex) / 9) * 100}%`,
                              width: `${(span / 9) * 100}%`,
                              minWidth: '100px',
                            }}
                          >
                            <div className="font-medium">{task.title}</div>
                            {task.subtitle && (
                              <div className="text-xs opacity-75">
                                {task.subtitle}
                              </div>
                            )}
                          </div>
                        </React.Fragment>
                      );
                    })}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Scroll Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleScrollLeft}
          className="text-gray-400 hover:text-gray-600"
        >
          &lt; Prev
        </button>
        <button
          onClick={handleScrollRight}
          className="text-gray-400 hover:text-gray-600"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
}

export default MembersDashboard;
