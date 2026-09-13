import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Terminal, Cpu, Activity, Disc3, BookOpen } from 'lucide-react';
import { getGitHubProfile } from '../../lib/github';
import type { GitHubUser } from '../../types/github';
import { spatialAudio } from '../../lib/audio';

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<'ai' | 'software' | 'creative'>('ai');
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);

  useEffect(() => {
    getGitHubProfile().then((user) => setGithubUser(user));
  }, []);

  const disciplines = [
    {
      id: 'ai' as const,
      title: 'AI & HEURISTICS',
      tag: 'A* & GENAI SDK',
      icon: Bot,
      description: 'Implementing autonomous A* pathfinding, space-time conflict resolution, and academic generative workflows using Google GenAI SDK.'
    },
    {
      id: 'software' as const,
      title: 'WEB APPLICATIONS',
      tag: 'NEXT.JS 16 & TYPESCRIPT',
      icon: Terminal,
      description: 'Building modern TypeScript applications with Next.js 16 App Router, React 19, Tailwind CSS, and edge deployment pipelines.'
    },
    {
      id: 'creative' as const,
      title: '3D & AUDIO SYSTEMS',
      tag: 'THREE.JS & WEB AUDIO',
      icon: Cpu,
      description: 'Creating interactive 3D WebGL spatial environments with Three.js, real-time Web Audio API signal processing, and GSAP/Motion kinematics.'
    }
  ];

  return (
    <section id="about" className="relative w-full py-28 md:py-36 bg-transparent border-t border-black/[0.06]">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label System */}
        <div className="flex items-center gap-3 text-xs font-mono-tech uppercase tracking-[0.25em] text-[#008899] mb-10">
          <span>01 / ABOUT</span>
          <span className="w-8 h-[1px] bg-[#008899]/40" />
          <span className="text-slate-500">ENGINEERING BIOGRAPHY</span>
        </div>

        {/* Large Editorial Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="mb-14 md:mb-20"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-[#111111] tracking-tight leading-[0.9] uppercase max-w-5xl">
            I BUILD SOFTWARE, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500">
              AI SYSTEMS,
            </span> <br />
            AND INTERACTIVE DIGITAL EXPERIENCES.
          </h2>
        </motion.div>

        {/* Narrative & Focus Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Factual Bio Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 text-base sm:text-lg text-slate-700 font-sans-clean font-light leading-relaxed"
          >
            <p className="text-[#111111] font-normal text-lg sm:text-xl leading-snug">
              &ldquo;I&apos;m an engineering student and developer building software applications, autonomous AI simulations, interactive 3D web environments, and tools.&rdquo;
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every project is constructed with strict TypeScript standards, modular component architectures, and algorithmic rigor—focusing on software that feels tactile, responsive, and purposeful.
            </p>

            {/* WHAT I BUILD Interactive Tabs */}
            <div className="pt-6">
              <span className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#008899] block mb-3">
                CORE DISCIPLINES //
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {disciplines.map((item) => {
                  const isSelected = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        spatialAudio.playHover();
                        setActiveTab(item.id);
                      }}
                      data-cursor="INSPECT"
                      className={`p-4 rounded-xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#008899]/50 shadow-md shadow-[#008899]/5'
                          : 'bg-white/40 border-black/[0.06] hover:bg-white/80 hover:border-black/15'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#008899] mb-2.5" />
                      <h4 className="text-xs font-display font-bold text-[#111111] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] font-sans-clean text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Live Status Indicator */}
              <div className="mt-4 p-3.5 rounded-xl bg-white/70 backdrop-blur-md border border-black/[0.08] flex items-center justify-between font-mono-tech text-xs shadow-sm">
                {activeTab === 'ai' && (
                  <div className="flex items-center gap-2 text-emerald-800 w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 animate-pulse text-emerald-600" />
                      HEURISTIC VECTOR: A* PATHFINDING &middot; CONFLICT DETECTION
                    </span>
                    <span className="text-slate-500 text-[10px]">AI ROBOTICS</span>
                  </div>
                )}
                {activeTab === 'software' && (
                  <div className="flex items-center gap-2 text-purple-900 w-full justify-between">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      ACADEMIC PORTAL: NEXT.JS 16 &middot; GOOGLE GENAI
                    </span>
                    <span className="text-slate-500 text-[10px]">VTU PLATFORM</span>
                  </div>
                )}
                {activeTab === 'creative' && (
                  <div className="flex items-center gap-2 text-[#008899] w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Disc3 className="w-4 h-4 animate-spin-slow text-[#008899]" />
                      SPATIAL 3D: THREE.JS &middot; WEB AUDIO API &middot; GSAP
                    </span>
                    <span className="text-slate-500 text-[10px]">AAPESH WORKSTATION</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Authentic GitHub Stat Overview */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="p-6 rounded-2xl bg-white/60 border border-black/[0.08] flex flex-col gap-1 shadow-sm">
              <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest">
                VERIFIED GITHUB REPOSITORIES
              </span>
              <span className="text-4xl sm:text-5xl font-display font-black text-[#111111]">
                {githubUser ? githubUser.public_repos : '3'}
              </span>
              <span className="text-xs font-mono-tech text-[#008899] mt-1">
                @deadsec7869 &middot; Open Source
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white/60 border border-black/[0.08] flex flex-col gap-1 shadow-sm">
              <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest">
                PRIMARY STACK
              </span>
              <span className="text-2xl sm:text-3xl font-display font-bold text-[#111111]">
                REACT 19 &middot; NEXT.JS 16
              </span>
              <span className="text-xs font-mono-tech text-slate-600 mt-1">
                TypeScript &middot; Three.js &middot; Vite &middot; Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
