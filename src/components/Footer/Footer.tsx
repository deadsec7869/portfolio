import { socialData } from '../../data/social';
import { ArrowUp } from 'lucide-react';
import { spatialAudio } from '../../lib/audio';

export function Footer() {
  const scrollToTop = () => {
    spatialAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasEmail = Boolean(socialData.email && socialData.email.trim().length > 0);
  const hasLinkedIn = Boolean(socialData.linkedin && socialData.linkedin.trim().length > 0);

  return (
    <footer className="w-full bg-transparent border-t border-[#3F3F3C]/15 py-12 px-6 md:px-12 text-[#74736E] font-mono-tech text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identity & Role */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <span className="text-base font-display font-black text-[#3F3F3C] tracking-wider">
            {socialData.name}
          </span>
          <span className="text-[#74736E] text-[11px] uppercase tracking-wider">
            ENGINEERING STUDENT &middot; DEVELOPER &middot; BUILDER
          </span>
        </div>

        {/* Social Navigation Links */}
        <div className="flex items-center gap-6 text-[#74736E] font-medium">
          <a
            href={socialData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#3F3F3C] transition-colors uppercase tracking-wider"
          >
            GITHUB
          </a>
          {hasLinkedIn && (
            <a
              href={socialData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3F3F3C] transition-colors uppercase tracking-wider"
            >
              LINKEDIN
            </a>
          )}
          {hasEmail && (
            <a
              href={`mailto:${socialData.email}`}
              className="hover:text-[#3F3F3C] transition-colors uppercase tracking-wider"
            >
              EMAIL
            </a>
          )}
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="flex items-center gap-4 text-[#74736E] text-[11px]">
          <span>&copy; 2026 MUHAMMED TAMIM BAIG</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/40 border border-[#3F3F3C]/20 hover:border-[#3F3F3C] hover:text-[#3F3F3C] text-[#74736E] transition-all cursor-pointer flex items-center gap-1 shadow-xs"
            title="Scroll to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
