import { Award, Lock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { cn } from '../lib/utils';
import { Achievement } from '../types';

interface AchievementsProps {
  achievements: Achievement[];
  currentCount: number;
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements, currentCount }) => {
  const nextAchievement = achievements.find(a => !a.unlockedAt && a.threshold > currentCount);
  const progress = nextAchievement ? (currentCount / nextAchievement.threshold) * 100 : 100;

  return (
    <div className="w-full h-full flex flex-col min-h-[400px]">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
            <Award size={14} className="text-brand-cyan" />
            <h3 className="text-xs font-display font-black uppercase tracking-widest text-slate-400">
                Drama Milestones
            </h3>
        </div>
        <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest tabular-nums">
            {achievements.filter(a => a.unlockedAt).length}/{achievements.length}
        </div>
      </div>

      {/* Progress to Next */}
      <div className="mb-6 px-5 py-5 glass rounded-[2rem] border border-white/80 shadow-sm">
          <div className="flex justify-between items-center mb-3 min-w-0">
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-black truncate">Next Step</span>
                <span className="text-[11px] font-black text-slate-700 truncate leading-tight">{nextAchievement ? nextAchievement.title : 'Absolute Peak'}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[11px] font-black text-brand-cyan">{currentCount} / {nextAchievement?.threshold || 50}</span>
              </div>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              />
          </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-4 min-w-0">
        <div className="grid grid-cols-2 gap-3 min-w-0">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "relative p-4 rounded-3xl border transition-all duration-500 flex flex-col min-w-0",
                achievement.unlockedAt 
                  ? "bg-white border-slate-100 shadow-md ring-1 ring-brand-cyan/10" 
                  : "bg-slate-50/50 border-slate-100 opacity-60"
              )}
            >
              <div className={cn(
                  "w-9 h-9 rounded-2xl flex items-center justify-center mb-3 transition-colors shrink-0",
                  achievement.unlockedAt ? "bg-brand-cyan/10 text-brand-cyan" : "bg-slate-100 text-slate-300"
              )}>
                  {achievement.unlockedAt ? (
                      <Award size={18} />
                  ) : (
                      <Lock size={16} />
                  )}
              </div>

              <h4 className={cn(
                  "text-[10px] font-black uppercase tracking-widest mb-1 truncate",
                  achievement.unlockedAt ? "text-slate-800" : "text-slate-400"
              )}>
                  {achievement.title}
              </h4>
              <p className="text-[9px] font-bold text-slate-400 leading-snug line-clamp-2">
                  {achievement.description}
              </p>
              
              {achievement.unlockedAt && (
                <div className="absolute top-4 right-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
