import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { socialData } from '../../data/social';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('LOADING EXPERIENCE...');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const statusSequence = [
      { threshold: 25, text: 'MOUNTING SPATIAL RUNTIME...' },
      { threshold: 60, text: 'SYNCHRONIZING GRAPH NODES...' },
      { threshold: 90, text: 'INITIALIZING INTERFACE...' },
      { threshold: 100, text: 'EXPERIENCE READY' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 500);
          }, 150);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 10) + 6;
        const boundedNext = Math.min(next, 100);

        const currentStatus = statusSequence.find((s) => boundedNext <= s.threshold);
        if (currentStatus) {
          setStatusText(currentStatus.text);
        }

        return boundedNext;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-[#FAFAF8] flex flex-col items-center justify-center p-6 select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="w-full max-w-sm relative z-10 flex flex-col items-center">
            {/* Top Telemetry Tag */}
            <div className="flex items-center justify-between w-full text-[10px] font-mono-tech text-slate-500 mb-6 uppercase tracking-widest">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008899] animate-ping" />
                GALLERY INITIALIZING
              </span>
              <span>v2.5</span>
            </div>

            {/* Central Typography Logo */}
            <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight text-[#111111] mb-2">
              {socialData.name}
            </h1>
            <p className="text-[11px] font-mono-tech text-[#008899] tracking-[0.25em] uppercase mb-8">
              {socialData.role}
            </p>

            {/* Slim Minimal Progress Bar */}
            <div className="w-full h-1 bg-[#E8E8E4] rounded-full overflow-hidden mb-3 border border-black/5 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#008899] to-[#111111]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            {/* Status & Numeric Readout */}
            <div className="flex items-center justify-between w-full text-[11px] font-mono-tech text-slate-600">
              <span className="text-slate-500">{statusText}</span>
              <span className="text-[#111111] font-bold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
