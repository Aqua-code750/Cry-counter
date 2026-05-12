import { Settings as SettingsIcon } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { formatTime } from '../lib/utils';

const TAGLINES = [
  'Household Peace Level: Unstable',
  'Emotional Damage Detected',
  'Chaos Levels Rising',
  'Family Control Center Online',
  'Realtime Sync Active',
];

export const Header: React.FC<{onOpenSettings: () => void}> = ({ onOpenSettings }) => {
  const [time, setTime] = useState(Date.now());
  const [viewers, setViewers] = useState(1);
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const timeTimer = setInterval(() => setTime(Date.now()), 1000);
    const taglineTimer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 4000);
    
    // Simulate simple viewer fluctuations
    const viewerTimer = setInterval(() => {
      setViewers(prev => {
        const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.max(1, prev + change);
      });
    }, 10000);

    return () => {
      clearInterval(timeTimer);
      clearInterval(taglineTimer);
      clearInterval(viewerTimer);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-8 sm:py-4 backdrop-blur-xl bg-white/70 border-b border-gray-200/50 safe-top">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-8 shrink-0">
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-brand-cyan font-black leading-tight">Time</span>
            <span className="text-[11px] sm:text-base font-mono tabular-nums tracking-wider text-slate-800 font-bold">
              {formatTime(time)}
            </span>
          </div>
          <div className="h-6 sm:h-8 w-[1px] bg-slate-200"></div>
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-brand-cyan font-black leading-tight">Live</span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
              <span className="text-[11px] sm:text-base font-mono text-slate-800 font-bold">{viewers}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="hidden sm:flex px-4 py-2 rounded-full bg-slate-50 border border-slate-100 items-center gap-2 overflow-hidden max-w-[120px] md:max-w-none">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse shrink-0"></div>
            <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 truncate">
              {TAGLINES[taglineIndex]}
            </span>
          </div>
          
          <button 
            onClick={onOpenSettings}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all flex items-center justify-center text-slate-400 hover:text-brand-cyan shadow-sm active:scale-95"
          >
            <SettingsIcon size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
