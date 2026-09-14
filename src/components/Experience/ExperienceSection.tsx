import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLabel } from '../UI/SectionLabel';
import { experiences } from '../../data/experience';
import { spatialAudio } from '../../lib/audio';
import { Calendar, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export function ExperienceSection() {
  const [selectedId, setSelectedId] = useState<string>(experiences[0]?.id || '');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filters = ['ALL', 'SYSTEMS ARCHITECTURE', 'ENGINEERING & TOOLING', 'FOUNDATIONAL SYSTEMS'];

  const filtered = activeFilter === 'ALL'
    ? experiences
    : experiences.filter((exp) => exp.type.toUpperCase() === activeFilter);

  const activeExp = experiences.find((e) => e.id === selectedId) || filtered[0] || experiences[0];

  return (
    <section
      id="experience"
      className="relative w-full py-28 md:py-36 bg-transparent border-t border-[#5E5E5A]/20 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Chapter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <SectionLabel
              number="03"
              label="EXPERIENCE"
              tag="TRACK RECORD × PRACTICAL IMPACT"
              className="mb-3"
            />
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-[#3F3F3C] tracking-tight uppercase leading-[0.9]">
              PRACTICAL IMPACT &amp; <br />
              <span className="text-[#8A8983]">ENGINEERING TIMELINE</span>
            </h2>
          </div>

          {/* System Telemetry Status Indicator */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#ECE8DD]/80 backdrop-blur-md border border-[#5E5E5A]/20 text-xs font-mono-tech self-start md:self-end">
            <span className="flex items-center gap-1.5 text-[#3F3F3C] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#5E5E5A] animate-pulse" />
              RECORD VERIFIED
            </span>
            <span className="text-[#8A8983]">&middot;</span>
            <span className="text-[#5E5E5A]">2022 — PRESENT</span>
          </div>
        </div>

        {/* Editorial Subtitle */}
        <div className="mb-10 max-w-3xl">
          <p className="text-sm sm:text-base text-[#5E5E5A] font-sans-clean font-light leading-relaxed">
            A chronological track record of software architecture, real-time control platforms,
            institutional systems, and foundational engineering initiatives.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => {
                  spatialAudio.playHover();
                  setActiveFilter(filter);
                }}
                className={`px-4 py-2 text-xs font-mono-tech uppercase tracking-wider rounded-lg border transition-all duration-200 ${
                  isActive
                    ? 'bg-[#3F3F3C] text-[#F4F1E8] border-[#3F3F3C] shadow-sm'
                    : 'bg-[#ECE8DD]/50 text-[#5E5E5A] border-[#5E5E5A]/20 hover:border-[#5E5E5A]/40 hover:bg-[#ECE8DD]'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Timeline List (Left) + Detail Dossier (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Timeline List */}
          <div className="lg:col-span-5 space-y-4">
            {filtered.map((item, idx) => {
              const isSelected = activeExp?.id === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => {
                    spatialAudio.playClick();
                    setSelectedId(item.id);
                  }}
                  className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#ECE8DD] border-[#5E5E5A] shadow-md'
                      : 'bg-[#ECE8DD]/40 border-[#5E5E5A]/20 hover:bg-[#ECE8DD]/70 hover:border-[#5E5E5A]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono-tech text-[#8A8983] mb-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#5E5E5A]" />
                      {item.period}
                    </span>
                    <span className="text-[10px] tracking-wider px-2 py-0.5 rounded bg-[#F4F1E8] border border-[#5E5E5A]/20 text-[#5E5E5A] uppercase">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-[#3F3F3C] group-hover:text-[#5E5E5A] transition-colors mb-1">
                    {item.role}
                  </h3>
                  <div className="text-sm font-sans-clean text-[#5E5E5A] mb-3 flex items-center gap-2">
                    <span>{item.organization}</span>
                    <span className="text-[#8A8983]">&middot;</span>
                    <span className="flex items-center gap-1 text-xs text-[#8A8983]">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>

                  <p className="text-xs text-[#5E5E5A] font-sans-clean line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#5E5E5A]/15">
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#F4F1E8] text-[#5E5E5A] border border-[#5E5E5A]/15"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 3 && (
                        <span className="text-[10px] font-mono-tech px-1.5 py-0.5 text-[#8A8983]">
                          +{item.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected ? 'text-[#3F3F3C] translate-x-1' : 'text-[#8A8983] group-hover:translate-x-1'
                    }`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Interactive Detail Dossier */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {activeExp && (
                <motion.div
                  key={activeExp.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="sticky top-28 p-8 md:p-10 rounded-3xl bg-[#ECE8DD] border border-[#5E5E5A]/30 shadow-lg"
                >
                  {/* Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#5E5E5A]/20">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono-tech text-[#5E5E5A] uppercase tracking-wider mb-2">
                        <ShieldCheck className="w-4 h-4 text-[#5E5E5A]" />
                        <span>VERIFIED RECORD // {activeExp.period}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-black text-[#3F3F3C] tracking-tight uppercase">
                        {activeExp.role}
                      </h3>
                      <div className="text-base text-[#5E5E5A] font-medium mt-1">
                        {activeExp.organization}
                      </div>
                    </div>

                    {activeExp.metrics && (
                      <div className="px-4 py-2.5 rounded-xl bg-[#F4F1E8] border border-[#5E5E5A]/20 text-right">
                        <div className="text-[10px] font-mono-tech text-[#8A8983] uppercase">KEY BENCHMARK</div>
                        <div className="text-xs font-mono-tech font-bold text-[#3F3F3C] mt-0.5">
                          {activeExp.metrics}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Summary Block */}
                  <div className="py-6 border-b border-[#5E5E5A]/20">
                    <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#8A8983] mb-2">
                      OPERATIONAL FOCUS &amp; SCOPE
                    </h4>
                    <p className="text-sm sm:text-base text-[#3F3F3C] font-sans-clean leading-relaxed">
                      {activeExp.description}
                    </p>
                  </div>

                  {/* Key Contributions / Highlights */}
                  <div className="py-6 border-b border-[#5E5E5A]/20">
                    <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#8A8983] mb-4">
                      KEY DELIVERABLES &amp; ARCHITECTURAL IMPACT
                    </h4>
                    <div className="space-y-3">
                      {activeExp.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F4F1E8] border border-[#5E5E5A]/25 flex items-center justify-center text-[10px] font-mono-tech text-[#5E5E5A] mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-xs sm:text-sm text-[#5E5E5A] font-sans-clean leading-relaxed">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technology Spectrum */}
                  <div className="pt-6">
                    <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#8A8983] mb-3">
                      SYSTEM TOOLCHAIN &amp; STACK
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeExp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs font-mono-tech rounded-lg bg-[#F4F1E8] text-[#3F3F3C] border border-[#5E5E5A]/25 font-medium shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
