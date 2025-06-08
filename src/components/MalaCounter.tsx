import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  Play, 
  Pause, 
  Settings,
  Sparkles,
  Plus,
  Minus
} from 'lucide-react';

const MalaCounter = () => {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [targetCount, setTargetCount] = useState(108);
  const [isChanting, setIsChanting] = useState(false);
  const [selectedMantra, setSelectedMantra] = useState('Om Namah Shivaya');
  const [rounds, setRounds] = useState(0);

  const mantras = [
    'Om Namah Shivaya',
    'Hare Krishna Hare Krishna',
    'Om Gam Ganapataye Namaha',
    'Om Mani Padme Hum',
    'Gayatri Mantra',
    'Mahamrityunjaya Mantra'
  ];

  useEffect(() => {
    if (count >= targetCount) {
      setRounds(prev => prev + 1);
      setCount(0);
      // Play completion sound (if available)
    }
  }, [count, targetCount]);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    setTotalCount(prev => prev + 1);
  };

  const handleReset = () => {
    setCount(0);
    setTotalCount(0);
    setRounds(0);
    setIsChanting(false);
  };

  const progressPercentage = (count / targetCount) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Digital Mala</h2>
        <p className="text-white/80">Traditional japa counter for mantra recitation</p>
      </div>

      {/* Main Counter */}
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <div className="text-center space-y-6">
          {/* Circular Progress */}
          <div className="relative w-64 h-64 mx-auto">
            <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 256 256">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - progressPercentage / 100)}`}
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-white mb-1">{count}</div>
              <div className="text-white/60 text-sm">of {targetCount}</div>
              {rounds > 0 && (
                <div className="text-orange-300 text-sm mt-1">
                  Round {rounds + 1}
                </div>
              )}
            </div>
          </div>

          {/* Mantra Selection */}
          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">
              Current Mantra
            </label>
            <select
              value={selectedMantra}
              onChange={(e) => setSelectedMantra(e.target.value)}
              className="w-full max-w-xs mx-auto bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            >
              {mantras.map((mantra) => (
                <option key={mantra} value={mantra} className="bg-gray-800">
                  {mantra}
                </option>
              ))}
            </select>
          </div>

          {/* Counter Button */}
          <button
            onClick={handleIncrement}
            className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full text-white text-2xl font-bold shadow-lg hover:scale-105 transform transition-all duration-200 flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8" />
          </button>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setIsChanting(!isChanting)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              {isChanting ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isChanting ? 'Pause' : 'Start'} Session</span>
            </button>
            
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="w-5 h-5 text-orange-300" />
            <h3 className="font-semibold text-white">Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Target Count per Round
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setTargetCount(Math.max(1, targetCount - 1))}
                  className="w-8 h-8 bg-white/10 rounded text-white hover:bg-white/20"
                >
                  <Minus className="w-4 h-4 mx-auto" />
                </button>
                <input
                  type="number"
                  value={targetCount}
                  onChange={(e) => setTargetCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-center"
                />
                <button
                  onClick={() => setTargetCount(targetCount + 1)}
                  className="w-8 h-8 bg-white/10 rounded text-white hover:bg-white/20"
                >
                  <Plus className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="font-semibold text-white mb-4">Session Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/70">Total Count</span>
              <span className="text-white font-medium">{totalCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Completed Rounds</span>
              <span className="text-white font-medium">{rounds}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Progress</span>
              <span className="text-white font-medium">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MalaCounter;