import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useActiveSection } from '../../hooks/useActiveSection';
import { MobileMenu } from './MobileMenu';
import { spatialAudio } from '../../lib/audio';

const navItems = [
  { id: 'about', label: 'ABOUT' },
  { id: 'work', label: 'WORK' },
  { id: 'lab', label: 'LAB' },
  { id: 'capabilities', label: 'CAPABILITIES' },
  { id: 'opensource', label: 'OPEN SOURCE' },
  { id: 'contact', label: 'CONTACT' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const activeSection = useActiveSection(['hero', ...navItems.map((n) => (n.id === 'capabilities' ? 'stack' : n.id))]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const muted = spatialAudio.toggleMute();
    setIsMuted(muted);
  };

  const scrollTo = (id: string) => {
    spatialAudio.playClick();
    const targetId = id === 'capabilities' ? 'stack' : id;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 sm:top-5 left-0 right-0 z-[100] px-4 sm:px-8 pointer-events-none"
      >
        <div className="header-capsule-container pointer-events-auto">
          <div
            className={`header-capsule h-[58px] sm:h-[66px] px-4 sm:px-7 flex items-center justify-between gap-3 sm:gap-6 transition-all duration-300 shadow-none ${
              scrolled
                ? 'bg-[#1e1e2a]/90 backdrop-blur-xl border border-[#70707d]/30'
                : 'bg-[#1e1e2a]/75 backdrop-blur-md border border-[#70707d]/20'
            }`}
          >
            {/* Zone 1: Left Concentric Ring Mercury-style Marker */}
            <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-7 h-7 rounded-full border border-[#ededf3]/40 flex items-center justify-center bg-[#272735]">
                <span className="w-2.5 h-2.5 rounded-full border border-[#ededf3]" />
              </div>
              <div className="text-[10px] font-mono-tech text-[#c3c3cc] leading-[1.15] tracking-wider uppercase hidden sm:flex flex-col">
                <span className="text-[#ededf3] font-[480]">TAMIM BAIG</span>
                <span>ALPINE LAB // N°000</span>
              </div>
            </div>

            {/* Vertical Divider 1 */}
            <div className="hidden lg:block w-[1px] h-6 bg-[#70707d]/20 shrink-0" />

            {/* Zone 2: Centered Navigation Links */}
            <nav className="hidden lg:flex items-center justify-center gap-2 xl:gap-3 text-[12px] font-mono-tech tracking-[0.08em] uppercase">
              {navItems.map((item) => {
                const isItemActive =
                  activeSection === item.id ||
                  (item.id === 'capabilities' && activeSection === 'stack');

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    onMouseEnter={() => spatialAudio.playHover()}
                    className={`transition-all cursor-pointer px-4 py-1.5 rounded-[40px] ${
                      isItemActive
                        ? 'bg-white/10 text-[#ededf3] font-[480]'
                        : 'text-[#c3c3cc] hover:text-[#ededf3] hover:bg-white/5 font-[400]'
                    }`}
                    data-cursor="NAV"
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Vertical Divider 2 */}
            <div className="hidden lg:block w-[1px] h-6 bg-[#70707d]/20 shrink-0" />

            {/* Zone 3: Status Pills & Mercury CTA */}
            <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap shrink-0">
              {/* System Online Pill with Cobalt Dot */}
              <div className="hidden md:flex items-center gap-2 text-[10px] font-mono-tech text-[#ededf3] bg-[#272735] border border-[#70707d]/25 px-3 py-1.5 rounded-full whitespace-nowrap shadow-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5266eb]" />
                <span className="tracking-wider uppercase font-[480]">SYSTEM: ONLINE</span>
              </div>

              {/* Sound Toggle Pill */}
              <button
                onClick={handleAudioToggle}
                onMouseEnter={() => spatialAudio.playHover()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#272735] border border-[#70707d]/25 hover:border-[#5266eb]/60 text-[10px] font-mono-tech text-[#ededf3] hover:text-[#5266eb] transition-all cursor-pointer whitespace-nowrap shadow-none"
                title="Toggle Spatial Audio"
                data-cursor="AUDIO"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#70707d]" />
                    <span className="font-[480] text-[#70707d]">SOUND: OFF</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#5266eb] animate-pulse" />
                    <span className="font-[480] text-[#5266eb]">SOUND: ON</span>
                  </>
                )}
              </button>

              {/* Primary Cobalt Pill CTA */}
              <button
                onClick={() => scrollTo('contact')}
                onMouseEnter={() => spatialAudio.playHover()}
                className="bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] text-[11px] font-mono-tech tracking-wider uppercase font-[400] rounded-[32px] px-4 py-2 transition-colors border-0 hidden sm:inline-flex items-center justify-center cursor-pointer shadow-none"
                data-cursor="CONTACT"
              >
                DISPATCH
              </button>

              {/* 3x3 Dot Menu Button */}
              <button
                onClick={() => {
                  spatialAudio.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="p-2 rounded-full border border-[#70707d]/25 hover:border-[#5266eb]/60 text-[#ededf3] hover:text-[#5266eb] bg-[#272735] focus:outline-none cursor-pointer flex items-center justify-center transition-colors shadow-none"
                aria-label="Toggle Menu"
                data-cursor="MENU"
              >
                <div className="grid grid-cols-3 gap-[2.5px] w-3.5 h-3.5">
                  {[...Array(9)].map((_, i) => (
                    <span key={i} className="w-[2.5px] h-[2.5px] rounded-full bg-[#ededf3]" />
                  ))}
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={[{ id: 'hero', label: 'INDEX' }, ...navItems]}
        activeSection={activeSection}
        onSelectSection={(id) => {
          setMobileMenuOpen(false);
          scrollTo(id);
        }}
      />
    </>
  );
}
