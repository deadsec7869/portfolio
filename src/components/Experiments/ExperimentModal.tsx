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
          className="relative w-full max-w-3xl bg-[#1e1e2a] border border-[#70707d]/25 rounded-[12px] shadow-none overflow-hidden z-10 max-h-[85vh] flex flex-col text-[#ededf3]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#70707d]/20 bg-[#1e1e2a] sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs text-[#ededf3] font-[480] bg-[#272735] px-3 py-1 rounded-full border border-[#70707d]/20">
                {experiment.code}
              </span>
              <Badge variant="status" dot>
                {experiment.status}
              </Badge>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#272735] border border-[#70707d]/25 text-[#ededf3] hover:text-white hover:bg-[#323244] transition-colors cursor-pointer"
              aria-label="Close Experiment Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 md:p-8 space-y-6">
            <div>
              <span className="text-[11px] font-mono-tech text-[#c3c3cc] uppercase tracking-widest block mb-1">
                {experiment.category} // {experiment.date}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-[480] text-[#ededf3] uppercase tracking-[0.01em]">
                {experiment.title}
              </h3>
            </div>

            <p className="text-[#c3c3cc] font-sans-clean leading-relaxed text-sm sm:text-base font-[400]">
              {experiment.description}
            </p>

            {/* Hardware / Algorithm Specifications */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#ededf3] flex items-center gap-2 font-[480]">
                <Terminal className="w-3.5 h-3.5 text-[#5266eb]" />
                LABORATORY TELEMETRY &amp; SPECIFICATIONS
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(experiment.specs).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-3 rounded-[12px] bg-[#272735] border border-[#70707d]/20 font-mono-tech text-xs"
                  >
                    <span className="text-[#c3c3cc] block text-[10px] uppercase font-[480]">{key}</span>
                    <span className="text-[#ededf3] font-[480]">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippet Sandbox */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#ededf3] flex items-center gap-2 font-[480]">
                <Code2 className="w-3.5 h-3.5 text-[#5266eb]" />
                ALGORITHMIC KERNEL
              </h4>
              <pre className="p-4 rounded-[12px] bg-[#171721] border border-[#70707d]/20 font-mono text-xs text-[#ededf3] overflow-x-auto leading-relaxed">
                <code>{experiment.codeSnippet}</code>
              </pre>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#70707d]/20">
              {experiment.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-[40px] bg-[#272735] border border-[#70707d]/20 text-xs font-mono-tech text-[#c3c3cc]"
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
