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
    <div className="w-full bg-gradient-to-br from-[#120b1f] via-[#0b0714] to-[#040208] rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-purple-500/30 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-white tracking-wide">
              NEURAL MESH ENGINE // LATENT TOPOLOGY
            </h4>
            <p className="text-[11px] font-mono-tech text-purple-400">
              SYNAPTIC FORWARD PROPAGATION &amp; WEIGHT FLOW
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-[10px] font-mono-tech text-purple-300">
          <Cpu className="w-3.5 h-3.5" />
          <span>GPU INSTANCED</span>
        </div>
      </div>

      {/* Network Layers Visual */}
      <div className="my-8 z-10 flex items-center justify-between max-w-lg mx-auto w-full px-4">
        {layers.map((layer, lIdx) => (
          <div key={layer.name} className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-mono-tech text-slate-400">
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
                        ? 'bg-purple-400 shadow-[0_0_12px_#A855F7] scale-110'
                        : 'bg-purple-950 border border-purple-500/40'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="z-10 text-xs font-mono-tech text-slate-400 flex items-center justify-between border-t border-white/5 pt-3">
        <span>ACTIVATION: LEAKY_RELU</span>
        <span className="text-purple-400">1,200+ SYNAPTIC CONNECTIONS</span>
      </div>
    </div>
  );
}
