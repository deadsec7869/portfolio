import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { useMousePosition } from '../../hooks/useMousePosition';
import { SceneFallback } from '../../three/scenes/SceneFallback';
import { spatialAudio } from '../../lib/audio';

const HeroScene = lazy(() =>
  import('../../three/scenes/HeroScene').then((m) => ({ default: m.HeroScene }))
);

const stepIndices = ['01', '02', '03', '04', '05'];

export function HeroSection() {
  const mousePosition = useMousePosition();

  const scrollToSection = (id: string) => {
    spatialAudio.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] pt-24 sm:pt-28 pb-6 flex flex-col justify-between overflow-hidden select-none bg-[#F4F1E8]"
    >
      {/* 1. Master Background Architectural Construction Graphics */}
      <div className="absolute inset-0 pointer-events-none z-[1] flex items-center justify-center overflow-hidden">
        <svg
          className="w-[880px] h-[880px] max-w-none text-[#74736E] opacity-[0.10]"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Concentric Dotted Construction Rings */}
          <circle
            cx="400"
            cy="400"
            r="370"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="4 8"
          />
          <circle
            cx="400"
            cy="400"
            r="260"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="3 6"
          />
          <circle
            cx="400"
            cy="400"
            r="160"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 6"
          />

          {/* Vertical Architectural Axis Line */}
          <line
            x1="400"
            y1="30"
            x2="400"
            y2="770"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          {/* Horizontal Axis Line */}
          <line
            x1="30"
            y1="400"
            x2="770"
            y2="400"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="2 6"
          />
        </svg>

        {/* Minimal Registration Crosshairs */}
        <div className="absolute top-28 left-12 font-mono-tech text-xs text-[#74736E]/30">+</div>
        <div className="absolute top-28 right-12 font-mono-tech text-xs text-[#74736E]/30">+</div>
        <div className="absolute bottom-24 left-12 font-mono-tech text-xs text-[#74736E]/30">+</div>
        <div className="absolute bottom-24 right-12 font-mono-tech text-xs text-[#74736E]/30">+</div>
      </div>

      {/* 2. 3D WebGL Atmosphere & Sculpture Layer */}
      <div className="hero-visual">
        <Suspense fallback={<SceneFallback />}>
          <HeroScene mousePosition={mousePosition} />
        </Suspense>
      </div>

      {/* 3. Top Left Category Tag */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-14 max-w-[1640px] mx-auto w-full pt-2">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-1.5"
        >
          <div className="text-[11px] font-mono-tech text-[#74736E] tracking-[0.2em] uppercase flex items-center gap-2">
            <span>// COMPUTATIONAL SYSTEMS</span>
          </div>
          <span className="w-10 h-[1px] bg-[#74736E]/40 inline-block" />
        </motion.div>
      </div>

      {/* 4. Main Hero 3-Zone Composition */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-14 max-w-[1640px] mx-auto w-full flex-1 flex flex-col justify-center my-auto py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* LEFT ZONE: Giant Cinematic Name + Positioning + Specialty + Bio */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Giant Cinematic Two-Tone Name */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col leading-[0.84] tracking-[-0.04em] uppercase select-none mb-6"
            >
              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[8rem] text-[#3F3F3C]">
                MUHAMMED
              </h1>
              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[8rem] text-[#19C9E8]">
                TAMIM BAIG
              </h1>
            </motion.div>

            {/* Positioning Statement with Ember Orange Tick */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono-tech text-[#3F3F3C] uppercase tracking-[0.14em] font-bold">
                <span className="w-4 h-[2px] bg-[#F27A22] inline-block shrink-0" />
                <span>ENGINEERING STUDENT. DEVELOPER. BUILDER.</span>
              </div>

              {/* Specialty Subline */}
              <div className="text-xs sm:text-[13px] font-mono-tech text-[#74736E] tracking-[0.16em] uppercase pl-6">
                <span>SPATIAL COMPUTING &middot; AI SYSTEMS &middot; SOFTWARE</span>
              </div>
            </motion.div>

            {/* Lower Left Real Bio Note with Accurate Institution */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-8 sm:mt-12 max-w-md border-l-2 border-[#D1CEC5] pl-3.5 py-1 text-xs sm:text-[13px] text-[#74736E] font-mono-tech leading-relaxed"
            >
              Student at Visvesvaraya Institute Of Advanced Technology exploring the intersection of machine intelligence, robust backend infrastructure, and computational craft.
            </motion.div>
          </div>

          {/* CENTER ZONE: Clearance for 3D Visual Centerpiece */}
          <div className="hidden lg:block lg:col-span-2 pointer-events-none h-32" />

          {/* RIGHT ZONE: Narrative Block, CTA + Target */}
          <div className="lg:col-span-4 flex flex-col justify-center lg:pl-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col max-w-[360px] space-y-5"
            >
              {/* Narrative Subhead */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xs sm:text-[13px] font-mono-tech text-[#3F3F3C] font-bold tracking-[0.18em] uppercase">
                  IDEAS &middot; SYSTEMS &middot; IMPACT
                </h3>
                <div className="w-10 h-[1px] bg-[#74736E]/40" />
              </div>

              {/* Concise Description */}
              <p className="text-xs sm:text-[13px] text-[#74736E] leading-relaxed font-sans font-normal">
                Building at the intersection of spatial computing, autonomous AI agents, and high-performance software architecture.
              </p>

              {/* Action Button & Target Icon */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => scrollToSection('work')}
                  onMouseEnter={() => spatialAudio.playHover()}
                  className="px-7 py-3 rounded-full bg-white/20 border border-[#74736E]/50 text-[#3F3F3C] hover:bg-[#3F3F3C] hover:text-[#F4F1E8] font-mono-tech text-xs tracking-wider uppercase font-bold transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-none active:scale-95"
                  data-cursor="VIEW"
                >
                  <span>EXPLORE WORK</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Design / Develop / Deploy annotation */}
              <div className="pt-6 flex items-center justify-between text-[10px] font-mono-tech text-[#A5A39C] uppercase tracking-wider">
                <div className="flex flex-col leading-tight">
                  <span>DESIGN</span>
                  <span>DEVELOP</span>
                  <span>DEPLOY</span>
                </div>
                <div className="w-12 h-[1px] bg-[#D1CEC5]" />
                <div className="text-right max-w-[130px] leading-tight text-[#74736E]">
                  FOR A MORE INTELLIGENT TOMORROW.
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* 5. Right Edge Vertical Step Index: 01 to 05 */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-20 flex-col gap-4 font-mono-tech text-[10px]">
        {stepIndices.map((idx, i) => (
          <div key={idx} className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                i === 0
                  ? 'bg-[#19C9E8]'
                  : 'border border-[#74736E]/40 bg-transparent'
              }`}
            />
            <span className={i === 0 ? 'text-[#19C9E8] font-bold' : 'text-[#74736E]'}>
              {idx}
            </span>
          </div>
        ))}
      </div>

      {/* 6. Bottom System Telemetry Bar */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 max-w-[1640px] mx-auto pt-4">
        {/* Scroll To Enter Cue */}
        <div className="pb-3 flex items-center justify-end">
          <button
            onClick={() => scrollToSection('about')}
            onMouseEnter={() => spatialAudio.playHover()}
            className="flex items-center gap-2 text-[11px] font-mono-tech text-[#74736E] hover:text-[#3F3F3C] transition-colors cursor-pointer uppercase tracking-widest font-medium"
            data-cursor="SCROLL"
          >
            <div className="w-7 h-7 rounded-full border border-[#74736E]/40 flex items-center justify-center bg-white/40">
              <ArrowUp className="w-3.5 h-3.5 text-[#3F3F3C]" />
            </div>
            <span>SCROLL TO ENTER</span>
          </button>
        </div>

        {/* Telemetry Annotation Line */}
        <div className="border-t border-[#D1CEC5] pt-3 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono-tech text-[#74736E] uppercase tracking-widest gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#3F3F3C] font-bold">01 / HOME</span>
            <span className="w-12 h-[1px] bg-[#D1CEC5] hidden sm:inline-block" />
          </div>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-white/40 border border-[#3F3F3C]/15 text-[10px] text-[#74736E]">
              ALT.0101M &nbsp;|&nbsp; 00 // INDEX
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 border border-[#3F3F3C]/15 text-[10px] text-[#74736E]">
              <span>PROGRESS</span>
              <div className="w-16 h-[2px] bg-[#D1CEC5] rounded-full overflow-hidden">
                <div className="w-0 h-full bg-[#3F3F3C]" />
              </div>
              <span className="font-bold text-[#3F3F3C]">0%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#74736E]">
            <span>23.8103° N &nbsp; 90.4125° E &nbsp; ///</span>
          </div>
        </div>
      </div>
    </section>
  );
}
