import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { socialData } from '../../data/social';
import { spatialAudio } from '../../lib/audio';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { id: string; label: string }[];
  activeSection: string;
  onSelectSection: (id: string) => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  activeSection,
  onSelectSection
}: MobileMenuProps) {
  const hasEmail = Boolean(socialData.email && socialData.email.trim().length > 0);
  const hasLinkedIn = Boolean(socialData.linkedin && socialData.linkedin.trim().length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-[#171721]/98 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-xs text-[#c3c3cc] uppercase tracking-widest">
              NAVIGATION // {socialData.name}
            </span>
            <button
              onClick={() => {
                spatialAudio.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-[#272735] border border-[#70707d]/30 text-[#ededf3] hover:text-white cursor-pointer"
              aria-label="Close navigation"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 my-auto">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    spatialAudio.playClick();
                    onSelectSection(item.id);
                  }}
                  className="flex items-center justify-between text-left py-2.5 border-b border-[#70707d]/15 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-display text-xl tracking-tight uppercase ${
                        isActive ? 'text-[#ffffff] font-[480]' : 'text-[#c3c3cc] group-hover:text-[#ededf3] font-[400]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? 'text-[#5266eb] translate-x-1' : 'text-[#70707d] group-hover:translate-x-1'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Footer Info */}
          <div className="flex flex-col gap-3 pt-6 border-t border-[#70707d]/20 text-xs font-mono-tech text-[#c3c3cc]">
            {socialData.availableForProjects && (
              <div className="flex items-center gap-2 text-[#ededf3]">
                <span className="w-2 h-2 rounded-full bg-[#5266eb] animate-pulse" />
                <span>{socialData.availabilityStatus}</span>
              </div>
            )}
            <div className="flex items-center gap-4 text-[#ededf3]">
              <a
                href={socialData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#5266eb] transition-colors uppercase"
              >
                GitHub
              </a>
              {hasLinkedIn && (
                <a
                  href={socialData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#5266eb] transition-colors uppercase"
                >
                  LinkedIn
                </a>
              )}
              {hasEmail && (
                <a
                  href={`mailto:${socialData.email}`}
                  className="hover:text-[#5266eb] transition-colors uppercase"
                >
                  Email
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
