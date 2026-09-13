import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '../../hooks/useActiveSection';
import { MobileMenu } from './MobileMenu';
import { socialData } from '../../data/social';
import { spatialAudio } from '../../lib/audio';

const navItems = [
  { id: 'about', label: 'ABOUT' },
  { id: 'work', label: 'WORK' },
  { id: 'experiments', label: 'LAB' },
  { id: 'stack', label: 'STACK' },
  { id: 'opensource', label: 'OPEN SOURCE' },
  { id: 'contact', label: 'CONTACT' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(['hero', ...navItems.map((n) => n.id)]);

  const hasLinkedIn = Boolean(socialData.linkedin && socialData.linkedin.trim().length > 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    spatialAudio.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-4 bg-[#FAFAF8]/80 backdrop-blur-xl border-b border-black/[0.06] shadow-sm'
            : 'py-7 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Studio Brand Mark */}
          <button
            onClick={() => scrollTo('hero')}
            onMouseEnter={() => spatialAudio.playHover()}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none"
            data-cursor="TOP"
          >
            <span className="font-display font-black text-lg tracking-wider text-[#111111] group-hover:text-[#008899] transition-colors">
              {socialData.name}
            </span>
            <span className="text-[10px] font-mono-tech text-slate-500 tracking-widest hidden sm:inline">
              // STUDIO
            </span>
          </button>

          {/* Minimal Center Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono-tech tracking-wider uppercase">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={() => spatialAudio.playHover()}
                  className={`relative py-1 transition-colors cursor-pointer group ${
                    isActive ? 'text-[#111111] font-bold' : 'text-slate-600 hover:text-[#111111]'
                  }`}
                  data-cursor="NAV"
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLineLight"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#111111]"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#111111] group-hover:w-full transition-all duration-200" />
                </button>
              );
            })}
          </nav>

          {/* Right Social & Availability Channels */}
          <div className="hidden lg:flex items-center gap-5 text-xs font-mono-tech text-slate-600">
            {socialData.availableForProjects && (
              <div className="flex items-center gap-2 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>{socialData.availabilityStatus}</span>
              </div>
            )}
            <a
              href={socialData.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => spatialAudio.playHover()}
              className="text-[#111111] hover:text-[#008899] transition-colors uppercase"
            >
              GITHUB
            </a>
            {hasLinkedIn && (
              <a
                href={socialData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => spatialAudio.playHover()}
                className="text-[#111111] hover:text-[#008899] transition-colors uppercase"
              >
                LINKEDIN
              </a>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              spatialAudio.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 text-[#111111] hover:text-[#008899] focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
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
