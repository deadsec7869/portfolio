import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatCounterProps {
  label: string;
  value: string;
  numericTarget?: number;
  suffix?: string;
  subtext?: string;
}

export function StatCounter({
  label,
  value,
  numericTarget,
  suffix = '+',
  subtext
}: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState<string | number>(
    numericTarget !== undefined ? 0 : value
  );
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView || numericTarget === undefined) return;

    let current = 0;
    const step = Math.max(1, Math.floor(numericTarget / 30));
    const timer = setInterval(() => {
      current += step;
      if (current >= numericTarget) {
        setDisplayValue(numericTarget);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [inView, numericTarget]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-black/[0.08] hover:border-black/20 transition-all duration-300 group shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
    >
      <div className="text-[11px] font-mono-tech text-slate-500 uppercase tracking-widest mb-3 flex items-center justify-between">
        <span>{label}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:scale-150 transition-transform" />
      </div>

      <div className="text-4xl sm:text-5xl font-display font-black text-[#111111] group-hover:text-black transition-colors flex items-baseline gap-1">
        <span>{numericTarget !== undefined ? displayValue : value}</span>
        {numericTarget !== undefined && <span className="text-slate-500 text-3xl font-light">{suffix}</span>}
      </div>

      {subtext && (
        <p className="mt-2 text-xs font-mono-tech text-slate-500">
          {subtext}
        </p>
      )}
    </motion.div>
  );
}
