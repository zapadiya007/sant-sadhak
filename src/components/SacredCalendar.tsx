import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Moon, 
  Sun,
  Flower2
} from 'lucide-react';

const SacredCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const sacredEvents = {
    '2024-11-12': { name: 'Diwali', type: 'festival', description: 'Festival of Lights' },
    '2024-11-15': { name: 'Kartik Purnima', type: 'purnima', description: 'Full Moon in Kartik' },
    '2024-11-20': { name: 'Ekadashi', type: 'ekadashi', description: 'Fasting day' },
    '2024-12-11': { name: 'Gita Jayanti', type: 'festival', description: 'Birth of Bhagavad Gita' },
    '2024-12-15': { name: 'Margashirsha Purnima', type: 'purnima', description: 'Full Moon' },
    '2024-12-30': { name: 'Putrada Ekadashi', type: 'ekadashi', description: 'Sacred fasting day' },
  };

  const getCurrentMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'festival': return <Star className="w-3 h-3" />;
      case 'purnima': return <Moon className="w-3 h-3" />;
      case 'ekadashi': return <Sun className="w-3 h-3" />;
      default: return <Flower2 className="w-3 h-3" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'festival': return 'text-yellow-400 bg-yellow-400/20';
      case 'purnima': return 'text-blue-400 bg-blue-400/20';
      case 'ekadashi': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-green-400 bg-green-400/20';
    }
  };

  const days = getCurrentMonthDays();
  const todayEvents = Object.entries(sacredEvents)
    .filter(([date]) => {
      const eventDate = new Date(date);
      const today = new Date();
      return eventDate >= today && eventDate <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    })
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime());

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Sacred Calendar</h2>
        <p className="text-white/80">Important dates and festivals in the Hindu calendar</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold text-white">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-white/60 text-sm font-medium py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const dateKey = formatDateKey(date);
              const event = sacredEvents[dateKey];
              const today = isToday(date);
              const currentMonth = isCurrentMonth(date);

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`
                    relative p-2 text-sm rounded-lg transition-all duration-200 hover:bg-white/10
                    ${today ? 'bg-orange-500 text-white font-bold' : ''}
                    ${currentMonth ? 'text-white' : 'text-white/30'}
                    ${selectedDate?.toDateString() === date.toDateString() ? 'ring-2 ring-blue-400' : ''}
                  `}
                >
                  <span className="relative z-10">{date.getDate()}</span>
                  {event && (
                    <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${getEventColor(event.type).split(' ')[1]}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Date Info */}
          {selectedDate && (
            <div className="mt-4 p-4 bg-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h4>
              {sacredEvents[formatDateKey(selectedDate)] ? (
                <div className="space-y-1">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getEventColor(sacredEvents[formatDateKey(selectedDate)].type)}`}>
                    {getEventIcon(sacredEvents[formatDateKey(selectedDate)].type)}
                    <span>{sacredEvents[formatDateKey(selectedDate)].name}</span>
                  </div>
                  <p className="text-white/70 text-sm">{sacredEvents[formatDateKey(selectedDate)].description}</p>
                </div>
              ) : (
                <p className="text-white/60 text-sm">No special events on this date</p>
              )}
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="space-y-4">
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="font-semibold text-white mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {todayEvents.slice(0, 5).map(([date, event]) => {
                const eventDate = new Date(date);
                const daysUntil = Math.ceil((eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={date} className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg">
                    <div className={`p-1 rounded ${getEventColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{event.name}</div>
                      <div className="text-white/70 text-sm">{event.description}</div>
                      <div className="text-white/60 text-xs mt-1">
                        {daysUntil === 0 ? 'Today' : `${daysUntil} days`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Moon Phase */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="font-semibold text-white mb-4">Current Moon Phase</h3>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center">
                <Moon className="w-8 h-8 text-white" />
              </div>
              <div className="text-white font-medium">Waxing Crescent</div>
              <div className="text-white/70 text-sm">47% Illuminated</div>
              <div className="text-white/60 text-xs mt-1">Next Full Moon in 8 days</div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="font-semibold text-white mb-3">Today's Significance</h3>
            <div className="text-white/80 text-sm space-y-2">
              <p>• Favorable time for meditation and prayers</p>
              <p>• Sunrise: 6:42 AM • Sunset: 5:28 PM</p>
              <p>• Brahma Muhurta: 4:30 - 5:18 AM</p>
              <p>• Current Nakshatra: Rohini</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SacredCalendar;