export function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden pointer-events-none select-none">
      {/* Technical Studio Geometric Dynamic Rings */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-[#5E5E5A]/20 animate-[spin_36s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-[#5E5E5A]/15 border-dashed animate-[spin_24s_linear_infinite_reverse]" />
        <div className="absolute inset-10 rounded-full border border-[#5E5E5A]/30 animate-[spin_18s_linear_infinite]" />
        <div className="w-24 h-24 rounded-2xl bg-[#ECE8DD] border border-[#5E5E5A]/25 rotate-45 flex items-center justify-center shadow-xs">
          <div className="w-6 h-6 rounded-full bg-[#5E5E5A]/20 border border-[#5E5E5A]/40 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
