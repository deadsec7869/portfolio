export function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden pointer-events-none select-none">
      {/* Light Studio Geometric Dynamic Rings */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-slate-300/60 animate-[spin_36s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-slate-400/40 border-dashed animate-[spin_24s_linear_infinite_reverse]" />
        <div className="absolute inset-10 rounded-full border border-[#008899]/30 animate-[spin_18s_linear_infinite]" />
        <div className="w-24 h-24 rounded-2xl bg-white border border-slate-300/80 rotate-45 flex items-center justify-center shadow-lg shadow-black/[0.04]">
          <div className="w-8 h-8 rounded-full bg-[#008899]/10 border border-[#008899]/40 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
