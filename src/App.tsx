import { Settings as SettingsIcon } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { ActivityFeed } from './components/ActivityFeed';
import { Achievements } from './components/Achievements';
import { Analytics } from './components/Analytics';
import { Background } from './components/Background';
import { Counter } from './components/Counter';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LoadingScreen } from './components/LoadingScreen';
import { Meters } from './components/Meters';
import { PRBoard } from './components/PRBoard';
import { SettingsModal } from './components/SettingsModal';
import { cn } from './lib/utils';
import { Achievement, AppState, Intensity } from './types';

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'First Tear', description: 'Initiated the first emotional unit.', threshold: 1, icon: 'Award' },
  { id: '2', title: 'Mild Concern', description: 'Reached 5 units of drama.', threshold: 5, icon: 'Award' },
  { id: '3', title: 'Drama Starter', description: 'Double digit emotional volume.', threshold: 10, icon: 'Award' },
  { id: '4', title: 'Chaos Initiated', description: 'Reaching 20 units of disruption.', threshold: 20, icon: 'Award' },
  { id: '5', title: 'Goblin Mode', description: 'Chaos levels are critical at 30.', threshold: 30, icon: 'Award' },
  { id: '6', title: 'Household Emergency', description: 'Major system failure at 35.', threshold: 35, icon: 'Award' },
  { id: '7', title: 'Chaos Engine', description: 'Self-sustaining emotional cycle at 40.', threshold: 40, icon: 'Award' },
  { id: '8', title: 'Professional Cry Athlete', description: 'Elite tier crying performance.', threshold: 45, icon: 'Award' },
  { id: '9', title: 'Final Boss', description: 'The absolute pinnacle of drama.', threshold: 48, icon: 'Award' },
  { id: '10', title: 'Peak Chaos', description: 'Daily damage limit reached.', threshold: 50, icon: 'Award' },
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('cry_counter_state_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse state', e);
      }
    }
    return {
      count: 0,
      activities: [],
      achievements: INITIAL_ACHIEVEMENTS,
      records: [],
      settings: {
        particles: true,
        animations: true,
        glowIntensity: 1,
        motionIntensity: 1,
        performanceMode: 'balanced',
        compactMode: false,
      },
    };
  });

  useEffect(() => {
    localStorage.setItem('cry_counter_state_v3', JSON.stringify(state));
  }, [state]);

  const intensity: Intensity = state.count >= 50
    ? Intensity.MAX
    : state.count >= 30
    ? Intensity.HIGH
    : state.count >= 15
    ? Intensity.MEDIUM
    : Intensity.LOW;

  const handleIncrement = () => {
    if (state.count >= 50) return;
    
    const newCount = state.count + 1;
    const now = Date.now();
    
    const newActivity = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'ADD' as const,
      timestamp: now,
      message: `Emotional volume reached ${newCount}U`,
    };

    const updatedAchievements = state.achievements.map(ach => {
      if (!ach.unlockedAt && newCount >= ach.threshold) {
        return { ...ach, unlockedAt: now };
      }
      return ach;
    });

    const newlyUnlocked = updatedAchievements.filter(
        (a, i) => a.unlockedAt && !state.achievements[i].unlockedAt
    );

    const achievementActivities = newlyUnlocked.map(a => ({
        id: Math.random().toString(36).substr(2, 9),
        type: 'ACHIEVEMENT' as const,
        timestamp: now,
        message: `Awarded: ${a.title}`,
    }));

    const newPr = (!state.pr || newCount > state.pr.count) 
        ? { count: newCount, date: now, title: 'Household Peak' }
        : state.pr;

    const newRecords = [...state.records];
    if (newCount > 0) {
        const existingIdx = newRecords.findIndex(r => r.count === newCount);
        if (existingIdx === -1) {
            newRecords.push({ count: newCount, date: now, title: 'Drama Peak' });
            newRecords.sort((a,b) => b.count - a.count);
        }
    }

    setState(prev => ({
      ...prev,
      count: newCount,
      activities: [newActivity, ...achievementActivities, ...prev.activities].slice(0, 50),
      achievements: updatedAchievements,
      pr: newPr,
      records: newRecords.slice(0, 10),
    }));
  };

  const handleDecrement = () => {
    if (state.count <= 0) return;
    
    const newCount = state.count - 1;
    const newActivity = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'REMOVE' as const,
      timestamp: Date.now(),
      message: `System Recovery: ${newCount}U`,
    };

    setState(prev => ({
      ...prev,
      count: newCount,
      activities: [newActivity, ...prev.activities].slice(0, 50),
    }));
  };

  const handleReset = () => {
    if (confirm('Reset today\'s metrics? Historical PRs will be kept.')) {
      setState(prev => ({
        ...prev,
        count: 0,
        activities: [],
      }));
      setIsSettingsOpen(false);
    }
  };

  const handleFullReset = () => {
      if (confirm('PURGE ALL DATA? This resets everything including PRs.')) {
        setState({
            count: 0,
            activities: [],
            achievements: INITIAL_ACHIEVEMENTS,
            records: [],
            settings: state.settings,
        });
        setIsSettingsOpen(false);
      }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Timestamp,Type,Message\n"
      + state.activities.map(a => `${new Date(a.timestamp).toISOString()},${a.type},${a.message}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cry_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const analyticsData = Array.from({ length: 12 }).map((_, i) => {
    const hour = (i * 2 + 8) % 24;
    return {
      hour: `${hour.toString().padStart(2, '0')}:00`,
      count: hour === new Date().getHours() ? state.count : (state.count > 0 ? Math.floor(Math.random() * state.count * 0.6) : 0),
    };
  });

  return (
    <div className="relative min-h-screen bg-[#f8f9fa] text-slate-800 font-sans selection:bg-brand-cyan selection:text-white flex flex-col overflow-x-hidden">
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <div key="dashboard" className="flex-1 flex flex-col">
            <Background intensity={intensity} settings={state.settings} />
            <Header onOpenSettings={() => setIsSettingsOpen(true)} />
            
            <main className={cn(
              "relative z-10 flex-1 flex flex-col items-center justify-center transition-all duration-700 w-full",
              state.settings.compactMode ? "pt-20 pb-4 px-4" : "pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-8 md:px-12"
            )}>
              <div className="w-full max-w-5xl space-y-10 sm:space-y-16">
                <HeroSection intensity={intensity} settings={state.settings} />
                
                <Counter 
                  count={state.count} 
                  onIncrement={handleIncrement} 
                  onDecrement={handleDecrement}
                  intensity={intensity}
                  settings={state.settings}
                />
              </div>
            </main>

            {/* Responsive Dashboard Grid */}
            <div className={cn(
               "relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-8 md:px-12 pb-12 transition-all duration-500 max-w-7xl mx-auto w-full",
               state.settings.compactMode ? "pb-8" : "pb-20"
            )}>
              <div className="h-full min-h-[400px] flex flex-col">
                <ActivityFeed activities={state.activities} />
              </div>
              <div className="h-full min-h-[400px] flex flex-col">
                <PRBoard pr={state.pr} records={state.records} />
              </div>
              <div className="h-full min-h-[400px] flex flex-col">
                <Achievements achievements={state.achievements} currentCount={state.count} />
              </div>
              <div className="h-full min-h-[400px] flex flex-col">
                <Meters currentCount={state.count} intensity={intensity} />
              </div>
            </div>

            {/* Analytics Section */}
            <div className="relative z-10 px-4 sm:px-8 md:px-12 pb-16 max-w-7xl mx-auto w-full">
                <Analytics data={analyticsData} />
            </div>

            {/* Family Friendly Footer */}
            <footer className="relative z-10 px-4 sm:px-8 md:px-12 py-8 sm:py-10 bg-white border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-6">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-center text-center sm:text-left">
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Average Volume</span>
                  <span className="text-xs font-black text-slate-500">0.82 DRAMA UNITS / HR</span>
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Active Peak</span>
                  <span className="text-xs font-black text-slate-500">14:00 - 16:00 DAILY</span>
                </div>
              </div>
              
              <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
                 <button 
                  onClick={() => setIsSettingsOpen(true)}
                  className="px-6 py-3 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100 flex-1 sm:flex-none justify-center flex items-center"
                 >
                  Control Center
                 </button>
                 <button 
                  onClick={handleExport}
                  className="px-6 py-3 bg-brand-cyan text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-brand-cyan/20 active:scale-95 transition-all flex-1 sm:flex-none justify-center flex items-center"
                 >
                  Export Data
                 </button>
              </div>
            </footer>

            <SettingsModal 
                isOpen={isSettingsOpen} 
                onClose={() => setIsSettingsOpen(false)}
                settings={state.settings}
                onUpdate={(settings) => setState(prev => ({ ...prev, settings }))}
                onReset={handleReset}
                onExport={handleExport}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
