import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Calendar, 
  Clock, 
  Book, 
  BarChart3, 
  Flower2,
  Sun,
  Moon,
  Heart,
  Sparkles
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import MalaCounter from './components/MalaCounter';
import MeditationTimer from './components/MeditationTimer';
import SacredCalendar from './components/SacredCalendar';
import MantraLibrary from './components/MantraLibrary';
import Progress from './components/Progress';

type Tab = 'dashboard' | 'mala' | 'timer' | 'calendar' | 'mantras' | 'progress';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isNightTime = currentTime.getHours() >= 18 || currentTime.getHours() <= 6;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'mala':
        return <MalaCounter />;
      case 'timer':
        return <MeditationTimer />;
      case 'calendar':
        return <SacredCalendar />;
      case 'mantras':
        return <MantraLibrary />;
      case 'progress':
        return <Progress />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      isNightTime 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900'
    }`}>
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <Flower2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Sant Sadhak</h1>
                <p className="text-sm text-orange-200">Spiritual Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-white">
              {isNightTime ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span className="text-sm font-medium">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Navigation Sidebar */}
        <nav className="w-64 bg-black/30 backdrop-blur-md border-r border-white/20 min-h-[calc(100vh-88px)] p-6">
          <div className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'mala', label: 'Digital Mala', icon: Sparkles },
              { id: 'timer', label: 'Meditation', icon: Clock },
              { id: 'calendar', label: 'Sacred Calendar', icon: Calendar },
              { id: 'mantras', label: 'Mantras', icon: Book },
              { id: 'progress', label: 'Progress', icon: BarChart3 },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as Tab)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-orange-500/30 text-white shadow-lg border border-orange-400/30'
                    : 'text-gray-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* Daily Quote */}
          <div className="mt-8 p-4 bg-black/30 rounded-lg border border-orange-400/30">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="w-4 h-4 text-orange-300" />
              <span className="text-sm font-medium text-orange-200">Daily Wisdom</span>
            </div>
            <p className="text-sm text-gray-200 italic">
              "The mind is everything. What you think you become."
            </p>
            <p className="text-xs text-gray-400 mt-1">— Buddha</p>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;