import { motion } from 'motion/react';
import React from 'react';
import { AppState, Intensity } from '../types';

interface HeroSectionProps {
  intensity: Intensity;
  settings: AppState['settings'];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ intensity, settings }) => {
  const getStatusColor = () => {
    switch (intensity) {
      case Intensity.MAX: return { bg: 'bg-brand-red-50', text: 'text-brand-red', label: 'Critical Drama' };
      case Intensity.HIGH: return { bg: 'bg-brand-purple/10', text: 'text-brand-purple', label: 'Major Concern' };
      case Intensity.MEDIUM: return { bg: 'bg-brand-cyan/10', text: 'text-brand-cyan', label: 'Slightly Dramatic' };
      default: return { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'All Calm' };
    }
  };

  const status = getStatusColor();

  return (
    <section className="flex flex-col items-center pt-8 sm:pt-14 pb-4 px-4 w-full overflow-hidden">
      <div className="relative group flex items-center justify-center">
        {/* Soft Ambient Glow */}
        <motion.div 
            animate={settings.animations ? {
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.5, 0.3],
            } : {}}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className="absolute -inset-8 sm:-inset-12 rounded-full blur-[50px] sm:blur-[80px] z-[-1]"
            style={{ backgroundColor: intensity === Intensity.MAX ? '#fecdd3' : '#e0f2fe' }}
        />

        {/* Framing */}
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-[2.5rem] sm:rounded-[3rem] p-3 glass-dark shadow-xl hover:shadow-2xl transition-all duration-500 group">
            <div className="w-full h-full rounded-[2rem] sm:rounded-[2.2rem] overflow-hidden relative ring-4 ring-white/50 bg-white flex items-center justify-center p-4">
               <motion.div
                 className="w-full h-full"
                 animate={settings.animations && intensity === Intensity.MAX ? {
                   scale: [1, 1.05, 1],
                 } : {}}
                 transition={{
                     duration: 0.8,
                     repeat: Infinity,
                     repeatType: 'reverse'
                 }}
               >
                 <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
                   {/* Character Body */}
                   <path 
                     d="M80 160 L80 185 A8 8 0 0 0 96 185 L96 165 L104 165 L104 185 A8 8 0 0 0 120 185 L120 160 Z" 
                     fill="white" 
                     stroke="black" 
                     strokeWidth="4" 
                   />
                   <path d="M80 160 L65 145" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
                   <path d="M120 160 L135 145" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
                   
                   {/* Big Head */}
                   <circle cx="100" cy="85" r="75" fill="white" stroke="black" strokeWidth="4" />
                   
                   {/* Huge Eyes */}
                   <circle cx="70" cy="85" r="28" fill="black" />
                   <circle cx="130" cy="85" r="28" fill="black" />
                   
                   {/* Eye Sparkles */}
                   <circle cx="62" cy="75" r="8" fill="white" />
                   <circle cx="122" cy="75" r="8" fill="white" />
                   <circle cx="78" cy="95" r="5" fill="white" />
                   <circle cx="138" cy="95" r="5" fill="white" />
                   
                   {/* Tears */}
                   <path d="M50 110 Q42 125 55 135" fill="#00D4FF" stroke="#00D4FF" strokeWidth="2" />
                   <path d="M65 120 Q58 135 70 145" fill="#00D4FF" stroke="#00D4FF" strokeWidth="2" />
                   
                   <path d="M150 110 Q158 125 145 135" fill="#00D4FF" stroke="#00D4FF" strokeWidth="2" />
                   <path d="M135 120 Q142 135 130 145" fill="#00D4FF" stroke="#00D4FF" strokeWidth="2" />
                   
                   {/* Sad Mouth */}
                   <path d="M85 130 Q100 115 115 130" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
                 </svg>
               </motion.div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none"></div>
            </div>
           
           {/* Emotional Weather Indicator */}
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full glass border border-white/80 shadow-lg flex items-center gap-2 whitespace-nowrap"
           >
              <div className={`w-2 h-2 rounded-full ${status.bg.replace('/10', '')} animate-pulse`} />
              <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] ${status.text}`}>
                {status.label}
              </span>
           </motion.div>
        </div>
      </div>

      {/* Brand Header */}
      <div className="mt-12 sm:mt-16 text-center max-w-full px-4">
        <motion.h1 
          className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-slate-800 tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Samanvitha <span className="text-brand-cyan">Cry Counter</span>
        </motion.h1>
        <motion.div 
          className="flex items-center justify-center gap-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
           <div className="h-[1px] w-6 sm:w-10 bg-slate-200" />
           <p className="text-slate-400 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-black">
              Family Hub v2.0
           </p>
           <div className="h-[1px] w-6 sm:w-10 bg-slate-200" />
        </motion.div>
      </div>
    </section>
  );
};
