import { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowUp } from 'lucide-react';
import { spatialAudio } from '../../lib/audio';

interface SpatialHudProps {
  activeSection: string;
}

export function SpatialHud({ activeSection }: SpatialHudProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [altitude, setAltitude] = useState(101);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
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
    about: '01 // BIOGRAPHY',
    work: '02 // SELECTED WORK',
    experiments: '03 // LAB ARCHIVES',
    stack: '04 // TECH ORBIT',
    opensource: '05 // OPEN SOURCE',
    contact: '06 // TRANSMISSION',
  };

  return (
    <>
      {/* Top Floating Telemetry Strip (Fixed Right) */}
      <div className="fixed top-6 right-6 z-40 hidden xl:flex items-center gap-4 text-[11px] font-mono-tech text-slate-600 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/[0.08] shadow-sm">
        <span className="text-[#111111] font-medium">{currentTime}</span>
        <span className="w-1 h-1 rounded-full bg-[#008899] animate-pulse" />
        <button
          onClick={handleAudioToggle}
          onMouseEnter={() => spatialAudio.playHover()}
          className="flex items-center gap-1.5 text-slate-600 hover:text-[#008899] transition-colors cursor-pointer uppercase"
          title="Toggle Spatial Audio"
          data-cursor="AUDIO"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span>SOUND: OFF</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#008899] animate-pulse" />
              <span className="text-[#008899]">SOUND: ON</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom Fixed Spatial HUD */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Left: Altitude & Active Chapter */}
          <div className="flex items-center gap-3 bg-white/85 backdrop-blur-xl px-4 py-2 rounded-full border border-black/[0.08] shadow-md text-[11px] font-mono-tech">
            <span className="text-[#008899] font-bold">
              ALT.{String(altitude).padStart(4, '0')}M
            </span>
            <span className="w-1 h-3 bg-black/15" />
            <span className="text-slate-700 uppercase">
              {sectionMap[activeSection] || '00 // INDEX'}
            </span>
          </div>

          {/* Center: Scrollytelling Progress Bar */}
          <div className="hidden md:flex items-center gap-3 bg-white/85 backdrop-blur-xl px-5 py-2.5 rounded-full border border-black/[0.08] shadow-md">
            <span className="text-[10px] font-mono-tech text-slate-500 uppercase">PROGRESS</span>
            <div className="w-32 h-[3px] bg-[#E8E8E4] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#008899] to-[#111111] transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span className="text-[10px] font-mono-tech text-[#111111] font-bold min-w-[3ch]">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          {/* Right: Audio and Scroll to Top */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleAudioToggle}
              className="xl:hidden flex items-center gap-1.5 bg-white/85 backdrop-blur-xl p-2.5 rounded-full border border-black/[0.08] text-slate-700 hover:text-[#008899] transition-colors cursor-pointer shadow-sm"
              title="Toggle Audio"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#008899]" />}
            </button>

            <button
              onClick={scrollToTop}
              onMouseEnter={() => spatialAudio.playHover()}
              className="flex items-center gap-1.5 bg-white/85 backdrop-blur-xl px-3.5 py-2.5 rounded-full border border-black/[0.08] hover:border-[#008899]/50 text-slate-700 hover:text-[#111111] transition-all cursor-pointer group text-xs font-mono-tech shadow-md"
              data-cursor="TOP"
              title="Return to Altitude Origin"
            >
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="hidden sm:inline text-[11px]">TOP</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
