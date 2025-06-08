import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award,
  Clock,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const Progress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  const weeklyStats = {
    meditation: { current: 285, target: 420, unit: 'minutes' },
    mantras: { current: 1547, target: 2000, unit: 'repetitions' },
    reading: { current: 165, target: 210, unit: 'minutes' },
    prayers: { current: 28, target: 35, unit: 'sessions' },
  };

  const achievements = [
    { 
      name: '7-Day Streak', 
      description: 'Meditated for 7 consecutive days',
      earned: true,
      date: '2024-11-08'
    },
    { 
      name: 'Mantra Master', 
      description: 'Completed 10,000 mantra repetitions',
      earned: true,
      date: '2024-11-05'
    },
    { 
      name: 'Early Bird', 
      description: 'Completed morning practice before 6 AM',
      earned: false,
      progress: 4,
      target: 7
    },
    { 
      name: 'Scripture Scholar', 
      description: 'Read sacred texts for 30 days',
      earned: false,
      progress: 18,
      target: 30
    },
  ];

  const dailyActivity = [
    { day: 'Mon', meditation: 45, mantras: 108, reading: 30 },
    { day: 'Tue', meditation: 30, mantras: 216, reading: 25 },
    { day: 'Wed', meditation: 60, mantras: 324, reading: 35 },
    { day: 'Thu', meditation: 40, mantras: 108, reading: 20 },
    { day: 'Fri', meditation: 55, mantras: 432, reading: 40 },
    { day: 'Sat', meditation: 35, mantras: 216, reading: 15 },
    { day: 'Sun', meditation: 20, mantras: 143, reading: 0 },
  ];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'from-green-500 to-emerald-500';
    if (percentage >= 75) return 'from-blue-500 to-cyan-500';
    if (percentage >= 50) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Spiritual Progress</h2>
        <p className="text-white/80">Track your journey of spiritual growth and development</p>
      </div>

      {/* Period Selection */}
      <div className="flex justify-center">
        <div className="bg-white/15 backdrop-blur-md rounded-lg p-1 border border-white/20">
          {(['week', 'month', 'year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                selectedPeriod === period
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Goals */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-6">
              <Target className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">This Week's Goals</h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries(weeklyStats).map(([key, stat]) => {
                const percentage = getProgressPercentage(stat.current, stat.target);
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium capitalize">{key}</span>
                      <span className="text-white/80 text-sm">
                        {stat.current} / {stat.target} {stat.unit}
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(percentage)}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-right text-white/60 text-xs">
                      {Math.round(percentage)}% complete
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Activity Chart */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Daily Activity</h3>
            </div>
            
            <div className="space-y-4">
              {dailyActivity.map((day) => (
                <div key={day.day} className="flex items-center space-x-4">
                  <div className="w-12 text-white/70 text-sm font-medium">{day.day}</div>
                  <div className="flex-1 flex space-x-2">
                    <div className="flex-1 bg-white/10 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${(day.meditation / 60) * 100}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                        Med: {day.meditation}m
                      </span>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                        style={{ width: `${(day.mantras / 500) * 100}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                        Mantras: {day.mantras}
                      </span>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                        style={{ width: `${(day.reading / 40) * 100}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                        Read: {day.reading}m
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Overall Stats */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold text-white">Overall Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Total Sessions</span>
                <span className="text-white font-medium">342</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Longest Streak</span>
                <span className="text-white font-medium">23 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Current Streak</span>
                <span className="text-white font-medium">7 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Total Time</span>
                <span className="text-white font-medium">45h 30m</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold text-white">Achievements</h3>
            </div>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border ${
                    achievement.earned 
                      ? 'bg-green-500/20 border-green-500/30' 
                      : 'bg-white/10 border-white/20'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-green-500' : 'bg-white/20'
                    }`}>
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{achievement.name}</div>
                      <div className="text-white/70 text-sm">{achievement.description}</div>
                      {achievement.earned ? (
                        <div className="text-green-400 text-xs mt-1">
                          Earned {new Date(achievement.date!).toLocaleDateString()}
                        </div>
                      ) : (
                        <div className="text-white/60 text-xs mt-1">
                          Progress: {achievement.progress}/{achievement.target}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors text-left">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Start Meditation</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors text-left">
                <PieChart className="w-4 h-4" />
                <span className="text-sm">View Detailed Stats</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors text-left">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Set New Goals</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;