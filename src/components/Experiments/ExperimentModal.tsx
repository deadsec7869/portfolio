import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, Terminal } from 'lucide-react';
import type { LabExperiment } from '../../data/experiments';
import { Badge } from '../UI/Badge';

interface ExperimentModalProps {
  experiment: LabExperiment | null;
  onClose: () => void;
}

export function ExperimentModal({ experiment, onClose }: ExperimentModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (experiment) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [experiment, onClose]);

  if (!experiment) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-white/80 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#FAFAF8] border border-black/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden z-10 max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] bg-white/90 sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs text-[#111111] font-bold bg-black/5 px-2 py-0.5 rounded border border-black/10">
                {experiment.code}
              </span>
              <Badge variant="outline" dot>
                {experiment.status}
              </Badge>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-black/5 border border-black/[0.08] text-slate-600 hover:text-black hover:bg-black/10 transition-colors"
              aria-label="Close Experiment Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 md:p-8 space-y-6">
            <div>
              <span className="text-[11px] font-mono-tech text-slate-500 uppercase tracking-widest block mb-1">
                {experiment.category} // {experiment.date}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-[#111111] uppercase tracking-tight">
                {experiment.title}
              </h3>
            </div>

            <p className="text-slate-600 font-sans-clean leading-relaxed text-sm sm:text-base">
              {experiment.description}
            </p>

            {/* Hardware / Algorithm Specifications */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono-tech uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                LABORATORY TELEMETRY & SPECIFICATIONS
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(experiment.specs).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-3 rounded-lg bg-white border border-black/[0.06] font-mono-tech text-xs"
                  >
                    <span className="text-slate-400 block text-[10px] uppercase">{key}</span>
                    <span className="text-[#111111] font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippet Sandbox */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono-tech uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-slate-500" />
                ALGORITHMIC KERNEL
              </h4>
              <pre className="p-4 rounded-xl bg-[#F0F0EC] border border-black/[0.08] font-mono text-xs text-[#111111] overflow-x-auto leading-relaxed">
                <code>{experiment.codeSnippet}</code>
              </pre>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-black/[0.06]">
              {experiment.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded bg-black/5 border border-black/[0.06] text-xs font-mono-tech text-slate-600"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
