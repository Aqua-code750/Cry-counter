import { Activity, Gauge, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { cn } from '../lib/utils';
import { Intensity } from '../types';

interface MeterProps {
  currentCount: number;
  intensity: Intensity;
}

export const Meters: React.FC<MeterProps> = ({ currentCount, intensity }) => {
  const dailyProgress = (currentCount / 50) * 100;
  
  const getIntensityLevel = () => {
    switch (intensity) {
      case Intensity.MAX: return 100;
      case Intensity.HIGH: return 75;
      case Intensity.MEDIUM: return 45;
      default: return 15;
    }
  };

  return (
    <div className="w-full h-full flex flex-col min-h-[400px]">
      <div className="flex items-center gap-2 mb-4 px-2">
        <Gauge size={14} className="text-brand-cyan" />
        <h3 className="text-xs font-display font-black uppercase tracking-widest text-slate-400">
            System Vitals
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Daily Capacity */}
        <div className="glass rounded-[2.5rem] border border-white/80 p-6 shadow-sm flex flex-col items-center">
            <div className="flex items-center justify-between mb-6 w-full">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Daily Volume</div>
                <div className="text-[10px] font-black text-slate-700 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                    {currentCount}/50U
                </div>
            </div>
            
            <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 80 80">
                    <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#f1f5f9"
                        strokeWidth="5"
                        fill="transparent"
                    />
                    <motion.circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#06B6D4"
                        strokeWidth="5"
                        fill="transparent"
                        strokeDasharray="226"
                        strokeDashoffset="226"
                        initial={{ strokeDashoffset: 226 }}
                        animate={{ strokeDashoffset: 226 - (226 * Math.min(dailyProgress, 100)) / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-lg font-black text-slate-800 leading-none">{dailyProgress.toFixed(0)}%</div>
                    <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">LOAD</div>
                </div>
            </div>
            
            <p className="text-center mt-6 text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] opacity-60">
                CRITICAL LIMIT: 50 UNITS
            </p>
        </div>

        {/* Intensity Meter */}
        <div className="glass rounded-[2.5rem] border border-white/80 p-6 shadow-sm flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-8 w-full">
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Mood Tension</div>
                    <Zap size={14} className={cn(
                        "transition-colors",
                        intensity === Intensity.MAX ? "text-brand-red animate-pulse" : "text-amber-400"
                    )} />
                </div>
                
                <div className="grid grid-cols-5 gap-1.5 mt-4">
                   {[1, 2, 3, 4, 5].map((idx) => {
                       const isActive = getIntensityLevel() >= (idx * 20);
                       return (
                          <div 
                              key={idx} 
                              className={cn(
                                  "h-10 rounded-2xl transition-all duration-500",
                                  isActive 
                                    ? (idx > 4 ? "bg-brand-red shadow-lg shadow-brand-red/20" : "bg-brand-cyan shadow-lg shadow-brand-cyan/10") 
                                    : "bg-slate-100"
                              )} 
                          />
                       )
                   })}
                </div>
            </div>

            <div className="text-center mt-8 space-y-1">
                <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
                    {intensity}
                </div>
                <div className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">
                    CURRENT ATMOSPHERE
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
