import { Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { cn } from '../lib/utils';
import { AppState, Intensity } from '../types';

interface CounterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  intensity: Intensity;
  settings: AppState['settings'];
}

export const Counter: React.FC<CounterProps> = ({ count, onIncrement, onDecrement, intensity, settings }) => {
  const progress = (count / 50) * 100;
  
  return (
    <div className="flex flex-col items-center gap-12 sm:gap-16 py-4 sm:py-8 w-full max-w-full overflow-hidden">
      {/* Massive Display with Ring */}
      <div className="relative flex items-center justify-center p-4">
        {/* Progress Ring - Using Aspect Ratio and Responsive Sizing */}
        <div className="relative w-[70vw] h-[70vw] max-w-[320px] max-h-[320px] sm:w-[50vw] sm:h-[50vw] sm:max-w-[400px] sm:max-h-[400px] flex items-center justify-center">
          <svg 
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            viewBox="0 0 100 100"
          >
             <circle 
               cx="50" cy="50" r="46" 
               className="stroke-slate-100 fill-none" 
               strokeWidth="2" 
             />
             <motion.circle 
               cx="50" cy="50" r="46" 
               className={cn(
                  "fill-none transition-all duration-1000 ease-out",
                  intensity === Intensity.MAX ? "stroke-brand-red" : "stroke-brand-cyan"
               )}
               strokeWidth="4"
               strokeDasharray="289"
               initial={{ strokeDashoffset: 289 }}
               animate={{ strokeDashoffset: 289 - (289 * progress) / 100 }}
               strokeLinecap="round"
             />
          </svg>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={count}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20, position: 'absolute' }}
              transition={{ 
                type: 'spring',
                stiffness: 400,
                damping: 25
              }}
              className={cn(
                "text-[25vw] sm:text-[180px] leading-none font-display font-black tracking-tighter transition-all duration-700 select-none",
                intensity === Intensity.MAX ? "text-brand-red drop-shadow-[0_0_30px_rgba(239,68,68,0.2)]" : "text-slate-800 drop-shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
              )}
            >
              {count}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Cap Label */}
        <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 glass rounded-full border border-white/80 shadow-sm text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap z-10">
            Daily Limit: 50U
        </div>
      </div>

      {/* Buttons - Improved Mobile Layout */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[400px] px-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onIncrement}
          className="flex-1 py-5 sm:py-6 rounded-2xl bg-brand-cyan text-white font-black uppercase tracking-[0.2em] text-sm shadow-[0_8px_20px_rgba(6,182,212,0.3)] hover:shadow-[0_12px_25px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-3 group"
        >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            <span>Add Cry</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDecrement}
          className="flex-1 py-5 sm:py-6 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-slate-600 font-black uppercase tracking-[0.2em] text-[11px] sm:text-xs shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <Minus size={18} />
          <span>Correction</span>
        </motion.button>
      </div>

      {/* Next Milestone */}
      <div className="flex items-center gap-3">
         <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Target Efficiency</span>
         <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={cn(
                "h-full transition-all duration-1000",
                intensity === Intensity.MAX ? "bg-brand-red" : "bg-brand-cyan"
              )}
            />
         </div>
      </div>
    </div>
  );
};
