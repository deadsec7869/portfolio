import { useState, useEffect } from 'react';
import { BookOpen, Sparkles, GraduationCap, CheckCircle2 } from 'lucide-react';

export function VtuStudyVisual() {
  const [activeModule, setActiveModule] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const modules = [
    { code: '21CS51', title: 'Automata Theory & Computability', branch: 'CSE', status: 'INDEXED' },
    { code: '21CS52', title: 'Computer Networks', branch: 'CSE', status: 'AI ENRICHED' },
    { code: '21CS53', title: 'Database Management Systems', branch: 'CSE', status: 'INDEXED' },
    { code: '21CS54', title: 'Artificial Intelligence & ML', branch: 'CSE', status: 'AI ENRICHED' }
  ];

  const queries = [
    'Synthesizing Finite State Automata transitions and DFA minimization steps...',
    'Generating 3-tier database relational normal form (1NF to BCNF) proofs...',
    'Explaining Dijkstra vs Bellman-Ford shortest-path routing algorithm complexity...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsGenerating(true);
      setTimeout(() => {
        setActiveModule((prev) => (prev + 1) % modules.length);
        setIsGenerating(false);
      }, 700);
    }, 3800);
    return () => clearInterval(timer);
  }, [modules.length]);

  return (
    <div className="w-full bg-[#FFFFFF] rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-black/[0.08] shadow-lg shadow-black/[0.02] relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10 border-b border-black/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-800">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-[#111111] tracking-wide">
              VTU STUDY COMPANION // ACADEMIC ENGINE
            </h4>
            <p className="text-[11px] font-mono-tech text-purple-700">
              NEXT.JS 16 &middot; GOOGLE GENAI SDK (@google/genai)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-[10px] font-mono-tech text-purple-800">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>GENAI ACTIVE</span>
        </div>
      </div>

      {/* Interactive Academic Modules & Generation Sandbox */}
      <div className="my-6 z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Syllabus Modules */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-500 block mb-1">
            CURRICULUM MODULES
          </span>
          {modules.map((mod, idx) => (
            <div
              key={mod.code}
              onClick={() => setActiveModule(idx)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                activeModule === idx
                  ? 'bg-purple-50/80 border-purple-300 shadow-sm'
                  : 'bg-[#FAFAF8] border-black/[0.06] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <div>
                  <span className="text-xs font-mono-tech font-bold text-[#111111] block">
                    {mod.code} &middot; {mod.title}
                  </span>
                  <span className="text-[10px] font-mono-tech text-slate-500">
                    VTU {mod.branch} 5TH SEM
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono-tech text-purple-800 bg-white px-2 py-0.5 rounded border border-purple-200">
                {mod.status}
              </span>
            </div>
          ))}
        </div>

        {/* Right: GenAI Output Stream */}
        <div className="p-4 rounded-xl bg-[#FAFAF8] border border-black/[0.08] flex flex-col justify-between font-mono-tech text-xs">
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-black/[0.06] pb-2 mb-3">
              <span className="flex items-center gap-1.5 text-purple-800 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                GENAI REASONING CONSOLE
              </span>
              <span className="text-[10px] text-emerald-700 font-bold">
                {isGenerating ? 'GENERATING...' : 'READY'}
              </span>
            </div>

            <p className="text-slate-700 text-xs leading-relaxed font-sans-clean">
              {queries[activeModule % queries.length]}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1 text-slate-600">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              ACCURATE SYLLABUS ALIGNED
            </span>
            <span className="text-purple-700">VERCEL EDGE</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="z-10 text-xs font-mono-tech text-slate-500 flex items-center justify-between border-t border-black/[0.06] pt-3">
        <span>FRAMEWORK: NEXT.JS 16 APP ROUTER</span>
        <span className="text-purple-700 font-semibold">HOSTED ON VERCEL</span>
      </div>
    </div>
  );
}
