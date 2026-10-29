import { motion } from 'framer-motion';

interface SectionLabelProps {
  number: string; // e.g. "01", "02"
  label: string;  // e.g. "ABOUT", "SELECTED WORK"
  tag?: string;    // e.g. "IDENTITY × COMPUTATIONAL FOUNDATION"
  className?: string;
  align?: 'left' | 'center';
}

export function SectionLabel({
  number,
  label,
  tag,
  className = '',
  align = 'left',
}: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-3 text-[11px] font-mono-tech uppercase tracking-[0.22em] ${
        align === 'center' ? 'justify-center' : 'justify-start'
      } ${className}`}
    >
      {/* Number and Section Title */}
      <span className="text-[#ededf3] font-[480]">
        {number} / {label}
      </span>

      {/* Thin Technical Separator Line */}
      <span className="w-6 h-[1px] bg-[#70707d]/40" />

      {/* Metadata Description */}
      {tag && (
        <span className="text-[#c3c3cc] font-normal tracking-widest hidden sm:inline">
          {tag}
        </span>
      )}
    </motion.div>
  );
}
