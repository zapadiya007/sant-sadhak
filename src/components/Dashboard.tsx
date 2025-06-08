import React from 'react';
import { 
  Sunrise, 
  Sun, 
  Sunset, 
  Moon, 
  Flower2, 
  Book, 
  Clock,
  TrendingUp,
  Calendar,
  Heart
} from 'lucide-react';

const Dashboard = () => {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 6) return { text: "शुभ रात्रि", icon: Moon };
    if (currentHour < 12) return { text: "शुभ प्रभात", icon: Sunrise };
    if (currentHour < 17) return { text: "शुभ दिवस", icon: Sun };
    if (currentHour < 20) return { text: "शुभ संध्या", icon: Sunset };
    return { text: "शुभ रात्रि", icon: Moon };
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  const todaysPractices = [
    { name: "Morning Meditation", completed: true, time: "45 min" },
    { name: "Hanuman Chalisa", completed: true, time: "15 min" },
    { name: "Gita Reading", completed: false, time: "30 min" },
    { name: "Evening Prayers", completed: false, time: "20 min" },
  ];

  const upcomingFestivals = [
    { name: "Diwali", date: "Nov 12", days: 15 },
    { name: "Kartik Purnima", date: "Nov 27", days: 30 },
    { name: "Gita Jayanti", date: "Dec 11", days: 44 },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting Section */}
      <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-orange-400/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <GreetingIcon className="w-8 h-8 text-orange-300" />
              <h2 className="text-3xl font-bold text-white">{greeting.text}</h2>
            </div>
            <p className="text-orange-100 text-lg">
              May this day bring you peace, wisdom, and spiritual growth
            </p>
          </div>
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <Flower2 className="w-10 h-10 text-white animate-pulse" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Today's Practices */}
        <div className="lg:col-span-2 bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-orange-300" />
            <h3 className="text-lg font-semibold text-white">Today's Spiritual Practices</h3>
          </div>
          <div className="space-y-3">
            {todaysPractices.map((practice, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${
                    practice.completed ? 'bg-green-400' : 'bg-gray-500'
                  }`} />
                  <span className={`font-medium ${
                    practice.completed ? 'text-gray-300 line-through' : 'text-white'
                  }`}>
                    {practice.name}
                  </span>
                </div>
                <span className="text-orange-200 text-sm font-medium">{practice.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-300">Progress: 2/4 completed</span>
            <div className="w-32 bg-gray-600 rounded-full h-2">
              <div className="w-1/2 bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-blue-300" />
              <h3 className="font-semibold text-white">This Week</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Meditation</span>
                <span className="text-white font-medium">4h 30m</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Mantras</span>
                <span className="text-white font-medium">1,248</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Reading</span>
                <span className="text-white font-medium">2h 15m</span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-5 h-5 text-purple-300" />
              <h3 className="font-semibold text-white">Upcoming</h3>
            </div>
            <div className="space-y-2">
              {upcomingFestivals.map((festival, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-300">{festival.name}</span>
                  <span className="text-white font-medium">{festival.days}d</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sacred Verse of the Day */}
      <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md rounded-xl p-6 border border-purple-400/30">
        <div className="flex items-center space-x-2 mb-3">
          <Book className="w-5 h-5 text-pink-300" />
          <h3 className="font-semibold text-white">Verse of the Day</h3>
        </div>
        <div className="text-center">
          <p className="text-white text-lg mb-2 font-sanskrit">
            योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय
          </p>
          <p className="text-orange-100 italic mb-2">
            "Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure."
          </p>
          <p className="text-gray-300 text-sm">— Bhagavad Gita 2.48</p>
        </div>
        <div className="flex justify-center mt-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-black/30 rounded-lg text-orange-200 hover:bg-black/40 transition-colors border border-orange-400/30">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Reflect on this</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;