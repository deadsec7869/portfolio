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
          className="fixed inset-0 bg-white/70 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#F4F1E8] border border-[#3F3F3C]/18 rounded-3xl shadow-[0_20px_60px_rgba(63,63,60,0.12)] overflow-hidden z-10 max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#3F3F3C]/15 bg-white/80 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs text-[#3F3F3C] font-bold bg-[#ECE8DD] px-2.5 py-0.5 rounded-full border border-[#3F3F3C]/15">
                {experiment.code}
              </span>
              <Badge variant="status" dot>
                {experiment.status}
              </Badge>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/60 border border-[#3F3F3C]/15 text-[#74736E] hover:text-[#3F3F3C] hover:bg-white transition-colors cursor-pointer"
              aria-label="Close Experiment Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 md:p-8 space-y-6">
            <div>
              <span className="text-[11px] font-mono-tech text-[#74736E] uppercase tracking-widest block mb-1">
                {experiment.category} // {experiment.date}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-[#3F3F3C] uppercase tracking-tight">
                {experiment.title}
              </h3>
            </div>

            <p className="text-[#74736E] font-sans-clean leading-relaxed text-sm sm:text-base">
              {experiment.description}
            </p>

            {/* Hardware / Algorithm Specifications */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#3F3F3C] flex items-center gap-2 font-bold">
                <Terminal className="w-3.5 h-3.5 text-[#19C9E8]" />
                LABORATORY TELEMETRY &amp; SPECIFICATIONS
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(experiment.specs).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-3 rounded-xl bg-white/50 border border-[#3F3F3C]/15 font-mono-tech text-xs"
                  >
                    <span className="text-[#A5A39C] block text-[10px] uppercase">{key}</span>
                    <span className="text-[#3F3F3C] font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippet Sandbox */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#3F3F3C] flex items-center gap-2 font-bold">
                <Code2 className="w-3.5 h-3.5 text-[#19C9E8]" />
                ALGORITHMIC KERNEL
              </h4>
              <pre className="p-4 rounded-2xl bg-[#ECE8DD]/80 border border-[#3F3F3C]/15 font-mono text-xs text-[#3F3F3C] overflow-x-auto leading-relaxed">
                <code>{experiment.codeSnippet}</code>
              </pre>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#3F3F3C]/10">
              {experiment.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded bg-white/40 border border-[#3F3F3C]/12 text-xs font-mono-tech text-[#74736E]"
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
