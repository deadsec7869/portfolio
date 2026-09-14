import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Disc3, Radio } from 'lucide-react';

export function MusicPlayerVisual() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeLyricIndex, setActiveLyricIndex] = useState(1);
  const [trackProgress, setTrackProgress] = useState(38);

  const lyrics = [
    { time: '0:32', text: 'Neural resonance across the discrete frequency bands' },
    { time: '0:36', text: 'Cascading waveforms render at steady 60 frames per second' },
    { time: '0:41', text: 'Atmospheric color palette harmonizes with audio peaks' },
    { time: '0:45', text: 'Spatial audio telemetry pulsing in the dark UI console' }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveLyricIndex((prev) => (prev + 1) % lyrics.length);
      setTrackProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
    }, 2500);
    return () => clearInterval(interval);
  }, [isPlaying, lyrics.length]);

  return (
    <div className="w-full bg-[#ECE8DD]/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-[#5E5E5A]/20 shadow-sm relative overflow-hidden group">
      {/* Top Bar: Telemetry & Track Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 z-10 border-b border-[#5E5E5A]/15 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F4F1E8] border border-[#5E5E5A]/20 flex items-center justify-center text-[#3F3F3C]">
            <Disc3 className={`w-5 h-5 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-[#3F3F3C] tracking-wide">
              SYNTHETIC VELOCITY // FLAC 96kHz
            </h4>
            <p className="text-[11px] font-mono-tech text-[#5E5E5A]">
              AUDIO DSP ENGINE &middot; 64-BAND FFT ANALYZER
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F4F1E8] border border-[#5E5E5A]/20 text-[10px] font-mono-tech text-[#3F3F3C]">
          <Radio className="w-3.5 h-3.5 text-[#5E5E5A] animate-pulse" />
          <span>SIMULATED DSP STREAM</span>
        </div>
      </div>

      {/* Center Section: Album Artwork + Kinetic Synced Lyrics + 64-Band Equalizer */}
      <div className="my-6 z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Animated Lyric Stream */}
        <div className="md:col-span-7 flex flex-col gap-2.5">
          <span className="text-[10px] font-mono-tech text-[#8A8983] uppercase tracking-widest">
            KINETIC SYNCED LYRICS (&plusmn;12ms PRECISION)
          </span>
          <div className="space-y-2">
            {lyrics.map((lyric, idx) => {
              const isCurrent = idx === activeLyricIndex;
              return (
                <div
                  key={lyric.text}
                  className={`transition-all duration-500 flex items-center gap-3 ${
                    isCurrent
                      ? 'text-[#3F3F3C] text-base md:text-lg font-bold scale-[1.01] translate-x-2'
                      : 'text-[#8A8983] text-xs md:text-sm'
                  }`}
                >
                  <span className={`font-mono-tech text-[10px] ${isCurrent ? 'text-[#3F3F3C] font-bold' : 'text-[#8A8983]'}`}>
                    {lyric.time}
                  </span>
                  <span className="font-sans-clean">
                    {lyric.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-time Spectrum Waveform Simulator */}
        <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center">
          <div className="flex items-end gap-[3px] h-24 p-3 bg-[#F4F1E8] rounded-xl border border-[#5E5E5A]/20 w-full justify-between shadow-inner">
            {Array.from({ length: 24 }).map((_, i) => {
              const height = isPlaying
                ? `${Math.max(12, Math.abs(Math.sin((i + activeLyricIndex * 4) * 0.6)) * 75 + Math.abs(Math.cos(i * 1.7)) * 18)}%`
                : '12%';
              return (
                <div
                  key={i}
                  className="w-1.5 bg-[#5E5E5A] rounded-t-sm transition-all duration-150"
                  style={{ height }}
                />
              );
            })}
          </div>
          <span className="text-[9px] font-mono-tech text-[#8A8983] mt-2">
            AUDIO CONTEXT // 44.1kHz BUFFER PERSISTENCE
          </span>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="z-10 bg-[#F4F1E8] rounded-xl p-4 border border-[#5E5E5A]/20 flex flex-col gap-3">
        {/* Scrubber Progress Bar */}
        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] font-mono-tech text-[#8A8983]">01:24</span>
          <div className="flex-1 h-1.5 bg-[#ECE8DD] rounded-full overflow-hidden relative cursor-pointer group">
            <div
              className="h-full bg-[#5E5E5A] relative"
              style={{ width: `${trackProgress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#3F3F3C] shadow-md" />
            </div>
          </div>
          <span className="text-[10px] font-mono-tech text-[#8A8983]">03:45</span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#5E5E5A] text-xs font-mono-tech">
            <Volume2 className="w-4 h-4 text-[#5E5E5A]" />
            <span>STEREO PCM</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveLyricIndex((p) => (p > 0 ? p - 1 : lyrics.length - 1))}
              className="p-1.5 text-[#8A8983] hover:text-[#3F3F3C] transition-colors cursor-pointer"
              aria-label="Previous Lyric / Track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-full bg-[#3F3F3C] text-[#F4F1E8] flex items-center justify-center font-bold hover:bg-[#5E5E5A] transition-all shadow-md cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              onClick={() => setActiveLyricIndex((p) => (p + 1) % lyrics.length)}
              className="p-1.5 text-[#8A8983] hover:text-[#3F3F3C] transition-colors cursor-pointer"
              aria-label="Next Lyric / Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <span className="text-[10px] font-mono-tech text-[#8A8983]">
            UI ENGINE v2.0
          </span>
        </div>
      </div>
    </div>
  );
}
