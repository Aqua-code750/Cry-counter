import { BarChart2, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface AnalyticsProps {
  data: { hour: string; count: number }[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ data }) => {
  const hasData = data.some(d => d.count > 0);

  return (
    <div className="w-full h-full flex flex-col min-h-[400px]">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
            <BarChart2 size={14} className="text-brand-purple" />
            <h3 className="text-xs font-display font-black uppercase tracking-widest text-slate-400">
                Trends & Data
            </h3>
        </div>
        <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest tabular-nums">
            24H ANALYTICS
        </div>
      </div>

      <div className="glass shadow-xl rounded-[2.5rem] border border-white/80 p-6 flex flex-col mb-4 min-h-[280px] sm:min-h-[320px]">
        {!hasData ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
             <div className="w-12 h-12 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                <TrendingUp size={18} className="text-slate-200" />
            </div>
            <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest leading-relaxed">
                Collecting analytical<br/>patterns...
            </p>
          </div>
        ) : (
          <div className="flex-1 w-full relative flex flex-col">
             {/* Stats Overlay - Positioned better for mobile */}
             <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">
                      Intensity Peak
                  </div>
                  <div className="text-3xl font-black text-slate-800 leading-none">
                      {Math.max(...data.map(d => d.count))}U
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-emerald-500 uppercase tracking-widest font-black mb-1">
                      Status
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase">Synchronized</div>
                </div>
             </div>

             <div className="flex-1 min-h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis 
                            dataKey="hour" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 8, fontWeight: 700 }}
                            interval={1}
                        />
                        <YAxis axisLine={false} tickLine={false} tick={false} />
                        <Area 
                            type="monotone" 
                            dataKey="count" 
                            stroke="#8b5cf6" 
                            fillOpacity={1} 
                            fill="url(#colorCount)" 
                            strokeWidth={3}
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        )}
      </div>

      {/* Grid Stats - Improved for Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
        <div className="bg-white/80 p-5 rounded-[2rem] border border-slate-50 shadow-sm flex flex-col justify-between">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">Avg Volatility</div>
            <div className="text-sm font-black text-slate-700">0.82 Drama/Hr</div>
        </div>
        <div className="bg-white/80 p-5 rounded-[2rem] border border-slate-50 shadow-sm flex flex-col justify-between">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">Peak Time</div>
            <div className="text-sm font-black text-slate-700">14:00 - 16:00</div>
        </div>
      </div>
    </div>
  );
};
