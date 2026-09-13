import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { socialData } from '../../data/social';
import { useMousePosition } from '../../hooks/useMousePosition';
import { SceneFallback } from '../../three/scenes/SceneFallback';
import { spatialAudio } from '../../lib/audio';

const HeroScene = lazy(() =>
  import('../../three/scenes/HeroScene').then((m) => ({ default: m.HeroScene }))
);

export function HeroSection() {
  const mousePosition = useMousePosition();

  const scrollToSection = (id: string) => {
    spatialAudio.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const hasLinkedIn = Boolean(socialData.linkedin && socialData.linkedin.trim().length > 0);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[95vh] flex flex-col justify-between items-center overflow-hidden pt-28 pb-14 select-none bg-transparent"
    >
      {/* 3D WebGL Atmosphere Layer (Light Gallery Ambient Depth) */}
      <div className="absolute inset-0 z-0 opacity-80 md:opacity-90 pointer-events-none">
        <Suspense fallback={<SceneFallback />}>
          <HeroScene mousePosition={mousePosition} />
        </Suspense>
      </div>

      {/* Atmospheric Vignette & Soft Daylight Falloff */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8]/50 via-transparent to-[#FAFAF8] pointer-events-none z-[1]" />

      {/* Top Studio Telemetry */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between text-[11px] font-mono-tech text-slate-500 uppercase tracking-widest"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#111111] animate-pulse" />
          <span className="text-[#111111] font-bold">TAMIM // PORTFOLIO</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 font-mono-tech">
          <span>SPATIAL COMPUTING &middot; AI SYSTEMS</span>
        </div>
      </motion.div>

      {/* Main Art-Directed Editorial Typography */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 my-auto flex flex-col justify-center">
        {/* Subtitle Role Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs sm:text-sm font-mono-tech text-slate-600 tracking-[0.25em] uppercase mb-4 flex items-center gap-3 font-semibold"
        >
          <span className="w-8 h-[1px] bg-black/20" />
          <span>ENGINEERING STUDENT &middot; DEVELOPER &middot; BUILDER</span>
        </motion.div>

        {/* Large Editorial Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col space-y-2"
        >
          <h1 className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[12.5rem] font-display font-black tracking-tighter text-[#111111] leading-[0.82] uppercase">
            TAMIM
          </h1>
          <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-700 tracking-tight leading-[0.98] uppercase">
            I BUILD SOFTWARE, <br />
            AI SYSTEMS, AND <br />
            DIGITAL EXPERIENCES.
          </div>
        </motion.div>

        {/* Action Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <button
            onClick={() => scrollToSection('work')}
            onMouseEnter={() => spatialAudio.playHover()}
            className="group px-8 py-4 rounded-full bg-[#111111] text-white font-mono-tech text-xs tracking-wider uppercase font-bold hover:bg-black transition-all flex items-center gap-3 cursor-pointer shadow-lg shadow-black/10"
            data-cursor="VIEW"
          >
            <span>EXPLORE WORK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
          </button>

          <a
            href={socialData.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => spatialAudio.playHover()}
            className="text-xs font-mono-tech text-slate-700 hover:text-black transition-colors uppercase tracking-wider flex items-center gap-1.5 cursor-pointer font-semibold"
            data-cursor="GITHUB"
          >
            <span>GITHUB</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 hover:text-black transition-colors" />
          </a>

          {hasLinkedIn && (
            <a
              href={socialData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => spatialAudio.playHover()}
              className="text-xs font-mono-tech text-slate-700 hover:text-black transition-colors uppercase tracking-wider flex items-center gap-1.5 cursor-pointer font-semibold"
              data-cursor="LINKEDIN"
            >
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 hover:text-black transition-colors" />
            </a>
          )}
        </motion.div>
      </div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest pt-6 border-t border-black/[0.06]"
      >
        <button
          onClick={() => scrollToSection('about')}
          onMouseEnter={() => spatialAudio.playHover()}
          className="flex items-center gap-2 hover:text-black transition-colors cursor-pointer"
          data-cursor="SCROLL"
        >
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown className="w-3.5 h-3.5 text-slate-700 animate-bounce" />
        </button>

        <span>ELEVATION // 0101M &middot; GLOBAL ACCESS</span>
      </motion.div>
    </section>
  );
}
