import React, { useEffect, useState } from 'react';
import { SolarTerm } from '../types';
import { SOLAR_TERMS } from '../constants';

interface SolarWheelProps {
  currentTerm: SolarTerm;
  nextTerm: SolarTerm;
}

const SolarWheel: React.FC<SolarWheelProps> = ({ currentTerm, nextTerm }) => {
  const [rotation, setRotation] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number }>({ d: 0, h: 0, m: 0, s: 0 });

  // Calculate rotation to center the current term
  useEffect(() => {
    // There are 24 terms, so each is 15 degrees.
    // Term 1 (Spring Begins) is usually at top (0 deg) or standard position.
    // Let's assume standard clock position 12 o'clock is index 0.
    // To center index K at top, we rotate -K * 15.
    
    // Find index in the array
    const index = SOLAR_TERMS.findIndex(t => t.id === currentTerm.id);
    const targetRotation = -index * 15;
    setRotation(targetRotation);
  }, [currentTerm]);

  // Countdown timer logic
  useEffect(() => {
    const targetDate = new Date(nextTerm.dateStr);
    // Fix year issue for next term if it crosses year boundary
    const now = new Date();
    if (targetDate < now) {
        targetDate.setFullYear(targetDate.getFullYear() + 1);
    }

    const timer = setInterval(() => {
      const current = new Date();
      const diff = targetDate.getTime() - current.getTime();

      if (diff > 0) {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextTerm]);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden my-4">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none z-10" />

      {/* The Wheel */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full border border-stone-300/30 transition-transform duration-1000 ease-out flex items-center justify-center"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {SOLAR_TERMS.map((term, i) => {
          const angle = i * 15;
          const isCurrent = term.id === currentTerm.id;
          return (
            <div
              key={term.id}
              className="absolute h-full w-[40px] flex flex-col items-center pt-4 origin-center"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div 
                className={`writing-vertical text-sm font-serif-sc tracking-widest transition-all duration-300 ${isCurrent ? 'text-stone-900 font-bold text-lg' : 'text-stone-400'}`}
                style={{ writingMode: 'vertical-rl' }}
              >
                {term.name}
              </div>
              {isCurrent && <div className="w-1 h-1 bg-red-600 rounded-full mt-2 animate-pulse" />}
            </div>
          );
        })}
      </div>

      {/* Center Info - Fixed position visually */}
      <div className="z-20 flex flex-col items-center text-center bg-white/60 backdrop-blur-sm p-6 rounded-full shadow-xl border border-white/50 w-64 h-64 justify-center">
        <h1 className="text-4xl font-calligraphy text-stone-800 mb-1">{currentTerm.name}</h1>
        <p className="text-xs text-stone-500 uppercase tracking-widest mb-4">{currentTerm.pinyin}</p>
        
        <div className="w-12 h-[1px] bg-stone-400 mb-4 opacity-50"></div>
        
        <div className="text-stone-600 text-xs mb-1">距离 {nextTerm.name} 还有</div>
        <div className="flex space-x-2 font-mono text-stone-800 text-lg font-bold">
           <span>{timeLeft.d}<span className="text-[10px] font-normal text-stone-500">天</span></span>
           <span>{timeLeft.h}<span className="text-[10px] font-normal text-stone-500">时</span></span>
           <span>{timeLeft.m}<span className="text-[10px] font-normal text-stone-500">分</span></span>
        </div>
      </div>
    </div>
  );
};

export default SolarWheel;