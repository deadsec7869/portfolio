import { socialData } from '../../data/social';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasEmail = Boolean(socialData.email && socialData.email.trim().length > 0);
  const hasLinkedIn = Boolean(socialData.linkedin && socialData.linkedin.trim().length > 0);

  return (
    <footer className="w-full bg-transparent border-t border-black/[0.08] py-12 px-6 md:px-12 text-slate-500 font-mono-tech text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identity & Role */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <span className="text-base font-display font-extrabold text-[#111111] tracking-wider">
            {socialData.name}
          </span>
          <span className="text-slate-500 text-[11px] uppercase tracking-wider">
            ENGINEERING STUDENT &middot; DEVELOPER &middot; BUILDER
          </span>
        </div>

        {/* Social Navigation Links */}
        <div className="flex items-center gap-6 text-slate-700 font-medium">
          <a
            href={socialData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors uppercase tracking-wider"
          >
            GITHUB
          </a>
          {hasLinkedIn && (
            <a
              href={socialData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors uppercase tracking-wider"
            >
              LINKEDIN
            </a>
          )}
          {hasEmail && (
            <a
              href={`mailto:${socialData.email}`}
              className="hover:text-black transition-colors uppercase tracking-wider"
            >
              EMAIL
            </a>
          )}
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="flex items-center gap-4 text-slate-500 text-[11px]">
          <span>&copy; 2026 TAMIM</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white border border-black/10 hover:border-black/30 text-slate-700 hover:text-black transition-all cursor-pointer flex items-center gap-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            title="Scroll to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
