import { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { spatialAudio } from '../../lib/audio';

interface SpatialHudProps {
  activeSection: string;
}

export function SpatialHud({ activeSection }: SpatialHudProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [altitude, setAltitude] = useState(101);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
      setAltitude(Math.floor(101 + progress * 4709));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const muted = spatialAudio.toggleMute();
    setIsMuted(muted);
  };

  const scrollToTop = () => {
    spatialAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sectionMap: Record<string, string> = {
    hero: '00 // INDEX',
    about: '01 // ABOUT',
    work: '02 // SELECTED WORK',
    experience: '03 // LAB',
    stack: '04 // CAPABILITIES',
    opensource: '05 // OPEN SOURCE',
    contact: '06 // CONTACT',
  };

  // Only show fixed HUD when scrolled past initial hero
  const isVisible = activeSection !== 'hero' && scrollProgress > 0.04;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
            {/* Left: Altitude & Active Chapter */}
            <div className="flex items-center gap-3 bg-[#1e1e2a]/90 backdrop-blur-xl px-4 py-2 rounded-full border border-[#70707d]/25 shadow-none text-[11px] font-mono-tech">
              <span className="text-[#ededf3] font-[480]">
                ALT.{String(altitude).padStart(4, '0')}M
              </span>
              <span className="w-1 h-3 bg-[#70707d]/30" />
              <span className="text-[#c3c3cc] uppercase font-medium">
                {sectionMap[activeSection] || '00 // INDEX'}
              </span>
            </div>

            {/* Center: Scrollytelling Progress Bar */}
            <div className="hidden md:flex items-center gap-3 bg-[#1e1e2a]/90 backdrop-blur-xl px-5 py-2.5 rounded-full border border-[#70707d]/25 shadow-none">
              <span className="text-[10px] font-mono-tech text-[#c3c3cc] uppercase tracking-wider">PROGRESS</span>
              <div className="w-32 h-[3px] bg-[#272735] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5266eb] transition-all duration-150"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
              <span className="text-[10px] font-mono-tech text-[#ededf3] font-[480] min-w-[3ch]">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>

            {/* Right: Audio and Scroll to Top */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleAudioToggle}
                className="xl:hidden flex items-center gap-1.5 bg-[#1e1e2a]/90 backdrop-blur-xl p-2.5 rounded-full border border-[#70707d]/25 text-[#c3c3cc] hover:text-[#ededf3] transition-colors cursor-pointer shadow-none"
                aria-label="Toggle Audio"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#70707d]" /> : <Volume2 className="w-4 h-4 text-[#5266eb]" />}
              </button>

              <button
                onClick={scrollToTop}
                onMouseEnter={() => spatialAudio.playHover()}
                className="flex items-center gap-1.5 bg-[#1e1e2a]/90 backdrop-blur-xl px-3.5 py-2.5 rounded-full border border-[#70707d]/25 hover:border-[#ededf3]/40 text-[#c3c3cc] hover:text-[#ededf3] transition-all cursor-pointer group text-xs font-mono-tech shadow-none"
                data-cursor="TOP"
                title="Return to Altitude Origin"
              >
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#ededf3]" />
                <span className="hidden sm:inline text-[11px] font-[480]">TOP</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
