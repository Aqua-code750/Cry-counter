import { Activity } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

const MESSAGES = [
  'Preparing emotional damage...',
  'Connecting family systems...',
  'Synchronizing realtime chaos...',
  'Loading analytics engine...',
  'Initializing control center...',
  'Preparing activity feed...',
  'Hardening security protocols...',
  'Optimizing display aura...',
];

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 2000; // Faster for better experience
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1200);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden font-sans"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/40 blur-[120px] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-16"
        >
          <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Activity size={32} className="text-brand-cyan" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-800 uppercase mb-2">
            System Boot
          </h2>
          <div className="text-slate-300 font-bold text-[10px] tracking-[0.3em] uppercase">
            Family Dashboard v2.0
          </div>
        </motion.div>

        {/* Progress System */}
        <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
          <motion.div
            className="absolute left-0 top-0 h-full bg-brand-cyan shadow-lg shadow-brand-cyan/20"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center mb-10 text-[10px] font-black text-slate-300 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-brand-cyan animate-pulse rounded-full" />
            <span>Initializing</span>
          </div>
          <div className="tabular-nums">{progress.toFixed(0)}%</div>
        </div>

        {/* Message Feed */}
        <div className="h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-slate-400 font-bold text-[11px] tracking-wide"
            >
              {MESSAGES[messageIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
