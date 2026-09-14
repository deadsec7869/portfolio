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
    <div className="w-full bg-[#ECE8DD]/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-[#5E5E5A]/20 shadow-sm relative overflow-hidden group">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10 border-b border-[#5E5E5A]/15 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F4F1E8] border border-[#5E5E5A]/20 flex items-center justify-center text-[#3F3F3C]">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-[#3F3F3C] tracking-wide">
              VTU STUDY COMPANION // ACADEMIC ENGINE
            </h4>
            <p className="text-[11px] font-mono-tech text-[#5E5E5A]">
              NEXT.JS 16 &middot; GOOGLE GENAI SDK (@google/genai)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F4F1E8] border border-[#5E5E5A]/20 text-[10px] font-mono-tech text-[#3F3F3C]">
          <Sparkles className="w-3.5 h-3.5 text-[#5E5E5A]" />
          <span>GENAI ACTIVE</span>
        </div>
      </div>

      {/* Interactive Academic Modules & Generation Sandbox */}
      <div className="my-6 z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Syllabus Modules */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#8A8983] block mb-1">
            CURRICULUM MODULES
          </span>
          {modules.map((mod, idx) => (
            <div
              key={mod.code}
              onClick={() => setActiveModule(idx)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                activeModule === idx
                  ? 'bg-[#F4F1E8] border-[#5E5E5A] shadow-sm'
                  : 'bg-[#ECE8DD]/60 border-[#5E5E5A]/15 hover:bg-[#F4F1E8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#3F3F3C]" />
                <div>
                  <span className="text-xs font-mono-tech font-bold text-[#3F3F3C] block">
                    {mod.code} &middot; {mod.title}
                  </span>
                  <span className="text-[10px] font-mono-tech text-[#8A8983]">
                    VTU {mod.branch} 5TH SEM
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono-tech text-[#3F3F3C] bg-[#ECE8DD] px-2 py-0.5 rounded border border-[#5E5E5A]/20 font-semibold">
                {mod.status}
              </span>
            </div>
          ))}
        </div>

        {/* Right: GenAI Output Stream */}
        <div className="p-4 rounded-xl bg-[#F4F1E8] border border-[#5E5E5A]/20 flex flex-col justify-between font-mono-tech text-xs shadow-inner">
          <div>
            <div className="flex items-center justify-between text-[11px] text-[#8A8983] border-b border-[#5E5E5A]/15 pb-2 mb-3">
              <span className="flex items-center gap-1.5 text-[#3F3F3C] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#5E5E5A]" />
                GENAI REASONING CONSOLE
              </span>
              <span className="text-[10px] text-[#5E5E5A] font-bold">
                {isGenerating ? 'GENERATING...' : 'READY'}
              </span>
            </div>

            <p className="text-[#5E5E5A] text-xs leading-relaxed font-sans-clean">
              {queries[activeModule % queries.length]}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#5E5E5A]/15 flex items-center justify-between text-[10px] text-[#8A8983]">
            <span className="flex items-center gap-1 text-[#5E5E5A]">
              <CheckCircle2 className="w-3 h-3 text-[#5E5E5A]" />
              ACCURATE SYLLABUS ALIGNED
            </span>
            <span className="text-[#3F3F3C] font-semibold">VERCEL EDGE</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="z-10 text-xs font-mono-tech text-[#8A8983] flex items-center justify-between border-t border-[#5E5E5A]/15 pt-3">
        <span>FRAMEWORK: NEXT.JS 16 APP ROUTER</span>
        <span className="text-[#5E5E5A] font-semibold">HOSTED ON VERCEL</span>
      </div>
    </div>
  );
}
