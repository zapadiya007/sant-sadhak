import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX,
  Bell,
  Waves,
  Wind
} from 'lucide-react';

const MeditationTimer = () => {
  const [duration, setDuration] = useState(15); // in minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedSound, setSelectedSound] = useState('silence');
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const sounds = [
    { id: 'silence', name: 'Silence', icon: VolumeX },
    { id: 'bell', name: 'Temple Bell', icon: Bell },
    { id: 'ocean', name: 'Ocean Waves', icon: Waves },
    { id: 'wind', name: 'Forest Breeze', icon: Wind },
  ];

  const presetDurations = [5, 10, 15, 20, 30, 45, 60];

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            setIsPaused(false);
            // Play completion sound
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(duration * 60);
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    if (!isActive) {
      setTimeLeft(newDuration * 60);
    }
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Meditation Timer</h2>
        <p className="text-white/80">Find peace in mindful moments</p>
      </div>

      {/* Main Timer */}
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <div className="text-center space-y-8">
          {/* Circular Timer */}
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
                stroke="url(#timerGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-linear"
              />
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-white mb-1">
                {formatTime(timeLeft)}
              </div>
              <div className="text-white/60 text-sm">
                {isActive ? (isPaused ? 'Paused' : 'Meditating') : 'Ready'}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            {!isActive ? (
              <button
                onClick={handleStart}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium hover:scale-105 transform transition-all duration-200"
              >
                <Play className="w-5 h-5" />
                <span>Start Meditation</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handlePause}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>
                <button
                  onClick={handleStop}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  <Square className="w-4 h-4" />
                  <span>Stop</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Duration Settings */}
        <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="font-semibold text-white mb-4">Duration</h3>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {presetDurations.map((preset) => (
              <button
                key={preset}
                onClick={() => handleDurationChange(preset)}
                disabled={isActive}
                className={`py-2 px-3 rounded text-sm font-medium transition-colors ${
                  duration === preset
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {preset}m
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white/80 text-sm">Custom:</span>
            <input
              type="range"
              min="1"
              max="120"
              value={duration}
              onChange={(e) => handleDurationChange(parseInt(e.target.value))}
              disabled={isActive}
              className="flex-1"
            />
            <span className="text-white text-sm w-12">{duration}m</span>
          </div>
        </div>

        {/* Sound Settings */}
        <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="font-semibold text-white mb-4">Background Sound</h3>
          <div className="space-y-2 mb-4">
            {sounds.map((sound) => {
              const SoundIcon = sound.icon;
              return (
                <button
                  key={sound.id}
                  onClick={() => setSelectedSound(sound.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedSound === sound.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  <SoundIcon className="w-4 h-4" />
                  <span>{sound.name}</span>
                </button>
              );
            })}
          </div>
          
          {selectedSound !== 'silence' && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white/70 hover:text-white"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-white text-xs w-8">{isMuted ? 0 : volume}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Session Guide */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="font-semibold text-white mb-3">Meditation Guide</h3>
        <div className="text-white/80 text-sm space-y-2">
          <p>• Find a comfortable seated position with your spine straight</p>
          <p>• Close your eyes gently and take three deep breaths</p>
          <p>• Focus on your natural breath without trying to control it</p>
          <p>• When thoughts arise, acknowledge them and return to your breath</p>
          <p>• End with gratitude for this moment of peace</p>
        </div>
      </div>
    </div>
  );
};

export default MeditationTimer;