import { useState, useEffect } from 'react';
import { Terminal, Activity, Zap } from 'lucide-react';

export function TelemetryVisual() {
  const [logs, setLogs] = useState<string[]>([
    '[22:42:01] [NET] WebSocket connection initialized (wss://telemetry.core:8080)',
    '[22:42:02] [METRICS] Ingesting 48,290 events/sec · P99 latency: 1.82ms',
    '[22:42:03] [FILTER] Rolling statistical filter window updated: anomaly score 0.02'
  ]);

  useEffect(() => {
    const stream = [
      '[INGEST] Cluster node-03 heartbeat: OK (memory: 42% · cpu: 18%)',
      '[FILTER] Anomaly spike detection: threshold safe (0.04 < 0.85)',
      '[STREAM] WebSocket broadcast: 52,100 msgs/s pushed with zero buffer drop',
      '[METRICS] Latency profile: P50: 0.8ms · P95: 1.4ms · P99: 1.8ms'
    ];
    let idx = 0;
    const timer = setInterval(() => {
      setLogs((prev) => [...prev.slice(-3), `[${new Date().toLocaleTimeString()}] ${stream[idx % stream.length]}`]);
      idx++;
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-[#1c1206] via-[#100b04] to-[#060401] rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-amber-500/30 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-300">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-white tracking-wide">
              DISTRIBUTED TELEMETRY STREAM // LIVE
            </h4>
            <p className="text-[11px] font-mono-tech text-amber-400">
              HIGH-THROUGHPUT WEBSOCKET INGEST &amp; ANOMALY ROUTER
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-[10px] font-mono-tech text-amber-300">
          <Zap className="w-3.5 h-3.5" />
          <span>50k MSG/S</span>
        </div>
      </div>

      {/* Terminal Stream Box */}
      <div className="my-6 z-10 p-4 rounded-xl bg-black/80 border border-white/10 font-mono-tech text-xs space-y-2">
        <div className="flex items-center justify-between text-slate-500 border-b border-white/5 pb-2 text-[10px]">
          <span>STREAM://INGEST_STATION</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <Activity className="w-3 h-3 animate-pulse" /> LIVE STREAM
          </span>
        </div>
        {logs.map((log, i) => (
          <p key={i} className="text-amber-200/90 font-mono text-[11px] leading-relaxed">
            <span className="text-amber-400">$</span> {log}
          </p>
        ))}
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="z-10 text-xs font-mono-tech text-slate-400 flex items-center justify-between border-t border-white/5 pt-3">
        <span>BUFFER: 0 DROPPED FRAMES</span>
        <span className="text-amber-400">P99 LATENCY: 1.8ms</span>
      </div>
    </div>
  );
}
