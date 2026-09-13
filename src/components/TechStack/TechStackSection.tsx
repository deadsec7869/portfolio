import { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { technologies } from '../../data/technologies';
import type { Technology } from '../../data/technologies';
import { Cpu, Sparkles } from 'lucide-react';
import { Badge } from '../UI/Badge';
import { spatialAudio } from '../../lib/audio';

const TechnologyOrbit = lazy(() =>
  import('../../three/TechnologyOrbit').then((m) => ({ default: m.TechnologyOrbit }))
);

export function TechStackSection() {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(technologies[0]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Core', 'Languages', 'Graphics & 3D', 'AI & Systems', 'Tools & Infrastructure'];

  const filteredTech = activeCategory === 'ALL'
    ? technologies
    : technologies.filter((t) => t.category === activeCategory);

  const handleSelectTech = (tech: Technology) => {
    spatialAudio.playHover();
    setSelectedTech(tech);
  };

  return (
    <section id="stack" className="relative w-full py-28 md:py-36 bg-transparent border-t border-black/[0.06] overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Chapter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono-tech uppercase tracking-[0.25em] text-[#008899] mb-3">
              <span>04 / TECHNOLOGY</span>
              <span className="w-8 h-[1px] bg-[#008899]/40" />
              <span className="text-slate-500">RUNTIME &amp; CONSTELLATION</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-[#111111] tracking-tight uppercase leading-[0.9]">
              TECH STACK
            </h2>
          </div>

          {/* Minimal Category Filter */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-full bg-white/70 backdrop-blur-md border border-black/[0.08] shadow-xs self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  spatialAudio.playHover();
                  setActiveCategory(cat);
                }}
                className={`px-3.5 py-1 rounded-full text-xs font-mono-tech tracking-wider uppercase transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#111111] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-[#111111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Large Editorial Headline */}
        <div className="mb-12">
          <p className="text-xs font-mono-tech text-[#008899] uppercase tracking-[0.25em] mb-2">
            EDITORIAL TOOLING ARCHITECTURE //
          </p>
          <div className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-700 tracking-tight leading-[1.1] uppercase max-w-4xl">
            I WORK WITH <span className="text-[#111111]">REACT 19</span>, <span className="text-[#111111]">TYPESCRIPT</span>, <span className="text-[#111111]">NEXT.JS 16</span>, <span className="text-[#111111]">THREE.JS</span>, <span className="text-[#111111]">GOOGLE GENAI</span>, AND <span className="text-[#111111]">VITE</span>.
          </div>
        </div>

        {/* 3D Orbit Visualization + Synchronized Real-time Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Orbit Canvas Stage */}
          <div className="lg:col-span-8 h-[440px] sm:h-[500px] rounded-3xl bg-white/50 backdrop-blur-md border border-black/[0.08] shadow-sm relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-4 left-6 z-10 flex items-center gap-2 text-[11px] font-mono-tech text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-[#008899]" />
              <span>ORBITAL CONSTELLATION ENGINE</span>
            </div>

            <Suspense
              fallback={
                <div className="flex items-center justify-center text-xs font-mono-tech text-[#008899] animate-pulse">
                  COMPUTING ORBITAL NODES...
                </div>
              }
            >
              <TechnologyOrbit
                activeTech={selectedTech}
                onSelectTech={(tech) => {
                  if (tech) handleSelectTech(tech);
                }}
              />
            </Suspense>

            <div className="absolute bottom-4 left-6 right-6 z-10 flex flex-wrap items-center justify-between text-[10px] font-mono-tech text-slate-500 pointer-events-none">
              <span>RING 1: CORE RUNTIME</span>
              <span>RING 2: SYSTEMS &amp; AI</span>
              <span>RING 3: TOOLCHAINS</span>
            </div>
          </div>

          {/* Right Column: Real-time Node Inspector */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {selectedTech ? (
                <motion.div
                  key={selectedTech.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 md:p-8 rounded-2xl bg-white/80 border border-black/[0.08] backdrop-blur-xl shadow-sm flex flex-col gap-4 corner-mark"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="cyan" dot>
                      {selectedTech.category}
                    </Badge>
                    <span className="text-xs font-mono-tech text-slate-400">
                      ORBIT #{selectedTech.orbitRing}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs"
                      style={{
                        backgroundColor: `${selectedTech.color}15`,
                        borderColor: `${selectedTech.color}40`
                      }}
                    >
                      <Cpu className="w-6 h-6" style={{ color: selectedTech.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-black text-[#111111]">
                        {selectedTech.name}
                      </h3>
                      <span className="text-xs font-mono-tech text-[#008899]">
                        {selectedTech.level}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm font-sans-clean text-slate-600 leading-relaxed mt-2">
                    {selectedTech.description}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Quick Access Technology List */}
            <div className="p-4 rounded-xl bg-white/60 border border-black/[0.08] shadow-xs">
              <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-wider block mb-2.5">
                ACTIVE TECHNOLOGIES ({filteredTech.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {filteredTech.map((tech) => {
                  const isSelected = selectedTech?.id === tech.id;
                  return (
                    <button
                      key={tech.id}
                      onClick={() => handleSelectTech(tech)}
                      onMouseEnter={() => handleSelectTech(tech)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono-tech transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#111111] text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:text-[#111111] border border-black/[0.08]'
                      }`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: tech.color }}
                      />
                      <span>{tech.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
