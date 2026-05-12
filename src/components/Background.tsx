import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { AppState, Intensity } from '../types';

interface BackgroundProps {
  intensity: Intensity;
  settings: AppState['settings'];
}

export const Background: React.FC<BackgroundProps> = ({ intensity, settings }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getIntensityColors = () => {
    switch (intensity) {
      case Intensity.MAX:
        return 'from-orange-50 via-rose-100/50 to-orange-50';
      case Intensity.HIGH:
        return 'from-violet-50 via-fuchsia-100/50 to-violet-50';
      case Intensity.MEDIUM:
        return 'from-blue-50 via-cyan-100/50 to-blue-50';
      default:
        return 'from-slate-50 via-indigo-50/30 to-slate-50';
    }
  };

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-brand-deep">
      {/* Primary Gradient Atmosphere */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${getIntensityColors()} transition-colors duration-1000`} 
        style={{ 
          transform: settings.animations ? `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)` : 'none'
        }}
      />

      {/* Soft Ambient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-brand-soft-blue/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] bg-brand-purple/15 blur-[140px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-brand-peach/10 blur-[100px] rounded-full" 
        />
      </div>

      {/* Floating Gentle Orbs */}
      {settings.particles && (
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(settings.performanceMode === 'ultra' ? 15 : 8)].map((_, i) => (
            <motion.div
                key={i}
                initial={{
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                  opacity: Math.random() * 0.4 + 0.1,
                  scale: Math.random() * 2 + 1,
                }}
                animate={{
                  y: [null, (Math.random() - 0.5) * 20 + '%'],
                  x: [null, (Math.random() - 0.5) * 20 + '%'],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: Math.random() * 15 + 20,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-2 h-2 bg-white rounded-full blur-[4px] shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            />
            ))}
        </div>
      )}

      {/* Texture & Warmth */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
    </div>
  );
};
