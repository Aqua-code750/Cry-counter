import { Activity, Award, Minus, Plus, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { cn, formatTime } from '../lib/utils';
import { ActivityEvent } from '../types';

interface ActivityFeedProps {
  activities: ActivityEvent[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="w-full max-w-lg mx-auto h-full flex flex-col min-h-[400px]">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            <h3 className="text-xs font-display font-black uppercase tracking-widest text-slate-400">
                Drama History
            </h3>
        </div>
        <div className="text-[9px] font-black text-slate-300 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100 uppercase tracking-widest">
            {activities.length} EVENTS
        </div>
      </div>

      <div className="flex-1 glass shadow-xl rounded-[2.5rem] border border-white/80 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth p-4 space-y-3">
          <AnimatePresence initial={false} mode="popLayout">
            {activities.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-16 h-16 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                    <Activity size={24} className="text-slate-200" />
                </div>
                <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] leading-relaxed">
                    System Stable.<br/>No disturbances logged.
                </p>
              </motion.div>
            ) : (
              activities.slice(0, 30).map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  className="bg-white/80 p-4 rounded-3xl border border-slate-50 flex items-center gap-4 group hover:shadow-md transition-all cursor-default"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
                    activity.type === 'ADD' ? "bg-rose-50 text-rose-500" :
                    activity.type === 'REMOVE' ? "bg-emerald-50 text-emerald-500" :
                    "bg-brand-purple/10 text-brand-purple"
                  )}>
                    {activity.type === 'ADD' && <Plus size={18} />}
                    {activity.type === 'REMOVE' && <Minus size={18} />}
                    {activity.type === 'ACHIEVEMENT' && <Award size={18} />}
                  </div>

                  <div className="flex-1 min-w-0 py-0.5">
                    <p className="text-xs font-bold text-slate-700 leading-snug break-words">
                        {activity.message}
                    </p>
                    <p className="text-[9px] font-black text-slate-300 uppercase mt-1 tracking-widest">
                        {formatTime(activity.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer Interaction */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
             <div className="flex items-center gap-2 text-slate-300">
                <Search size={12} />
                <span className="text-[9px] font-black uppercase tracking-widest">Master Logs</span>
             </div>
             <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Live</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             </div>
        </div>
      </div>
    </div>
  );
};
