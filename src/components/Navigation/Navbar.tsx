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
  const activeSection = useActiveSection(['hero', ...navItems.map((n) => n.id)]);

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
    const targetId = id === 'lab' ? 'experience' : id === 'capabilities' ? 'stack' : id;
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
            className={`header-capsule h-[58px] sm:h-[66px] px-4 sm:px-7 flex items-center justify-between gap-3 sm:gap-6 transition-all duration-300 ${
              scrolled
                ? 'bg-white/55 shadow-[0_12px_40px_rgba(63,63,60,0.08)] border-[#3F3F3C]/30'
                : 'bg-white/35 shadow-[0_8px_32px_rgba(63,63,60,0.06)] border-[#3F3F3C]/20'
            }`}
          >
            {/* Zone 1: Left Technical Marker */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-6 h-6 rounded-full border border-[#3F3F3C]/25 flex items-center justify-center bg-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3F3F3C]" />
              </div>
              <div className="text-[10px] font-mono-tech text-[#74736E] leading-[1.15] tracking-wider uppercase hidden sm:flex flex-col">
                <span className="text-[#3F3F3C] font-semibold">N&deg;000 / ENTRY</span>
                <span>DIGITAL OPERATING LAB</span>
              </div>
            </div>

            {/* Vertical Divider 1 */}
            <div className="hidden lg:block w-[1px] h-6 bg-[#3F3F3C]/15 shrink-0" />

            {/* Zone 2: Centered Navigation Links */}
            <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-[11px] font-mono-tech tracking-[0.14em] uppercase">
              {navItems.map((item) => {
                const isItemActive =
                  activeSection === item.id ||
                  (item.id === 'lab' && activeSection === 'experience') ||
                  (item.id === 'capabilities' && activeSection === 'stack');

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    onMouseEnter={() => spatialAudio.playHover()}
                    className={`transition-colors cursor-pointer py-1 ${
                      isItemActive
                        ? 'text-[#19C9E8] font-bold underline underline-offset-4 decoration-[#19C9E8]/60'
                        : 'text-[#74736E] hover:text-[#3F3F3C]'
                    }`}
                    data-cursor="NAV"
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Vertical Divider 2 */}
            <div className="hidden lg:block w-[1px] h-6 bg-[#3F3F3C]/15 shrink-0" />

            {/* Zone 3: Status Pills & 3x3 Dot Menu */}
            <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap shrink-0">
              {/* System Online Pill with Electric Cyan Dot */}
              <div className="hidden md:flex items-center gap-2 text-[10px] font-mono-tech text-[#3F3F3C] bg-white/30 border border-[#3F3F3C]/20 px-3 py-1.5 rounded-full whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#19C9E8]" />
                <span className="tracking-wider uppercase font-semibold">SYSTEM: ONLINE</span>
              </div>

              {/* Sound Toggle Pill */}
              <button
                onClick={handleAudioToggle}
                onMouseEnter={() => spatialAudio.playHover()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/30 border border-[#3F3F3C]/20 hover:border-[#19C9E8]/60 text-[10px] font-mono-tech text-[#3F3F3C] hover:text-[#19C9E8] transition-all cursor-pointer whitespace-nowrap"
                title="Toggle Spatial Audio"
                data-cursor="AUDIO"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#74736E]" />
                    <span className="font-semibold text-[#74736E]">SOUND: OFF</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#19C9E8] animate-pulse" />
                    <span className="font-bold text-[#19C9E8]">SOUND: ON</span>
                  </>
                )}
              </button>

              {/* 3x3 Dot Menu Button */}
              <button
                onClick={() => {
                  spatialAudio.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="p-2 rounded-full border border-[#3F3F3C]/20 hover:border-[#19C9E8]/60 text-[#3F3F3C] hover:text-[#19C9E8] bg-white/30 focus:outline-none cursor-pointer flex items-center justify-center transition-colors"
                aria-label="Toggle Menu"
                data-cursor="MENU"
              >
                <div className="grid grid-cols-3 gap-[2.5px] w-3.5 h-3.5">
                  {[...Array(9)].map((_, i) => (
                    <span key={i} className="w-[2.5px] h-[2.5px] rounded-full bg-[#3F3F3C]" />
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
