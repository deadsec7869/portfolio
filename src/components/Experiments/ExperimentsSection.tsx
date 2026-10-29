import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExperimentModal } from './ExperimentModal';
import { experiments } from '../../data/experiments';
import type { LabExperiment } from '../../data/experiments';
import { ArrowUpRight, Activity, Terminal } from 'lucide-react';
import { Badge } from '../UI/Badge';
import { spatialAudio } from '../../lib/audio';
import { SectionLabel } from '../UI/SectionLabel';

export function ExperimentsSection() {
  const [activeExperiment, setActiveExperiment] = useState<LabExperiment | null>(null);

  const handleOpenExperiment = (exp: LabExperiment) => {
    spatialAudio.playClick();
    setActiveExperiment(exp);
  };

  return (
    <section id="lab" className="relative w-full py-28 md:py-36 bg-transparent border-t border-[#70707d]/20 text-[#ededf3]">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Chapter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <SectionLabel
              number="04"
              label="LAB"
              tag="RESEARCH SANDBOX × COMPUTATIONAL PROTOTYPES"
              className="mb-3"
            />
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-[480] text-[#ededf3] tracking-[0.01em] uppercase leading-[0.95]">
              LAB ARCHIVES
            </h2>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#272735] border border-[#70707d]/20 text-xs font-mono-tech text-[#ededf3] self-start md:self-end">
            <Terminal className="w-4 h-4 text-[#5266eb]" />
            <span>RESEARCH SANDBOX</span>
          </div>
        </div>

        {/* Experiment Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {experiments.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => handleOpenExperiment(exp)}
              onMouseEnter={() => spatialAudio.playHover()}
              className="group relative p-8 rounded-[12px] bg-[#1e1e2a] hover:bg-[#232332] border-0 transition-all duration-300 cursor-pointer shadow-none flex flex-col justify-between overflow-hidden"
              data-cursor="INSPECT"
            >
              <div>
                {/* Top Telemetry */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-tech text-xs text-[#ededf3] font-[480] bg-[#272735] px-3 py-1 rounded-full border-0">
                      {exp.code}
                    </span>
                    <Badge variant="status" dot>
                      {exp.status}
                    </Badge>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-[#272735] border border-[#70707d]/20 flex items-center justify-center text-[#ededf3] group-hover:bg-[#5266eb] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Title and Category */}
                <span className="text-[11px] font-mono-tech text-[#c3c3cc] uppercase tracking-widest block mb-1">
                  {exp.category} &middot; {exp.date}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-[480] text-[#ededf3] uppercase group-hover:text-white transition-colors">
                  {exp.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#c3c3cc] font-sans-clean leading-relaxed">
                  {exp.description}
                </p>

                {/* Mini Simulation Box */}
                <div className="mt-6 p-4 rounded-[12px] bg-[#171721] border border-[#70707d]/20 relative overflow-hidden h-28 flex items-center justify-center">
                  {exp.interactiveType === 'pathfinder' && (
                    <div className="grid grid-cols-12 gap-1 w-full opacity-80 group-hover:opacity-100 transition-opacity">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-4 rounded-xs transition-colors ${
                            i % 5 === 0
                              ? 'bg-[#5266eb] shadow-none'
                              : i % 3 === 0
                              ? 'bg-[#272735] border border-[#70707d]/20'
                              : 'bg-[#1e1e2a]'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {exp.interactiveType === 'audio-synth' && (
                    <div className="flex items-end gap-1.5 h-16 w-full justify-center">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-2 bg-[#5266eb] rounded-t-sm animate-pulse"
                          style={{
                            height: `${30 + Math.sin(i * 0.8) * 45}%`,
                            animationDuration: `${0.8 + (i % 4) * 0.3}s`
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {exp.interactiveType === 'neural-matrix' && (
                    <div className="flex items-center justify-between w-full max-w-xs px-4">
                      <div className="flex flex-col gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#5266eb] animate-ping" />
                        <div className="w-3 h-3 rounded-full bg-[#5266eb]" />
                      </div>
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-[#5266eb] to-[#70707d] mx-3 opacity-40" />
                      <div className="flex flex-col gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#70707d]" />
                        <div className="w-3 h-3 rounded-full bg-[#70707d] animate-pulse" />
                      </div>
                    </div>
                  )}

                  {exp.interactiveType === 'particle-vortex' && (
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-[#70707d]/30 border-dashed animate-[spin_6s_linear_infinite]" />
                      <div className="w-3 h-3 rounded-full bg-[#5266eb]" />
                    </div>
                  )}

                  <div className="absolute bottom-1.5 right-2 text-[9px] font-mono-tech text-[#c3c3cc] flex items-center gap-1">
                    <Activity className="w-3 h-3 text-[#5266eb]" />
                    <span>KERNEL ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Bottom Tags */}
              <div className="mt-6 pt-4 border-t border-[#70707d]/20 flex flex-wrap gap-1.5">
                {exp.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-[40px] bg-[#272735] text-[10px] font-mono-tech text-[#c3c3cc] uppercase border border-[#70707d]/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ExperimentModal
        experiment={activeExperiment}
        onClose={() => {
          spatialAudio.playClick();
          setActiveExperiment(null);
        }}
      />
    </section>
  );
}
