import { Flame, History, Trophy } from 'lucide-react';
import React from 'react';
import { cn, formatDate, formatTime } from '../lib/utils';
import { PRRecord } from '../types';

interface PRBoardProps {
  pr?: PRRecord;
  records: PRRecord[];
}

export const PRBoard: React.FC<PRBoardProps> = ({ pr, records }) => {
  const getRank = (count: number) => {
    if (count >= 50) return { title: 'S-Tier Chaos', color: 'text-brand-red', bg: 'bg-rose-50' };
    if (count >= 40) return { title: 'A-Tier Drama', color: 'text-brand-purple', bg: 'bg-brand-purple/10' };
    if (count >= 20) return { title: 'B-Tier Noise', color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' };
    return { title: 'D-Tier Calm', color: 'text-slate-400', bg: 'bg-slate-50' };
  };

  return (
    <div className="w-full h-full flex flex-col min-h-[440px]">
      <div className="flex items-center gap-2 mb-4 px-2">
        <Trophy size={14} className="text-amber-400" />
        <h3 className="text-xs font-display font-black uppercase tracking-widest text-slate-400">
            Household Records
        </h3>
      </div>

      <div className="flex-1 glass shadow-xl rounded-[2.5rem] border border-white/80 p-6 sm:p-8 flex flex-col">
        {!pr ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                    <History size={24} className="text-slate-200" />
                </div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-300">No peaks recorded yet</p>
            </div>
        ) : (
            <div className="flex-1 flex flex-col">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-amber-500 mb-3">
                            <Flame size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">All-Time Peak</span>
                        </div>
                        <div className="text-6xl sm:text-7xl font-black text-slate-800 tracking-tighter leading-none">
                            {pr.count}
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-4 tabular-nums">
                            LOGGED: {formatDate(pr.date)}
                        </p>
                    </div>
                    <div className={cn("px-5 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest border shrink-0", getRank(pr.count).bg, getRank(pr.count).color)}>
                        {getRank(pr.count).title}
                    </div>
                </div>

                <div className="flex-1 space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Top Milestones</h4>
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    </div>
                    <div className="space-y-3">
                        {records.length > 0 ? records.slice(0, 5).map((record, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-white/50 border border-slate-50 hover:bg-white transition-all group overflow-hidden">
                                <div className="flex items-center gap-4 min-w-0">
                                    <span className="text-[10px] font-black text-slate-300 shrink-0">#{i+1}</span>
                                    <div className="w-9 h-9 rounded-2xl bg-slate-50 flex items-center justify-center text-xs font-black text-slate-600 group-hover:bg-brand-cyan/10 group-hover:text-brand-cyan transition-colors shrink-0">
                                        {record.count}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[10px] font-black text-slate-700 truncate">{record.title}</span>
                                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest tabular-nums">{formatDate(record.date)}</span>
                                    </div>
                                </div>
                                <span className="text-[9px] font-black font-mono text-slate-300 shrink-0 ml-2">{formatTime(record.date)}</span>
                            </div>
                        )) : (
                          <div className="py-8 text-center text-[10px] text-slate-300 font-black uppercase tracking-widest">Awaiting system spikes...</div>
                        )}
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
