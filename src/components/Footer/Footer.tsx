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
    <footer className="w-full bg-[#171721] border-t border-[#70707d]/20 py-16 px-6 md:px-12 text-[#c3c3cc] font-mono-tech text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identity & Role */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <span className="text-base font-display font-[480] text-[#ededf3] tracking-wider">
            {socialData.name}
          </span>
          <span className="text-[#70707d] text-[11px] uppercase tracking-wider">
            ENGINEERING STUDENT &middot; DEVELOPER &middot; BUILDER
          </span>
        </div>

        {/* Social Navigation Links */}
        <div className="flex items-center gap-6 text-[#c3c3cc] font-[480]">
          <a
            href={socialData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#5266eb] transition-colors uppercase tracking-wider"
          >
            GITHUB
          </a>
          {hasLinkedIn && (
            <a
              href={socialData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#5266eb] transition-colors uppercase tracking-wider"
            >
              LINKEDIN
            </a>
          )}
          {hasEmail && (
            <a
              href={`mailto:${socialData.email}`}
              className="hover:text-[#5266eb] transition-colors uppercase tracking-wider"
            >
              EMAIL
            </a>
          )}
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="flex items-center gap-4 text-[#c3c3cc] text-[11px]">
          <span>&copy; 2026 MUHAMMED TAMIM BAIG &middot; MERCURY BLUE HOUR</span>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-[#272735] border border-[#70707d]/20 hover:border-[#ededf3]/50 text-[#ededf3] transition-all cursor-pointer flex items-center gap-1 shadow-none"
            title="Scroll to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
