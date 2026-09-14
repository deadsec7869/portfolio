import { motion } from 'framer-motion';
import { SectionLabel } from './SectionLabel';

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
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {/* Reusable Metadata Section Label */}
      <SectionLabel
        number={number}
        label={title}
        tag={tag}
        align={align}
        className="mb-4"
      />

      {/* Large Editorial Display Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-[#111111] uppercase leading-[0.92]"
      >
        {title}
      </motion.h2>

      {/* Medium Readable Body Description */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-[#555550] max-w-2xl font-sans-clean leading-relaxed font-light"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
