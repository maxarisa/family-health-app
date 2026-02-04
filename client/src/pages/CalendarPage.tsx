import { useState } from 'react';
import { ChevronLeft, ChevronRight, Droplets, Footprints, Scale, Moon, Heart } from 'lucide-react';
import { format, startOfWeek, addDays, subWeeks, addWeeks, isSameDay } from 'date-fns';

export function CalendarPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek((prev) =>
      direction === 'prev' ? subWeeks(prev, 1) : addWeeks(prev, 1)
    );
  };

  // Mock data - to be replaced with actual API data
  const getDayStatus = (date: Date) => ({
    water: Math.random() > 0.3,
    exercise: Math.random() > 0.4,
    weight: Math.random() > 0.5,
    sleep: Math.random() > 0.3,
    vitals: Math.random() > 0.6,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-600 mt-1">View your weekly progress</p>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateWeek('prev')}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Previous week"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
        </h2>
        <button
          onClick={() => navigateWeek('next')}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Next week"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
          const status = getDayStatus(day);
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={day.toISOString()}
              className={`p-4 rounded-xl border transition-colors ${
                isToday
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="text-center mb-3">
                <div className="text-sm text-gray-500">{format(day, 'EEE')}</div>
                <div className={`text-xl font-bold ${isToday ? 'text-primary-600' : 'text-gray-900'}`}>
                  {format(day, 'd')}
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-1">
                {status.water && <Droplets className="w-4 h-4 text-blue-500" />}
                {status.exercise && <Footprints className="w-4 h-4 text-green-500" />}
                {status.weight && <Scale className="w-4 h-4 text-purple-500" />}
                {status.sleep && <Moon className="w-4 h-4 text-indigo-500" />}
                {status.vitals && <Heart className="w-4 h-4 text-red-500" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <span className="text-gray-600">Water Goal Met</span>
          </div>
          <div className="flex items-center gap-2">
            <Footprints className="w-5 h-5 text-green-500" />
            <span className="text-gray-600">Exercise Logged</span>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-purple-500" />
            <span className="text-gray-600">Weight Logged</span>
          </div>
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-500" />
            <span className="text-gray-600">Sleep Logged</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-gray-600">Vitals Logged</span>
          </div>
        </div>
      </div>
    </div>
  );
}
