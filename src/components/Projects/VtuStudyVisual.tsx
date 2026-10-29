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
    <div className="w-full bg-[#1e1e2a] rounded-[12px] p-6 md:p-8 flex flex-col justify-between border-0 shadow-none relative overflow-hidden group text-[#ededf3]">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10 border-b border-[#70707d]/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#272735] border border-[#70707d]/20 flex items-center justify-center text-[#ededf3]">
            <GraduationCap className="w-5 h-5 text-[#5266eb]" />
          </div>
          <div>
            <h4 className="text-sm font-display font-[480] text-[#ededf3] tracking-wide">
              VTU STUDY COMPANION // ACADEMIC ENGINE
            </h4>
            <p className="text-[11px] font-mono-tech text-[#c3c3cc]">
              NEXT.JS 16 &middot; GOOGLE GENAI SDK (@google/genai)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#272735] border border-[#70707d]/20 text-[10px] font-mono-tech text-[#ededf3]">
          <Sparkles className="w-3.5 h-3.5 text-[#5266eb]" />
          <span>GENAI ACTIVE</span>
        </div>
      </div>

      {/* Interactive Academic Modules & Generation Sandbox */}
      <div className="my-6 z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Syllabus Modules */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#c3c3cc] block mb-1 font-[480]">
            CURRICULUM MODULES
          </span>
          {modules.map((mod, idx) => (
            <div
              key={mod.code}
              onClick={() => setActiveModule(idx)}
              className={`p-3 rounded-[12px] border transition-all cursor-pointer flex items-center justify-between ${
                activeModule === idx
                  ? 'bg-[#272735] border-[#5266eb] shadow-none'
                  : 'bg-[#171721] border-[#70707d]/20 hover:bg-[#272735]/70'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#5266eb]" />
                <div>
                  <span className="text-xs font-mono-tech font-[480] text-[#ededf3] block">
                    {mod.code} &middot; {mod.title}
                  </span>
                  <span className="text-[10px] font-mono-tech text-[#c3c3cc]">
                    VTU {mod.branch} 5TH SEM
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono-tech text-[#ededf3] bg-[#272735] px-2 py-0.5 rounded-full border border-[#70707d]/20 font-[480]">
                {mod.status}
              </span>
            </div>
          ))}
        </div>

        {/* Right: GenAI Output Stream */}
        <div className="p-4 rounded-[12px] bg-[#171721] border border-[#70707d]/20 flex flex-col justify-between font-mono-tech text-xs shadow-none">
          <div>
            <div className="flex items-center justify-between text-[11px] text-[#c3c3cc] border-b border-[#70707d]/20 pb-2 mb-3">
              <span className="flex items-center gap-1.5 text-[#ededf3] font-[480]">
                <Sparkles className="w-3.5 h-3.5 text-[#5266eb]" />
                GENAI REASONING CONSOLE
              </span>
              <span className="text-[10px] text-[#5266eb] font-[480]">
                {isGenerating ? 'GENERATING...' : 'READY'}
              </span>
            </div>

            <p className="text-[#c3c3cc] text-xs leading-relaxed font-sans-clean">
              {queries[activeModule % queries.length]}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#70707d]/20 flex items-center justify-between text-[10px] text-[#c3c3cc]">
            <span className="flex items-center gap-1 text-[#ededf3]">
              <CheckCircle2 className="w-3 h-3 text-[#5266eb]" />
              ACCURATE SYLLABUS ALIGNED
            </span>
            <span className="text-[#ededf3] font-[480]">VERCEL EDGE</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="z-10 text-xs font-mono-tech text-[#70707d] flex items-center justify-between border-t border-[#70707d]/20 pt-3">
        <span>FRAMEWORK: NEXT.JS 16 APP ROUTER</span>
        <span className="text-[#ededf3] font-[480]">HOSTED ON VERCEL</span>
      </div>
    </div>
  );
}
