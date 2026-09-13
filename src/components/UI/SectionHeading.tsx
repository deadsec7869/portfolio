import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number: string; // e.g. "01", "02"
  title: string;
  subtitle?: string;
  tag?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  number,
  title,
  subtitle,
  tag,
  align = 'left'
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {/* Top Index & Tag */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className={`flex items-center gap-3 text-xs font-mono-tech uppercase tracking-[0.2em] text-cyan-400 mb-3 ${
          align === 'center' ? 'justify-center' : 'justify-start'
        }`}
      >
        <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold">
          {number}
        </span>
        {tag && (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-slate-400">{tag}</span>
          </>
        )}
      </motion.div>

      {/* Main Editorial Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase"
      >
        {title}
      </motion.h2>

      {/* Subtitle / Descriptive Text */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-slate-400 max-w-2xl font-sans-clean leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
