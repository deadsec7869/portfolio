import { useState, useEffect } from 'react';
import { Network, Cpu } from 'lucide-react';

export function NeuralVisual() {
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 4);
    }, 600);
    return () => clearInterval(timer);
  }, []);

  const layers = [
    { name: 'INPUT', nodes: 4 },
    { name: 'HIDDEN 1', nodes: 6 },
    { name: 'HIDDEN 2', nodes: 6 },
    { name: 'OUTPUT', nodes: 3 }
  ];

  return (
    <div className="w-full bg-[#ECE8DD]/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-[#5E5E5A]/20 shadow-sm relative overflow-hidden group">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10 border-b border-[#5E5E5A]/15 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F4F1E8] border border-[#5E5E5A]/20 flex items-center justify-center text-[#3F3F3C]">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-[#3F3F3C] tracking-wide">
              NEURAL MESH ENGINE // LATENT TOPOLOGY
            </h4>
            <p className="text-[11px] font-mono-tech text-[#5E5E5A]">
              SYNAPTIC FORWARD PROPAGATION &amp; WEIGHT FLOW
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F4F1E8] border border-[#5E5E5A]/20 text-[10px] font-mono-tech text-[#3F3F3C]">
          <Cpu className="w-3.5 h-3.5 text-[#5E5E5A]" />
          <span>GPU INSTANCED</span>
        </div>
      </div>

      {/* Network Layers Visual */}
      <div className="my-8 z-10 flex items-center justify-between max-w-lg mx-auto w-full px-4">
        {layers.map((layer, lIdx) => (
          <div key={layer.name} className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-mono-tech text-[#8A8983]">
              {layer.name}
            </span>
            <div className="flex flex-col gap-2.5">
              {Array.from({ length: layer.nodes }).map((_, nIdx) => {
                const isActive = (lIdx === pulsePhase) || (lIdx === (pulsePhase + 1) % 4);
                return (
                  <div
                    key={nIdx}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#3F3F3C] scale-110 shadow-sm'
                        : 'bg-[#F4F1E8] border border-[#5E5E5A]/25'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="z-10 text-xs font-mono-tech text-[#8A8983] flex items-center justify-between border-t border-[#5E5E5A]/15 pt-3">
        <span>ACTIVATION: LEAKY_RELU</span>
        <span className="text-[#5E5E5A] font-semibold">1,200+ SYNAPTIC CONNECTIONS</span>
      </div>
    </div>
  );
}
