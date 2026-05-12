import { Download, RefreshCw, Settings, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { cn } from '../lib/utils';
import { AppState } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppState['settings'];
  onUpdate: (settings: AppState['settings']) => void;
  onReset: () => void;
  onExport: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  settings, 
  onUpdate,
  onReset,
  onExport
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg glass-dark border border-white/80 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-auto max-h-[85vh] sm:max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-5 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-white/50 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                  <Settings size={20} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-display font-black text-slate-800 truncate">Control Center</h2>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest font-bold truncate">Preferences & System Data</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400 shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-8 space-y-6 sm:space-y-8 overflow-y-auto no-scrollbar pb-10">
              {/* Visuals */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan">Visual Experience</h3>
                
                <div className="grid gap-3">
                  {[
                    { id: 'particles', label: 'Magic Sparkles', desc: 'Floating ambient orbs', check: settings.particles },
                    { id: 'animations', label: 'Smooth Motion', desc: 'Premium transitions', check: settings.animations },
                    { id: 'compactMode', label: 'Compact Layout', desc: 'Reduce UI padding', check: settings.compactMode }
                  ].map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 gap-4">
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-700 truncate">{item.label}</div>
                        <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
                      </div>
                      <button 
                        onClick={() => onUpdate({ ...settings, [item.id]: !item.check } as any)}
                        className={cn(
                          "w-12 h-6 rounded-full transition-colors relative flex items-center px-1 shrink-0",
                          item.check ? "bg-brand-cyan" : "bg-slate-200"
                        )}
                      >
                        <motion.div 
                          animate={{ x: item.check ? 24 : 0 }}
                          className="w-4 h-4 bg-white rounded-full shadow-sm" 
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan">Optimization</h3>
                <div className="flex gap-2 p-1.5 bg-slate-100 rounded-[1.25rem]">
                  {['eco', 'balanced', 'ultra'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => onUpdate({ ...settings, performanceMode: mode } as any)}
                      className={cn(
                        "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                        settings.performanceMode === mode ? "bg-white text-brand-cyan shadow-sm" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan">Data Management</h3>
                
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={onExport}
                        className="flex flex-col items-center gap-2 py-4 glass rounded-2xl border border-slate-100 hover:border-brand-cyan/20 transition-all text-slate-600"
                    >
                        <Download size={20} className="text-brand-cyan" />
                        <span className="text-[9px] font-black uppercase tracking-tight">Export Data</span>
                    </button>
                    <button 
                        onClick={() => window.location.reload()}
                        className="flex flex-col items-center gap-2 py-4 glass rounded-2xl border border-slate-100 hover:border-brand-cyan/20 transition-all text-slate-600"
                    >
                        <RefreshCw size={20} className="text-brand-cyan" />
                        <span className="text-[9px] font-black uppercase tracking-tight">Refresh Logic</span>
                    </button>
                </div>

                <button 
                  onClick={onReset}
                  className="w-full py-4 bg-brand-red text-white rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-[11px] shadow-lg shadow-brand-red/20 active:scale-[0.98] transition-all"
                >
                  Reset Daily Metrics
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">
                    Family Safety Protocol Active
                </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
